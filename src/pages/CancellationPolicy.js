import React from "react";

function CancellationPolicy() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>Cancellation & Refund Policy</h1>

      <h3>1. Cancellation Before Arrival</h3>
      <p>
        Customers may cancel a booking before the pandit arrives at the location.
      </p>

      <h3>2. Cancellation After Arrival</h3>
      <p>
        Cancellation is not allowed once the pandit has arrived at the
        customer's location.
      </p>

      <h3>3. Refund Policy</h3>
      <p>
        Refunds (if applicable) will be processed within 5-7 working days via
        the original payment method.
      </p>

      <h3>4. Misconduct Clause</h3>
      <p>
        Any harm or misconduct toward pandits may result in legal action and
        permanent account suspension.
      </p>
    </div>
  );
}

export default CancellationPolicy;