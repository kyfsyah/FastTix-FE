import React from "react";
import ContactInfo from "./ContactInfo";
import ContactForm from "./ContactForm";

export default function ContactPage() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Contact Information & Description */}
        <div className="lg:col-span-6 lg:pt-2">
          <ContactInfo />
        </div>

        {/* Right Column: Contact Us Form Card */}
        <div className="lg:col-span-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
