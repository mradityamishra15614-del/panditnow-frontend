import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { saveUser } from "../utils/auth";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function CustomerSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ===============================
  // NORMAL SIGNUP
  // ===============================
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axiosInstance.post("/api/auth/customer/signup", {
        name,
        phone,
        email,
        password,
      });

      const token = res.data.token;
      const customer = res.data.customer;

      saveUser(token, customer, "customer");

      setMessage("Signup successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed ❌");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GOOGLE SIGNUP
  // ===============================
  const handleGoogleSignup = async () => {
    setLoading(true);
    setMessage("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const res = await axiosInstance.post("/api/auth/customer/google", {
        name: user.displayName,
        email: user.email,
      });

      const token = res.data.token;
      const customer = res.data.customer;

      saveUser(token, customer, "customer");

      setMessage("Google Login Successful! Redirecting...");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      console.log(error.response?.data || error.message);
      setMessage("Google Signup Failed ❌");
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
          Create Your Account 🛕
        </h2>

        {/* Google Button */}
        <button
          onClick={handleGoogleSignup}
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

        {/* Signup Form */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Signing up..." : "Signup"}
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
          Already have an account?{" "}
          <Link to="/customer/login" style={{ color: "#ff6600" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

// Reusable Input Style
const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

export default CustomerSignup;