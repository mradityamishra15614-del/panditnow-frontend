import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { getUser, getRole, getToken, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const admin = getUser();
  const role = getRole();
  const token = getToken();

  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Redirect if not admin
  useEffect(() => {
    if (!admin?._id || role !== "admin" || !token) {
      navigate("/admin/login");
    }
  }, [admin, role, token, navigate]);

  // ✅ Fetch Pandits
  const fetchPandits = useCallback(async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/admin/pandits", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPandits(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to fetch pandits ❌");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchPandits();
    }
  }, [fetchPandits, token]);

  // ✅ Verify Pandit
  const verifyPandit = async (panditId) => {
    try {
      await API.put(
        `/api/admin/pandits/${panditId}/verify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pandit Verified ✅");
      fetchPandits();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Verification Failed ❌");
    }
  };

  // ✅ Unverify Pandit
  const unverifyPandit = async (panditId) => {
    try {
      await API.put(
        `/api/admin/pandits/${panditId}/unverify`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pandit Unverified ❌");
      fetchPandits();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Unverify Failed ❌");
    }
  };

  // ✅ Logout
  const handleLogout = () => {
    logoutUser();
    alert("Admin Logged out ✅");
    navigate("/admin/login");
  };

  return (
    <div style={{ padding: "30px", background: "#f4f4f4", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "1100px",
          margin: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "orange" }}>
          Admin Dashboard 👑
        </h1>

        <p style={{ textAlign: "center", marginTop: "8px", color: "gray" }}>
          Logged in as: <b>{admin?.email}</b>
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={fetchPandits}
            style={{
              padding: "10px 18px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Refresh 🔄
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 18px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Pandits List */}
      <div style={{ maxWidth: "1100px", margin: "auto", marginTop: "30px" }}>
        {loading ? (
          <h2 style={{ textAlign: "center" }}>Loading Pandits...</h2>
        ) : pandits.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "gray" }}>
            No Pandits Found ❌
          </h2>
        ) : (
          pandits.map((pandit) => (
            <div
              key={pandit._id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2 style={{ marginBottom: "10px" }}>
                {pandit.name}{" "}
                {pandit.verification?.isVerified ? (
                  <span style={{ color: "green", fontSize: "16px" }}>
                    ✅ Verified
                  </span>
                ) : (
                  <span style={{ color: "red", fontSize: "16px" }}>
                    ❌ Not Verified
                  </span>
                )}
              </h2>

              <p>
                📞 <b>Phone:</b> {pandit.phone}
              </p>

              <p>
                📍 <b>City:</b> {pandit.location?.city || "Not Set"}
              </p>

              <p>
                🛕 <b>Temple:</b> {pandit.templeName || "Not Mentioned"}
              </p>

              <p>
                🟢 <b>Available:</b> {pandit.isAvailable ? "Yes" : "No"}
              </p>

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                {!pandit.verification?.isVerified ? (
                  <button
                    onClick={() => verifyPandit(pandit._id)}
                    style={{
                      padding: "10px 15px",
                      background: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Verify ✅
                  </button>
                ) : (
                  <button
                    onClick={() => unverifyPandit(pandit._id)}
                    style={{
                      padding: "10px 15px",
                      background: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Unverify ❌
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
