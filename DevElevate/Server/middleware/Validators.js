import { z } from 'zod';

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    name : z.string().min(1, 'Name is required'),
    role: z.enum(['user', 'admin'], 'Role must be either user or admin'),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const signUpValidator = (req, res, next) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: 'Validation failed in signup',
            issues: result.error.errors,
        });
    }
    next();
};

const loginValidator = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            error: 'Validation failed in login',
            issues: result.error.errors,
        });
    }
    next();
};

export { signUpValidator, loginValidator };