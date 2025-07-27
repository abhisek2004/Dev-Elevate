import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, MessageCircle, Download, AlertTriangle } from 'lucide-react';
import { jsPDF } from 'jspdf';

const PaymentFailed: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    paymentIntentId, 
    error, 
    amount = 1900, 
    customerName, 
    timestamp,
    cardBrand = 'Unknown',
    last4 = '••••'
  } = location.state || {};

  const failureDetails = {
    transactionId: paymentIntentId || 'pi_failed_' + Date.now(),
    amount: amount,
    currency: 'USD',
    customerName: customerName || 'Test User',
    email: 'user@example.com',
    date: timestamp ? new Date(timestamp) : new Date(),
    plan: 'DevElevate Pro',
    duration: 'Monthly',
    status: 'Failed',
    errorMessage: error?.message || 'Payment was declined',
    errorCode: error?.code || 'card_declined',
    paymentMethod: `${cardBrand} ending in ${last4}`,
    attemptNumber: 1
  };

  const getErrorExplanation = (errorCode: string) => {
    const explanations: { [key: string]: { title: string; description: string; solution: string } } = {
      'card_declined': {
        title: 'Card Declined',
        description: 'Your card was declined by your bank.',
        solution: 'Please try a different card or contact your bank.'
      },
      'insufficient_funds': {
        title: 'Insufficient Funds',
        description: 'Your card has insufficient funds.',
        solution: 'Please try a different card or add funds to your account.'
      },
      'invalid_cvc': {
        title: 'Invalid Security Code',
        description: 'The CVC code you entered is incorrect.',
        solution: 'Please check the 3-digit code on the back of your card.'
      },
      'expired_card': {
        title: 'Expired Card',
        description: 'Your card has expired.',
        solution: 'Please use a card with a valid expiration date.'
      },
      'processing_error': {
        title: 'Processing Error',
        description: 'There was an error processing your payment.',
        solution: 'Please try again or contact support if the issue persists.'
      }
    };

    return explanations[errorCode] || explanations['processing_error'];
  };

  const errorInfo = getErrorExplanation(failureDetails.errorCode);

  const downloadFailureReport = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.setFont('Helvetica', 'bold');
    doc.text('DevElevate', 20, 30);
    doc.setFontSize(16);
    doc.text('Payment Failure Report', 20, 45);
    
    // Failure details
    doc.setFontSize(12);
    doc.setFont('Helvetica', 'normal');
    
    const details = [
      ['Transaction ID:', failureDetails.transactionId],
      ['Date:', failureDetails.date.toLocaleDateString()],
      ['Time:', failureDetails.date.toLocaleTimeString()],
      ['Customer:', failureDetails.customerName],
      ['Email:', failureDetails.email],
      ['Plan:', failureDetails.plan],
      ['Amount:', `$${(failureDetails.amount / 100).toFixed(2)} ${failureDetails.currency}`],
      ['Payment Method:', failureDetails.paymentMethod],
      ['Status:', failureDetails.status],
      ['Error Code:', failureDetails.errorCode],
      ['Error Message:', failureDetails.errorMessage],
      ['Attempt:', failureDetails.attemptNumber.toString()]
    ];
    
    let yPosition = 65;
    details.forEach(([label, value]) => {
      doc.setFont('Helvetica', 'bold');
      doc.text(label, 20, yPosition);
      doc.setFont('Helvetica', 'normal');
      doc.text(value, 80, yPosition);
      yPosition += 10;
    });
    
    // Resolution steps
    doc.setFont('Helvetica', 'bold');
    doc.text('Recommended Actions:', 20, yPosition + 10);
    doc.setFont('Helvetica', 'normal');
    
    const actions = [
      '1. Check your card details for accuracy',
      '2. Verify sufficient funds are available',
      '3. Contact your bank if the issue persists',
      '4. Try an alternative payment method',
      '5. Contact DevElevate support for assistance'
    ];
    
    yPosition += 25;
    actions.forEach(action => {
      doc.text(action, 25, yPosition);
      yPosition += 8;
    });
    
    // Footer
    doc.setFontSize(10);
    doc.text('DevElevate Support: support@develevate.com', 20, 280);
    doc.text('Report generated on: ' + new Date().toLocaleString(), 20, 290);
    
    doc.save(`DevElevate_Payment_Failure_${failureDetails.transactionId}.pdf`);
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(failureDetails, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `payment_failure_${failureDetails.transactionId}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const retryPayment = () => {
    navigate('/premium/payment', { 
      state: { 
        retry: true, 
        previousError: failureDetails.errorCode 
      } 
    });
  };

  const contactSupport = () => {
    const subject = 'Payment Failure Support Request';
    const body = `Hello DevElevate Support,

I encountered a payment failure with the following details:
- Transaction ID: ${failureDetails.transactionId}
- Date: ${failureDetails.date.toLocaleString()}
- Error: ${failureDetails.errorMessage}
- Amount: $${(failureDetails.amount / 100).toFixed(2)}

Please assist me with resolving this issue.

Thank you.`;
    
    window.open(`mailto:support@develevate.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Failure Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h1>
          <p className="text-gray-600">
            We couldn't process your payment. Please try again.
          </p>
        </div>

        {/* Error Information */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-3 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-red-800 mb-2">{errorInfo.title}</h3>
              <p className="text-red-700 mb-3">{errorInfo.description}</p>
              <p className="text-sm text-red-600 font-medium">
                Solution: {errorInfo.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Transaction Details
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Transaction ID</p>
              <p className="font-mono font-medium">{failureDetails.transactionId}</p>
            </div>
            <div>
              <p className="text-gray-600">Date & Time</p>
              <p className="font-medium">{failureDetails.date.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-600">Amount</p>
              <p className="font-medium text-lg">
                ${(failureDetails.amount / 100).toFixed(2)} {failureDetails.currency}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Payment Method</p>
              <p className="font-medium">{failureDetails.paymentMethod}</p>
            </div>
            <div>
              <p className="text-gray-600">Error Code</p>
              <p className="font-mono text-red-600">{failureDetails.errorCode}</p>
            </div>
            <div>
              <p className="text-gray-600">Status</p>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {failureDetails.status}
              </span>
            </div>
          </div>
        </div>

        {/* Troubleshooting Tips */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-semibold text-blue-800 mb-3">Troubleshooting Tips:</h3>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Double-check your card number, expiry date, and CVC code
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Ensure your billing address matches your card statement
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Try using a different card or payment method
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Contact your bank to ensure international payments are enabled
            </li>
          </ul>
        </div>

        {/* Download Options */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Download Failure Report:</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={downloadFailureReport}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF Report
            </button>
            <button
              onClick={downloadJSON}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              JSON Data
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={retryPayment}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
          
          <button
            onClick={contactSupport}
            className="flex-1 bg-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Support
          </button>
          
          <button
            onClick={() => navigate('/premium')}
            className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
          >
            Back to Plans
          </button>
        </div>
        
        <p className="text-xs text-gray-500 mt-6 text-center">
          Need help? Contact our support team at support@develevate.com
        </p>
      </div>
    </div>
  );
};

export default PaymentFailed;
