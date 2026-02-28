import ramMandir from "../assets/ram-mandir.jpg";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../utils/auth";
import Booking from "./Booking";
import axiosInstance from "../api/axiosInstance";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const user = getUser();
  const bookingRef = useRef(null);

  const [reviews, setReviews] = useState([]);

  // ================= FETCH REVIEWS =================
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get("/api/reviews");
        setReviews(res.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Handle Book Now Click
  const handleBookNow = () => {
    if (!user) {
      navigate("/customer/login");
      return;
    }

    bookingRef.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="landing-container">

      {/* ================= HERO SECTION ================= */}
      <section className="hero-section"
      style={{
    backgroundImage: `url(${ramMandir})`,
  }}
      
      >
        <div className="hero-content">
         <h1>
  Book Verified Pandit at Home <br />
  <span>Now Available in Patna 🛕</span>
</h1>
<p>Currently Serving Patna | More Cities Coming Soon</p>

<p style={{ marginTop: "10px", fontWeight: "bold", color: "#ff5722" }}>
  Same Day Puja Booking Available in Patna
</p>


<p className="mantra">
  यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। <br />
  अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥
</p>

<p className="hero-subtext">
  Transparent Pricing • OTP Secured • Instant Matching • No Hidden Charges
</p>

          <button className="cta-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </section>

      {/* ================= BOOKING FORM ================= */}
      <section ref={bookingRef} className="home-booking-section">
        <div className="section-inner">
          <h2>Quick Booking</h2>
          <Booking />
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-section">
        <div className="section-inner">
          <h2>How PanditNow Works</h2>

          <div className="how-grid">
            <div className="how-card">
              <h3>1️⃣ Enter Details</h3>
              <p>Choose puja type, date, time and location.</p>
            </div>

            <div className="how-card">
              <h3>2️⃣ Instant Matching</h3>
              <p>Nearest verified pandit gets notified instantly.</p>
            </div>

            <div className="how-card">
              <h3>3️⃣ OTP Secure Start</h3>
              <p>Puja begins only after secure OTP verification.</p>
            </div>

            <div className="how-card">
              <h3>4️⃣ Puja Completed</h3>
              <p>Rate your pandit & enjoy peaceful experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="why-section">
        <div className="section-inner">
          <h2>Why Choose PanditNow?</h2>

          <div className="why-grid">
            <div>✔ Verified & Background Checked Pandits</div>
            <div>✔ Transparent Fixed Pricing</div>
            <div>✔ Live Booking Status Tracking</div>
            <div>✔ OTP Based Security</div>
            <div>✔ Replacement Guarantee</div>
            <div>✔ Easy Cancellation</div>
          </div>
        </div>
      </section>

      {/* ================= COMPARISON ================= */}
      <section className="comparison-section">
        <div className="section-inner">
          <h2>Traditional vs PanditNow</h2>

          <div className="comparison-table">
            <div className="table-row header">
              <div>Traditional</div>
              <div>PanditNow</div>
            </div>

            <div className="table-row">
              <div>Unverified Pandits</div>
              <div>Verified & Rated Pandits</div>
            </div>

            <div className="table-row">
              <div>Price Negotiation</div>
              <div>Fixed Transparent Pricing</div>
            </div>

            <div className="table-row">
              <div>No Security</div>
              <div>OTP Secured Booking</div>
            </div>

            <div className="table-row">
              <div>No Tracking</div>
              <div>Live Status Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= REVIEWS ================= */}
      <section className="review-section">
        <div className="section-inner">
          <h2>What Our Customers Say</h2>

          <div className="review-grid">

            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div className="review-card" key={review._id}>
                  <p>"{review.comment}"</p>
                  <h4>
                    – {review.customer?.name} ⭐{" "}
                    {"★".repeat(review.rating)}
                  </h4>
                </div>
              ))
            ) : (
              <>
                {/* Fallback static reviews (if no DB review exists) */}
                <div className="review-card">
                  <p>"Very smooth booking process. Pandit arrived on time."</p>
                  <h4>– Rajesh Kumar ⭐⭐⭐⭐⭐</h4>
                </div>

                <div className="review-card">
                  <p>"Transparent pricing. No last minute negotiation."</p>
                  <h4>– Anjali Singh ⭐⭐⭐⭐⭐</h4>
                </div>

                <div className="review-card">
                  <p>"OTP security made it very professional."</p>
                  <h4>– Mohit Sharma ⭐⭐⭐⭐⭐</h4>
                </div>
              </>
            )}

          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="final-cta">
        <div className="section-inner">
          <h2>Ready to Book a Verified Pandit in Patna?</h2>

          <button className="cta-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>
      </section>

    </div>
    
  );
}

export default Home;