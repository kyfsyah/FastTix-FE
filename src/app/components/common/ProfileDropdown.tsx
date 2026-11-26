"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User } from "@/lib/auth";

interface ProfileDropdownProps {
  user: User;
  onLogout: () => void;
}

export default function ProfileDropdown({ user, onLogout }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayName = user.nama || user.email.split("@")[0] || "User";
  const displayEmail = user.email || "user@example.com";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <div ref={dropdownRef} className="relative">
      {/* Navbar Avatar Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-[36px] h-[36px] rounded-full bg-[#0F2274] border-2 border-white/60 hover:border-white text-white flex items-center justify-center font-bold text-xs shadow-xs transition hover:scale-105 cursor-pointer relative overflow-hidden"
        aria-label="User profile menu"
      >
        {/* Cool Avatar Illustration / Initial Icon */}
        <span className="text-white text-[13px] font-extrabold tracking-tight">
          {userInitial}
        </span>
      </button>

      {/* Floating Dropdown Card matching screenshot */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2.5 w-64 rounded-2xl bg-white border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.12)] p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Section: Avatar + Name + Email */}
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="w-10 h-10 rounded-full bg-[#152D9C] text-white flex items-center justify-center font-extrabold text-sm shrink-0 border border-slate-200">
              {userInitial}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-[13px] font-bold text-slate-900 truncate leading-snug">
                {displayName}
              </h4>
              <p className="text-[11.5px] text-slate-500 truncate leading-tight mt-0.5">
                {displayEmail}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-100 my-1.5" />

          {/* Menu Items */}
          <div className="space-y-0.5">
            {/* 1. Profil */}
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              <svg
                className="w-4 h-4 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Profil</span>
            </Link>

            {/* 2. Transaksi */}
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              <svg
                className="w-4 h-4 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="16" rx="3" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 9h6m-6 3h4m4 3l3-3m0 0l-3-3m3 3H7" />
              </svg>
              <span>Transaksi</span>
            </Link>

            {/* 3. Tiket Saya */}
            <Link
              href="#"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-[12.5px] font-medium text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition"
            >
              <svg
                className="w-4 h-4 text-slate-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <span>Tiket Saya</span>
            </Link>
          </div>

          <div className="border-t border-slate-100 my-1.5" />

          {/* 4. Log out in RED */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[12.5px] font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer text-left"
          >
            <svg
              className="w-4 h-4 text-rose-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span>Log out</span>
          </button>
        </div>
      )}
    </div>
  );
}
