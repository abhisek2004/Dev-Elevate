import React from 'react';
import StripeProvider from './StripeProvider';
import PaymentForm from './PaymentForm';

const PaymentPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <StripeProvider>
        <PaymentForm />
      </StripeProvider>
    </div>
  );
};

export default PaymentPage;
