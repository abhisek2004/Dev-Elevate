import { Router } from 'express';
import authController from '../controller/authController.js ';
import {signupValidator,  loginValidator } from '../middleware/Validators.js';
const authRouter = Router();

// Sample route for authentication
authRouter.post('/login', loginValidator, authController.login);
authRouter.post('/register', signupValidator, authController.register);

// Export the authRouter
export default authRouter;  