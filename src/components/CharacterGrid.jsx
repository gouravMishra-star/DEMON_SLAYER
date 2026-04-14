"use client";

import { motion } from "framer-motion";

const characters = [
  { id: 1, name: "TANJIRO", role: "WATER BREATHING", color: "from-green-600/50 to-emerald-900/50" },
  { id: 2, name: "ZENITSU", role: "THUNDER BREATHING", color: "from-yellow-500/50 to-orange-800/50" },
  { id: 3, name: "INOSUKE", role: "BEAST BREATHING", color: "from-blue-500/50 to-cyan-900/50" },
  { id: 4, name: "NEZUKO", role: "DEMON ARTS", color: "from-pink-500/50 to-rose-900/50" },
];

export default function CharacterGrid() {
  return (
    <div className="w-full max-w-7xl mx-auto px-8 py-24 relative z-10">
      <div className="flex items-end justify-between mb-12">
        <h2 className="text-4xl font-montserrat font-bold text-white tracking-tight">
          EXPLORE <span className="text-brand-orange">CHARACTERS</span>
        </h2>
        <button className="text-white/60 hover:text-white transition-colors font-montserrat text-sm tracking-widest">
          VIEW ALL
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {characters.map((char, index) => (
          <motion.div
            key={char.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -10 }}
            className={`cursor-pointer group relative aspect-[3/4] rounded-2xl bg-gradient-to-b ${char.color} border border-white/10 overflow-hidden flex flex-col justify-end p-6`}
          >
            {/* Hover glare */}
            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
            
            <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-brand-orange text-[10px] font-bold tracking-[0.2em] block mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {char.role}
              </span>
              <h3 className="text-white font-montserrat font-bold text-2xl tracking-wide">
                {char.name}
              </h3>
            </div>

            {/* Placeholder graphic for Character Box */}
            <div className="absolute inset-x-0 top-1/4 bottom-1/4 border-y border-white/5 bg-black/20 backdrop-blur-[2px] -z-10 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
               <span className="text-white/20 font-montserrat text-sm font-bold tracking-widest rotate-[-90deg]">IMG PLACEHOLDER</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
