import React from "react";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import ExplorePage from "@/app/components/explore/ExplorePage";

export const metadata = {
  title: "Explore Events - FastTix",
  description: "Discover and browse all upcoming live music festivals, concerts, and tickets on FastTix.",
};

export default function ExploreRoute() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 overflow-x-hidden">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-8">
        <ExplorePage />
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
