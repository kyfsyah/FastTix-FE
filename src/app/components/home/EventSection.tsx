"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function EventSection() {
  const [rekomendasiOffset, setRekomendasiOffset] = useState(0);

  // Recommended Event data
  const rekomendasiEvents = [
    {
      id: 1,
      title: "510 Genesis Spiritual Return to Or...",
      date: "13 December 2026",
      price: "Rp250.510",
      organizer: "Hectic Creative",
      avatarBg: "bg-zinc-900",
      avatarText: "HC",
    },
    {
      id: 2,
      title: "ELEVENTWELFTH // Album Show...",
      date: "06 December 2026",
      price: "Rp200.000",
      organizer: "10 PM",
      avatarBg: "bg-teal-900",
      avatarText: "10",
    },
    {
      id: 3,
      title: "Java Beat Fest",
      date: "28 November 2026",
      price: "Rp75.000",
      organizer: "Nara Creative",
      avatarBg: "bg-amber-950",
      avatarText: "NC",
    },
    {
      id: 4,
      title: "Solo City Jazz 2026",
      date: "04 - 05 December 2026",
      price: "Rp94.000",
      organizer: "Solo City Jazz",
      avatarBg: "bg-red-600",
      avatarText: "SJ",
    },
    {
      id: 5,
      title: "Sound of Downtown Vol. 4",
      date: "19 December 2026",
      price: "Rp150.000",
      organizer: "SOD Festival",
      avatarBg: "bg-indigo-900",
      avatarText: "SD",
    },
    {
      id: 6,
      title: "Jakarta Indie Music Fest",
      date: "27 December 2026",
      price: "Rp125.000",
      organizer: "Suara Indie",
      avatarBg: "bg-blue-900",
      avatarText: "SI",
    },
  ];

  const nextRekomendasi = () => {
    setRekomendasiOffset((prev) =>
      prev + 1 > rekomendasiEvents.length - 4 ? 0 : prev + 1
    );
  };

  const prevRekomendasi = () => {
    setRekomendasiOffset((prev) =>
      prev - 1 < 0 ? Math.max(0, rekomendasiEvents.length - 4) : prev - 1
    );
  };

  // Event Categories data
  const categories = [
    {
      name: "Music",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.44 3.11a1.5 1.5 0 0 0-2.12 0l-4.6 4.6-1.88-.47a2 2 0 0 0-1.9.53l-1.5 1.5a1 1 0 0 0 0 1.41l.7.71-2.83 2.83a3.5 3.5 0 1 0 3.54 3.54l2.83-2.83.71.7a1 1 0 0 0 1.41 0l1.5-1.5a2 2 0 0 0 .53-1.9l-.47-1.88 4.6-4.6a1.5 1.5 0 0 0 0-2.12l-.52-.52ZM8.5 17.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
        </svg>
      ),
    },
    {
      name: "Exhibition",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 3h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 2v7h12V5H6Zm-1 11h2v3h3v2H3v-2h2v-3Zm12 0h2v3h2v2h-7v-2h3v-3Zm-9 1a4 4 0 0 0 8 0h-2a2 2 0 0 1-4 0H8Z" />
        </svg>
      ),
    },
    {
      name: "Theater",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 2v5c2.2 0 4-2.2 4-5H5Zm14 0h-4c0 2.8 1.8 5 4 5V5ZM5 12v7h3v-4c0-1.3-.8-2.4-2-2.8L5 12Zm14 0-1 .2c-1.2.4-2 1.5-2 2.8v4h3v-7Z" />
        </svg>
      ),
    },
    {
      name: "Attraction",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a7 7 0 0 1 7 7c0 4.5-5 9.8-6.4 11.2a.8.8 0 0 1-1.2 0C10 18.8 5 13.5 5 9a7 7 0 0 1 7-7Zm0 4a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM4 20h16v2H4v-2Z" />
        </svg>
      ),
    },
    {
      name: "Talkshow",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 1 1-6 0V5a3 3 0 0 1 3-3Zm5 9a5 5 0 0 1-4 4.9V19h3v2H8v-2h3v-3.1A5 5 0 0 1 7 11H5a7 7 0 0 0 14 0h-2Z" />
        </svg>
      ),
    },
    {
      name: "Workshop",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 3h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-6.4l2.7 4.5-1.7 1-3.3-5.5h-.6l-3.3 5.5-1.7-1L9.4 16H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 3v2h14V6H5Zm0 4v2h10v-2H5Z" />
        </svg>
      ),
    },
    {
      name: "Competition",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 2h12v2h3a1 1 0 0 1 1 1v3a4 4 0 0 1-4 4h-.3A6 6 0 0 1 13 15.9V19h4v2H7v-2h4v-3.1A6 6 0 0 1 6.3 12H6a4 4 0 0 1-4-4V5a1 1 0 0 1 1-1h3V2Zm0 4H4v2a2 2 0 0 0 2 2V6Zm12 4a2 2 0 0 0 2-2V6h-2v4Z" />
        </svg>
      ),
    },
  ];

  // Upcoming Events data
  const eventTerdekat = [
    {
      id: 1,
      title: "OBELIX SEA VIEW'S NOVEMBER",
      date: "01 - 29 November 2026",
      price: "17 Sessions",
      organizer: "OBELIX SEA VIEW YOGYAKARTA",
      avatarBg: "bg-slate-200 text-slate-700",
      avatarText: "OS",
    },
    {
      id: 2,
      title: "Weekend Hardcore",
      date: "20 November 2026",
      price: "Rp40.000",
      organizer: "Solo City Hardcore",
      avatarBg: "bg-zinc-900 text-white",
      avatarText: "SH",
    },
    {
      id: 3,
      title: "Sharia Fest",
      date: "20 November 2026",
      price: "Rp55.000",
      organizer: "DEMA Fakultas Syariah UIN Rade...",
      avatarBg: "bg-emerald-900 text-white",
      avatarText: "DF",
    },
    {
      id: 4,
      title: "RUANG RIANG INTIMATE SHOW",
      date: "20 - 27 November 2026",
      price: "2 Sessions",
      organizer: "Nusawarna_events",
      avatarBg: "bg-slate-100 text-slate-600 border border-slate-300",
      avatarText: "NW",
    },
    {
      id: 5,
      title: "Nurul Fajri Festival 6.0",
      date: "21 November 2026",
      price: "Rp40.000",
      organizer: "Nurul Fajri Festival 6.0",
      avatarBg: "bg-indigo-950 text-white",
      avatarText: "NF",
    },
    {
      id: 6,
      title: "Eternal Blast Fest 2026",
      date: "21 November 2026",
      price: "Rp36.666",
      organizer: "Eternal Blast",
      avatarBg: "bg-stone-900 text-amber-400",
      avatarText: "EB",
    },
    {
      id: 7,
      title: "RONA TIMURIA",
      date: "21 - 22 November 2026",
      price: "Rp99.900",
      organizer: "EASTVES",
      avatarBg: "bg-orange-50 text-orange-600 border border-orange-200",
      avatarText: "EV",
    },
    {
      id: 8,
      title: "Festival Otomotif SENIORIA 202...",
      date: "21 November 2026",
      price: "Rp25.000",
      organizer: "PT Global Ahensi Solusindo",
      avatarBg: "bg-red-50 text-red-600 border border-red-200",
      avatarText: "GA",
    },
  ];

  const visibleRekomendasi = rekomendasiEvents.slice(
    rekomendasiOffset,
    rekomendasiOffset + 4
  );

  return (
    <>
      {/* RECOMMENDED EVENTS SECTION */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pt-6 pb-4">
        <h2 className="text-[16px] font-bold text-slate-900 mb-4">
          Recommended Events
        </h2>

        <div className="relative">
          {/* 4 Event Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {visibleRekomendasi.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Blank Image Placeholder Box */}
                  <div className="w-full aspect-[2.1/1] rounded-xl bg-slate-100 border border-slate-200/60 flex flex-col items-center justify-center text-slate-300 mb-3 group-hover:bg-slate-100/80 transition">
                    <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>

                  <div className="px-1">
                    <h3 className="text-[13px] font-bold text-slate-900 truncate" title={evt.title}>
                      {evt.title}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                      <svg className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <span>{evt.date}</span>
                    </div>

                    <p className="mt-2 text-[14px] font-extrabold text-slate-900">
                      {evt.price}
                    </p>
                  </div>
                </div>

                {/* Dashed Divider + Organizer Footer */}
                <div className="px-1">
                  <div className="border-t border-dashed border-slate-200 my-2.5" />
                  <div className="flex items-center gap-2 pb-0.5">
                    <div
                      className={`w-6 h-6 rounded-full ${evt.avatarBg} text-white flex items-center justify-center text-[9px] font-bold shrink-0`}
                    >
                      {evt.avatarText}
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 truncate">
                      {evt.organizer}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left Carousel Arrow */}
          <button
            type="button"
            onClick={prevRekomendasi}
            className="hidden md:flex absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-slate-100 items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer z-10 transition"
            aria-label="Previous"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Carousel Arrow */}
          <button
            type="button"
            onClick={nextRekomendasi}
            className="hidden md:flex absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] border border-slate-100 items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer z-10 transition"
            aria-label="Next"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* EVENT CATEGORIES SECTION */}
      <section className="w-full max-w-[1240px] mx-auto px-4 py-6">
        <h2 className="text-[16px] font-bold text-slate-900 mb-5">
          Event Categories
        </h2>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <button
              key={i}
              type="button"
              className="flex flex-col items-center gap-2.5 group cursor-pointer"
            >
              <div className="w-[52px] h-[52px] rounded-full bg-[#F1F5FF] group-hover:bg-[#E0EAFF] flex items-center justify-center transition">
                {cat.icon}
              </div>
              <span className="text-[11px] font-medium text-slate-500 px-3 py-0.5 rounded-full border border-slate-200 bg-white group-hover:border-blue-400 group-hover:text-[#1E52E8] transition">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pt-4 pb-10">
        <h2 className="text-[16px] font-bold text-slate-900 mb-4">
          Upcoming Events
        </h2>

        {/* 8 Event Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {eventTerdekat.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md transition flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Blank Image Placeholder Box */}
                <div className="w-full aspect-[2.1/1] rounded-xl bg-slate-100 border border-slate-200/60 flex flex-col items-center justify-center text-slate-300 mb-3 group-hover:bg-slate-100/80 transition">
                  <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>

                <div className="px-1">
                  <h3 className="text-[13px] font-bold text-slate-900 truncate" title={evt.title}>
                    {evt.title}
                  </h3>

                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <svg className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{evt.date}</span>
                  </div>

                  <p className="mt-2 text-[14px] font-extrabold text-slate-900">
                    {evt.price}
                  </p>
                </div>
              </div>

              {/* Dashed Divider + Organizer Footer */}
              <div className="px-1">
                <div className="border-t border-dashed border-slate-200 my-2.5" />
                <div className="flex items-center gap-2 pb-0.5">
                  <div
                    className={`w-6 h-6 rounded-full ${evt.avatarBg} flex items-center justify-center text-[9px] font-bold shrink-0`}
                  >
                    {evt.avatarText}
                  </div>
                  <span className="text-[11px] font-medium text-slate-500 truncate">
                    {evt.organizer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "View More" Pill Button */}
        <div className="flex justify-center mt-8">
          <Link href="/explore">
            <button
              type="button"
              className="px-5 py-2 rounded-full bg-[#EBF2FF] hover:bg-[#DBE8FF] text-[#1E52E8] text-[11.5px] font-semibold transition cursor-pointer"
            >
              View More
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}
