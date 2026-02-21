import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../api";
import { getUser } from "../utils/auth";
import { findNearest, getDistance } from "geolib";

function SearchingPandit() {
  const location = useLocation();
  const navigate = useNavigate();

  const bookingData = location.state;
  const customer = getUser();

  const [loading, setLoading] = useState(true);
  const [pandit, setPandit] = useState(null);
  const [distance, setDistance] = useState(null);
  const [agreeCancel, setAgreeCancel] = useState(false);
const [agreeSafety, setAgreeSafety] = useState(false);

  useEffect(() => {
    if (!bookingData) {
      navigate("/");
      return;
    }

    if (!customer?._id) {
      alert("Please login first ❌");
      navigate("/customer/login");
      return;
    }

    let timer;
    let isMounted = true;

    const findPanditHandler = async () => {
      try {
        timer = setTimeout(async () => {
          const response = await API.get("/api/pandits/verified");

          const matchedPandits = response.data.filter(
            (p) =>
              p.location?.city?.toLowerCase() ===
                bookingData.city.toLowerCase() &&
              p.isAvailable === true &&
              p.verification?.isVerified === true &&
              p.location?.latitude &&
              p.location?.longitude
          );

          if (!matchedPandits || matchedPandits.length === 0) {
            if (isMounted) {
              setPandit(null);
              setLoading(false);
            }
            return;
          }

          const panditLocations = matchedPandits.map((p) => ({
            latitude: p.location.latitude,
            longitude: p.location.longitude,
            pandit: p,
          }));

          const nearest = findNearest(
            { latitude: bookingData.latitude, longitude: bookingData.longitude },
            panditLocations
          );

          const dist = getDistance(
            { latitude: bookingData.latitude, longitude: bookingData.longitude },
            { latitude: nearest.latitude, longitude: nearest.longitude }
          );

          if (isMounted) {
            setPandit(nearest.pandit);
            setDistance(dist);
            setLoading(false);
          }
        }, 5000);
      } catch (error) {
        console.log(error.response?.data || error.message);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    findPanditHandler();

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [bookingData, navigate, customer]);

  const confirmBooking = async () => {
    try {
      if (!pandit) {
        alert("No pandit found ❌");
        return;
      }

      await API.post("/api/bookings/create", {
        customerId: customer._id,
        bookingType: "premium",
        panditId: pandit._id,
        pujaType: bookingData.pujaType,
        bookingDate: bookingData.bookingDate,
        bookingTime: bookingData.bookingTime,
        address: bookingData.address,

        // ✅ VERY IMPORTANT
        city: bookingData.city,

        latitude: bookingData.latitude,
        longitude: bookingData.longitude,
        fixedPrice: 1200,
      });

      alert("Booking Confirmed Successfully ✅");
      navigate("/customer/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Booking Confirmation Failed ❌");
    }
  };

  return (
    <div className="searching-container">
      {loading ? (
        <div className="searching-card">
          <h1 className="search-title">Finding Pandit Near You...</h1>

          <p className="search-subtitle">
            Please wait, matching verified pandit for your puja.
          </p>

          <div className="loader"></div>

          <h3 className="searching-text">Searching...</h3>

          <p className="search-info">
            📍 Location locked <br />
            🛕 Checking verified pandits <br />
            🔒 Price fixed (No extra money)
          </p>
        </div>
      ) : pandit ? (
        <div className="pandit-found-card">
          <h1 className="found-title">✅ Pandit Found!</h1>

          <div className="pandit-card">
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <img
                src={
                  pandit.profilePhoto ||
                  "https://via.placeholder.com/120?text=Pandit"
                }
                alt="Pandit"
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid orange",
                }}
              />
            </div>

            <h2 style={{ marginBottom: "8px" }}>{pandit.name}</h2>
            {/* ⭐ Rating Section */}
<p
  style={{
    fontWeight: "bold",
    color: "#ff9800",
    marginBottom: "8px",
  }}
>
  ⭐{" "}
  {pandit.totalReviews > 0
    ? `${pandit.averageRating.toFixed(1)} (${pandit.totalReviews} reviews)`
    : "New Pandit"}
</p>

            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                background: "#e8fff0",
                borderRadius: "20px",
                color: "green",
                fontWeight: "bold",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              ✅ Verified Pandit
            </div>

            <p>📍 City: {pandit.location?.city}</p>
            <p>🛕 Temple: {pandit.templeName || "Not mentioned"}</p>

            <p>
              🧑‍🎓 Experience:{" "}
              <b>{pandit.experienceYears ? pandit.experienceYears : 0}</b> years
            </p>

            <p>
              🗣️ Languages:{" "}
              {pandit.languages?.length > 0
                ? pandit.languages.join(", ")
                : "Not mentioned"}
            </p>

            <p>
              🛕 Services:{" "}
              {pandit.services?.length > 0
                ? pandit.services.join(", ")
                : "Not mentioned"}
            </p>

            <p>📞 Phone: {pandit.phone}</p>

            {distance !== null && (
              <p style={{ marginTop: "10px", color: "gray" }}>
                📏 Distance: {(distance / 1000).toFixed(2)} km away
              </p>
            )}

            <h3 className="price">Fixed Price: ₹1200</h3>
            <div style={{ marginTop: "15px", textAlign: "left" }}>
  <label style={{ display: "block", marginBottom: "8px" }}>
    <input
      type="checkbox"
      checked={agreeCancel}
      onChange={() => setAgreeCancel(!agreeCancel)}
    />{" "}
    I agree that cancellation after pandit arrival is not allowed.
  </label>

  <label style={{ display: "block", marginBottom: "8px" }}>
    <input
      type="checkbox"
      checked={agreeSafety}
      onChange={() => setAgreeSafety(!agreeSafety)}
    />{" "}
    I confirm that neither I nor my family members will harm or misbehave with the pandit.
  </label>
</div>
<button
  className="confirm-btn"
  onClick={confirmBooking}
  disabled={!(agreeCancel && agreeSafety)}
  style={{
    opacity: agreeCancel && agreeSafety ? 1 : 0.5,
    cursor: agreeCancel && agreeSafety ? "pointer" : "not-allowed",
  }}
>
  Confirm Booking 🚀
</button>
            
            <button className="cancel-btn" onClick={() => navigate("/")}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="not-found-card">
          <h1>❌ No Pandit Found</h1>
          <p>Currently no verified pandits available in your city.</p>

          <button className="go-back-btn" onClick={() => navigate("/")}>
            Go Back
          </button>
        </div>
      )}

      <style>
        {`
          .searching-container {
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
            padding: 20px;
          }

          .searching-card {
            width: 100%;
            max-width: 420px;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0px 0px 15px rgba(0,0,0,0.15);
            text-align: center;
          }

          .search-title {
            font-size: 26px;
            margin-bottom: 10px;
          }

          .search-subtitle {
            font-size: 15px;
            color: gray;
          }

          .loader {
            margin: 25px auto;
            width: 70px;
            height: 70px;
            border: 8px solid #f3f3f3;
            border-top: 8px solid orange;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          .searching-text {
            color: orange;
            margin-top: 10px;
          }

          .search-info {
            font-size: 14px;
            color: gray;
            margin-top: 15px;
            line-height: 22px;
          }

          .pandit-found-card {
            width: 100%;
            max-width: 450px;
            text-align: center;
          }

          .pandit-card {
            margin-top: 20px;
            background: white;
            padding: 25px;
            border-radius: 15px;
            box-shadow: 0px 0px 15px rgba(0,0,0,0.15);
          }

          .found-title {
            font-size: 28px;
          }

          .price {
            margin-top: 15px;
            color: green;
          }

          .confirm-btn {
            width: 100%;
            padding: 13px;
            background: orange;
            color: white;
            font-size: 16px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 15px;
            font-weight: bold;
          }

          .cancel-btn {
            width: 100%;
            padding: 12px;
            background: black;
            color: white;
            font-size: 15px;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            margin-top: 10px;
          }

          .not-found-card {
            width: 100%;
            max-width: 420px;
            background: white;
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0px 0px 15px rgba(0,0,0,0.15);
            text-align: center;
          }

          .go-back-btn {
            padding: 12px 20px;
            margin-top: 20px;
            background: black;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default SearchingPandit;
