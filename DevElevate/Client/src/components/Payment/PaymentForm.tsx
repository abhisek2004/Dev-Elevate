import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TestCardHelper from './TestCardHelper';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  
  const [clientSecret, setClientSecret] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info');

  useEffect(() => {
    // Create payment intent on component mount
    createPaymentIntent();
  }, []);

  const createPaymentIntent = async () => {
    try {
      console.log('🚀 Creating payment intent...');
      const response = await axios.post(
        'http://localhost:5000/api/payment/create-payment-intent',
        { amount: 1900 }, // $19.00 for premium subscription
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('✅ Payment intent response:', response.data);
      if (response.data.success) {
        setClientSecret(response.data.clientSecret);
        setMessage('Payment initiated. Please fill in your details.');
        setMessageType('info');
      } else {
        setMessage('Failed to create payment intent');
        setMessageType('error');
      }
    } catch (error: any) {
      console.error('❌ Error creating payment intent:', error);
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });

      // Better error messaging
      if (error.code === 'NETWORK_ERROR' || !error.response) {
        setMessage('Unable to connect to payment server. Please check your connection and try again.');
      } else if (error.response?.status === 404) {
        setMessage('Payment service not found. Please contact support.');
      } else {
        setMessage(error.response?.data?.error || 'Failed to initialize payment');
      }
      setMessageType('error');
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements || !clientSecret) {
      return;
    }

    setLoading(true);
    setMessage('Processing payment...');
    setMessageType('info');

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setMessage('Card element not found');
      setMessageType('error');
      setLoading(false);
      return;
    }

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: name,
          },
        },
      });

      if (error) {
        setMessage(error.message || 'Payment failed');
        setMessageType('error');

        // Redirect to failure page after 3 seconds
        setTimeout(() => {
          navigate('/premium/payment/failed', {
            state: {
              paymentIntentId: clientSecret.split('_secret')[0],
              error: error,
              amount: 1900,
              customerName: name,
              timestamp: new Date().toISOString()
            }
          });
        }, 3000);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        setMessage('Payment successful! Redirecting...');
        setMessageType('success');
        
        // Record payment in backend
        await recordPayment(paymentIntent.id, 1900, 'succeeded');
        
        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
          navigate('/premium/payment/success', {
            state: {
              paymentIntentId: paymentIntent.id,
              amount: 1900,
              customerName: name,
              timestamp: new Date().toISOString()
            }
          });
        }, 2000);
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setMessage('Payment failed. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const recordPayment = async (paymentIntentId: string, amount: number, status: string) => {
    try {
      await axios.post(
        '/api/payment/record',
        { paymentIntentId, amount, status },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upgrade to Premium
      </h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-800">Premium Features</h3>
        <ul className="text-sm text-blue-600 mt-2">
          <li>• Unlimited access to all courses</li>
          <li>• Priority support</li>
          <li>• Advanced analytics</li>
          <li>• Certificate generation</li>
        </ul>
        <p className="font-bold text-blue-800 mt-2">$19.00/month</p>
      </div>

      {message && (
        <div className={`mb-4 p-3 rounded-lg text-sm ${
          messageType === 'success' ? 'bg-green-100 text-green-700' :
          messageType === 'error' ? 'bg-red-100 text-red-700' :
          'bg-blue-100 text-blue-700'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
            <CardElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        <button
          type="submit"
          disabled={!stripe || loading || !clientSecret}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            loading || !stripe || !clientSecret
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {loading ? 'Processing...' : 'Pay $19.00'}
        </button>
      </form>

      <TestCardHelper />
    </div>
  );
};

export default PaymentForm;
