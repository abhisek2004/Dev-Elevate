import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "./utils/passport.js";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Welcome to DevElevate Server!");
});

app.use("/api/v1", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
