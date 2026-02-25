import { Link, useLocation } from "react-router-dom";
import "./bottomNav.css";

export default function BottomNav() {
  const location = useLocation();

  return (
    <div className="bottom-nav">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>🏠<span>Home</span></Link>
      <Link to="/quick-book" className={location.pathname === "/quick-book" ? "active" : ""}>📿<span>Book</span></Link>
      <Link to="/premium-pandits" className={location.pathname === "/premium-pandits" ? "active" : ""}>⭐<span>Premium</span></Link>
      <Link to="/my-bookings" className={location.pathname === "/my-bookings" ? "active" : ""}>📦<span>Bookings</span></Link>
      <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>👤<span>Account</span></Link>
    </div>
  );
}