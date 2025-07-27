// Simple local startup script for debugging
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Basic middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!', timestamp: new Date() });
});

// Simple payment intent route for testing
app.post('/api/payment/create-payment-intent', (req, res) => {
  console.log('Payment intent request received');
  res.json({
    success: true,
    clientSecret: 'pi_test_' + Date.now() + '_secret_test'
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
});
