import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['user', 'admin']),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type SignUpInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

const signUpValidator = (
  req: Request<{}, {}, SignUpInput>,
  res: Response,
  next: NextFunction
) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed in signup',
      issues: result.error.issues, 
    });
  }
  next();
};

const loginValidator = (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: 'Validation failed in login',
      issues: result.error.issues, 
    });
  }
  next();
};

export { signUpValidator, loginValidator };
