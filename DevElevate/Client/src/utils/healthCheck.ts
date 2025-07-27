import axios from 'axios';

export const checkBackendHealth = async () => {
  try {
    console.log('🏥 Checking backend health...');
    const response = await axios.get('/api/test', {
      timeout: 5000,
      validateStatus: () => true // Accept any status
    });
    
    console.log('✅ Backend health check result:', {
      status: response.status,
      data: response.data
    });
    
    return response.status < 500;
  } catch (error) {
    console.error('❌ Backend health check failed:', error);
    return false;
  }
};

export const checkAuthEndpoint = async () => {
  try {
    console.log('🔐 Checking auth endpoint...');
    const response = await axios.post('/api/v1/auth/test', {
      test: 'data'
    }, {
      timeout: 5000,
      validateStatus: () => true
    });
    
    console.log('✅ Auth endpoint check result:', {
      status: response.status,
      data: response.data
    });
    
    return response.status < 500;
  } catch (error) {
    console.error('❌ Auth endpoint check failed:', error);
    return false;
  }
};
