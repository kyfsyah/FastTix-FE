"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authService, User } from "@/lib/auth";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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

  const isHomeActive = pathname === "/";
  const isExploreActive = pathname.startsWith("/explore");
  const isContactActive = pathname.startsWith("/contact-us") || pathname.startsWith("/contact");

  return (
    <>
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
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition ${
                isHomeActive
                  ? "font-semibold text-white bg-[#1D63E8] shadow-xs"
                  : "text-white/90 hover:text-white"
              }`}
            >
              Home
            </Link>
            <Link
              href="/explore"
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition ${
                isExploreActive
                  ? "font-semibold text-white bg-[#1D63E8] shadow-xs"
                  : "text-white/90 hover:text-white"
              }`}
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
              href="/contact-us"
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium transition ${
                isContactActive
                  ? "font-semibold text-white bg-[#1D63E8] shadow-xs"
                  : "text-white/90 hover:text-white"
              }`}
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

            {/* Auth Button / Profile Dropdown */}
            {loading ? (
              <div className="w-9 h-9 bg-[#243CA8] rounded-full animate-pulse" />
            ) : user ? (
              <ProfileDropdown user={user} onLogout={handleLogout} />
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
    </>
  );
}
