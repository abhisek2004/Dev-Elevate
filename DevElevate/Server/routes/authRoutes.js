import { Router } from 'express';
import authController from '../controller/authController.js ';
const authRouter = Router();

// Sample route for authentication
authRouter.get('/login', authController.login);
authRouter.post('/register', authController.register);

// Export the authRouter
export default authRouter;  