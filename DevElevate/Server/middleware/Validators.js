import {z} from 'zod';

const signupSchema = z.object({
    username : z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email : z.string().email({ message: "Invalid email address" }),
    password : z.string().min(6, { message: "Password must be at least 6 characters long" }),
    role : z.enum(['user', 'admin'], { message: "Role must be either 'user' or 'admin'" })
});

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

const signupValidator = (req, res, next) => {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message : "/signup validation failed",
        });
    }
    next();
}

const loginValidator = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message : "/login validation failed",
        });
    }
    next();
}

export { loginValidator, signupValidator };