"use client";

import { motion } from "framer-motion";

const characters = [
  { 
    id: 1, 
    name: "TANJIRO KAMADO", 
    role: "WATER & SUN BREATHING", 
    color: "from-emerald-600/50 to-teal-900/50",
    image: "/kimetsu_no_yaiba_character 1.png"
  },
  { 
    id: 2, 
    name: "TENGEN UZUI", 
    role: "SOUND BREATHING", 
    color: "from-yellow-500/50 to-amber-900/50",
    image: "/Group 17.png"
  },
  { 
    id: 3, 
    name: "MUICHIRO TOKITO", 
    role: "MIST BREATHING", 
    color: "from-cyan-500/50 to-blue-900/50",
    image: "/Group 8.png"
  },
  { 
    id: 4, 
    name: "MUZAN KIBUTSUJI", 
    role: "DEMON PROGENITOR", 
    color: "from-red-600/50 to-rose-900/50",
    image: "/Group 25.png"
  },
];

export default function CharactersSection() {
  return (
    <section id="characters" className="w-full relative z-10 py-24 bg-[#0a0a0f]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex items-end justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-wider mb-2" style={{ fontFamily: 'var(--font-bangers), cursive' }}>
              MAIN <span className="text-brand-red">CHARACTERS</span>
            </h2>
            <p className="text-white/50 font-inter text-sm max-w-md">
              Discover the powerful warriors of the Demon Slayer Corps and their formidable enemies.
            </p>
          </motion.div>
          
          <motion.button 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:block text-white/60 hover:text-white transition-colors font-montserrat text-sm tracking-widest font-bold"
          >
            VIEW ALL
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {characters.map((char, index) => (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
              whileHover={{ y: -10 }}
              className={`cursor-pointer group relative h-[450px] rounded-2xl bg-gradient-to-b ${char.color} border border-white/5 overflow-hidden flex flex-col justify-end p-6 shadow-xl`}
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500 z-0" />
              
              {/* Character Image */}
              <div className="absolute inset-0 flex justify-center items-end opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 z-10 w-full h-full overflow-hidden">
                <img 
                  src={char.image} 
                  alt={char.name} 
                  className="object-contain h-[90%] w-[120%] -ml-10 max-w-none transform origin-bottom drop-shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
                  style={{ objectPosition: 'center bottom' }}
                />
              </div>
              
              {/* Text Content */}
              <div className="relative z-20 pt-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <div className="absolute inset-x-0 -top-12 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent -z-10" />
                <span className="text-brand-orange text-[10px] font-bold tracking-[0.2em] block mb-1 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {char.role}
                </span>
                <h3 className="text-white font-black text-2xl tracking-wider leading-none" style={{ fontFamily: 'var(--font-bangers), cursive' }}>
                  {char.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
