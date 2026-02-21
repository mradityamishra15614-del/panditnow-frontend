import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, getRole, logoutUser } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const user = getUser();
  const role = getRole();

  const handleLogout = () => {
    logoutUser();
    setMenuOpen(false);
    navigate("/");
    window.location.reload(); // ensures navbar refresh
  };

  return (
    <div className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <Link to="/" className="logo">
          PanditNow 🛕
        </Link>

        {/* DESKTOP MENU */}
        <div className="desktop-menu">
          <Link to="/">Home</Link>
          <Link to="/samagri">Samagri</Link>
          <Link to="/premium-pandits">Premium Pandits</Link>
          <Link to="/pandit/signup">Become Pandit</Link>

          {!user ? (
            <>
              <Link to="/customer/login" className="login-link">
                Login
              </Link>
              <Link to="/customer/signup" className="signup-btn">
                Signup
              </Link>
            </>
          ) : (
            <>
              {role === "customer" && (
                <Link to="/customer/dashboard" className="dashboard-link">
                  Dashboard
                </Link>
              )}
              {role === "pandit" && (
                <Link to="/pandit/dashboard" className="dashboard-link">
                  Pandit Panel
                </Link>
              )}
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/samagri" onClick={() => setMenuOpen(false)}>Samagri</Link>
          <Link to="/premium-pandits" onClick={() => setMenuOpen(false)}>Premium Pandits</Link>
          <Link to="/pandit/signup" onClick={() => setMenuOpen(false)}>Become Pandit</Link>

          {!user ? (
            <>
              <Link to="/customer/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/customer/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          ) : (
            <>
              {role === "customer" && (
                <Link to="/customer/dashboard" onClick={() => setMenuOpen(false)}>
                  Dashboard
                </Link>
              )}
              {role === "pandit" && (
                <Link to="/pandit/dashboard" onClick={() => setMenuOpen(false)}>
                  Pandit Panel
                </Link>
              )}
              <button onClick={handleLogout} className="logout-btn-mobile">
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* CSS */}
      <style>{`
        .navbar {
          position: sticky;
          top: 0;
          background: white;
          box-shadow: 0 2px 15px rgba(0,0,0,0.08);
          z-index: 1000;
        }

        .navbar-inner {
          max-width: 1200px;
          margin: auto;
          padding: 15px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          font-size: 22px;
          font-weight: bold;
          color: orange;
          text-decoration: none;
        }

        .desktop-menu {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .desktop-menu a {
          text-decoration: none;
          color: black;
          font-size: 15px;
        }

        .signup-btn {
          background: orange;
          color: white !important;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: bold;
        }

        .dashboard-link {
          font-weight: bold;
        }

        .logout-btn {
          background: red;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
        }

        .hamburger {
          display: none;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none;
          }

          .hamburger {
            display: block;
          }

          .mobile-menu {
            display: flex;
            flex-direction: column;
            padding: 15px 20px;
            gap: 12px;
            background: white;
          }

          .logout-btn-mobile {
            background: red;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 6px;
          }
        }
      `}</style>
    </div>
  );
}

export default Navbar;