import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, ChevronLeft } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface ForgotPasswordResponse {
  success: boolean;
  message: string;
}

const ForgotPass: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      alert("Email is required");
      return;
    }

    const res = await axios.post<ForgotPasswordResponse>(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`,
      { email }
    );
    if (res.data.success) {
      toast.success("Email sent Successfully!");
      setLoading(false);
    } else {
      toast.error("Failed to send Email!");
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
          Forgot Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg text-white font-semibold hover:opacity-90 transition"
          >
            {loading ? "Sending Email..." : "Submit"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPass;
