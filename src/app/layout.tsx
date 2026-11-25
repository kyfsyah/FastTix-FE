import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "FastTix - Your Professional Ticketing Partner",
  description: "Official ticketing platform for music festivals, band concerts, and premier live events.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}
