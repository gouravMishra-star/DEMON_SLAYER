"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import ArcNavigation from "@/components/ArcNavigation";

const arcData = [
  {
    titlePart1: "KIMETSU",
    titlePart2: "NO YAIBA",
    bio: "Tanjiro Kamado is a kind-hearted boy who becomes a Demon Slayer after his family is slaughtered by demons and his sister Nezuko is turned into one.",
    
    slayerColor: "from-green-500 to-emerald-900",
    demonColor: "from-red-600 to-rose-900",

    slayerName: "Tanjiro Kamado & Allies",
    demonName: "Muzan Kibutsuji & Twelve Kizuki",

    kanji: "鬼滅の刃",

    slayerBg: "/hero_section_bg4.png",
    demonBg: "/hero_section_bg4.png",

    slayerImage: "/kimetsu_no_yaiba_character 1.png",
    demonImage: "/Group 25.png",
  },

  {
    titlePart1: "MUGEN",
    titlePart2: "TRAIN ARC",
    bio: "Tanjiro and his companions join Flame Hashira Kyojuro Rengoku to investigate mysterious disappearances aboard the Mugen Train.",

    slayerColor: "from-red-500 to-orange-600",
    demonColor: "from-pink-600 to-rose-900",

    slayerName: "Kyojuro Rengoku",
    demonName: "Akaza (Upper Rank Three)",

    kanji: "無限列車編",

    slayerBg: "/heo_section_bg2.png",
    demonBg: "/heo_section_bg2.png",

    slayerImage: "/Group 7.png",
    demonImage: "/Group 22.png",
  },

  {
    titlePart1: "ENTERTAINMENT",
    titlePart2: "DISTRICT ARC",
    bio: "Tanjiro joins Sound Hashira Tengen Uzui in the Entertainment District to investigate missing people and battle powerful Upper Rank demons.",

    slayerColor: "from-yellow-400 to-orange-700",
    demonColor: "from-green-600 to-emerald-900",

    slayerName: "Tengen Uzui",
    demonName: "Gyutaro & Daki (Upper Rank Six)",

    kanji: "遊郭編",

    slayerBg: "/heo_section_bg3.png",
    demonBg: "/heo_section_bg3.png",

    slayerImage: "/Group 8.png",
    demonImage: "/5ede49f9b760540004f2c5e7 (1) 3.png",
  },
];
export default function Hero({ currentArc, setCurrentArc, isDemonMode }) {
  const arc = arcData[currentArc];

  return (
    <section className="relative w-full min-h-[min(92dvh,960px)] flex flex-col overflow-hidden pt-[max(8rem,env(safe-area-inset-top)+5.5rem)] lg:pt-[max(8.5rem,env(safe-area-inset-top)+6rem)] pb-10 md:pb-14">
      {/* LAYER 1 & 2: Background Image and Gradient */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${currentArc}-${isDemonMode}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 z-0"
        >
          <div className="relative h-full w-full">
            <Image
              src={isDemonMode ? arc.demonBg : arc.slayerBg}
              alt=""
              fill
              className="object-cover"
              sizes="100vw"
              priority={currentArc === 0}
            />
          </div>
          {/* Subtle text-protection gradient, not covering the whole screen */}
          <div className="absolute inset-y-0 left-0 w-2/3 bg-linear-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/80 to-transparent pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* LAYER 3: Watermark — parent must have explicit size for next/image fill */}
      <motion.div
        key={`kanji-${currentArc}`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 pointer-events-none select-none z-0"
      >
        <Image
          src="/tanjiro.png"
          alt={arc.kanji}
          fill
          sizes="100vw"
          className="object-contain object-center opacity-[0.6]"
        />
      </motion.div>

      {/* LAYER 4: Content — side by side on lg (45 / 55); flow from top (no section-level vertical center) */}
      <div className="relative z-10 w-full flex-1 flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-0 px-4 sm:px-8 md:px-16 lg:px-24 max-w-[1400px] mx-auto min-h-0">
        {/* Left Content */}
        <div className="relative z-10 w-full lg:w-[45%] min-w-0 flex flex-col items-start justify-center gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={`title-${currentArc}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col w-full items-start gap-2 font-montserrat font-bold"
            >
              <h1 className="w-full text-left uppercase leading-[1.05]">
                {/* First Line */}
                <span className="block text-white font-semibold text-2xl sm:text-[clamp(1.2rem,3vw,2.4rem)] whitespace-nowrap">
                  DEMON SLAYER :{" "}
                  <span className="text-brand-orange">{arc.titlePart1}</span>
                </span>

                {/* Second Line */}
                <span className="mt-1 block text-brand-orange text-4xl sm:text-[44px] md:text-[44px] lg:text-[46px]">
                  {arc.titlePart2}
                </span>
              </h1>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={`bio-${currentArc}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-white/70 font-inter text-sm md:text-base max-w-lg leading-relaxed"
            >
              {arc.bio}
            </motion.p>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-4"
          >
            <button className="px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-white font-montserrat text-sm font-semibold tracking-widest backdrop-blur-sm">
              GALLERY
            </button>

            <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-brand-red hover:bg-red-700 transition-colors text-white font-montserrat text-sm font-semibold tracking-widest shadow-[0_0_20px_rgba(215,31,39,0.4)]">
              <Play size={16} fill="white" />
              WATCH
            </button>
          </motion.div>
        </div>

        {/* Right Content - Character Visual */}
        <div className="relative z-10 w-full lg:w-[55%] min-w-0 flex items-center justify-center lg:justify-end mt-8 lg:mt-0 min-h-[280px] h-[42vh] sm:h-[48vh] lg:min-h-[min(70vh,calc(100dvh-12rem))] lg:h-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={`char-${currentArc}-${isDemonMode}`}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative w-full h-full flex justify-center lg:justify-end items-center"
            >
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                src={isDemonMode ? arc.demonImage : arc.slayerImage}
                alt={isDemonMode ? arc.demonName : arc.slayerName}
                className="object-contain object-center w-auto max-w-full h-auto max-h-full lg:max-h-[min(80vh,calc(100dvh-8.5rem))] drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] z-10"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ArcNavigation currentArc={currentArc} setCurrentArc={setCurrentArc} />
    </section>
  );
}
