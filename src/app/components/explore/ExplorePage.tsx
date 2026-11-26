"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import ExploreFilter, { FilterState } from "./ExploreFilter";

interface EventItem {
  id: number;
  title: string;
  date: string;
  dateObj?: Date;
  price: string;
  priceNumber?: number;
  organizer: string;
  organizerAvatarBg?: string;
  organizerAvatarText?: string;
  location?: string;
  category?: string;
  image?: string;
}

// Initial 16 events matching the explore page screenshot
const INITIAL_EXPLORE_EVENTS: EventItem[] = [
  {
    id: 1,
    title: "OBELIX SEA VIEW'S NOVEMBER SHOW",
    date: "01 - 29 November 2026",
    price: "17 Sessions",
    priceNumber: 50000,
    organizer: "OBELIX SEA VIEW YOGYAKARTA",
    organizerAvatarBg: "bg-slate-200 text-slate-700",
    organizerAvatarText: "OS",
    location: "Yogyakarta",
    category: "Attraction",
  },
  {
    id: 2,
    title: "RUANG RIANG INTIMATE WOW SHOWCASE",
    date: "20 - 27 November 2026",
    price: "2 Sessions",
    priceNumber: 75000,
    organizer: "Nusawarna_events",
    organizerAvatarBg: "bg-teal-900 text-white",
    organizerAvatarText: "NW",
    location: "Bandung",
    category: "Music",
  },
  {
    id: 3,
    title: "[SHOW 1] Drama Musikal Dilan 1990",
    date: "25 November 2026",
    price: "Rp50.000",
    priceNumber: 50000,
    organizer: "OSIS SMA Regina Pacis Jakarta",
    organizerAvatarBg: "bg-zinc-900 text-amber-400",
    organizerAvatarText: "RP",
    location: "Jakarta",
    category: "Theater",
  },
  {
    id: 4,
    title: "[SHOW 2] Drama Musikal Dilan 1990",
    date: "25 November 2026",
    price: "Rp50.000",
    priceNumber: 50000,
    organizer: "OSIS SMA Regina Pacis Jakarta",
    organizerAvatarBg: "bg-zinc-900 text-amber-400",
    organizerAvatarText: "RP",
    location: "Jakarta",
    category: "Theater",
  },
  {
    id: 5,
    title: "BLUEPHORIA FESTIVAL",
    date: "26 November 2026",
    price: "Rp100.000",
    priceNumber: 100000,
    organizer: "Panitia Dies Natalis - 61 FISIP UNT...",
    organizerAvatarBg: "bg-blue-900 text-white",
    organizerAvatarText: "BP",
    location: "Semarang",
    category: "Music",
  },
  {
    id: 6,
    title: "ICMSS X NIFI Equity Research Bootcamp",
    date: "28 November - 06 December 2026",
    price: "Rp199.000",
    priceNumber: 199000,
    organizer: "The 26th ICMSS",
    organizerAvatarBg: "bg-indigo-900 text-white",
    organizerAvatarText: "IC",
    location: "Jakarta",
    category: "Workshop",
  },
  {
    id: 7,
    title: "STEREO 2026",
    date: "28 November 2026",
    price: "Rp35.000",
    priceNumber: 35000,
    organizer: "CRAST EVENT",
    organizerAvatarBg: "bg-emerald-900 text-white",
    organizerAvatarText: "CR",
    location: "Surakarta (Solo)",
    category: "Music",
  },
  {
    id: 8,
    title: "Nadaria Vol 10",
    date: "28 November 2026",
    price: "Rp11.000",
    priceNumber: 11000,
    organizer: "Fakultas Ilmu Komunikasi Univers...",
    organizerAvatarBg: "bg-purple-900 text-white",
    organizerAvatarText: "ND",
    location: "Surabaya",
    category: "Exhibition",
  },
  {
    id: 9,
    title: "tvOne Bestieval Wonosobo",
    date: "28 November 2026",
    price: "Rp80.000",
    priceNumber: 80000,
    organizer: "Bestieval Indonesia Concert",
    organizerAvatarBg: "bg-red-800 text-white",
    organizerAvatarText: "TO",
    location: "Yogyakarta",
    category: "Music",
  },
  {
    id: 10,
    title: "TEGANGAN TINGGIGS",
    date: "28 November 2026",
    price: "Rp100.000",
    priceNumber: 100000,
    organizer: "TEGANGAN TINGGI",
    organizerAvatarBg: "bg-neutral-900 text-white",
    organizerAvatarText: "TT",
    location: "Jakarta",
    category: "Music",
  },
  {
    id: 11,
    title: "Fucom Vol. 4",
    date: "28 November 2026",
    price: "Rp65.000",
    priceNumber: 65000,
    organizer: "HMJ KPI UIN SSC",
    organizerAvatarBg: "bg-amber-900 text-white",
    organizerAvatarText: "FC",
    location: "Surakarta (Solo)",
    category: "Talkshow",
  },
  {
    id: 12,
    title: "Java Beat Fest",
    date: "28 November 2026",
    price: "Rp75.000",
    priceNumber: 75000,
    organizer: "Nara Creative",
    organizerAvatarBg: "bg-amber-950 text-white",
    organizerAvatarText: "NC",
    location: "Surakarta (Solo)",
    category: "Music",
  },
  {
    id: 13,
    title: "Java Beat Festival x Festara",
    date: "28 November 2026",
    price: "Rp85.000",
    priceNumber: 85000,
    organizer: "Nara Creative",
    organizerAvatarBg: "bg-amber-950 text-white",
    organizerAvatarText: "NC",
    location: "Surakarta (Solo)",
    category: "Music",
  },
  {
    id: 14,
    title: "Bogor of Soul (Feel The Rhytem)",
    date: "28 November 2026",
    price: "Rp25.000",
    priceNumber: 25000,
    organizer: "Scootopia",
    organizerAvatarBg: "bg-orange-800 text-white",
    organizerAvatarText: "SC",
    location: "Bandung",
    category: "Sports",
  },
  {
    id: 15,
    title: "FUN RUN 3.0",
    date: "29 November 2026",
    price: "Rp120.000",
    priceNumber: 120000,
    organizer: "SENIOR LEM FK UII",
    organizerAvatarBg: "bg-cyan-900 text-white",
    organizerAvatarText: "FR",
    location: "Yogyakarta",
    category: "Sports",
  },
  {
    id: 16,
    title: "Styles ASIK RUN bareng Ba Li Ta",
    date: "29 November 2026",
    price: "Free",
    priceNumber: 0,
    organizer: "Palembang Square Mall",
    organizerAvatarBg: "bg-rose-900 text-white",
    organizerAvatarText: "SR",
    location: "Jakarta",
    category: "Sports",
  },
];

