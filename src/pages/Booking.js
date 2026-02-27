import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "./Booking.css";

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
    <Marker position={[latitude, longitude]} />
  ) : null;
}

function Booking() {
  const navigate = useNavigate();
  const location = useLocation();

  const [city, setCity] = useState("");
  const [pujaType, setPujaType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [address, setAddress] = useState("");

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const [pujas, setPujas] = useState([]);

useEffect(() => {
  const fetchPujas = async () => {
    try {
      const res = await axios.get("/api/pujas");
      setPujas(res.data);
    } catch (error) {
      console.error("Failed to load pujas", error);
    }
  };

  fetchPujas();
}, []);

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const pujaFromUrl = params.get("puja");

  if (pujaFromUrl) {
    setPujaType(pujaFromUrl);
  }
}, [location.search]);
  const defaultCenter = [25.5941, 85.1376];

  // 📍 Use My Location
  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported ❌");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setLoadingLocation(false);
        alert("Location detected successfully ✅");
      },
      () => {
        alert("Location permission denied ❌");
        setLoadingLocation(false);
      }
    );
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!latitude || !longitude) {
      alert("Please select location on map 📍");
      return;
    }

    navigate("/searching", {
      state: {
        city,
        pujaType,
        bookingDate,
        bookingTime,
        address,
        latitude,
        longitude,
      },
    });
  };

  return (
    <div className="booking-page">
      <div className="booking-wrapper">
        <h2>Book Your Puja</h2>

        <form onSubmit={handleBooking}>
          <input
            type="text"
            placeholder="City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          />

          <select
  value={pujaType}
  required
  onChange={(e) => setPujaType(e.target.value)}
>
  <option value="">Select Puja</option>

  {pujas.map((puja) => (
    <option key={puja._id} value={puja.name}>
      {puja.name} (₹{puja.fixedPrice})
    </option>
  ))}
</select>

          <input
            type="date"
            value={bookingDate}
            required
            onChange={(e) => setBookingDate(e.target.value)}
          />

          <input
            type="time"
            value={bookingTime}
            required
            onChange={(e) => setBookingTime(e.target.value)}
          />

          <input
            type="text"
            placeholder="Full Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Use My Location */}
          <button
            type="button"
            onClick={getLocation}
            className="location-btn"
          >
            {loadingLocation ? "Fetching Location..." : "📍 Use My Location"}
          </button>

          {/* Map */}
          <div className="map-box">
            <h4>Select Location on Map</h4>

            <MapContainer
              center={defaultCenter}
              zoom={13}
              scrollWheelZoom={true}
              className="map-container"
              style={{ height: "300px", width: "100%" }}  
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <LocationMarker
                setLatitude={setLatitude}
                setLongitude={setLongitude}
                latitude={latitude}
                longitude={longitude}
              />
            </MapContainer>

            <p className="location-text">
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

          <button type="submit" className="book-btn">
            Book Now 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Booking;