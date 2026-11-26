"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@example.com";

  // OTP state (6 separate digit boxes)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  // 60-second countdown timer
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Auto-focus first input on load
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Countdown timer: 60s decreasing to 0
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft]);

  // Handle single digit input & auto-advance
  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-advance to next box if digit entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace to focus previous box
  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste 6 digits from clipboard
  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pasteData) {
      const newOtp = [...otp];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const nextIndex = Math.min(pasteData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  // Resend OTP: restarts 60s countdown
  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
  };

  // Verify OTP submit handler
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) return;

    setIsVerifying(true);
    // Simulate verification
    setTimeout(() => {
      setIsVerifying(false);
      setVerifySuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }, 800);
  };

  return (
    <div
      className={`${jakarta.className} min-h-screen w-full flex bg-white text-[#111827]`}
    >
      {/* Left Blue Decorative Panel with Centered Logo matching screenshot */}
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

        {/* Centered White Logo matching screenshot */}
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

      {/* Right OTP Verification Panel matching screenshots 1 & 2 */}
      <div className="w-full lg:w-[48%] min-h-screen flex items-center justify-center px-6 sm:px-12 bg-white">
        <div className="w-full max-w-[420px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-[25px] sm:text-[27px] font-bold text-[#111827] tracking-tight">
              Enter OTP code
            </h1>
            <p className="mt-2 text-[13px] text-[#64748B] leading-relaxed">
              Please check your email. OTP code has been sent to{" "}
              <span className="font-semibold text-[#1D35B8]">{email}</span>
            </p>
          </div>

          {verifySuccess && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <svg
                className="w-4 h-4 text-emerald-600 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>OTP verified successfully! Redirecting...</span>
            </div>
          )}

          {/* OTP Form */}
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            {/* 6 Digit Input Boxes */}
            <div className="flex items-center justify-between gap-2 sm:gap-2.5">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputRefs.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  onPaste={handleOtpPaste}
                  className="w-11 h-12 sm:w-12 sm:h-13 rounded-xl border border-slate-200 bg-white text-center text-xl font-bold text-slate-800 focus:outline-none focus:border-[#1D35B8] focus:ring-2 focus:ring-[#1D35B8]/15 transition shadow-2xs"
                />
              ))}
            </div>

            {/* 60 Seconds Countdown or Resend Button */}
            <div className="text-center pt-1">
              <p className="text-[12.5px] text-[#64748B]">
                Didn&apos;t receive the OTP code?{" "}
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-semibold text-[#1D35B8] hover:underline cursor-pointer"
                  >
                    Resend OTP
                  </button>
                ) : (
                  <>
                    <span className="font-semibold text-[#1D35B8]">
                      {timeLeft}
                    </span>{" "}
                    seconds to resend
                  </>
                )}
              </p>
            </div>

            {/* Submit Button (-> Sign In / Masuk) */}
            <button
              type="submit"
              disabled={isVerifying || otp.join("").length < 6}
              className="w-full h-[44px] rounded-xl bg-[#2A52BE] hover:bg-[#1D35B8] active:bg-[#152068] disabled:bg-[#98A8F8] text-white font-semibold text-[13.5px] flex items-center justify-center gap-2 transition cursor-pointer disabled:cursor-not-allowed shadow-xs"
            >
              {isVerifying ? (
                <span>Verifying...</span>
              ) : (
                <>
                  {/* Arrow / Login Icon matching screenshot */}
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Back button */}
            <div className="text-center pt-2">
              <Link
                href="/forgot-password"
                className="text-[12.5px] text-slate-500 hover:text-slate-800 transition"
              >
                ← Change Email Address
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white text-slate-500 text-xs">
          Loading OTP verification...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
