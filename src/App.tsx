import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout";

import Home from "./pages/Home";
import GstCalculator from "./pages/GstCalculator";
import PercentageCalculator from "./pages/PercentageCalculator";
import ReversePercentageCalculator from "./pages/ReversePercentageCalculator";
import DiscountCalculator from "./pages/DiscountCalculator";
import ProfitMarginCalculator from "./pages/ProfitMarginCalculator";
import AgeCalculator from "./pages/AgeCalculator";
import EmiCalculator from "./pages/EmiCalculator";
import LoanCalculator from "./pages/LoanCalculator";
import SipCalculator from "./pages/SipCalculator";
import FdCalculator from "./pages/FdCalculator";
import QRGenerator from "./pages/QRGenerator";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("config", "G-7RVF4PLTN7", {
        page_path: `${location.pathname}${location.search}`,
        page_location: window.location.href,
      });
    }
  }, [location.pathname, location.search]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AnalyticsTracker />
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gst-calculator" element={<GstCalculator />} />
            <Route path="/percentage-calculator" element={<PercentageCalculator />} />
            <Route path="/reverse-percentage-calculator" element={<ReversePercentageCalculator />} />
            <Route path="/discount-calculator" element={<DiscountCalculator />} />
            <Route path="/profit-margin-calculator" element={<ProfitMarginCalculator />} />
            <Route path="/age-calculator" element={<AgeCalculator />} />
            <Route path="/emi-calculator" element={<EmiCalculator />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/sip-calculator" element={<SipCalculator />} />
            <Route path="/fd-calculator" element={<FdCalculator />} />
            <Route path="/qr-code-generator" element={<QRGenerator />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions" element={<Terms />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}
