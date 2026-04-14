"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";


const slides = [
  {
     bg: "/hero_section_bg1.png",
    chars: "/kimetsu_no_yaiba_character 1.png",
    name: "TANJIRO KAMADO",
    title: "DEMON SLAYER",
    description: "Tanjiro Kamado is a kind-hearted and intelligent boy who lives with his family in the mountains. He became a Demon Slayer after his family was slaughtered by Muzan.",
    breathingText: "SUN BREATHING USER",
    buttonColor: "bg-gradient-to-r from-emerald-500 to-teal-700",
    buttonShadow: "shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    demonBg: "/hero_section_bg1.png",
    demonChars: "/Group 25.png",
    demonName: "MUZAN KIBUTSUJI",
    demonTitle: "DEMON KING",
    demonDescription: "Muzan is the first of his kind and the progenitor of all other demons. He is ruthless, powerful, and commands the Twelve Kizuki.",
    demonBreathingText: "BLOOD DEMON ART",
    demonButtonColor: "bg-gradient-to-r from-purple-700 to-zinc-900",
    demonButtonShadow: "shadow-[0_0_20px_rgba(126,34,206,0.4)]",
  },
  {
     bg: "/heo_section_bg2.png",
    chars: "/Group 7.png",
    name: "KYOJURO RENGOKU",
    title: "DEMON SLAYER",
    description: "Kyojuro Rengoku is the Flame Hashira of the Demon Slayer Corps. He is a highly enthusiastic and cheerful individual with an unyielding moral code.",
    breathingText: "FLAME BREATHING USER",
    buttonColor: "bg-gradient-to-r from-red-500 to-orange-600",
    buttonShadow: "shadow-[0_0_20px_rgba(239,68,68,0.4)]",
    demonBg: "/heo_section_bg2.png",
    demonChars: "/Group 22.png",
    demonName: "AKAZA",
    demonTitle: "UPPER RANK 3",
    demonDescription: "Akaza displays immense martial arts skills and respects strength. He is constantly seeking strong opponents to fight and devour.",
    demonBreathingText: "DESTRUCTIVE DEATH",
    demonButtonColor: "bg-gradient-to-r from-pink-600 to-rose-900",
    demonButtonShadow: "shadow-[0_0_20px_rgba(219,39,119,0.4)]",
  },
  {
    bg: "/heo_section_bg3.png",
    chars: "/Group 8.png",
    name: "TENGEN UZUI",
    title: "DEMON SLAYER",
    description: "Tengen Uzui is the Sound Hashira of the Demon Slayer Corps. A very eccentric and flashy individual, always demanding that things be flamboyant.",
    breathingText: "SOUND BREATHING USER",
    buttonColor: "bg-gradient-to-r from-yellow-500 to-amber-600",
    buttonShadow: "shadow-[0_0_20px_rgba(245,158,11,0.4)]",
    demonBg: "/heo_section_bg3.png",
    demonChars: "/5ede49f9b760540004f2c5e7 (1) 3.png",
    demonName: "GYUTARO & DAKI",
    demonTitle: "UPPER RANK 6",
    demonDescription: "The sibling demons who share the title of Upper Rank 6. They lurk in the Entertainment District, preying on its inhabitants.",
    demonBreathingText: "FLYING BLOOD SICKLES",
    demonButtonColor: "bg-gradient-to-r from-green-600 to-emerald-900",
    demonButtonShadow: "shadow-[0_0_20px_rgba(5,150,105,0.4)]",
  },
];

const bgVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, scale: 1.02, transition: { duration: 0.5 } },
};

const textVariants = {
  enter: { opacity: 0, x: -80 },
  center: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, x: 80, transition: { duration: 0.3 } },
};

const charVariants = {
  enter: { opacity: 0, x: 100, scale: 0.95 },
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, delay: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.3 } },
};

const HeroSection = ({ isDemonMode = false }) => {
  const [current, setCurrent] = useState(0);

  const paginate = useCallback(
    (dir) => {
      setCurrent((prev) => (prev + dir + slides.length) % slides.length);
    },
    []
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 6000);
    return () => clearInterval(timer);
  }, [paginate]);

  const currentSlide = slides[current];
  const slide = isDemonMode ? {
    ...currentSlide,
    bg: currentSlide.demonBg,
    chars: currentSlide.demonChars,
    name: currentSlide.demonName,
    title: currentSlide.demonTitle,
    description: currentSlide.demonDescription,
    breathingText: currentSlide.demonBreathingText,
    buttonColor: currentSlide.demonButtonColor,
    buttonShadow: currentSlide.demonButtonShadow,
  } : currentSlide;

  return (
    <section id="home" className="relative h-screen overflow-hidden ">
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${current}`}
          variants={bgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 z-0"
        >
          <img
            src={slide.bg}
            alt="Background"
            className="w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          
        </motion.div>
      </AnimatePresence>

     <div
        aria-hidden
        className="absolute inset-0 z-[2] pointer-events-none flex items-center justify-center overflow-hidden"
      >
        <img
          src="/tanjiro.png"
          className="text-[clamp(72px,10vw,130px)] font-black whitespace-nowrap select-none tracking-wider"
          style={{
            color: "rgba(255,255,255,0.055)",
            fontFamily: "'Noto Serif JP', 'Yu Gothic', serif",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12 h-full flex flex-col justify-center pt-24 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between h-full gap-8">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              variants={textVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 max-w-2xl w-full"
            >
              <span className="text-sm md:text-md font-bold tracking-[0.3em] text-brand-red uppercase mb-4 block">
                {slide.title}
              </span>
              
              <h1 className="text-6xl md:text-8xl lg:text-[110px] leading-[0.85] font-black tracking-wider text-white mb-6 uppercase" style={{ fontFamily: 'var(--font-bangers), cursive' }}>
                <span className="block drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {slide.name}
                </span>
              </h1>
              
              <p className="text-white/60 text-sm md:text-base leading-relaxed mb-10 max-w-lg font-inter">
                {slide.description}
              </p>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-widest">
                  BREATHING STYLE
                </span>
                <div className="h-px bg-white/20 flex-1 max-w-[150px]" />
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 px-8 py-4 bg-brand-red text-white font-montserrat font-bold tracking-widest text-xs rounded-full transition-all shadow-[0_0_20px_rgba(215,31,39,0.4)] hover:bg-red-700"
                >
                  <Play size={16} fill="white" />
                  WATCH EPISODE NOW
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-8 py-4 ${slide.buttonColor} ${slide.buttonShadow} text-white font-montserrat font-bold tracking-widest text-xs rounded-full transition-all`}
                >
                  {slide.breathingText}
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`chars-${current}`}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex-1 w-full h-[50vh] lg:h-[85vh] flex justify-center lg:justify-end items-end relative"
            >
              <div className="relative w-full h-full max-w-3xl flex justify-center lg:justify-end items-end pb-[5vh]">
                 <motion.img
                   animate={{ y: [0, -15, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                   src={slide.chars}
                   alt={slide.name}
                   className="object-contain h-full max-h-[85vh] drop-shadow-[0_0_40px_rgba(255,255,255,0.15)] z-10"
                 />
              </div>
            </motion.div>
          </AnimatePresence>
          
        </div>

        <div className="fixed top-1/2 -translate-y-1/2 right-6 md:right-12 z-50 flex flex-col gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 rounded-full transition-all duration-300 ${
                i === current ? "h-12 bg-brand-red" : "h-4 bg-white/20 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
