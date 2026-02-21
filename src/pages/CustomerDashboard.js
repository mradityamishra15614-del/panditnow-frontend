import React, { useEffect, useState, useCallback } from "react";
import axiosInstance from "../api/axiosInstance";
import { getUser, getToken, logoutUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

function CustomerDashboard() {
  const navigate = useNavigate();

  const customer = getUser();
  const token = getToken();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  // ⭐ REVIEW STATES
const [showReviewModal, setShowReviewModal] = useState(false);
const [selectedBooking, setSelectedBooking] = useState(null);
const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!customer?._id || !token) {
      navigate("/customer/login");
    }
  }, [customer?._id, token, navigate]);

  // Status color helper
  const getStatusColor = (status) => {
    if (status === "pending") return "orange";
    if (status === "accepted") return "green";
    if (status === "arrived") return "blue";
    if (status === "paid") return "purple";
    if (status === "otp_pending") return "purple";
    if (status === "started") return "darkblue";
    if (status === "rejected") return "red";
    if (status === "completed") return "darkgreen";
    return "gray";
  };

  // Fetch bookings
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);

      const res = await axiosInstance.get(
        `/api/bookings/customer/${customer._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  }, [customer?._id, token]);

  // Fetch once when customer exists
  useEffect(() => {
    if (customer?._id) {
      fetchBookings();
    }
  }, [customer?._id, fetchBookings]);

  // Logout
  const handleLogout = () => {
    logoutUser();
    alert("Logged out successfully ✅");
    navigate("/");
  };

  // Load Razorpay script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Pay Now Function
  const handlePayNow = async (bookingId) => {
    try {
      setActionLoading(true);

      const isLoaded = await loadRazorpayScript();

      if (!isLoaded) {
        alert("Razorpay SDK failed to load ❌ Check Internet Connection");
        return;
      }

      // Step 1: Create Order
      const orderRes = await axiosInstance.post(
        "/api/payment/create-order",
        { bookingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { order, key } = orderRes.data;

      // Step 2: Open Razorpay Payment Window
      const options = {
        key: key,
        amount: order.amount,
        currency: order.currency,
        name: "PanditNow",
        description: "Puja Booking Payment",
        order_id: order.id,

        handler: async function (response) {
          try {
            // Step 3: Verify Payment
            await axiosInstance.post(
              "/api/payment/verify-payment",
              {
                bookingId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            alert("Payment Successful ✅ OTP Generated");
            fetchBookings();
          } catch (error) {
            console.log(error.response?.data || error.message);
            alert("Payment Verification Failed ❌");
          }
        },

        prefill: {
          name: customer?.name,
          email: customer?.email,
          contact: customer?.phone,
        },

        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Payment Failed ❌");
    } finally {
      setActionLoading(false);
    }
  };
  // CANCEL BOOKING
const handleCancelBooking = async (bookingId) => {
  try {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    await axiosInstance.put(
      `/api/bookings/${bookingId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Booking cancelled successfully ✅");
    fetchBookings();
  } catch (error) {
    alert(error.response?.data?.message || "Cancellation failed ❌");
  }
};
// ⭐ OPEN REVIEW
const openReviewModal = (bookingId) => {
  setSelectedBooking(bookingId);
  setShowReviewModal(true);
};

// ⭐ CLOSE REVIEW
const closeReviewModal = () => {
  setShowReviewModal(false);
  setSelectedBooking(null);
  setRating(5);
  setComment("");
};

