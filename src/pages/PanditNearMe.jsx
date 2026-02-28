import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PanditNearMe = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "auto" }}>

      <Helmet>
        <title>Book Pandit Near Me | Same Day Puja Booking | PanditNow</title>
        <meta
          name="description"
          content="Looking for a pandit near you? Book verified pandits for Griha Pravesh, Satyanarayan Katha, Lakshmi Puja and more. Same day puja booking available with transparent pricing."
        />
        <link rel="canonical" href="https://www.panditnow.in/pandit-near-me" />
      </Helmet>

      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        Book Verified Pandit Near Me
      </h1>

      <p style={{ fontSize: "18px", marginBottom: "25px" }}>
        Searching for a trusted pandit near you? PanditNow helps you instantly
        book verified and experienced pandits for home puja with fixed pricing
        and secure booking.
      </p>

      <Link
        to="/booking"
        style={{
          backgroundColor: "#ff9800",
          color: "white",
          padding: "12px 25px",
          borderRadius: "6px",
          textDecoration: "none",
          fontWeight: "bold"
        }}
      >
        Book Pandit Now
      </Link>

      <h2 style={{ marginTop: "50px" }}>Same Day Pandit Booking Available</h2>
      <p>
        Need urgent puja services? Our instant matching system connects you
        with the nearest available pandit in your area. Same day booking
        available based on availability.
      </p>

      <h2 style={{ marginTop: "50px" }}>Popular Puja Services</h2>
      <ul style={{ lineHeight: "2", fontSize: "16px" }}>
        <li>Griha Pravesh Puja</li>
        <li>Satyanarayan Katha</li>
        <li>Lakshmi Puja</li>
        <li>Durga Saptashati Path</li>
        <li>Rudrabhishek</li>
        <li>Vastu Puja</li>
        <li>Marriage Puja</li>
      </ul>

      <h2 style={{ marginTop: "50px" }}>Why Choose PanditNow?</h2>
      <ul style={{ lineHeight: "2", fontSize: "16px" }}>
        <li>Verified & background checked pandits</li>
        <li>Transparent fixed pricing</li>
        <li>OTP secured booking</li>
        <li>No hidden charges</li>
        <li>Live booking updates</li>
      </ul>

      <h2 style={{ marginTop: "50px" }}>How It Works</h2>
      <ol style={{ lineHeight: "2", fontSize: "16px" }}>
        <li>Select Puja Type</li>
        <li>Choose Date & Time</li>
        <li>Enter Your Location</li>
        <li>Get Matched Instantly</li>
        <li>OTP Verified Start</li>
      </ol>

      <div style={{ marginTop: "50px", textAlign: "center" }}>
        <Link
          to="/booking"
          style={{
            backgroundColor: "#ff5722",
            color: "white",
            padding: "14px 30px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px"
          }}
        >
          Book Pandit Near You Today
        </Link>
      </div>

    </div>
  );
};

export default PanditNearMe;