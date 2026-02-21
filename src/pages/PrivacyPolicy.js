import React from "react";

function PrivacyPolicy() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Privacy Policy</h1>

      <p>
        PanditNow respects your privacy. This Privacy Policy explains how we
        collect, use, and protect your information.
      </p>

      <h3>1. Information We Collect</h3>
      <ul>
        <li>Name, phone number, email</li>
        <li>Address and location details</li>
        <li>Booking details</li>
        <li>Pandit verification documents (for internal verification only)</li>
      </ul>

      <h3>2. How We Use Information</h3>
      <ul>
        <li>To process bookings</li>
        <li>To match customers with verified pandits</li>
        <li>To improve our services</li>
        <li>To ensure security and prevent fraud</li>
      </ul>

      <h3>3. Data Security</h3>
      <p>
        We use secure servers and encryption to protect your data. We do not
        share personal information with third parties except as required for
        service fulfillment or legal compliance.
      </p>

      <h3>4. Payment Security</h3>
      <p>
        All payments are processed securely via Razorpay. We do not store card
        details on our servers.
      </p>

      <h3>5. Contact</h3>
      <p>
        For privacy concerns, contact us at: support@panditnow.in
      </p>
    </div>
  );
}

export default PrivacyPolicy;