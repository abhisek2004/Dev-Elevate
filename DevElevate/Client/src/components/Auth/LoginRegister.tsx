import React, { useState, useEffect } from "react";
import { useAuth, User } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { baseUrl } from "../../config/routes";
import {
  Eye,
  EyeOff,
  User as UserIcon,
  Shield,
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
  const [role, setRole] = useState<"user" | "admin">("user");
  const [authMethod, setAuthMethod] = useState<"email" | "google">("email");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("");

  useEffect(() => {
    console.log("LoginRegister useEffect - state.user:", state.user);
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

      // Prepare minimal user data for backend
      const userPayload = {
        name: firebaseUser.displayName || "",
        email: firebaseUser.email || "",
        password: "",
        role: role,
      };
      console.log("user payload", userPayload);
      // Send to backend and get the response
      const response = await fetch(`${baseUrl}/api/v1/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userPayload),
      });

      const data = await response.json();

      if (response.ok && data.user && data.token) {
        // Map backend user to your app's User type (same as in AuthContext)
        const user: User = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.name}`,
          bio:
            data.user.role === "admin"
              ? "System Administrator"
              : "DevElevate User",
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

        // Redirect based on role
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

    if (!isLogin && formData.password !== formData.confirmPassword) {
      dispatch({ type: "LOGIN_FAILURE", payload: "Passwords do not match" });
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password, role);
      } else {
        if (state.otpPending) {
          await verifySignupOtp(state.pendingEmail || formData.email, otp);
        } else {
          await register(formData.name, formData.email, formData.password, role);
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  {
    /*Password strength login */
  }
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900 via-black to-blue-900 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl dark:bg-gray-800 rounded-2xl">
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
              : "Start your learning journey today"}
          </p>
        </div>

        {/* Role Toggle */}
        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Role
          </label>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* User Button */}
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex flex-col items-center justify-center gap-1  px-3 py-2  rounded-xl border-2 transition-all duration-200 ${
                role === "user"
                  ? "border-blue-500 bg-blue-100 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-700 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center justify-center gap-3 ">
                <UserIcon size={25} className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  User
                </span>
              </div>
            </button>

            {/* Admin Button */}
            <button
              type="button"
              onClick={() => setRole("admin")}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                role === "admin"
                  ? "border-purple-500 bg-purple-100 dark:bg-purple-900/20"
                  : "border-gray-300 dark:border-gray-700 hover:border-purple-400"
              }`}
            >
              <div className="flex items-center justify-center gap-3">
                <Shield size={25} className="text-purple-600 " />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  Admin
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Error Message */}
        {state.error && (
          <div className="flex items-center p-3 mb-4 space-x-2 border border-red-200 rounded-lg bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-sm text-red-700 dark:text-red-400">
              {state.error}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Authentication method tabs */}
          <div className="flex justify-center mb-6 ">
            <button
              type="button"
              onClick={() => setAuthMethod("email")}
              className={`px-4 py-2 flex items-center font-semibold rounded-tl-lg rounded-bl-lg transition-all duration-200
              ${
                authMethod === "email"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-purple-100 text-blue-500 border border-blue-500 hover:bg-blue-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              Email
            </button>
            <button
              type="button"
              onClick={() => setAuthMethod("google")}
              className={`px-4 py-2 flex items-center font-semibold rounded-tr-lg rounded-br-lg transition-all duration-200
              ${
                authMethod === "google"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "bg-purple-100 text-blue-500 border border-blue-500 hover:bg-blue-50"
              }`}
            >
              <svg className="w-5 h-5 mr-1" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
                />
              </svg>
              Google
            </button>
          </div>

          {/* Email/Password + OTP Flow */}
          {authMethod === "email" && (
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
                    {state.otpPending ? "Enter OTP sent to your email" : "Confirm Password"}
                  </label>
                  {state.otpPending ? (
                    <div className="relative">
                      <input
                        type="text"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full py-3 pl-4 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white tracking-widest"
                        placeholder="Enter 6-digit OTP"
                        required
                      />
                    </div>
                  ) : (
                    <div className="relative">
                      <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Confirm your password"
                        required={!isLogin}
                      />
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={state.isLoading}
                className="flex items-center justify-center w-full py-3 space-x-2 font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {state.isLoading ? (
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
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
                        : "Create Account"}
                    </span>
                  </>
                )}
              </button>
            </>
          )}

          {/* Google Auth */}
          {authMethod === "google" && (
            <div className="flex flex-col items-center space-y-4">
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="flex items-center justify-center w-full py-3 space-x-2 font-semibold text-white transition-all duration-200 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#fff"
                        d="M21.805 10.023h-9.18v3.955h5.266c-.227 1.2-1.37 3.52-5.266 3.52-3.17 0-5.75-2.62-5.75-5.84s2.58-5.84 5.75-5.84c1.81 0 3.03.77 3.73 1.43l2.55-2.48C17.09 3.67 15.13 2.7 12.625 2.7c-5.01 0-9.075 4.06-9.075 9.07s4.065 9.07 9.075 9.07c5.23 0 8.7-3.67 8.7-8.84 0-.59-.07-1.04-.17-1.48z"
                      />
                    </svg>
                    <span>
                      {isLogin ? "Sign in with Google" : "Sign up with Google"}
                    </span>
                  </>
                )}
              </button>
              <p className="text-sm text-center text-gray-500">
                {isLogin
                  ? "Sign in using your Google account."
                  : "Sign up using your Google account."}
              </p>
            </div>
          )}
        </form>

        {/* Toggle Form */}
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
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
