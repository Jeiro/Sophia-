import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import ConsultationBooking from './pages/consultation-booking';
import Contact from './pages/contact';
import CryptoTradingMastery from './pages/crypto-trading-mastery';
import SuccessStories from './pages/success-stories';
import About from './pages/about';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/consultation-booking" element={<ConsultationBooking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/crypto-trading-mastery" element={<CryptoTradingMastery />} />
        <Route path="/success-stories" element={<SuccessStories />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
