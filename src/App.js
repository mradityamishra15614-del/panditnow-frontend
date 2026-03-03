import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";

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
import PanditInPatna from "./pages/PanditInPatna";
import PanditNearMe from "./pages/PanditNearMe";
import HowEnterDetails from "./pages/HowEnterDetails";
import HowMatchingWorks from "./pages/HowMatchingWorks";
import HowOtpWorks from "./pages/HowOtpWorks";
import HowCompletionWorks from "./pages/HowCompletionWorks";

// Layout with Navbar + Footer + BottomNav
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
    <BottomNav /> {/* ✅ Added here */}
  </>
);
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.initialize("G-YXX1MT0ZSC");
  }, []);

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);

  return null;
}
function App() {
  return (
   <Router>
  <AnalyticsTracker />
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
       <Route path="/pandit-in-patna" element={<PanditInPatna />} />
 <Route path="/pandit-near-me" element={<PanditNearMe />} />

<Route path="/how-enter-details" element={<Layout><HowEnterDetails /></Layout>} />
<Route path="/how-matching-works" element={<Layout><HowMatchingWorks /></Layout>} />
<Route path="/how-otp-works" element={<Layout><HowOtpWorks /></Layout>} />
<Route path="/how-completion-works" element={<Layout><HowCompletionWorks /></Layout>} />
{/* Fallback */}
<Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;