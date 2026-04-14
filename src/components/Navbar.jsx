"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar({ isDemonMode, setIsDemonMode }) {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SEASONS", path: "/seasons" },
    { name: "CHARACTERS", path: "/characters" },
  ];

  return (
    <div className="absolute top-0 left-0 w-full z-50 pointer-events-none">
      <nav className="w-full flex items-center justify-between px-8 py-6 max-w-7xl mx-auto pointer-events-auto">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 cursor-pointer transition-transform hover:scale-105">
        <div className="flex items-center justify-center">
          <img 
            src="/Demon_Slayer_(3)3 1.png" 
            alt="Demon Slayer Logo" 
            className="w-[120px] h-[80px] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          />
        </div>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-12">
        {navLinks.map((link) => {
          const isActive = pathname === link.path;
          
          return (
            <Link key={link.name} href={link.path} className="relative group cursor-pointer block">
              <span
                className={`font-montserrat text-sm tracking-widest transition-colors ${
                  isActive ? "text-white" : "text-white/60 group-hover:text-white"
                }`}
              >
                {link.name}
              </span>
              {isActive && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-brand-orange rounded-full"
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-6">
        <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-brand-red/90 hover:bg-brand-red transition-all shadow-[0_0_15px_rgba(215,31,39,0.4)]">
          <Search size={16} className="text-white" />
          <span className="font-montserrat text-xs font-semibold tracking-wider text-white">SEARCH</span>
        </button>

        {/* Toggle Switch */}
        <div
          onClick={() => setIsDemonMode && setIsDemonMode(!isDemonMode)}
          className="relative w-28 h-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md cursor-pointer flex items-center px-1 shadow-inner overflow-hidden"
        >
          <motion.div
            layout
            initial={false}
            animate={{
              x: isDemonMode ? 64 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute w-10 h-8 rounded-full ${
              isDemonMode ? "bg-purple-600 shadow-[0_0_10px_purple]" : "bg-brand-orange shadow-[0_0_10px_#FF8A00]"
            }`}
          />
          <div className="w-full flex justify-between z-10 px-3 text-[10px] font-montserrat font-bold tracking-widest pointer-events-none">
            <span className={`${!isDemonMode ? "text-white" : "text-white/50"}`}>SLAYER</span>
            <span className={`${isDemonMode ? "text-white" : "text-white/50"}`}>DEMON</span>
          </div>
        </div>
      </div>
    </nav>
  </div>
  );
}
