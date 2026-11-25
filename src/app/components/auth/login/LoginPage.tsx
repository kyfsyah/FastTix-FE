"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authService } from "@/lib/auth";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await authService.login({
        email: email.trim(),
        password,
      });

      setSuccessMessage(res.message || "Login successful!");
      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while signing in. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`${jakarta.className} min-h-screen w-full flex bg-white text-[#111827] select-none`}
    >
      {/* Left Blue Decorative Panel */}
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden bg-[#1D35B8] items-center justify-center">
        {/* Overlapping Circular Rings SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 920"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="ringShadow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="6"
                stdDeviation="18"
                floodColor="#0A1563"
                floodOpacity="0.45"
              />
            </filter>
          </defs>

          {/* Upper-left circle ring */}
          <circle
            cx="115"
            cy="495"
            r="445"
            stroke="#2D47CC"
            strokeWidth="78"
          />

          {/* Lower-right overlapping circle ring with subtle shadow */}
          <circle
            cx="635"
            cy="1285"
            r="755"
            stroke="#2D47CC"
            strokeWidth="78"
            filter="url(#ringShadow)"
          />
        </svg>
      </div>

      {/* Right Login Form Panel */}
      <div className="w-full lg:w-[48%] min-h-screen flex items-center justify-center px-6 sm:px-12 bg-white">
        <div className="w-full max-w-[396px]">
          {/* Header: Brand Name (Language selector removed) */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-[25px] font-extrabold tracking-[-0.02em] leading-none text-[#182677]">
                FastT
                <span className="text-[#F59E0B]">i</span>
                x
              </span>
            </Link>
          </div>

          {/* Welcome Text */}
          <div className="mt-14">
            <h1 className="text-[21px] font-bold text-[#111827] tracking-[-0.015em]">
              Welcome back!
            </h1>
            <p className="mt-1.5 text-[13.5px] text-[#64748B] font-normal">
              Please sign in to continue to your account.
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[13px] flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="mt-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[13px] flex items-start gap-2">
              <svg
                className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Login Form */}
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

            <div>
              <label
                htmlFor="password"
                className="block text-[13.5px] font-medium text-[#111827] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  disabled={isLoading}
                  className="w-full h-[42px] pl-3.5 pr-10 rounded-[8px] border border-[#E2E8F0] bg-white text-[13.5px] text-[#111827] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#1D35B8] focus:ring-2 focus:ring-[#1D35B8]/15 disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors cursor-pointer"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[18px] h-[18px]"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-[18px] h-[18px]"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 w-full h-[42px] rounded-[8px] bg-[#1D35B8] hover:bg-[#182677] active:bg-[#152068] disabled:bg-[#98A8F8] text-white font-semibold text-[13.5px] flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {/* Log-in Icon */}
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[15px] h-[15px]"
                  >
                    <path
                      d="M12.5 3.33334H15C15.442 3.33334 15.866 3.50894 16.1785 3.82149C16.4911 4.13406 16.6667 4.55798 16.6667 5.00001V15C16.6667 15.442 16.4911 15.866 16.1785 16.1785C15.866 16.4911 15.442 16.6667 15 16.6667H12.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.33334 13.3333L11.6667 10L8.33334 6.66667"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6667 10H3.33334"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Don't have an account */}
          <div className="mt-5 text-center">
            <p className="text-[13px] text-[#64748B]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#1D35B8] hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
