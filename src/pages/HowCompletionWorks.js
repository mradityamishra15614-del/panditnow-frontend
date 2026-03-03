import React from "react";
import { useNavigate } from "react-router-dom";

function HowCompletionWorks() {
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
          Puja Completion & Review Process 🎉
        </h1>

        <p style={{ fontSize: "17px", lineHeight: "28px" }}>
          Once the puja starts with OTP verification, the pandit performs the ritual
          professionally at your home in Patna.
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h2 style={{ marginBottom: "10px" }}>How Completion Works</h2>

        <p style={{ lineHeight: "26px" }}>
          🛕 <b>1. Puja Performed Successfully</b> <br />
          The pandit completes the puja according to traditional rituals and
          your selected puja type.
        </p>

        <p style={{ lineHeight: "26px", marginTop: "15px" }}>
          📲 <b>2. Status Updated to Completed</b> <br />
          After finishing, the pandit updates the booking status to “Completed”
          from their dashboard.
        </p>

        <p style={{ lineHeight: "26px", marginTop: "15px" }}>
          ⭐ <b>3. You Can Rate & Review</b> <br />
          After completion, you can give rating and feedback based on your
          experience.
        </p>

        <hr style={{ margin: "25px 0" }} />

        <h2>Why Review System Is Important?</h2>

        <ul style={{ lineHeight: "28px" }}>
          <li>✔ Helps other customers choose better</li>
          <li>✔ Maintains service quality</li>
          <li>✔ Encourages professional behavior</li>
          <li>✔ Builds transparent ecosystem</li>
          <li>✔ Keeps platform trustworthy</li>
        </ul>

        <hr style={{ margin: "25px 0" }} />

        <h2>Your Experience Matters</h2>

        <p style={{ lineHeight: "26px" }}>
          PanditNow believes in continuous improvement.  
          Your honest feedback helps us provide better service in Patna.
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
            Book Your Puja Now 🚀
          </button>
        </div>
      </div>
    </div>
  );
}

export default HowCompletionWorks;