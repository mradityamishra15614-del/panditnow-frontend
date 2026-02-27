import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Section */}
          <div className="footer-brand">
  <img 
    src="/logo.png" 
    alt="PanditNow Logo" 
    className="footer-logo"
  />
  <p>Book verified pandits at your doorstep.</p>
</div>

        {/* Quick Links */}
        <div>
          <h4>Quick Links</h4>
          <p><Link to="/">Home</Link></p>
          <p><Link to="/booking">Book Puja</Link></p>
          <p><Link to="/pandit/signup">Become Pandit</Link></p>
          <p><Link to="/privacy-policy">Privacy Policy</Link></p>
          <p><Link to="/terms-conditions">Terms & Conditions</Link></p>
          <p><Link to="/cancellation-policy">Cancellation Policy</Link></p>
        </div>

        {/* Contact Section */}
        <div>
          <h4>Contact</h4>
          <p>Email: support@panditnow.in</p>
          <p>Phone: +91 9162579808</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} PanditNow. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;