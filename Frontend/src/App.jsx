import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./App.css";

const API = "http://localhost:8080/api/auth";

function LoginPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      setMessage("Logging in with Google...");

      const response = await axios.post(
        `${API}/google`,
        { token: credentialResponse.credential },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setMessage("Google login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Login error:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Google Login failed. Check backend."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = (e) => {
    e.preventDefault();
    setMessage("Email login endpoint needs to be configured in the backend.");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("Sending OTP...");
      const response = await axios.post(`${API}/send-otp`, { email: otpEmail });
      setMessage(response.data.message || "OTP request completed.");
    } catch (error) {
      console.error("Send OTP error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "OTP request failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage("Verifying OTP...");
      const response = await axios.post(`${API}/verify-otp`, {
        email: otpEmail,
        otp,
      });
      setMessage(response.data.message || "OTP verification completed.");
    } catch (error) {
      console.error("OTP verification error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setMessage(`${provider} login needs its OAuth configuration and backend route.`);
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1 className="auth-title">AuthLab</h1>

        <div className="social-buttons">
          <div className="google-btn">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => setMessage("Google authentication failed.")}
              text="signin_with"
              theme="outline"
              size="large"
              shape="rectangular"
              width={350}
            />
          </div>

          <button type="button" className="social-btn github-btn"
            onClick={() => handleSocialLogin("GitHub")}>
            ◉ GitHub Login
          </button>

          <button type="button" className="social-btn facebook-btn"
            onClick={() => handleSocialLogin("Facebook")}>
            f Facebook Login
          </button>

          <button type="button" className="social-btn linkedin-btn"
            onClick={() => handleSocialLogin("LinkedIn")}>
            in LinkedIn Login
          </button>
        </div>

        <hr className="auth-divider" />
        <h2 className="section-title">Login</h2>

        <form className="auth-form" onSubmit={handleEmailLogin}>
          <input className="auth-input" type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="auth-input" type="password" placeholder="Password"
            autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="auth-submit" type="submit" disabled={loading}>
            Login
          </button>
        </form>

        <a className="forgot-link" href="/forgot-password"
          onClick={(e) => {
            e.preventDefault();
            setMessage("Forgot Password page needs to be configured.");
          }}>
          Forgot Password
        </a>

        <hr className="auth-divider" />
        <h2 className="section-title">Register with OTP</h2>

        <form className="auth-form" onSubmit={handleSendOtp}>
          <input className="auth-input" type="email" placeholder="Email"
            value={otpEmail} onChange={(e) => setOtpEmail(e.target.value)} required />
          <button className="auth-submit" type="submit" disabled={loading}>
            Send OTP
          </button>
        </form>

        <form className="auth-form" onSubmit={handleVerifyOtp}>
          <input className="auth-input" type="text" placeholder="Enter OTP"
            value={otp} onChange={(e) => setOtp(e.target.value)} required />
          <button className="auth-submit" type="submit" disabled={loading}>
            Verify OTP
          </button>
        </form>

        {message && <p className="auth-message" role="status">{message}</p>}
      </section>
    </main>
  );
}

function ProtectedDashboard() {
  const token = localStorage.getItem("token");
  return token ? <Dashboard /> : <Navigate to="/" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;