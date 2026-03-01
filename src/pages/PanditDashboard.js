import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { getUser, getRole, getToken, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function PanditDashboard() {
  const navigate = useNavigate();

  const pandit = getUser();
  const role = getRole();
  const token = getToken();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [otpInputs, setOtpInputs] = useState({});

  // ✅ ONLINE / OFFLINE STATE
  const [isAvailable, setIsAvailable] = useState(pandit?.isAvailable || false);

  // ===============================
  // ✅ PROFILE PHOTO STATE
  // ===============================
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(
    pandit?.profilePhoto || ""
  );

  // ===============================
  // PROFILE FORM STATES
  // ===============================
  const [profileData, setProfileData] = useState({
    introVideo: pandit?.introVideo || "",
    experienceYears: pandit?.experienceYears || 0,
    languages: pandit?.languages?.join(", ") || "",
    templeName: pandit?.templeName || "",
    services: pandit?.services?.join(", ") || "",
    pricingType: pandit?.pricingType || "fixed",
    basePrice: pandit?.basePrice || 0,
    city: pandit?.location?.city || "",
    address: pandit?.location?.address || "",
    state: pandit?.location?.state || "",
    pincode: pandit?.location?.pincode || "",
    latitude: pandit?.location?.latitude || 0,
    longitude: pandit?.location?.longitude || 0,
  });

  // ===============================
  // REDIRECT IF NOT LOGGED IN
  // ===============================
  useEffect(() => {
    if (!pandit?._id || role !== "pandit" || !token) {
      navigate("/pandit/login");
    }
  }, [pandit?._id, role, token, navigate]);


  // ===============================
  // FETCH BOOKINGS
  // ===============================
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const response = await API.get(`/api/bookings/pandit/${pandit._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBookings(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [pandit?._id, token]);

  useEffect(() => {
    if (pandit?._id) {
      fetchBookings();
    }
  }, [pandit?._id, fetchBookings]);
// ===============================
// AUTO REFRESH BOOKINGS (Every 1 min)
// ===============================
useEffect(() => {
  const interval = setInterval(() => {
    fetchBookings();
  }, 60000);

  return () => clearInterval(interval);
}, [fetchBookings]);
  // ===============================
  // ✅ TOGGLE ONLINE/OFFLINE
  // ===============================
  const toggleOnlineOffline = async () => {
    try {
      setActionLoading(true);

      const res = await API.put(
        "/api/pandits/toggle-availability",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setIsAvailable(res.data.isAvailable);

      // update localStorage user
      localStorage.setItem("user", JSON.stringify(res.data.pandit));
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to toggle availability ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // ACCEPT BOOKING
  // ===============================
  const acceptBooking = async (bookingId) => {
    try {
      setActionLoading(true);

      await API.put(
        `/api/bookings/${bookingId}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Accepted ✅");
      fetchBookings();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to accept booking ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // REJECT BOOKING
  // ===============================
  const rejectBooking = async (bookingId) => {
    try {
      const reason = prompt("Enter rejection reason:");

      setActionLoading(true);

      await API.put(
        `/api/bookings/${bookingId}/reject`,
        {
          reason: reason || "Pandit rejected",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Rejected ❌");
      fetchBookings();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to reject booking ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // MARK ARRIVED
  // ===============================
  const markArrived = async (bookingId) => {
    try {
      setActionLoading(true);

      await API.put(
        `/api/bookings/${bookingId}/arrived`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Marked as Arrived ✅ Now customer will pay");
      fetchBookings();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to mark arrived ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // OTP INPUT CHANGE
  // ===============================
  const handleOtpChange = (bookingId, value) => {
    setOtpInputs((prev) => ({
      ...prev,
      [bookingId]: value,
    }));
  };

  // ===============================
  // VERIFY OTP
  // ===============================
  const verifyOtp = async (bookingId) => {
    try {
      if (!otpInputs[bookingId]) {
        alert("Please enter OTP ❌");
        return;
      }

      setActionLoading(true);

      await API.put(
        `/api/bookings/${bookingId}/verify-otp`,
        { otp: otpInputs[bookingId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("OTP Verified. Puja Started ✅");
      fetchBookings();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "OTP verification failed ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // COMPLETE BOOKING
  // ===============================
  const completeBooking = async (bookingId) => {
    try {
      setActionLoading(true);

      await API.put(
        `/api/bookings/${bookingId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Completed Successfully 🎉");
      fetchBookings();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to complete booking ❌");
    } finally {
      setActionLoading(false);
    }
  };

  // ===============================
  // LOGOUT
  // ===============================
  const handleLogout = () => {
    logoutUser();
    alert("Logged out successfully ✅");
    navigate("/");
    window.location.reload();
  };

  // ===============================
  // STATUS COLOR
  // ===============================
  const getStatusColor = (status) => {
    if (status === "pending") return "orange";
    if (status === "accepted") return "green";
    if (status === "arrived") return "blue";
    if (status === "otp_pending") return "purple";
    if (status === "started") return "darkblue";
    if (status === "rejected") return "red";
    if (status === "completed") return "darkgreen";
    return "gray";
  };

  // ===============================
  // HANDLE PROFILE CHANGE
  // ===============================
  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  // ===============================
  // HANDLE PHOTO CHANGE
  // ===============================
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProfilePhoto(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  // ===============================
  // UPDATE PROFILE
  // ===============================
  const updateProfile = async () => {
    try {
      setActionLoading(true);

      const formData = new FormData();

      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      formData.append("introVideo", profileData.introVideo);
      formData.append("experienceYears", profileData.experienceYears);
      formData.append("languages", profileData.languages);
      formData.append("templeName", profileData.templeName);
      formData.append("services", profileData.services);
      formData.append("pricingType", profileData.pricingType);
      formData.append("basePrice", profileData.basePrice);
      formData.append("city", profileData.city);
      formData.append("address", profileData.address);
      formData.append("state", profileData.state);
      formData.append("pincode", profileData.pincode);
      formData.append("latitude", profileData.latitude);
      formData.append("longitude", profileData.longitude);

      const res = await API.put("/api/pandits/update-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile Updated Successfully ✅");

      localStorage.setItem("user", JSON.stringify(res.data.pandit));

      window.location.reload();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Profile update failed ❌");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div style={{ background: "#f4f4f4", minHeight: "100vh", padding: "20px" }}>
      {/* HEADER */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.12)",
        }}
      >
        <h1 style={{ color: "orange", marginBottom: "8px" }}>
          Pandit Dashboard 🛕
        </h1>

        <p style={{ margin: "5px 0" }}>
          👤 <b>Name:</b> {pandit?.name}
        </p>

        <p style={{ margin: "5px 0" }}>
          📞 <b>Phone:</b> {pandit?.phone}
        </p>

        <p style={{ margin: "5px 0" }}>
          📍 <b>City:</b> {pandit?.location?.city || "Not Set"}
        </p>

        <p style={{ margin: "5px 0" }}>
          🟢 <b>Status:</b>{" "}
          <span style={{ fontWeight: "bold", color: isAvailable ? "green" : "red" }}>
            {isAvailable ? "ONLINE" : "OFFLINE"}
          </span>
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" }}>
          <button
            onClick={fetchBookings}
            style={{
              padding: "10px 16px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Refresh 🔄
          </button>

          <button
            disabled={actionLoading}
            onClick={toggleOnlineOffline}
            style={{
              padding: "10px 16px",
              background: isAvailable ? "red" : "green",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              opacity: actionLoading ? 0.6 : 1,
            }}
          >
            {isAvailable ? "Go Offline 🔴" : "Go Online 🟢"}
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 16px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* PROFILE UPDATE SECTION */}
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
          marginTop: "25px",
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.12)",
        }}
      >
        <h2 style={{ color: "orange", marginBottom: "15px" }}>
          ✍️ Update Profile Details
        </h2>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold" }}>Profile Photo:</label>
          <br />

          {profilePreview && (
            <img
              src={profilePreview}
              alt="profile"
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                objectFit: "cover",
                marginTop: "10px",
                marginBottom: "10px",
                border: "2px solid orange",
              }}
            />
          )}

          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

        <input
          type="text"
          name="templeName"
          placeholder="Temple Name"
          value={profileData.templeName}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="languages"
          placeholder="Languages (comma separated)"
          value={profileData.languages}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="services"
          placeholder="Services (comma separated)"
          value={profileData.services}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="introVideo"
          placeholder="Intro Video URL (optional)"
          value={profileData.introVideo}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="number"
          name="experienceYears"
          placeholder="Experience Years"
          value={profileData.experienceYears}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <select
          name="pricingType"
          value={profileData.pricingType}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        >
          <option value="fixed">Fixed</option>
          <option value="premium">Premium</option>
        </select>

        <input
          type="number"
          name="basePrice"
          placeholder="Base Price"
          value={profileData.basePrice}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={profileData.city}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={profileData.state}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={profileData.pincode}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <input
          type="text"
          name="address"
          placeholder="Full Address"
          value={profileData.address}
          onChange={handleProfileChange}
          style={{ width: "100%", padding: "12px", marginBottom: "12px" }}
        />

        <button
          disabled={actionLoading}
          onClick={updateProfile}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "orange",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            opacity: actionLoading ? 0.6 : 1,
          }}
        >
          {actionLoading ? "Updating..." : "Update Profile ✅"}
        </button>
      </div>

      {/* BOOKINGS */}
      <div style={{ maxWidth: "1000px", margin: "auto", marginTop: "25px" }}>
        <h2 style={{ marginBottom: "15px" }}>📌 Booking Requests</h2>

        {loading ? (
          <h3 style={{ textAlign: "center", marginTop: "40px" }}>
            Loading bookings...
          </h3>
        ) : bookings.length === 0 ? (
          <h3 style={{ textAlign: "center", marginTop: "40px", color: "gray" }}>
            No bookings found ❌
          </h3>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                background: "white",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "12px",
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h3 style={{ marginBottom: "10px", color: "orange" }}>
                🛕 {booking.pujaType}
              </h3>

              <p>📅 <b>Date:</b> {booking.bookingDate}</p>
              <p>⏰ <b>Time:</b> {booking.bookingTime}</p>
              <p>📍 <b>Address:</b> {booking.address}</p>
              <p>💰 <b>Fixed Price:</b> ₹{booking.fixedPrice}</p>

              <p>
                💳 <b>Payment:</b>{" "}
                <span style={{ fontWeight: "bold" }}>
                  {booking.paymentStatus?.toUpperCase()}
                </span>
              </p>

              <p>
                📌 <b>Status:</b>{" "}
                <span
                  style={{
                    color: getStatusColor(booking.bookingStatus),
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {booking.bookingStatus}
                </span>
              </p>

              {booking.bookingStatus === "pending" && (
                <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                  <button
                    disabled={actionLoading}
                    onClick={() => acceptBooking(booking._id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      backgroundColor: "green",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Accept ✅
                  </button>

                  <button
                    disabled={actionLoading}
                    onClick={() => rejectBooking(booking._id)}
                    style={{
                      flex: 1,
                      padding: "12px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Reject ❌
                  </button>
                </div>
              )}

              {booking.bookingStatus === "accepted" && (
                <button
                  disabled={actionLoading}
                  onClick={() => markArrived(booking._id)}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    backgroundColor: "blue",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Mark Arrived 📍
                </button>
              )}

              {booking.bookingStatus === "otp_pending" && (
                <div style={{ marginTop: "15px" }}>
                  <input
                    type="text"
                    placeholder="Enter OTP from Customer"
                    value={otpInputs[booking._id] || ""}
                    onChange={(e) =>
                      handleOtpChange(booking._id, e.target.value)
                    }
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      border: "1px solid #ccc",
                      marginBottom: "10px",
                    }}
                  />

                  <button
                    disabled={actionLoading}
                    onClick={() => verifyOtp(booking._id)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Verify OTP & Start ✅
                  </button>
                </div>
              )}

              {booking.bookingStatus === "started" && (
                <button
                  disabled={actionLoading}
                  onClick={() => completeBooking(booking._id)}
                  style={{
                    width: "100%",
                    marginTop: "15px",
                    padding: "12px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Complete Puja 🎉
                </button>
              )}

              {booking.bookingStatus === "completed" && (
                <p style={{ marginTop: "12px", color: "green" }}>
                  🎉 Puja Completed Successfully!
                </p>
              )}

              {booking.bookingStatus === "rejected" && (
                <p style={{ marginTop: "12px", color: "red" }}>
                  ❌ Booking Rejected.
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default PanditDashboard;
