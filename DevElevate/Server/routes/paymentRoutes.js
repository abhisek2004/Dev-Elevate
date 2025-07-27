import express from 'express';
import Stripe from 'stripe';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount = 1900 } = req.body; // Default to $19.00 for premium subscription
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: 'usd',
      metadata: {
        userId: req.user?.id || 'test_user',
        email: req.user?.email || 'test@example.com'
      }
    });

    res.json({
      success: true,
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Record payment success
router.post('/record', async (req, res) => {
  try {
    const { paymentIntentId, amount, status } = req.body;
    
    // You can create a Payment model and save to MongoDB here
    // For now, we'll just log it
    console.log('Payment recorded:', {
      userId: req.user?.id || 'test_user',
      email: req.user?.email || 'test@example.com',
      paymentIntentId,
      amount,
      status,
      timestamp: new Date()
    });

    res.json({
      success: true,
      message: 'Payment recorded successfully'
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

export default router;
