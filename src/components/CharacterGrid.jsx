"use client";

import Image from "next/image";

// Map available public assets to character cards based on the arc
const arcCharacters = {
  // First arc (e.g. general / start)
  0: [
    { id: 1, name: "TANJIRO", role: "KAMADO", image: "/5ede49f9b760540004f2c5e7 (1) 1 (1).png", color: "to-emerald-900/80", textColor: "text-emerald-400", tint: "bg-emerald-900/40" },
    { id: 2, name: "NEZUKO", role: "DEMON", image: "/5ede49f9b760540004f2c5e7 (1) 2 (4).png", color: "to-rose-900/80", textColor: "text-rose-400", tint: "bg-rose-900/40" },
    { id: 3, name: "ZENITSU", role: "THUNDER", image: "/zenisutu.png", color: "to-amber-900/80", textColor: "text-yellow-400", tint: "bg-orange-900/40" },
    { id: 4, name: "INOSUKE", role: "BEAST", image: "/insuke.png", color: "to-indigo-900/80", textColor: "text-blue-400", tint: "bg-blue-900/40" },
  ],
  // Mugen Train / Rengoku
  1: [
    { id: 1, name: "RENGOKU", role: "FLAME HASHIRA", image: "/Group 7.png", color: "to-orange-900/80", textColor: "text-orange-400", tint: "bg-orange-900/40" },
    { id: 2, name: "AKAZA", role: "UPPER RANK 3", image: "/Group 22.png", color: "to-rose-900/80", textColor: "text-rose-400", tint: "bg-rose-900/40" },
    { id: 3, name: "ENMU", role: "LOWER RANK 1", image: "/5ede49f9b760540004f2c5e7 (1) 2.png", color: "to-cyan-900/80", textColor: "text-cyan-400", tint: "bg-cyan-900/40" },
    { id: 4, name: "TANJIRO", role: "KAMADO", image: "/5ede49f9b760540004f2c5e7 (1) 3 (4).png", color: "to-emerald-900/80", textColor: "text-emerald-400", tint: "bg-emerald-900/40" },
  ],
  // Entertainment District
  2: [
    { id: 1, name: "TENGEN", role: "SOUND HASHIRA", image: "/Group 8.png", color: "to-amber-700/80", textColor: "text-yellow-500", tint: "bg-yellow-900/40" },
    { id: 2, name: "DAKI", role: "UPPER RANK 6", image: "/5ede49f9b760540004f2c5e7 (1) 3.png", color: "to-green-900/80", textColor: "text-emerald-400", tint: "bg-emerald-900/40" },
    { id: 3, name: "GYUTARO", role: "UPPER RANK 6", image: "/5ede49f9b760540004f2c5e7 (1) 3 (5).png", color: "to-red-950/80", textColor: "text-red-500", tint: "bg-red-900/40" },
    { id: 4, name: "MITSURI", role: "LOVE HASHIRA", image: "/5ede49f9b760540004f2c5e7 (1) 2 (1).png", color: "to-rose-900/80", textColor: "text-pink-300", tint: "bg-pink-900/40" },
  ]
};

export default function CharacterGrid({ currentArc = 0, isDemonMode = false }) {
  // Ensure we don't crash if currentArc goes out of bounds
  const characters = arcCharacters[currentArc] || arcCharacters[0];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative z-10">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-montserrat font-bold text-white tracking-tight">
          EXPLORE <span className="text-brand-orange">CHARACTERS</span>
        </h2>
        <button className="text-white/60 hover:text-white transition-colors font-montserrat text-xs md:text-sm tracking-widest uppercase border-b border-transparent hover:border-white pb-1">
          View All
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {characters.map((char, index) => (
          <div
            key={`${currentArc}-${char.id}`}
            className="group relative aspect-[3/4] md:aspect-[4/5] rounded-[2rem] overflow-hidden flex flex-col p-6 md:p-8 bg-black hover:bg-neutral-950 transition-all duration-500 cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Ghost Background Image (Transparent, zoomed, soft glow) */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen">
               <Image
                 src={char.image}
                 alt=""
                 fill
                 className="object-cover object-right scale-125 blur-sm filter brightness-110 grayscale"
               />
               <div className={`absolute inset-0 mix-blend-color ${char.tint}`} />
            </div>

            {/* Bottom shadow fade/gradient to give depth to the bottom */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none z-0`} />
            
            {/* Top Text Content Grouped */}
            <div className="relative z-20 pointer-events-none mb-auto">
              <span className={`text-[10px] md:text-xs font-montserrat font-bold tracking-[0.35em] block mb-1 opacity-80 uppercase ${char.textColor}`}>
                {char.role}
              </span>
              
              <h3 className="font-montserrat tracking-wide text-2xl md:text-3xl font-bold uppercase text-white drop-shadow-md">
                <span className="block">{char.name}</span>
              </h3>
            </div>

            {/* Foreground Solid Image - Aligned to bottom-right */}
            <div className="absolute inset-x-0 bottom-0 top-[15%] flex pointer-events-none z-10 transition-transform duration-700 group-hover:scale-[1.05] origin-bottom-right">
               <Image
                 src={char.image}
                 alt={char.name}
                 fill
                 sizes="(max-width: 768px) 100vw, 25vw"
                 className="object-contain object-right-bottom select-none drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)] filter brightness-105 contrast-110"
                 priority={index < 2}
               />
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
