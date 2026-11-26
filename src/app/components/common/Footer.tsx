import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
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
              <li><Link href="/contact-us" className="hover:text-white transition">Contact Us</Link></li>
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
              <li><Link href="/explore" className="hover:text-white transition">Music</Link></li>
              <li><Link href="/explore" className="hover:text-white transition">Exhibition</Link></li>
              <li><Link href="/explore" className="hover:text-white transition">Attractions</Link></li>
              <li><Link href="/explore" className="hover:text-white transition">Sports</Link></li>
              <li><Link href="/explore" className="hover:text-white transition">All Categories</Link></li>
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
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.595 0 9 1.582 9 4.615V8z"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
