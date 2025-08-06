import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  name: z.string().min(1, { message: "Name is required" }),
  role: z.enum(["user", "admin"], {
    errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
  }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

const signUpValidator = (req, res, next) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "Signup validation failed. Please correct the input fields.",
      issues: result.error.errors,
    });
  }
  next();
};

const loginValidator = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: "Login validation failed. Please check your credentials.",
      issues: result.error.errors,
    });
  }
  next();
};

export { signUpValidator, loginValidator };