const INITIAL_FILTER: FilterState = {
  location: "All Locations",
  category: "All Categories",
  time: "All Dates",
  price: "All Prices",
  sort: "",
};

export default function ExplorePage() {
  const [filter, setFilter] = useState<FilterState>(INITIAL_FILTER);
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EXPLORE_EVENTS);
  const [loading, setLoading] = useState(false);

  // Fetch backend events and merge with explore collection
  useEffect(() => {
    let isMounted = true;
    const fetchBackendEvents = async () => {
      try {
        setLoading(true);
        const apiBaseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
        const res = await fetch(`${apiBaseUrl}/events`);
        if (res.ok) {
          const json = await res.json();
          if (json?.data && Array.isArray(json.data) && json.data.length > 0 && isMounted) {
            const mappedBackend: EventItem[] = json.data.map(
              (item: {
                id: number;
                nama_konser: string;
                tanggal_mulai: string;
                foto?: string;
                venue?: { nama?: string; kota?: string };
              }) => {
                const dateParsed = new Date(item.tanggal_mulai);
                const formattedDate = !isNaN(dateParsed.getTime())
                  ? dateParsed.toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : item.tanggal_mulai;

                return {
                  id: item.id,
                  title: item.nama_konser,
                  date: formattedDate,
                  price: "Rp50.000",
                  priceNumber: 50000,
                  organizer: item.venue?.nama || "Official FastTix Partner",
                  organizerAvatarBg: "bg-blue-900 text-white",
                  organizerAvatarText: (item.nama_konser || "FT")
                    .substring(0, 2)
                    .toUpperCase(),
                  location: item.venue?.kota || "Jakarta",
                  category: "Music",
                  image: item.foto,
                };
              }
            );

            // Merge avoiding ID conflicts
            const existingIds = new Set(mappedBackend.map((e) => e.id));
            const merged = [
              ...mappedBackend,
              ...INITIAL_EXPLORE_EVENTS.filter((e) => !existingIds.has(e.id)),
            ];
            setEvents(merged);
          }
        }
      } catch (err) {
        console.warn("Using offline sample events for Explore:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBackendEvents();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleReset = () => {
    setFilter(INITIAL_FILTER);
  };

  // Filter & Sort Logic
  const filteredEvents = useMemo(() => {
    let result = [...events];

    // 1. Filter Location
    if (filter.location !== "All Locations") {
      result = result.filter(
        (evt) =>
          evt.location?.toLowerCase().includes(filter.location.toLowerCase()) ||
          evt.organizer?.toLowerCase().includes(filter.location.toLowerCase())
      );
    }

    // 2. Filter Category
    if (filter.category !== "All Categories") {
      result = result.filter(
        (evt) => evt.category?.toLowerCase() === filter.category.toLowerCase()
      );
    }

    // 3. Filter Price
    if (filter.price !== "All Prices") {
      if (filter.price === "Free") {
        result = result.filter(
          (evt) =>
            evt.priceNumber === 0 ||
            evt.price.toLowerCase().includes("free") ||
            evt.price.toLowerCase().includes("gratis")
        );
      } else if (filter.price === "Under Rp50.000") {
        result = result.filter(
          (evt) => evt.priceNumber !== undefined && evt.priceNumber < 50000
        );
      } else if (filter.price === "Rp50.000 - Rp100.000") {
        result = result.filter(
          (evt) =>
            evt.priceNumber !== undefined &&
            evt.priceNumber >= 50000 &&
            evt.priceNumber <= 100000
        );
      } else if (filter.price === "Above Rp100.000") {
        result = result.filter(
          (evt) => evt.priceNumber !== undefined && evt.priceNumber > 100000
        );
      }
    }

    // 4. Sorting
    if (filter.sort === "nearest") {
      // Keep default nearest
    } else if (filter.sort === "farthest") {
      result.reverse();
    } else if (filter.sort === "name_asc") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filter.sort === "name_desc") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [events, filter]);

  return (
    <div className="w-full">
      {/* Filter & Sort Controls */}
      <ExploreFilter
        filter={filter}
        onFilterChange={setFilter}
        onReset={handleReset}
      />

      {/* Events Grid (4 columns matching screenshot) */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-2.5 border border-slate-100 shadow-xs animate-pulse flex flex-col justify-between h-[270px]"
            >
              <div>
                <div className="w-full aspect-[2.1/1] rounded-xl bg-slate-200 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-100 rounded w-1/2 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-1/3" />
              </div>
              <div className="border-t border-slate-100 pt-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200" />
                <div className="h-3 bg-slate-100 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredEvents.length === 0 ? (
        <div className="w-full py-16 flex flex-col items-center justify-center text-center bg-white rounded-2xl border border-slate-200/80 my-4">
          <svg
            className="w-12 h-12 text-slate-300 mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-base font-bold text-slate-800">
            No events found
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">
            Try adjusting your search criteria or reset your filters to see more events.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-4 px-4 py-2 rounded-xl bg-[#1E52E8] text-white text-xs font-semibold hover:bg-[#163FB8] transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-2xl p-2.5 border border-slate-200/70 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Event Poster Box */}
                <div className="w-full aspect-[2.1/1] rounded-xl bg-slate-100 border border-slate-200/60 overflow-hidden flex flex-col items-center justify-center text-slate-300 mb-3 group-hover:bg-slate-100/80 transition relative">
                  {evt.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg
                      className="w-6 h-6 text-slate-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  )}
                </div>

                <div className="px-1">
                  {/* Event Title */}
                  <h3
                    className="text-[13px] font-bold text-slate-900 truncate leading-snug"
                    title={evt.title}
                  >
                    {evt.title}
                  </h3>

                  {/* Event Date */}
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                    <svg
                      className="w-3.5 h-3.5 text-[#3B82F6] shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <span>{evt.date}</span>
                  </div>

                  {/* Event Price */}
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
                    className={`w-6 h-6 rounded-full ${
                      evt.organizerAvatarBg || "bg-slate-800 text-white"
                    } flex items-center justify-center text-[9px] font-bold shrink-0 shadow-xs`}
                  >
                    {evt.organizerAvatarText || "FT"}
                  </div>
                  <span
                    className="text-[11px] font-medium text-slate-500 truncate"
                    title={evt.organizer}
                  >
                    {evt.organizer}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
