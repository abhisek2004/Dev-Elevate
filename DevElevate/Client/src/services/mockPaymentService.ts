// Mock payment service for development when backend is not available
export const mockPaymentService = {
  createPaymentIntent: async (amount: number) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return mock client secret
    return {
      success: true,
      clientSecret: 'pi_mock_client_secret_for_testing_' + Date.now()
    };
  },

  recordPayment: async (paymentIntentId: string, amount: number, status: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    console.log('Mock payment recorded:', {
      paymentIntentId,
      amount,
      status,
      timestamp: new Date().toISOString()
    });
    
    return {
      success: true,
      message: 'Payment recorded successfully'
    };
  }
};

// Check if backend is available
export const isBackendAvailable = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/payment/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 1 }) // Test with minimal amount
    });
    return response.ok || response.status < 500;
  } catch (error) {
    return false;
  }
};
