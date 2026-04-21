"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SCENES } from "@/data/scenes";

export default function GlassPanel({ activeScene }) {
  const scene = SCENES[activeScene] || SCENES[0];

  return (
    <div className="w-full md:w-[500px] lg:w-[600px] pointer-events-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={scene.id}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="relative p-8 md:p-14 backdrop-blur-2xl bg-black/40 border rounded-3xl overflow-hidden group shadow-2xl"
          style={{ 
            boxShadow: `0 30px 60px -15px ${scene.glow}30`,
            borderColor: `${scene.glow}30`
          }}
        >
          {/* Neon Border Glow Transition Effect */}
          <div 
             className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40 pointer-events-none" 
             style={{ background: `radial-gradient(circle at top right, ${scene.glow}, transparent 60%)`}}
          />
          
          <div className="relative z-10">
            {/* Roman Numeral watermark */}
            <h3 
              className="absolute -top-6 -right-2 text-[100px] md:text-[140px] font-bangers select-none transition-all duration-700 group-hover:text-white/10 group-hover:scale-110"
              style={{ color: `${scene.glow}15` }}
            >
              {scene.roman}
            </h3>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
              style={{ color: scene.glow }}
            >
              {scene.sub}
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bangers uppercase leading-[0.9] mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              style={{ color: 'white' }}
            >
              {scene.title}
            </motion.h2>

            <motion.div 
               initial={{ scaleX: 0 }}
               animate={{ scaleX: 1 }}
               transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
               className="h-[2px] w-16 md:w-24 mb-6 origin-left"
               style={{ background: `linear-gradient(90deg, ${scene.glow}, transparent)` }}
            />

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-inter text-gray-300 text-base md:text-xl leading-relaxed font-light"
            >
              <span 
                className="text-5xl md:text-6xl font-bangers float-left mr-3 md:mr-4 leading-[0.8] mt-1"
                style={{ color: `${scene.glow}40` }}
              >
                {scene.roman}
              </span>
              {scene.desc}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
