import React from "react";
import HeroSlider from "./HeroSlider";
import EventSection from "./EventSection";

export default function HomePage() {
  return (
    <main className="flex-1 w-full overflow-x-hidden">
      <HeroSlider />
      <EventSection />
    </main>
  );
}
