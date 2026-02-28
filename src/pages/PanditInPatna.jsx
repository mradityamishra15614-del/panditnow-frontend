import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const PanditInPatna = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "1100px", margin: "auto" }}>
      
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Book Verified Pandit in Patna | Same Day Puja Booking | PanditNow</title>
        <meta
          name="description"
          content="Looking for a verified pandit in Patna? Book trusted pandits for Griha Pravesh, Satyanarayan Katha, Lakshmi Puja and more. Same day puja booking available."
        />
        <link rel="canonical" href="https://www.panditnow.in/pandit-in-patna" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can I book a pandit in Patna?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book a verified pandit in Patna through PanditNow by selecting your puja type, date, and location."
                }
              },
              {
                "@type": "Question",
                "name": "Do you provide samagri for puja?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "PanditNow provides complete puja samagri list online. You can download the checklist from our website."
                }
              },
              {
                "@type": "Question",
                "name": "Is same day pandit booking available in Patna?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, same day pandit booking is available in Patna depending on availability."
                }
              }
            ]
          }
          `}
        </script>
      </Helmet>

      {/* Hero Section */}
      <h1 style={{ fontSize: "36px", marginBottom: "15px" }}>
        Book Verified Pandit in Patna
      </h1>
      <p style={{ fontSize: "18px", marginBottom: "25px" }}>
        Looking for a trusted and verified pandit in Patna? PanditNow helps you book experienced pandits for all types of pujas and religious ceremonies at your doorstep with transparent pricing and easy online booking.
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
        Book Pandit in Patna Now
      </Link>

      {/* Services Section */}
      <h2 style={{ marginTop: "50px" }}>Puja Services Available in Patna</h2>
      <ul style={{ lineHeight: "2", fontSize: "16px" }}>
        <li>Griha Pravesh Puja</li>
        <li>Satyanarayan Katha</li>
        <li>Lakshmi Puja</li>
        <li>Durga Saptashati Path</li>
        <li>Rudrabhishek</li>
        <li>Vastu Puja</li>
        <li>Shradh Puja</li>
      </ul>

      {/* Why Choose Us */}
      <h2 style={{ marginTop: "50px" }}>Why Choose PanditNow in Patna?</h2>
      <ul style={{ lineHeight: "2", fontSize: "16px" }}>
        <li>Verified and experienced pandits</li>
        <li>Transparent fixed pricing</li>
        <li>Same-day booking available</li>
        <li>OTP secured and reliable process</li>
        <li>Complete samagri checklist available online</li>
      </ul>

      {/* FAQ Section */}
      <h2 style={{ marginTop: "50px" }}>Frequently Asked Questions</h2>

      <h3>How can I book a pandit in Patna?</h3>
      <p>You can book through our online booking page by selecting your puja type, date, and location in Patna.</p>

      <h3>Do you provide puja samagri?</h3>
      <p>We provide complete puja samagri lists online. You can download the checklist from the samagri section.</p>

      <h3>Is same day pandit booking available?</h3>
      <p>Yes, same day booking is available based on pandit availability in Patna.</p>

      {/* Final CTA */}
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
          Book Verified Pandit in Patna Today
        </Link>
      </div>

    </div>
  );
};

export default PanditInPatna;