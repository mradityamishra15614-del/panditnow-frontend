import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Detect map click
function LocationMarker({ setLatitude, setLongitude, latitude, longitude }) {
  useMapEvents({
    click(e) {
      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });

  return latitude && longitude ? (
    <Marker position={[latitude, longitude]}></Marker>
  ) : null;
}

function PanditSignup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [services, setServices] = useState("");

  // ✅ NEW FIELD
  const [aadharNumber, setAadharNumber] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [loadingLocation, setLoadingLocation] = useState(false);

  // 📍 Get GPS location
  const getLocation = () => {
    setLoadingLocation(true);

    if (!navigator.geolocation) {
      alert("Geolocation not supported ❌");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoadingLocation(false);
        alert("Location detected successfully ✅");
      },
      (error) => {
        console.log(error);
        alert("Location permission denied ❌");
        setLoadingLocation(false);
      }
    );
  };

  // Signup Submit
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert("Please select location on map 📍");
      return;
    }

    // ✅ Aadhar validation
    if (!aadharNumber || aadharNumber.length !== 12 || isNaN(aadharNumber)) {
      alert("Aadhar Number must be 12 digits ❌");
      return;
    }

    try {
      await API.post("/api/auth/pandit/signup", {
        name,
        phone,
        email,
        password,
        city,
        address,
        latitude,
        longitude,

        // ✅ send services as array
        services: services
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),

        // ✅ send aadharNumber
        aadharNumber,
      });

      alert("Pandit Signup Successful ✅ Now wait for Admin Verification.");
      navigate("/pandit/login");
    } catch (error) {
      console.log(error.response?.data || error.message);

      alert(error.response?.data?.message || "Signup Failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1 style={{ fontSize: "40px" }}>Pandit Signup 🛕</h1>
      <p style={{ fontSize: "18px", color: "gray" }}>
        Register yourself to get puja bookings
      </p>

      <div
        style={{
          width: "500px",
          margin: "auto",
          marginTop: "30px",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0px 0px 15px rgba(0,0,0,0.2)",
          backgroundColor: "white",
        }}
      >
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="email"
            placeholder="Email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="text"
            placeholder="City (example: Patna)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="text"
            placeholder="Address (example: Hanuman Mandir Road)"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          <input
            type="text"
            placeholder="Services (comma separated) eg: Griha Pravesh, Vivah"
            value={services}
            onChange={(e) => setServices(e.target.value)}
            required
            style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
          />

          {/* ✅ NEW AADHAR FIELD */}
          <input
            type="text"
            placeholder="Aadhar Number (12 digits)"
            value={aadharNumber}
            onChange={(e) =>
              setAadharNumber(e.target.value.replace(/\D/g, ""))
            }
            required
            maxLength={12}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "12px",
              border: "2px solid orange",
            }}
          />

          <button
            type="button"
            onClick={getLocation}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#333",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "15px",
            }}
          >
            {loadingLocation ? "Fetching Location..." : "📍 Use My Location"}
          </button>

          <div style={{ marginBottom: "15px" }}>
            <h4 style={{ textAlign: "left" }}>Select Location on Map</h4>

            <MapContainer
              center={[25.5941, 85.1376]}
              zoom={13}
              style={{
                height: "250px",
                width: "100%",
                borderRadius: "10px",
              }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
              />

              <LocationMarker
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                latitude={latitude}
                longitude={longitude}
              />
            </MapContainer>

            <p style={{ fontSize: "14px", marginTop: "10px", color: "green" }}>
              {latitude && longitude ? (
                <>
                  Location Selected ✅ <br />
                  Lat: {latitude} <br />
                  Lng: {longitude}
                </>
              ) : (
                "No location selected yet ❌"
              )}
            </p>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "orange",
              color: "white",
              fontSize: "16px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Register as Pandit
          </button>
        </form>

        <p style={{ marginTop: "20px" }}>
          Already registered? <Link to="/pandit/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default PanditSignup;
