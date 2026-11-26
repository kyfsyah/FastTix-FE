import React from "react";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import HomePage from "@/app/components/home/HomePage";

export const metadata = {
  title: "FastTix - Your Professional Ticketing Partner",
  description: "Official ticketing platform for music festivals, band concerts, and premier live events.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 overflow-x-hidden">
      {/* Reusable Dynamic Navbar with Profile Dropdown */}
      <Navbar />

      {/* Modular Home Content */}
      <HomePage />

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
