import { useState } from "react";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000/api"; // Change if needed

export default function OtpForm() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = email input, 2 = OTP input
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/send-otp`, { email });
      setMessage(res.data.message);
      setStep(2);
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/verify-otp`, { email, otp });
      setMessage(res.data.message);
      setStep(1);
      setEmail("");
      setOtp("");
    } catch (err: any) {
      setMessage(err.response?.data?.error || "OTP verification failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{step === 1 ? "Send OTP" : "Verify OTP"}</h2>

      {step === 1 ? (
        <>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button onClick={handleSendOtp} style={{ width: "100%", padding: "10px" }}>
            Send OTP
          </button>
        </>
      ) : (
        <>
          <p>OTP sent to <strong>{email}</strong></p>
          <label>Enter OTP:</label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button onClick={handleVerifyOtp} style={{ width: "100%", padding: "10px" }}>
            Verify OTP
          </button>
        </>
      )}

      {message && <p style={{ marginTop: "1rem", color: "blue" }}>{message}</p>}
    </div>
  );
}
