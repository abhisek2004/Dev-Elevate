import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

// Create a test admin token
const adminUser = {
  id: 'admin_123',
  email: 'admin@test.com',
  role: 'admin'
};

const token = jwt.sign(adminUser, process.env.JWT_SECRET || 'e3d1a5c3c4b6a7c93fd5a876bfd7f5bbcc9e5db69ea64c0a9e1c2a1c2c8c5');

console.log('Generated JWT Token:', token);

// Test creating a log entry
const testLog = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/admin/system-log', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        actionType: 'view_logs',
        userId: 'admin_123',
        userRole: 'admin',
        message: 'Test admin log entry'
      })
    });

    const data = await response.json();
    console.log('Create log response:', data);

    // Test getting logs
    const getResponse = await fetch('http://localhost:4000/api/admin/system-logs?page=1&limit=10', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const getLogs = await getResponse.json();
    console.log('Get logs response:', getLogs);

  } catch (error) {
    console.error('Test failed:', error);
  }
};

testLog();
