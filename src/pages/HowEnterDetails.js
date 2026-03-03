import React from "react";

function HowEnterDetails() {
  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto", lineHeight: "1.7" }}>
      <h1 style={{ marginBottom: "20px" }}>
        How to Enter Booking Details on PanditNow
      </h1>

      <p style={{ marginBottom: "20px" }}>
        Booking a pandit in Patna through PanditNow is simple and secure.
        Follow these steps carefully to ensure fast and smooth matching.
      </p>

      <h3>1️⃣ Select Your City</h3>
      <p>
        Currently, PanditNow services are available in <b>Patna</b>.
        Please select Patna as your city to continue booking.
      </p>

      <h3>2️⃣ Select Puja Type</h3>
      <p>
        Choose the puja you want to perform such as Griha Pravesh,
        Satyanarayan Katha, Lakshmi Puja, Mundan, or any other available puja.
      </p>

      <h3>3️⃣ Choose Date and Time</h3>
      <p>
        Select your preferred date and time for the puja.
        Please note that bookings are not allowed after <b>9:00 PM</b>.
        Choose a suitable time slot for smooth coordination.
      </p>

      <h3>4️⃣ Enter Complete Address in Patna</h3>
      <p>
        Provide your full and correct address such as
        <b> Boring Road, Kankarbagh, Rajendra Nagar, Bailey Road</b>, etc.
        Accurate address helps us match the nearest verified pandit quickly.
      </p>

      <h3>5️⃣ Choose Location on Map</h3>
      <p>
        If you are currently at the exact location where the puja will be performed,
        click <b>"Use My Location"</b>.
      </p>

      <p>
        Otherwise, you can manually select your location on the map.
        You can zoom in and zoom out using the <b>+ and − buttons</b> shown on the map.
        After selecting the correct location, confirm it.
      </p>

      <h3>6️⃣ Click "Book Now"</h3>
      <p>
        Once all details are entered correctly, click <b>Book Now</b>.
        Instantly, the system will start searching for the nearest available
        verified pandit in Patna.
      </p>

      <p style={{ marginTop: "20px", fontWeight: "bold", color: "green" }}>
        ✔ Enter correct details to get faster confirmation and smooth puja experience.
      </p>
    </div>
  );
}

export default HowEnterDetails;