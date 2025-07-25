import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.model.js";
import { generateToken } from "../utils/token.js";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/api/v1/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { displayName, emails, photos } = profile;
        const email = emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            fullname: displayName,
            email: email,
            password: null, // No password for OAuth users
            provider: "google",
          });
        }

        // Generate JWT token
        const token = generateToken(user._id);

        user.token = token;
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);
