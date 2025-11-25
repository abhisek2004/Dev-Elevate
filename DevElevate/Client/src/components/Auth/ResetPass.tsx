import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ChevronLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

interface ResetPasswordResponse {
  success: boolean;
  message: string;
}

const ResetPass: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    newPassword: "",
    confirmPassword: "",
  });
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { resetToken } = useParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const { newPassword, confirmPassword } = formData;

    if (newPassword.length < 6) {
      alert("Password must be at least 6 characters!");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Password Doesn't Match");
      return;
    }

    const res = await axios.post<ResetPasswordResponse>(
      `${
        import.meta.env.VITE_API_URL
      }/api/v1/auth/reset-password/${resetToken}`,
      { password: newPassword }
    );
    if (res.data.success) {
      toast.success("Password Reset Successfully!");
      setLoading(false);
      navigate("/login");
    } else {
      toast.error("Failed to Reset Password!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        {/* Back to Login */}
        <div
          className="flex items-center mb-6 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <ChevronLeft className="text-white" />
          <span className="text-white text-sm ml-1">Back to Login</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 pr-10 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
            <div
              className="absolute right-3 top-3 cursor-pointer text-gray-400"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPass;
