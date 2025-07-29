const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

// Initialize app and load environment variables
dotenv.config();
const app = express();
app.use(cors({ origin: 'http://localhost:5174' }));
app.use(express.json());

// Set default secret key if not provided in environment
const SECRET_KEY = process.env.SECRET_KEY || 'default-dev-secret-key-change-in-production';

const users = []; // In-memory user storage (for testing)

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  try {
    console.log('Registration request received:', req.body);
    const { name, email, password, role } = req.body;
    
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send({ error: 'Name, email, and password are required' });
    }
    
    const hashedPassword = bcrypt.hashSync(password, 8);
    const user = { id: users.length + 1, name, email, password: hashedPassword, role: role || 'user' };
    users.push(user);
    
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
    console.log('User registered successfully:', user.name);
    
    // Don't send back the hashed password
    const userResponse = { id: user.id, name: user.name, email: user.email, role: user.role };
    res.status(200).send({ auth: true, token, user: userResponse });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).send({ error: 'Internal server error', details: error.message });
  }
});

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

    req.userId = decoded.id;
    next();
  });
}

// Protected route
app.get('/api/protected', isAuthenticated, (req, res) => {
  res.status(200).send(`Welcome user ${req.userId}!`);
});

// LinkedIn sync endpoint (unauthenticated test version)
app.post('/api/linkedin/sync-test', (req, res) => {
  console.log('LinkedIn sync test request received');
  try {
    // Mock LinkedIn data for testing
    const mockLinkedInData = {
      profile: {
        name: 'John Doe',
        headline: 'Software Developer',
        location: 'San Francisco, CA',
        connections: 500
      },
      skills: ['JavaScript', 'React', 'Node.js', 'Python'],
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Developer',
          duration: '2020 - Present'
        }
      ]
    };
    res.status(200).send({ success: true, data: mockLinkedInData });
  } catch (error) {
    console.error('LinkedIn sync error:', error);
    res.status(500).send({ error: 'Failed to sync LinkedIn data' });
  }
});

// GitHub sync endpoint (unauthenticated test version)
app.post('/api/github/sync-test', (req, res) => {
  console.log('GitHub sync test request received');
  try {
    // Mock GitHub data for testing
    const mockGitHubData = {
      profile: {
        username: 'johndoe',
        name: 'John Doe',
        bio: 'Full-stack developer passionate about open source',
        public_repos: 25,
        followers: 150,
        following: 75
      },
      repositories: [
        {
          name: 'awesome-project',
          description: 'An awesome React project',
          language: 'JavaScript',
          stars: 120,
          forks: 25
        },
        {
          name: 'python-utils',
          description: 'Utility functions for Python',
          language: 'Python',
          stars: 45,
          forks: 8
        }
      ],
      languages: {
        'JavaScript': 65,
        'Python': 25,
        'HTML': 10
      }
    };
    res.status(200).send({ success: true, data: mockGitHubData });
  } catch (error) {
    console.error('GitHub sync error:', error);
    res.status(500).send({ error: 'Failed to sync GitHub data' });
  }
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).send({ error: 'Email and password are required' });
    }
    
    // Find user by email
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    
    // Check password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ auth: false, token: null, error: 'Invalid password' });
    }
    
    // Generate token
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: 86400 });
    
    // Don't send back the hashed password
    const userResponse = { id: user.id, name: user.name, email: user.email, role: user.role };
    res.status(200).send({ auth: true, token, user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send({ error: 'Internal server error', details: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server listening on port ${PORT}`);
});

