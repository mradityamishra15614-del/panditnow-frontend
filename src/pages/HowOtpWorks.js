import React from "react";
import { useNavigate } from "react-router-dom";

function HowOtpWorks() {
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
How OTP Verification Works </h1>

```
    <p style={{ fontSize: "17px", lineHeight: "28px" }}>
      At PanditNow, your safety and transparency come first.
      That is why we use an OTP-based security system before the puja begins.
    </p>

    <hr style={{ margin: "25px 0" }} />

    <h2 style={{ marginBottom: "10px" }}>How OTP Security Works</h2>

    <p style={{ lineHeight: "26px" }}>
      📍 <b>1. Pandit Arrives at Your Location</b> <br />
      Once the pandit reaches your address in Patna, your booking status changes to "Arrived".
    </p>

    <p style={{ lineHeight: "26px", marginTop: "15px" }}>
      💳 <b>2. You Complete Payment</b> <br />
      After confirming arrival, you pay through a secure payment gateway.
    </p>

    <p style={{ lineHeight: "26px", marginTop: "15px" }}>
      🔐 <b>3. Unique OTP Is Generated</b> <br />
      After successful payment, a one-time password (OTP) is generated on your dashboard.
    </p>

    <p style={{ lineHeight: "26px", marginTop: "15px" }}>
      🛕 <b>4. Puja Starts Only After OTP Verification</b> <br />
      You share the OTP with the pandit. Only after entering the correct OTP,
      the puja officially starts.
    </p>

    <hr style={{ margin: "25px 0" }} />

    <h2>Why OTP System Is Important?</h2>

    <ul style={{ lineHeight: "28px" }}>
      <li>✔ Prevents fake start confirmation</li>
      <li>✔ Ensures pandit is physically present</li>
      <li>✔ Protects customer payment</li>
      <li>✔ Adds professional transparency</li>
      <li>✔ Builds trust between customer and pandit</li>
    </ul>

    <hr style={{ margin: "25px 0" }} />

    <h2>Important Instructions</h2>

    <p style={{ lineHeight: "26px" }}>
      • Never share OTP with anyone except the pandit present at your location. <br />
      • OTP works only once. <br />
      • Without OTP verification, puja cannot start.
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
        Book Secure Puja Now 🚀
      </button>
    </div>
  </div>
</div>


);
}

export default HowOtpWorks;
