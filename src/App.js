import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav"; // ✅ Added

// Pages
import Home from "./pages/Home";
import Booking from "./pages/Booking";

import CustomerSignup from "./pages/CustomerSignup";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerDashboard from "./pages/CustomerDashboard";

import PanditSignup from "./pages/PanditSignup";
import PanditLogin from "./pages/PanditLogin";
import PanditDashboard from "./pages/PanditDashboard";

import Samagri from "./pages/Samagri";
import SamagriPage from "./pages/SamagriPage";
import PremiumPandits from "./pages/PremiumPandits";
import SearchingPandit from "./pages/SearchingPandit";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CancellationPolicy from "./pages/CancellationPolicy";

// Layout with Navbar + Footer + BottomNav
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <BottomNav /> {/* ✅ Added here */}
  </>
);

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/booking" element={<Layout><Booking /></Layout>} />
        <Route path="/samagri" element={<Layout><Samagri /></Layout>} />
        <Route path="/premium-pandits" element={<Layout><PremiumPandits /></Layout>} />
        <Route path="/searching" element={<Layout><SearchingPandit /></Layout>} />

        {/* Pandit */}
        <Route path="/pandit/signup" element={<Layout><PanditSignup /></Layout>} />
        <Route path="/pandit/login" element={<Layout><PanditLogin /></Layout>} />
        <Route path="/pandit/dashboard" element={<Layout><PanditDashboard /></Layout>} />

        {/* Customer (No Navbar/Footer/BottomNav) */}
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />

        {/* Policies */}
        <Route path="/privacy-policy" element={<Layout><PrivacyPolicy /></Layout>} />
        <Route path="/terms-conditions" element={<Layout><TermsConditions /></Layout>} />
        <Route path="/cancellation-policy" element={<Layout><CancellationPolicy /></Layout>} />

       <Route path="/samagri/:slug" element={<Layout><SamagriPage /></Layout>} />

{/* Fallback */}
<Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;