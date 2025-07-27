// Simple API connectivity test
export const testApiConnection = async () => {
  try {
    console.log('🔍 Testing API connection...');
    
    // Test basic backend connection
    const basicResponse = await fetch('/api', {
      method: 'GET',
    });
    
    console.log('Basic API response:', {
      status: basicResponse.status,
      ok: basicResponse.ok,
      headers: Object.fromEntries(basicResponse.headers.entries())
    });
    
    // Test auth endpoint specifically
    const authTestResponse = await fetch('/api/v1/auth/test', {
      method: 'GET',
    });
    
    console.log('Auth endpoint test:', {
      status: authTestResponse.status,
      ok: authTestResponse.ok
    });
    
    return { basicResponse, authTestResponse };
  } catch (error) {
    console.error('API test failed:', error);
    return null;
  }
};
