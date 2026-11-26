"use client";

import React, { useState, useEffect, useCallback } from "react";

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  // 9 Hero Slides matching reference
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

  // Helper to get relative circular index (-3 to +3) for 3D stacked banner carousel
  const getRelativeOffset = (index: number) => {
    let diff = index - activeSlide;
    if (diff > totalSlides / 2) diff -= totalSlides;
    if (diff < -totalSlides / 2) diff += totalSlides;
    return diff;
  };

  return (
    <section className="w-full max-w-[1600px] mx-auto px-2 sm:px-6 pt-6 sm:pt-8 pb-3 overflow-hidden">
      <div className="relative w-full h-[260px] sm:h-[380px] md:h-[480px] lg:h-[520px] flex items-center justify-center">
        {heroBanners.map((slide, index) => {
          const offset = getRelativeOffset(index);
          const absOffset = Math.abs(offset);

          // Only show center slide and up to 2 stacked side layers on each side
          if (absOffset > 2) return null;

          // Layered transforms
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

        {/* Left Navigation Arrow */}
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

        {/* Right Navigation Arrow */}
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

      {/* Pagination Dots */}
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
  );
}
