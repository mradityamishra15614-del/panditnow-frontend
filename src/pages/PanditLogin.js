import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import { saveUser } from "../utils/auth";

function PanditLogin() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await API.post("/api/auth/pandit/login", {
        phone,
        password,
      });

      // ✅ Save properly using common system
      saveUser(response.data.token, response.data.pandit, "pandit");

      alert("Pandit Login Successful ✅");

      navigate("/pandit/dashboard");
      window.location.reload();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h1 style={{ fontSize: "40px" }}>Pandit Login 🛕</h1>
      <p style={{ fontSize: "18px", color: "gray" }}>
        Login to view booking requests
      </p>

      <div
        style={{
          width: "420px",
          margin: "auto",
          marginTop: "30px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
          backgroundColor: "white",
        }}
      >
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "orange",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Login
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          New Pandit? <Link to="/pandit/signup">Signup here</Link>
        </p>
      </div>
    </div>
  );
}

export default PanditLogin;
