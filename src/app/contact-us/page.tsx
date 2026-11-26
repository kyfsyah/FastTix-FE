import React from "react";
import Navbar from "@/app/components/common/Navbar";
import Footer from "@/app/components/common/Footer";
import ContactPage from "@/app/components/contact/ContactPage";

export const metadata = {
  title: "Contact Us - FastTix",
  description: "Get in touch with the FastTix team for partnership inquiries, event management, and ticketing support.",
};

export default function ContactUsRoute() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 overflow-x-hidden">
      {/* Reusable Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1240px] mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <ContactPage />
      </main>

      {/* Reusable Footer */}
      <Footer />
    </div>
  );
}
