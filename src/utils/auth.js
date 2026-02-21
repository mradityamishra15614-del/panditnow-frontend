// src/utils/auth.js

// ================= SAVE USER =================
export const saveUser = (token, user, role) => {
  if (!token || !user || !role) return;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("role", role);
};

// ================= GET TOKEN =================
export const getToken = () => {
  return localStorage.getItem("token") || null;
};

// ================= GET USER =================
export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("User parse error:", error);
    return null;
  }
};

// ================= GET ROLE =================
export const getRole = () => {
  return localStorage.getItem("role") || null;
};

// ================= CHECK LOGIN =================
export const isLoggedIn = () => {
  return !!getToken();
};

// ================= LOGOUT =================
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("role");

  // Optional: clear everything if needed
  // localStorage.clear();
};