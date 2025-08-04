import { z } from "zod";

// SCHEMA FOR SIGNUP VALIDATION
const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  name: z.string().min(1, "Name is required"),
  role: z.enum(["user", "admin"], "Role must be either user or admin"),
});

// SCHEMA FOR LOGIN VALIDATION
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

// MIDDLEWARE TO VALIDATE SIGNUP REQUEST BODY
const signUpValidator = (req, res, next) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    console.error("Validation failed in signup:", result.error.errors);
    return res.status(400).json({
      error: "Validation failed in signup",
      issues: result.error.errors,
    });
  }
  next();
};

// MIDDLEWARE TO VALIDATE LOGIN REQUEST BODY
const loginValidator = (req, res, next) => {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    console.error("Validation failed in login:", result.error.errors);
    return res.status(400).json({
      error: "Validation failed in login",
      issues: result.error.errors,
    });
  }
  next();
};

export { signUpValidator, loginValidator };
