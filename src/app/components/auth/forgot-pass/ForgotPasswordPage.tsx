"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    setIsLoading(true);
    // Simulate sending OTP request and redirect to dedicated /verify-otp page
    setTimeout(() => {
      setIsLoading(false);
      router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
    }, 600);
  };

  return (
    <div
      className={`${jakarta.className} min-h-screen w-full flex bg-white text-[#111827]`}
    >
      {/* Left Blue Decorative Panel with Centered Logo */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#1D35B8] items-center justify-center">
        {/* Overlapping Circular Rings SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 920"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="115"
            cy="495"
            r="445"
            stroke="#2D47CC"
            strokeWidth="78"
          />
          <circle
            cx="635"
            cy="1285"
            r="755"
            stroke="#2D47CC"
            strokeWidth="78"
          />
        </svg>

        {/* Centered White Logo */}
        <div className="relative z-10 flex items-center gap-3 text-white">
          <svg
            className="w-11 h-11 text-white"
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
          <span className="text-[38px] font-extrabold tracking-tight leading-none text-white">
            FastT<span className="text-[#F59E0B]">i</span>x
          </span>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-[48%] min-h-screen flex items-center justify-center px-6 sm:px-12 bg-white">
        <div className="w-full max-w-[396px]">
          {/* Brand Name */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-[25px] font-extrabold tracking-[-0.02em] leading-none text-[#182677]">
                FastT
                <span className="text-[#F59E0B]">i</span>
                x
              </span>
            </Link>
          </div>

          {/* Heading */}
          <div className="mt-14">
            <h1 className="text-[23px] font-bold text-[#111827] tracking-[-0.015em]">
              Forgot Password?
            </h1>
            <p className="mt-1.5 text-[13.5px] text-[#64748B] font-normal">
              Enter your email address and we will send a 6-digit OTP code to reset your password.
            </p>
          </div>

          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[13.5px] font-medium text-[#111827] mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                disabled={isLoading}
                className="w-full h-[42px] px-3.5 rounded-[8px] border border-[#E2E8F0] bg-white text-[13.5px] text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1D35B8] focus:ring-2 focus:ring-[#1D35B8]/15 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full h-[42px] rounded-[8px] bg-[#1D35B8] hover:bg-[#182677] active:bg-[#152068] disabled:bg-[#98A8F8] text-white font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-xs"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            <div className="mt-4 text-center">
              <Link
                href="/login"
                className="text-[13px] font-medium text-[#64748B] hover:text-[#1D35B8] transition-colors"
              >
                ← Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
