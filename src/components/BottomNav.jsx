import { useNavigate, useLocation } from "react-router-dom";
import { getUser, getRole } from "../utils/auth";
import "./bottomNav.css";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = getUser();
  const role = getRole();

  // HOME
  const handleHome = () => {
    navigate("/");
  };

  // BOOK
  const handleBook = () => {
    if (!user) {
      navigate("/customer/login");   // ✅ FIXED
      return;
    }

    if (role === "customer") {
      navigate("/booking");          // ✅ FIXED
    } else {
      alert("Pandit cannot book puja ❌");
    }
  };

  // PREMIUM
  const handlePremium = () => {
    navigate("/premium-pandits");
  };

  // BOOKINGS
  const handleBookings = () => {
    if (!user) {
      navigate("/customer/login");   // ✅ FIXED
      return;
    }

    if (role === "customer") {
      navigate("/customer/dashboard");
    } else if (role === "pandit") {
      navigate("/pandit/dashboard");
    }
  };

  // ACCOUNT
  const handleAccount = () => {
    if (!user) {
      navigate("/customer/login");   // ✅ FIXED
    } else if (role === "customer") {
      navigate("/customer/dashboard");
    } else {
      navigate("/pandit/dashboard");
    }
  };

  return (
    <div className="bottom-nav">
      <div onClick={handleHome} className={location.pathname === "/" ? "active" : ""}>
        🏠<span>Home</span>
      </div>

      <div onClick={handleBook} className={location.pathname === "/booking" ? "active" : ""}>
        📿<span>Book</span>
      </div>

      <div onClick={handlePremium} className={location.pathname === "/premium-pandits" ? "active" : ""}>
        ⭐<span>Premium</span>
      </div>

      <div onClick={handleBookings}>
        📦<span>Bookings</span>
      </div>

      <div onClick={handleAccount}>
        👤<span>Account</span>
      </div>
    </div>
  );
}