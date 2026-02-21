import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { saveUser } from "../utils/auth";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function CustomerLogin() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // ==========================
  // NORMAL LOGIN
  // ==========================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/api/auth/customer/login", {
        phone,
        password,
      });

      saveUser(res.data.token, res.data.customer, "customer");

      setMessage("Login successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // GOOGLE LOGIN
  // ==========================
  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await axiosInstance.post("/api/auth/customer/google", {
        name: user.displayName,
        email: user.email,
      });

      saveUser(res.data.token, res.data.customer, "customer");

      setMessage("Google Login Successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.log(error);
      setMessage("Google Login Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #ff9933, #ff6600)",
        padding: "15px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "35px",
          borderRadius: "15px",
          background: "white",
          boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Welcome Back 🛕
        </h2>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            background: "#fff",
            cursor: "pointer",
            fontSize: "15px",
            marginBottom: "15px",
            fontWeight: "bold",
            opacity: loading ? 0.6 : 1,
          }}
        >
          🔥 Continue with Google
        </button>

        <p style={{ textAlign: "center", marginBottom: "15px", color: "#999" }}>
          OR
        </p>

        {/* Normal Login */}
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: "#ff6600",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
              opacity: loading ? 0.6 : 1,
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: message.includes("successful") ? "green" : "red",
              fontWeight: "bold",
            }}
          >
            {message}
          </p>
        )}

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          New user?{" "}
          <Link to="/customer/signup" style={{ color: "#ff6600" }}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default CustomerLogin;