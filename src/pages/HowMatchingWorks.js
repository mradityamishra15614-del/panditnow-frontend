import React from "react";
import { useNavigate } from "react-router-dom";

function HowMatchingWorks() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px 20px", background: "#f9f9f9", minHeight: "100vh" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "orange", marginBottom: "20px" }}>
          How Instant Matching Works
        </h1>

        <p style={{ fontSize: "17px", lineHeight: "28px" }}>
          Once you complete your booking details in Patna, PanditNow instantly
          starts finding the nearest verified pandit available for your selected
          puja.
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h2 style={{ marginBottom: "10px" }}>Step-by-Step Matching Process</h2>

        <p style={{ lineHeight: "26px" }}>
          🔔 <b>1. Verified Pandits Get Notified</b> <br />
          Only background-checked and verified pandits in your selected city
          (Patna) receive the booking request.
        </p>

        <p style={{ lineHeight: "26px", marginTop: "15px" }}>
          📍 <b>2. Nearest Pandit Is Selected</b> <br />
          Our system automatically checks which pandit is closest to your
          selected location using smart distance calculation.
        </p>

        <p style={{ lineHeight: "26px", marginTop: "15px" }}>
          ⚡ <b>3. Instant Acceptance</b> <br />
          Available pandits can instantly accept the booking from their
          dashboard.
        </p>

        <p style={{ lineHeight: "26px", marginTop: "15px" }}>
          📲 <b>4. You Get Live Status Update</b> <br />
          As soon as pandit accepts your booking, your dashboard updates
          automatically.
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h2 style={{ marginBottom: "10px" }}>Why This Is Better Than Traditional Booking?</h2>

        <ul style={{ lineHeight: "28px" }}>
          <li>✔ No calling multiple pandits manually</li>
          <li>✔ No price negotiation</li>
          <li>✔ No waiting for confirmation</li>
          <li>✔ Transparent fixed pricing</li>
          <li>✔ Fast & secure system</li>
        </ul>

        <hr style={{ margin: "25px 0" }} />

        <h2>Important Things to Remember</h2>

        <p style={{ lineHeight: "26px" }}>
          • Matching works only within Patna (currently). <br />
          • Pandit must be marked available. <br />
          • Booking details must be correct for smooth matching.
        </p>

        <div style={{ textAlign: "center", marginTop: "35px" }}>
          <button
            onClick={() => navigate("/booking")}
            style={{
              padding: "14px 25px",
              background: "orange",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Book Pandit Now 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowMatchingWorks;