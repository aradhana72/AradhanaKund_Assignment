// src/AppRouter.js
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import HeroSection from "./HomePage/HeroSection/heroSection";
import CheckoutPage from "./CheckoutPage/CheckoutPage";
import WishlistPage from "./WishlistPage/WishlistPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
