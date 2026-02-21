import React, { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function PremiumPandits() {
  const navigate = useNavigate();

  const [pandits, setPandits] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch verified pandits
  const fetchVerifiedPandits = async () => {
    try {
      setLoading(true);

      const res = await API.get("/api/pandits/verified");

      setPandits(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to fetch premium pandits ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifiedPandits();
  }, []);

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", padding: "30px" }}>
      <div style={{ maxWidth: "1100px", margin: "auto" }}>
        <h1 style={{ textAlign: "center", color: "orange" }}>
          Premium Pandits 🛕
        </h1>

        <p style={{ textAlign: "center", color: "gray", marginTop: "8px" }}>
          Book high profile verified pandits with fixed pricing
        </p>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <button
            onClick={() => navigate("/")}
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
            Book a Puja Now 🚀
          </button>
        </div>

        <div style={{ marginTop: "40px" }}>
          {loading ? (
            <h2 style={{ textAlign: "center" }}>Loading Premium Pandits...</h2>
          ) : pandits.length === 0 ? (
            <h2 style={{ textAlign: "center", color: "gray" }}>
              No Verified Pandits Available ❌
            </h2>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {pandits.map((pandit) => (
                <div
                  key={pandit._id}
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0px 0px 12px rgba(0,0,0,0.12)",
                  }}
                >
                  <h2 style={{ marginBottom: "6px" }}>{pandit.name}</h2>

                  {/* Verified Badge */}
                  <p style={{ color: "green", fontWeight: "bold" }}>
                    ✅ Verified Premium Pandit
                  </p>

                  <p style={{ marginTop: "10px" }}>
                    📍 <b>City:</b> {pandit.location?.city || "Not Set"}
                  </p>

                  <p>
                    🛕 <b>Temple:</b> {pandit.templeName || "Not Mentioned"}
                  </p>

                  <p>
                    📞 <b>Phone:</b> {pandit.phone}
                  </p>

                  <p>
                    🟢 <b>Available:</b>{" "}
                    {pandit.isAvailable ? "Yes" : "No"}
                  </p>

                  <h3 style={{ marginTop: "15px", color: "orange" }}>
                    Fixed Price: ₹1200
                  </h3>

                  <button
                    onClick={() => navigate("/")}
                    style={{
                      width: "100%",
                      marginTop: "15px",
                      padding: "12px",
                      background: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "15px",
                    }}
                  >
                    Book Now 🚀
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PremiumPandits;
