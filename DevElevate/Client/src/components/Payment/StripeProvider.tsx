import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RpMJ0AATs14YoNVVXzq3EUukAq0N93Z3ZN9ARoW0y7wPHki8F5ZKQhHn1ZybwIEXgeJVr1FvHDaIjDc6OGyXknY00kjEyEnsT');

interface StripeProviderProps {
  children: React.ReactNode;
}

const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeProvider;
