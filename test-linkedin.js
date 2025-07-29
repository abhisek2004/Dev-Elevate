// Test script to check LinkedIn sync functionality
const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

async function testHealthCheck() {
  try {
    const response = await axios.get(`${BASE_URL}/api/health`);
    console.log('✅ Backend health check:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend health check failed:', error.message);
    return false;
  }
}

async function testLinkedInStatus() {
  try {
    // This will fail without auth token, but we can see if the endpoint exists
    const response = await axios.get(`${BASE_URL}/api/integrations/linkedin/status`);
    console.log('✅ LinkedIn status endpoint accessible');
  } catch (error) {
    if (error.response?.status === 401) {
      console.log('✅ LinkedIn status endpoint exists (requires authentication)');
    } else {
      console.error('❌ LinkedIn status endpoint error:', error.message);
    }
  }
}

async function runTests() {
  console.log('🧪 Testing LinkedIn sync functionality...\n');
  
  const healthOk = await testHealthCheck();
  if (!healthOk) {
    console.log('\n❌ Backend server is not running. Please start it with:');
    console.log('cd E:\\calc\\portfolio\\Dev-Elevate\\backend && npm start');
    return;
  }
  
  await testLinkedInStatus();
  
  console.log('\n📋 Next steps to test LinkedIn sync:');
  console.log('1. Open your browser to http://localhost:5174');
  console.log('2. Register/login to your account');
  console.log('3. Navigate to the LinkedIn integration section');
  console.log('4. Enter a public LinkedIn profile URL');
  console.log('5. Click "Sync LinkedIn Data" button');
  
  console.log('\n⚠️  Important notes:');
  console.log('- Make sure the LinkedIn profile is public');
  console.log('- The scraping may take 30+ seconds to complete');
  console.log('- Check browser console for detailed error messages');
  console.log('- Ensure both backend (port 5000) and frontend (port 5174) are running');
}

runTests();
