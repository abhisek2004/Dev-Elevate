// LoginRegister.tsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Shield,
  Mail,
  Lock,
  UserPlus,
  LogIn,
  AlertCircle,
} from "lucide-react";
import axios from "axios";

const LoginRegister: React.FC = () => {
  const { state, login, register, dispatch } = useAuth();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [step, setStep] = useState<1 | 2>(1);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state.isAuthenticated && state.user) {
      navigate(state.user.role === "admin" ? "/admin" : "/");
    }
  }, [state.isAuthenticated, state.user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "CLEAR_ERROR" });

    if (!isLogin && formData.password !== formData.confirmPassword) {
      const err = "Passwords do not match";
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      setMessage(err);
      return;
    }

    try {
      if (isLogin) {
        await login(formData.email, formData.password, role);
      } else {
        if (step === 1) {
          const res = await axios.post("http://localhost:5000/api/send-otp", {
            email: formData.email,
          });
          if (res.data.success) {
            setMessage("OTP sent to your email");
            setStep(2);
          } else {
            throw new Error(res.data.message || "Failed to send OTP");
          }
        } else if (step === 2) {
          const res = await axios.post("http://localhost:5000/api/verify-otp", {
            email: formData.email,
            otp,
          });
          if (res.data.success) {
            await register(
              formData.name,
              formData.email,
              formData.password,
              role
            );
            setMessage("Registration successful");
            setOtp("");
            setStep(1);
          } else {
            throw new Error(res.data.message || "OTP verification failed");
          }
        }
      }
    } catch (error: any) {
      const errMsg = error.response?.data?.error || error.message || "Something went wrong";
      dispatch({ type: "LOGIN_FAILURE", payload: errMsg });
      setMessage(errMsg);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl dark:bg-gray-800 rounded-2xl">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
            <User className="w-8 h-8 text-white" />
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

        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Select Role
          </label>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              { label: "User", icon: <User size={25} />, value: "user" },
              { label: "Admin", icon: <Shield size={25} />, value: "admin" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setRole(option.value as "user" | "admin")}
                className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl border-2 transition-all duration-200 ${
                  role === option.value
                    ? `border-${option.value === "user" ? "blue" : "purple"}-500 bg-${option.value === "user" ? "blue" : "purple"}-100 dark:bg-${option.value === "user" ? "blue" : "purple"}-900/20`
                    : "border-gray-300 dark:border-gray-700 hover:border-blue-400"
                }`}
              >
                {option.icon}
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {option.label}
                </span>
              </button>
            ))}
          </div>
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
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full py-3 pl-10 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {!isLogin && formData.password && (
              <span className={`mt-2 text-sm font-semibold ${strength.color}`}>
                Strength: {strength.label}
              </span>
            )}
          </div>

          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full py-3 pl-10 pr-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          )}

          {!isLogin && step === 2 && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                OTP
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full py-3 px-4 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter the OTP sent to your email"
                  required
                />
              </div>
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
                {isLogin ? <LogIn className="w-5 h-5" /> : <UserPlus className="w-5 h-5" />}
                <span>{isLogin ? "Sign In" : step === 1 ? "Send OTP" : "Verify OTP & Register"}</span>
              </>
            )}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-sm font-medium text-center text-blue-600 dark:text-blue-400">
            {message}
          </p>
        )}

        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setStep(1);
                setMessage("");
              }}
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
