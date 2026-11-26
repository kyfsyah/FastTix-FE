"use client";

import React, { useState, useRef, useEffect } from "react";

export interface FilterState {
  location: string;
  category: string;
  time: string;
  price: string;
  sort: string;
}

interface ExploreFilterProps {
  filter: FilterState;
  onFilterChange: (newFilter: FilterState) => void;
  onReset: () => void;
}

export const SORT_OPTIONS = [
  { value: "nearest", label: "Nearest Date" },
  { value: "farthest", label: "Farthest Date" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "name_desc", label: "Name Z–A" },
];

export const LOCATIONS = [
  "All Locations",
  "Jakarta",
  "Yogyakarta",
  "Surakarta (Solo)",
  "Bandung",
  "Surabaya",
  "Semarang",
  "Bali",
];

export const CATEGORIES = [
  "All Categories",
  "Music",
  "Exhibition",
  "Theater",
  "Sports",
  "Attraction",
  "Talkshow",
  "Workshop",
  "Competition",
];

export const TIMES = [
  "All Dates",
  "Today",
  "This Weekend",
  "This Month",
  "Next Month",
];

export const PRICES = [
  "All Prices",
  "Free",
  "Under Rp50.000",
  "Rp50.000 - Rp100.000",
  "Above Rp100.000",
];

export default function ExploreFilter({
  filter,
  onFilterChange,
  onReset,
}: ExploreFilterProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close sort dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentSortLabel =
    SORT_OPTIONS.find((s) => s.value === filter.sort)?.label || "Sort By";
  const hasSortSelected = Boolean(filter.sort);

  const handleSelectChange = (field: keyof FilterState, val: string) => {
    onFilterChange({
      ...filter,
      [field]: val,
    });
  };

  const isFiltered =
    filter.location !== "All Locations" ||
    filter.category !== "All Categories" ||
    filter.time !== "All Dates" ||
    filter.price !== "All Prices" ||
    Boolean(filter.sort);

  return (
    <div className="w-full mb-6">
      {/* Top Action Row: Filter button + Reset (left), Sort by (right) */}
      <div className="flex items-center justify-between">
        {/* Left: Filter Toggle Button + Reset Link */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 h-[38px] px-4 rounded-xl border text-xs font-semibold transition cursor-pointer shadow-xs ${
              isFilterOpen
                ? "bg-white border-blue-500 text-blue-600 shadow-xs"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            {/* Funnel Filter Icon */}
            <svg
              className={`w-3.5 h-3.5 ${isFilterOpen ? "text-blue-600" : "text-slate-600"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter</span>
          </button>

          {/* Reset Action */}
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="text-xs font-semibold text-[#1E52E8] hover:underline cursor-pointer transition"
            >
              Reset
            </button>
          )}
        </div>

        {/* Right: Sort By Dropdown */}
        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 h-[38px] px-3.5 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-xs"
          >
            {/* Blue dot indicator only when active/selected */}
            {hasSortSelected && (
              <span className="w-2 h-2 rounded-full bg-[#1E52E8]" />
            )}
            <span>{hasSortSelected ? currentSortLabel : "Sort By"}</span>
            <svg
              className={`w-3.5 h-3.5 text-slate-500 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Floating Dropdown Menu */}
          {isSortOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl bg-white border border-slate-100 shadow-[0_6px_24px_rgba(0,0,0,0.08)] py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
              {SORT_OPTIONS.map((opt) => {
                const isSelected = filter.sort === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      // Toggle off if already selected, or select the new option
                      if (filter.sort === opt.value) {
                        handleSelectChange("sort", "");
                      } else {
                        handleSelectChange("sort", opt.value);
                      }
                      setIsSortOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-xs transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "bg-[#EEF4FF] text-[#1E52E8] font-bold"
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

      {/* Collapsible 4 Dropdown Filter Row */}
      {isFilterOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 pt-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* 1. Location */}
          <div>
            <label className="block text-[12.5px] font-semibold text-slate-800 mb-1.5">
              Location
            </label>
            <div className="relative">
              <select
                value={filter.location}
                onChange={(e) => handleSelectChange("location", e.target.value)}
                className="w-full h-[40px] appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc === "All Locations" ? "Select Location" : loc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Category */}
          <div>
            <label className="block text-[12.5px] font-semibold text-slate-800 mb-1.5">
              Category
            </label>
            <div className="relative">
              <select
                value={filter.category}
                onChange={(e) => handleSelectChange("category", e.target.value)}
                className="w-full h-[40px] appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "All Categories" ? "Select Category" : cat}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Time */}
          <div>
            <label className="block text-[12.5px] font-semibold text-slate-800 mb-1.5">
              Time
            </label>
            <div className="relative">
              <select
                value={filter.time}
                onChange={(e) => handleSelectChange("time", e.target.value)}
                className="w-full h-[40px] appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
              >
                {TIMES.map((time) => (
                  <option key={time} value={time}>
                    {time === "All Dates" ? "Select Time" : time}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 4. Price */}
          <div>
            <label className="block text-[12.5px] font-semibold text-slate-800 mb-1.5">
              Price
            </label>
            <div className="relative">
              <select
                value={filter.price}
                onChange={(e) => handleSelectChange("price", e.target.value)}
                className="w-full h-[40px] appearance-none rounded-xl border border-slate-200 bg-white px-3.5 pr-8 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition cursor-pointer shadow-2xs"
              >
                {PRICES.map((prc) => (
                  <option key={prc} value={prc}>
                    {prc === "All Prices" ? "Select Price" : prc}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
