"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { authService, User } from "@/lib/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);
  const [rekomendasiOffset, setRekomendasiOffset] = useState(0);

  // Search input state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const syncUser = async () => {
      const cached = authService.getUser();
      if (cached && isMounted) {
        setUser(cached);
      }

      if (authService.isAuthenticated()) {
        try {
          const res = await authService.getProfile();
          if (res?.user && isMounted) {
            setUser(res.user);
          }
        } catch {
          authService.logout();
          if (isMounted) {
            setUser(null);
          }
        }
      }

      if (isMounted) {
        setLoading(false);
      }
    };

    syncUser();

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle outside click to close search bar
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node)
      ) {
        if (!searchQuery.trim()) {
          setIsSearchOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchQuery]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
  };

  const toggleSearch = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 150);
    } else {
      if (searchQuery.trim()) {
        // Submit search action
        console.log("Searching for:", searchQuery);
      } else {
        setIsSearchOpen(false);
      }
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (searchQuery.trim()) {
        console.log("Performing search for:", searchQuery);
      }
    } else if (e.key === "Escape") {
      setIsSearchOpen(false);
    }
  };

  // 9 Hero Slides to match the 9 pagination dots in the reference
  const heroBanners = [
    { id: 1, label: "Banner Slide 1" },
    { id: 2, label: "Banner Slide 2" },
    { id: 3, label: "Banner Slide 3" },
    { id: 4, label: "Banner Slide 4" },
    { id: 5, label: "Banner Slide 5" },
    { id: 6, label: "Banner Slide 6" },
    { id: 7, label: "Banner Slide 7" },
    { id: 8, label: "Banner Slide 8" },
    { id: 9, label: "Banner Slide 9" },
  ];

  const totalSlides = heroBanners.length;

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  // Auto-play slider every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Helper to get relative circular index (-3 to +3) for the 3D stacked banner carousel
  const getRelativeOffset = (index: number) => {
    let diff = index - activeSlide;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  // Rekomendasi Event data (English)
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

  // Event Categories data (English)
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
      name: "Sports",
      icon: (
        <svg className="w-6 h-6 text-[#1E52E8]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm1 2v2h3v6H4v2h7v-2.1a3 3 0 0 1 0-5.8V7H4Zm9 0v2.1a3 3 0 0 1 0 5.8V17h7v-2h-3V9h3V7h-7Zm-1 4a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
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

  // Upcoming Events data (English)
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
    <div className="min-h-screen bg-white flex flex-col font-sans select-none text-slate-800 overflow-x-hidden">
      {/* 1. TOP MICRO BAR */}
      <div className="w-full bg-[#09133C] text-white/90 py-1.5 px-4 text-[11px] font-medium">
        <div className="max-w-[1240px] mx-auto flex items-center justify-center gap-6">
          <Link href="#" className="hover:text-white transition">Our Journey</Link>
          <Link href="#" className="hover:text-white transition">Pricing</Link>
          <Link href="#" className="hover:text-white transition">Wristbands</Link>
          <Link href="#" className="hover:text-white transition">FAQ</Link>
        </div>
      </div>

      {/* 2. MAIN NAVBAR */}
      <header className="w-full bg-[#152D9C] sticky top-0 z-50 shadow-xs">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between">
          {/* Logo Brand FastTix */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {/* Artatix-inspired geometric A / Tix triangle mark */}
            <svg
              className="w-6 h-6 text-white"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M14 3.5L3.5 23.5H9.5L14 14.5L18.5 23.5H24.5L14 3.5Z"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M11 20.5H17"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[23px] font-extrabold tracking-tight leading-none text-white">
              FastT<span className="text-[#F59E0B]">i</span>x
            </span>
          </Link>

          {/* Center Navigation Pill Container */}
          <nav className="hidden md:flex items-center bg-[#233CA9] p-1 rounded-full border border-white/10">
            <Link
              href="/"
              className="px-4 py-1.5 rounded-full text-[12.5px] font-semibold text-white bg-[#1D63E8] shadow-xs transition"
            >
              Home
            </Link>
            <Link
              href="#"
              className="px-4 py-1.5 rounded-full text-[12.5px] font-medium text-white/90 hover:text-white transition"
            >
              Explore
            </Link>
            <Link
              href="#"
              className="px-4 py-1.5 rounded-full text-[12.5px] font-medium text-white/90 hover:text-white transition"
            >
              About
            </Link>
            <Link
              href="#"
              className="px-4 py-1.5 rounded-full text-[12.5px] font-medium text-white/90 hover:text-white transition"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2.5">
            {/* Expandable Search Input System (Expands to the left) */}
            <div
              ref={searchContainerRef}
              className="relative flex items-center justify-end"
            >
              {/* Animated Expandable Input Box */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out flex items-center ${
                  isSearchOpen
                    ? "w-44 sm:w-60 md:w-72 opacity-100 mr-2"
                    : "w-0 opacity-0 mr-0"
                }`}
              >
                <div className="relative w-full">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search events..."
                    className="w-full h-[36px] bg-[#243CA8] border border-white/25 text-white placeholder-white/60 text-xs rounded-full pl-4 pr-7 outline-none focus:border-white/60 focus:bg-[#2B46C4] transition shadow-inner"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery("");
                        searchInputRef.current?.focus();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-xs cursor-pointer p-0.5"
                      aria-label="Clear search"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Search Toggle Icon Button */}
              <button
                type="button"
                onClick={toggleSearch}
                className={`w-[36px] h-[36px] rounded-full transition flex items-center justify-center cursor-pointer border shrink-0 ${
                  isSearchOpen
                    ? "bg-[#1D63E8] text-white border-white/30 shadow-xs"
                    : "bg-[#243CA8] hover:bg-[#2C47BE] text-white border-white/10"
                }`}
                aria-label="Search Events"
                title={isSearchOpen ? "Search" : "Open Search"}
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="7.5" />
                  <line x1="21" y1="21" x2="16.35" y2="16.35" />
                </svg>
              </button>
            </div>

            {/* Auth Button */}
            {loading ? (
              <div className="w-16 h-[34px] bg-[#243CA8] rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-white font-medium hidden sm:inline">
                  {user.nama}
                </span>
                <button
                  onClick={handleLogout}
                  className="h-[34px] px-3.5 rounded-lg text-[12px] font-semibold text-white bg-[#243CA8] hover:bg-red-600/80 border border-white/15 transition cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="h-[34px] px-4 rounded-lg text-[12px] font-semibold text-white bg-[#243CA8] hover:bg-[#2C47BE] border border-white/15 flex items-center justify-center transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* 3. LAYERED 3D HERO BANNER CAROUSEL (Big & expansive matching Artatix website) */}
      <section className="w-full max-w-[1600px] mx-auto px-2 sm:px-6 pt-6 sm:pt-8 pb-3 overflow-hidden">
        <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[520px] flex items-center justify-center">
          {heroBanners.map((slide, index) => {
            const offset = getRelativeOffset(index);
            const absOffset = Math.abs(offset);

            // Only show center slide and up to 2 stacked side layers on each side
            if (absOffset > 2) return null;

            // Layered transforms so cards peek out widely on both left and right
            let translateX = "0%";
            let scale = 1;
            let zIndex = 30;
            let opacity = 1;

            if (offset === -1) {
              translateX = "-12.5%";
              scale = 0.94;
              zIndex = 20;
              opacity = 0.88;
            } else if (offset === 1) {
              translateX = "12.5%";
              scale = 0.94;
              zIndex = 20;
              opacity = 0.88;
            } else if (offset === -2) {
              translateX = "-23.5%";
              scale = 0.87;
              zIndex = 10;
              opacity = 0.65;
            } else if (offset === 2) {
              translateX = "23.5%";
              scale = 0.87;
              zIndex = 10;
              opacity = 0.65;
            }

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (offset === -1 || offset === -2) prevSlide();
                  if (offset === 1 || offset === 2) nextSlide();
                }}
                style={{
                  transform: `translateX(${translateX}) scale(${scale})`,
                  zIndex,
                  opacity,
                }}
                className={`absolute w-[78%] md:w-[79%] lg:w-[80%] h-full rounded-[24px] sm:rounded-[32px] md:rounded-[38px] transition-all duration-500 ease-out overflow-hidden border ${
                  offset === 0
                    ? "bg-slate-100 border-slate-200/90 shadow-[0_12px_36px_rgba(15,23,42,0.12)] cursor-default"
                    : "bg-slate-200/90 border-slate-300/80 shadow-md cursor-pointer"
                }`}
              >
                {/* Empty Image Placeholder Container */}
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200/80 relative">
                  <svg
                    className="w-12 h-12 text-slate-300 mb-2.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span className="text-sm font-semibold text-slate-400 tracking-wide">
                    {slide.label}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Left Navigation Arrow Button (anchored at center card outer edge) */}
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-[8.5%] sm:left-[8.8%] top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.16)] border border-slate-100 flex items-center justify-center transition cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Arrow Button */}
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-[8.5%] sm:right-[8.8%] top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-slate-700 shadow-[0_4px_16px_rgba(0,0,0,0.16)] border border-slate-100 flex items-center justify-center transition cursor-pointer hover:scale-105 active:scale-95"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Pagination Dots (9 dots with active blue capsule matching reference) */}
        <div className="flex items-center justify-center gap-2 mt-5 mb-7">
          {heroBanners.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx
                  ? "w-7 bg-[#1D54E8]"
                  : "w-2 bg-[#BFDBFE] hover:bg-blue-300"
              }`}
              aria-label={`Select slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4. RECOMMENDED EVENTS SECTION */}
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

      {/* 5. EVENT CATEGORIES SECTION */}
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

      {/* 6. UPCOMING EVENTS SECTION */}
      <section className="w-full max-w-[1240px] mx-auto px-4 pt-4 pb-10">
        <h2 className="text-[16px] font-bold text-slate-900 mb-4">
          Upcoming Events
        </h2>

        {/* 8 Event Cards Grid (2 rows x 4 cols) */}
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
          <button
            type="button"
            className="px-5 py-2 rounded-full bg-[#EBF2FF] hover:bg-[#DBE8FF] text-[#1E52E8] text-[11.5px] font-semibold transition cursor-pointer"
          >
            View More
          </button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full bg-[#152D9C] text-white mt-auto pt-12 pb-6">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
            {/* Left Brand Column */}
            <div className="md:col-span-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-white"
                  viewBox="0 0 28 28"
                  fill="none"
                >
                  <path
                    d="M14 3.5L3.5 23.5H9.5L14 14.5L18.5 23.5H24.5L14 3.5Z"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11 20.5H17"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="text-[23px] font-extrabold tracking-tight leading-none text-white">
                  FastT<span className="text-[#F59E0B]">i</span>x
                </span>
              </div>
              <p className="text-[11.5px] text-white/80 font-normal mt-1">
                Your Professional Ticketing Partner
              </p>
            </div>

            {/* Middle Column 1: About Us */}
            <div className="md:col-span-2">
              <h3 className="text-[12px] font-bold text-white mb-3.5">About Us</h3>
              <ul className="space-y-2.5 text-[11.5px] text-white/80">
                <li><Link href="#" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Our Journey</Link></li>
                <li><Link href="#" className="hover:text-white transition">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
              </ul>
            </div>

            {/* Middle Column 2: Information */}
            <div className="md:col-span-4">
              <h3 className="text-[12px] font-bold text-white mb-3.5">Information</h3>
              <ul className="space-y-2.5 text-[11.5px] text-white/80">
                <li><Link href="#" className="hover:text-white transition">Terms & Conditions</Link></li>
                <li><Link href="#" className="hover:text-white transition">Privacy Policy & Data Processing</Link></li>
                <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="#" className="hover:text-white transition">Wristbands</Link></li>
                <li><Link href="#" className="hover:text-white transition">Ticket Validation</Link></li>
              </ul>
            </div>

            {/* Middle Column 3: Event Categories */}
            <div className="md:col-span-2">
              <h3 className="text-[12px] font-bold text-white mb-3.5">Event Categories</h3>
              <ul className="space-y-2.5 text-[11.5px] text-white/80">
                <li><Link href="#" className="hover:text-white transition">Music</Link></li>
                <li><Link href="#" className="hover:text-white transition">Exhibition</Link></li>
                <li><Link href="#" className="hover:text-white transition">Attractions</Link></li>
                <li><Link href="#" className="hover:text-white transition">Sports</Link></li>
                <li><Link href="#" className="hover:text-white transition">All Categories</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Copyright + Social Media */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/75">
            <p>&copy; 2026 FastTix. All rights reserved.</p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 text-white/90">
              {/* WhatsApp */}
              <Link href="#" className="hover:text-white transition" aria-label="WhatsApp">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.01 2.005c-5.502 0-9.98 4.478-9.98 9.98 0 1.76.46 3.48 1.33 5l-1.41 5.16 5.28-1.38a9.93 9.93 0 0 0 4.78 1.22c5.502 0 9.98-4.478 9.98-9.98s-4.478-10-9.98-10zm0 18.275a8.26 8.26 0 0 1-4.22-1.15l-.3-.18-3.13.82.83-3.05-.2-.32a8.28 8.28 0 0 1-1.26-4.415c0-4.57 3.72-8.29 8.29-8.29 4.57 0 8.29 3.72 8.29 8.29 0 4.58-3.72 8.29-8.3 8.29zm4.54-6.2c-.25-.12-1.47-.72-1.7-.81-.23-.08-.4-.12-.57.12-.17.25-.66.81-.81.98-.15.17-.3.19-.55.07-.25-.12-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.57-1.37-.78-1.87-.2-.5-.41-.43-.57-.44h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.03 2.61c.12.17 1.77 2.7 4.29 3.78.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29z"/>
                </svg>
              </Link>
              {/* Instagram */}
              <Link href="#" className="hover:text-white transition" aria-label="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
              {/* TikTok */}
              <Link href="#" className="hover:text-white transition" aria-label="TikTok">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.86 4.46 6.27 6.27 0 0 0 1.88-4.46V8.75a8.16 8.16 0 0 0 4.85 1.58V6.88a4.86 4.86 0 0 1-1-.19z"/>
                </svg>
              </Link>
              {/* X */}
              <Link href="#" className="hover:text-white transition" aria-label="X">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              {/* LinkedIn */}
              <Link href="#" className="hover:text-white transition" aria-label="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </Link>
              {/* YouTube */}
              <Link href="#" className="hover:text-white transition" aria-label="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </Link>
              {/* Facebook */}
              <Link href="#" className="hover:text-white transition" aria-label="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