// ⭐ SUBMIT REVIEW
const submitReview = async () => {
  try {
    await axiosInstance.post(
      "/api/reviews",
      {
        bookingId: selectedBooking,
        rating,
        comment,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Review Submitted ✅");
    closeReviewModal();
    fetchBookings();
  } catch (error) {
    alert(error.response?.data?.message || "Review failed ❌");
  }
};
  return (
    <div style={{ padding: "20px", background: "#f4f4f4", minHeight: "100vh" }}>
      {/* Profile Card */}
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0px 0px 12px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ marginBottom: "10px", color: "orange" }}>
          Customer Dashboard 👤
        </h1>

        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          👤 <b>Name:</b> {customer?.name}
        </p>

        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          📞 <b>Phone:</b> {customer?.phone}
        </p>

        <p style={{ fontSize: "18px", margin: "5px 0" }}>
          📧 <b>Email:</b> {customer?.email || "Not added"}
        </p>

        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
          <button
            onClick={fetchBookings}
            style={{
              padding: "12px 20px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Refresh 🔄
          </button>

          <button
            onClick={handleLogout}
            style={{
              padding: "12px 20px",
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Booking List */}
      <div style={{ maxWidth: "900px", margin: "auto", marginTop: "30px" }}>
        <h2 style={{ marginBottom: "15px" }}>📌 My Bookings</h2>

        {loading ? (
          <p>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p style={{ color: "gray" }}>No bookings found ❌</p>
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
              <h3 style={{ marginBottom: "8px", color: "orange" }}>
                🛕 {booking.pujaType}
              </h3>

              <p>
                📅 <b>Date:</b> {booking.bookingDate}
              </p>

              <p>
                ⏰ <b>Time:</b> {booking.bookingTime}
              </p>

              <p>
                📍 <b>Address:</b> {booking.address}
              </p>

              <p>
                💰 <b>Price:</b> ₹{booking.fixedPrice}
              </p>

              <p>
                💳 <b>Payment Status:</b>{" "}
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
              {/* CANCEL BUTTON (Allowed before arrival only) */}
{booking.bookingStatus !== "arrived" &&
 booking.bookingStatus !== "started" &&
 booking.bookingStatus !== "completed" &&
 booking.bookingStatus !== "cancelled" && (
  <button
    onClick={() => handleCancelBooking(booking._id)}
    style={{
      marginTop: "12px",
      padding: "10px 15px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Cancel Booking ❌
  </button>
)}
              {/* ✅ Pandit Info */}
              {booking.pandit ? (
                <div
                  style={{
                    marginTop: "12px",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    background: "#fafafa",
                  }}
                >
                  <img
                    src={
                      booking.pandit.profilePhoto ||
                      "https://via.placeholder.com/80?text=Pandit"
                    }
                    alt="pandit"
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid orange",
                    }}
                  />

                  <div>
                    <p
                      style={{
                        margin: "0px",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                    >
                      🛕 {booking.pandit.name}{" "}
                      {booking.pandit.verification?.isVerified && (
                        <span style={{ color: "green", marginLeft: "6px" }}>
                          ✅ Verified
                        </span>
                      )}
                    </p>

                    <p style={{ margin: "3px 0" }}>📞 {booking.pandit.phone}</p>

                    <p style={{ margin: "3px 0" }}>
                      🛕 Temple: {booking.pandit.templeName || "Not mentioned"}
                    </p>

                    <p style={{ margin: "3px 0" }}>
                      🧑‍🎓 Experience: {booking.pandit.experienceYears || 0} years
                    </p>
                  </div>
                </div>
              ) : (
                <p style={{ color: "red" }}>❌ No Pandit Assigned Yet</p>
              )}

              {/* Accepted Status Message */}
              {booking.bookingStatus === "accepted" && (
                <p style={{ marginTop: "12px", color: "green" }}>
                  ✅ Pandit accepted your booking. Waiting for pandit arrival...
                </p>
              )}

              {/* Arrived -> Payment Button */}
              {booking.bookingStatus === "arrived" && (
                <div style={{ marginTop: "15px" }}>
                  <h4 style={{ color: "blue", marginBottom: "10px" }}>
                    📍 Pandit has arrived. Pay now to generate OTP.
                  </h4>

                  <button
                    disabled={actionLoading}
                    onClick={() => handlePayNow(booking._id)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: "orange",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "16px",
                      opacity: actionLoading ? 0.6 : 1,
                    }}
                  >
                    Pay Now 💳
                  </button>
                </div>
              )}

              {/* OTP Pending -> Show OTP */}
              {booking.bookingStatus === "otp_pending" && (
                <div
                  style={{
                    marginTop: "15px",
                    padding: "15px",
                    background: "#fff8e6",
                    borderRadius: "10px",
                    border: "1px solid orange",
                  }}
                >
                  <h4 style={{ marginBottom: "10px", color: "orange" }}>
                    🔐 Your OTP (Give OTP to Pandit)
                  </h4>

                  <h2 style={{ textAlign: "center", letterSpacing: "5px" }}>
                    {booking.otp}
                  </h2>

                  <p style={{ marginTop: "10px", color: "gray" }}>
                    ⚠️ Do not share OTP with anyone except pandit.
                  </p>
                </div>
              )}

              {/* Started message */}
              {booking.bookingStatus === "started" && (
                <p
                  style={{
                    marginTop: "12px",
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  🛕 Puja Started Successfully ✅
                </p>
              )}

              {/* Completed message */}
              {booking.bookingStatus === "completed" && (
                <p style={{ marginTop: "12px", color: "green" }}>
                  🎉 Puja completed successfully!
                </p>
              )}

              {/* Rejected message */}
              {booking.bookingStatus === "rejected" && (
                <p style={{ marginTop: "12px", color: "red" }}>
                  ❌ Booking rejected by pandit. Please try again.
                </p>
              )}
              {booking.bookingStatus === "completed" && !booking.reviewGiven && (
  <button onClick={() => openReviewModal(booking._id)}>
    ⭐ Rate Pandit
  </button>
)}
            </div>
          ))
        )}
        {/* ⭐ REVIEW MODAL */}
{showReviewModal && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    }}
  >
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        width: "400px",
      }}
    >
      <h3 style={{ marginBottom: "15px" }}>Rate Your Pandit ⭐</h3>

      <div style={{ marginBottom: "15px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setRating(star)}
            style={{
              fontSize: "30px",
              cursor: "pointer",
              color: star <= rating ? "gold" : "gray",
            }}
          >
            ★
          </span>
        ))}
      </div>

      <textarea
        placeholder="Write your review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "12px",
          borderRadius: "8px",
        }}
      />

      <button
        onClick={submitReview}
        style={{
          width: "100%",
          padding: "10px",
          background: "orange",
          color: "white",
          border: "none",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        Submit Review
      </button>

      <button
        onClick={closeReviewModal}
        style={{
          width: "100%",
          padding: "8px",
          marginTop: "10px",
          background: "gray",
          color: "white",
          border: "none",
          borderRadius: "8px",
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
      </div>
    </div>
  );
}

export default CustomerDashboard;
