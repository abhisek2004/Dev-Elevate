import React, { useState, useEffect, useRef } from "react";
import { useAuth, User } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { baseUrl } from "../../config/routes";
import {
  Eye,
  EyeOff,
  User as UserIcon,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  AlertCircle,
} from "lucide-react";

const LoginRegister: React.FC = () => {
  const { state, login, register, verifySignupOtp, dispatch } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const allowedEmailRegex =
    /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|icloud\.com|protonmail\.com|aol\.com)$/;

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      if (state.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [state.isAuthenticated, state.user, navigate]);

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userPayload = {
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        password: "",
      };
      const response = await fetch(`${baseUrl}/api/v1/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        const user: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role, // Role determined by backend
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.name}`,
          bio: data.user.bio || "",
          socialLinks: {},
          joinDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          isActive: true,
          preferences: {
            theme: "light",
            notifications: true,
            language: "en",
            emailUpdates: true,
          },
          progress: {
            coursesEnrolled: [],
            completedModules: 0,
            totalPoints: 0,
            streak: 0,
            level: "Beginner",
          },
        };

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { user, token: data.token },
        });

        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: data.message || "Google login failed",
        });
      }
    } catch (error) {
      console.error("Google Sign-In Error", error);
      dispatch({ type: "LOGIN_FAILURE", payload: "Google Sign-In Error" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_ERROR" });
    if (!state.otpPending && !allowedEmailRegex.test(formData.email)) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload:
          "Please use a valid email from gmail.com, outlook.com, yahoo.com, hotmail.com, icloud.com, protonmail.com, or aol.com.",
      });
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Passwords do not match" });
      return;
    }

    try {
      if (isLogin) {
        // Login without role; backend determines role based on email
        await login(formData.email, formData.password);
      } else {
        if (state.otpPending) {
          await verifySignupOtp(
            state.pendingEmail || formData.email,
            otp.join("")
          );
        } else {
          // Register as user only
          await register(formData.name, formData.email, formData.password);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      dispatch({ type: "LOGIN_FAILURE", payload: "Authentication failed" });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) return { label: "Weak", color: "text-red-500" };
    if (strength === 2 || strength === 3)
      return { label: "Medium", color: "text-yellow-500" };
    return { label: "Strong", color: "text-green-500" };
  };
  const strength = getPasswordStrength(formData.password);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <UserIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
            {isLogin ? "Welcome Back!" : "Join DevElevate"}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin
              ? "Sign in to continue your learning journey"
              : "Create a user account to start learning"}
          </p>
        </div>

        {state.error && (
          <div className="flex items-center p-3 mb-4 space-x-2 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-700 dark:text-red-400">
              {state.error}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email/Password + OTP Flow */}
          <>
            {!isLogin && !state.otpPending && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {!state.otpPending && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    pattern="^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com|hotmail\.com|icloud\.com|protonmail\.com|aol\.com)$"
                    title="Only gmail.com, outlook.com, yahoo.com, hotmail.com, icloud.com, protonmail.com, or aol.com emails are allowed"
                    className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
            )}

            {!state.otpPending && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onPaste={(e) => e.preventDefault()}
                    className="w-full py-3 pl-10 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {!isLogin && formData.password && (
                  <span
                    className={`mt-2 text-sm font-semibold ${strength.color}`}
                  >
                    Strength: {strength.label}
                  </span>
                )}
              </div>
            )}
            {!isLogin && (
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {state.otpPending
                    ? "Enter OTP sent to your email"
                    : "Confirm Password"}
                </label>
                {state.otpPending ? (
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        ref={(el) => (otpRefs.current[index] = el)}
                        className="w-12 h-12 text-lg text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                        required
                      />
                    ))}
                  </div>
                ) : (
                  <div className="relative">
                    <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onPaste={(e) => e.preventDefault()}
                      className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Confirm your password"
                      required={!isLogin}
                    />
                  </div>
                )}
              </div>
            )}

            {isLogin && (
              <div className="absolute top-0 right-1 w-full max-w-sm mx-auto h-60">
                {/* Swing wrapper (everything inside sways) */}
                <div className="relative animate-sway">
                  {/* Right rope */}
                  <div className="right-10 top-0 flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-slate-500 shadow-md border border-slate-300"></div>
                    <div className="w-1 h-20 bg-gradient-to-b from-amber-200 to-amber-600 rounded-full shadow-sm"></div>
                  </div>

                  {/* Hanging card */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 top-10 w-80 p-4 rounded-2xl border border-slate-600/40 
          bg-slate-800/40 backdrop-blur-md shadow-2xl"
                  >
                    <p className="mb-2 text-xs text-center text-slate-400 tracking-wide">
                      🔑 Admin Credentials
                    </p>
                    <p className="text-sm text-center text-slate-200 font-mono">
                      Email:{" "}
                      <span className="text-amber-300">
                        officialdevelevate@gmail.com
                      </span>
                    </p>
                    <p className="text-sm text-center text-slate-200 font-mono">
                      Password:{" "}
                      <span className="text-amber-300">Develevate@2025</span>
                    </p>
                  </div>
                </div>

                {/* Shadow under everything */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 top-[11rem] w-72 h-3 rounded-full blur-md opacity-25"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0.35), rgba(0,0,0,0))",
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              disabled={state.isLoading}
              className="flex items-center justify-center w-full py-3 space-x-2 font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {state.isLoading ? (
                <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" />
              ) : (
                <>
                  {isLogin ? (
                    <LogIn className="w-5 h-5" />
                  ) : (
                    <UserPlus className="w-5 h-5" />
                  )}
                  <span>
                    {isLogin
                      ? "Sign In"
                      : state.otpPending
                      ? "Verify OTP"
                      : "Create User Account"}
                  </span>
                </>
              )}
            </button>
          </>

          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <button
              type="button"
              onClick={handleGoogleAuth}
              className="w-full h-12 px-4 inline-flex items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm transition-all hover:shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white"
              disabled={state.isLoading}
            >
              {state.isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-900 rounded-full animate-spin border-t-transparent" />
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" aria-hidden>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.94 0 6.63 1.7 8.15 3.13l5.56-5.56C34.7 3.4 29.82 1.5 24 1.5 14.64 1.5 6.54 6.98 2.98 14.76l6.86 5.32C11.48 14.47 17.18 9.5 24 9.5z"
                    />
                    <path
                      fill="#34A853"
                      d="M46.5 24c0-1.64-.15-2.84-.47-4.08H24v7.73h12.75c-.26 1.93-1.67 4.84-4.81 6.79l7.38 5.72C43.7 36.8 46.5 30.9 46.5 24z"
                    />
                    <path
                      fill="#4A90E2"
                      d="M9.84 28.62A14.48 14.48 0 0 1 9 24c0-1.61.27-3.16.76-4.62L2.9 14.06C1.65 16.73 1 19.58 1 22.5S1.65 28.27 2.9 30.94l6.94-2.32z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M24 46.5c6.48 0 11.92-2.14 15.89-5.84l-7.38-5.72c-2.04 1.37-4.78 2.33-8.51 2.33-6.82 0-12.52-4.97-14.16-11.58l-6.86 5.32C6.54 41.02 14.64 46.5 24 46.5z"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    Continue with Google
                  </span>
                </>
              )}
            </button>
            <p className="text-sm text-center text-gray-500">
              Use your Google account to {isLogin ? "sign in" : "sign up"}{" "}
              quickly.
            </p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 font-semibold text-blue-500 hover:text-blue-600"
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
          {!isLogin && (
            <p className="mt-2 text-sm text-gray-500">
              Note: Only user accounts can be created. Admin access is
              restricted.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
