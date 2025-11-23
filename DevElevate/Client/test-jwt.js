// Quick test for JWT generation
import jwt from 'jsonwebtoken';

const testUser = {
  id: 'user_123',
  email: 'test@example.com', 
  role: 'admin'
};

const jwtSecret = 'e3d1a5c3c4b6a7c93fd5a876bfd7f5bbcc9e5db69ea64c0a9e1c2a1c2c8c5';

try {
  const token = jwt.sign(testUser, jwtSecret);
  // Verify token
  const decoded = jwt.verify(token, jwtSecret);
} catch (error) {
  console.error('JWT test failed:', error);
}
