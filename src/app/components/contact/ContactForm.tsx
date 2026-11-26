"use client";

import React, { useState, useRef, useEffect } from "react";

const SUBJECT_OPTIONS = [
  { value: "partnership", label: "Partnership" },
  { value: "ticket_issue", label: "Ticketing Issue" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubjectOpen, setIsSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);

  // Close subject dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (subjectRef.current && !subjectRef.current.contains(e.target as Node)) {
        setIsSubjectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedSubjectLabel =
    SUBJECT_OPTIONS.find((opt) => opt.value === formData.subject)?.label || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate sending message
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 5000);
    }, 700);
  };

  return (
    <div className="w-full bg-white rounded-3xl p-7 sm:p-9 border border-slate-100 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
      {/* Card Header */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Get in touch with us
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Contact us anytime
        </p>
      </div>

      {submitted && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
          <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>Thank you! Your message has been sent successfully. Our team will contact you shortly.</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Full Name */}
        <div>
          <label className="block text-[12px] font-semibold text-slate-800 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter your full name"
            className="w-full h-[42px] px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-2xs"
          />
        </div>

        {/* 2. Email */}
        <div>
          <label className="block text-[12px] font-semibold text-slate-800 mb-1.5">
            Email <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter your email"
            className="w-full h-[42px] px-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition shadow-2xs"
          />
        </div>

        {/* 3. Subject Custom Dropdown matching screenshot */}
        <div>
          <label className="block text-[12px] font-semibold text-slate-800 mb-1.5">
            Subject <span className="text-rose-500">*</span>
          </label>
          <div ref={subjectRef} className="relative">
            {/* Hidden input for form required check */}
            <input
              type="text"
              required
              readOnly
              value={formData.subject}
              className="sr-only"
              tabIndex={-1}
            />

            {/* Trigger Box */}
            <button
              type="button"
              onClick={() => setIsSubjectOpen(!isSubjectOpen)}
              className={`w-full h-[42px] px-3.5 rounded-xl border bg-white text-xs flex items-center justify-between cursor-pointer transition shadow-2xs ${
                isSubjectOpen
                  ? "border-blue-500 ring-1 ring-blue-500 text-slate-800"
                  : "border-slate-200 text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className={selectedSubjectLabel ? "text-slate-800 font-medium" : "text-slate-400"}>
                {selectedSubjectLabel || "Select subject"}
              </span>
              <svg
                className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                  isSubjectOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Floating Dropdown Options matching 2 choices: Partnership & Ticketing Issue */}
            {isSubjectOpen && (
              <div className="absolute left-0 right-0 top-full mt-1.5 rounded-xl border border-slate-200/90 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] py-1.5 z-30 animate-in fade-in zoom-in-95 duration-150">
                {SUBJECT_OPTIONS.map((opt) => {
                  const isSelected = formData.subject === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, subject: opt.value });
                        setIsSubjectOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs transition cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? "bg-[#EEF4FF] text-[#1E52E8] font-semibold"
                          : "text-slate-700 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* 4. Message */}
        <div>
          <label className="block text-[12px] font-semibold text-slate-800 mb-1.5">
            Message
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Enter your message"
            className="w-full p-3.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none shadow-2xs"
          />
        </div>

        {/* 5. Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[44px] rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold tracking-wide transition cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending...
              </span>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
