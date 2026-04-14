"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArcNavigation({ currentArc, setCurrentArc }) {
  const handlePrev = () => setCurrentArc((prev) => (prev > 0 ? prev - 1 : 2));
  const handleNext = () => setCurrentArc((prev) => (prev < 2 ? prev + 1 : 0));

  return (
    <div className="absolute bottom-12 left-12 md:left-24 z-50 flex items-center gap-4">
      <button
        onClick={handlePrev}
        className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors bg-black/20 backdrop-blur-sm"
      >
        <ChevronLeft className="text-white/80" size={20} />
      </button>
      <div className="flex gap-2">
        {[0, 1, 2].map((idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentArc === idx ? "w-6 bg-brand-orange" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
      <button
        onClick={handleNext}
        className="w-10 h-10 rounded-full border border-brand-orange flex items-center justify-center hover:bg-brand-orange/20 transition-colors bg-black/20 backdrop-blur-sm"
      >
        <ChevronRight className="text-brand-orange" size={20} />
      </button>
    </div>
  );
}
