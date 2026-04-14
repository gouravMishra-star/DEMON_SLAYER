"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import useSWRInfinite from "swr/infinite";
import { useInView } from "react-intersection-observer";

const BASE_URL = "https://www.demonslayer-api.com/api/v1/characters";

/* ─── Card ─────────────────────────────────────────────────────────── */
function CharacterCard({ char, index }) {
  return (
    <Link href={`/characters/${char.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: (index % 8) * 0.07, ease: [0.22, 1, 0.36, 1] }}
        className="group relative cursor-pointer h-full"
      >
        {/* outer glow on hover */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-b from-brand-orange/0 to-brand-orange/0 group-hover:from-brand-orange/25 group-hover:to-brand-red/15 transition-all duration-500 blur-sm pointer-events-none" />

        <div className="relative h-full rounded-3xl overflow-hidden border border-white/[0.07] group-hover:border-brand-orange/25 transition-colors duration-500 bg-[#0c0c0e] flex flex-col">

          {/* ── image zone ── */}
          <div
            className="relative flex-1 min-h-0 flex items-end justify-center overflow-hidden"
            style={{
              background:
                "radial-gradient(ellipse 75% 85% at 50% 55%, rgba(255,130,0,0.11) 0%, rgba(160,20,20,0.08) 45%, transparent 100%)",
            }}
          >
            {/* dot-grid texture */}
            <div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            />

            {/* bottom fade into footer */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#0c0c0e] to-transparent z-10" />

            {/* character art — object-contain keeps transparent PNGs intact */}
            <img
              src={char.img}
              alt={char.name}
              crossOrigin="anonymous"
              loading="lazy"
              className="relative z-0 w-full h-full object-contain object-bottom transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />

            {/* race pill */}
            <div className="absolute top-3 left-3 z-20">
              <span className="inline-block px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 text-brand-orange text-[9px] font-montserrat font-black tracking-[0.2em] uppercase">
                {char.race}
              </span>
            </div>
          </div>

          {/* ── footer ── */}
          <div className="flex-shrink-0 px-5 pt-2 pb-5 flex flex-col gap-1">
            <div className="w-0 h-[2px] rounded-full bg-gradient-to-r from-brand-orange to-brand-red mb-2 group-hover:w-full transition-all duration-500 ease-out" />

            <h3 className="font-bangers text-[1.65rem] sm:text-3xl tracking-wider leading-none text-white group-hover:text-brand-orange transition-colors duration-300 truncate">
              {char.name}
            </h3>

            {(char.age || char.gender) && (
              <p className="text-white/30 font-montserrat text-[10px] tracking-[0.18em] uppercase">
                {[char.age && `Age ${char.age}`, char.gender].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

/* ─── Skeleton ──────────────────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="rounded-3xl border border-white/[0.05] overflow-hidden bg-white/[0.03]" style={{ aspectRatio: "2/3" }}>
      <div className="w-full h-full animate-pulse bg-gradient-to-b from-white/[0.04] via-white/[0.02] to-transparent" />
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CharactersPage() {
  const { ref, inView } = useInView({
    rootMargin: "400px",
  });

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && (!previousPageData.content || !previousPageData.content.length)) return null;
    if (previousPageData && pageIndex + 1 > previousPageData.pagination?.totalPages) return null;
    return `${BASE_URL}?page=${pageIndex + 1}`;
  };

  const { data, error, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher, {
    revalidateFirstPage: false,
    persistSize: true,
  });

  const characters = data ? data.flatMap((page) => page.content ?? []) : [];
  
  const initialLoad = isLoading && size === 1 && !data;
  const loadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.content?.length === 0;
  const isReachingEnd = 
    isEmpty || 
    (data && data[data.length - 1]?.content?.length < 5) || 
    (data && data[data.length - 1]?.pagination?.totalPages <= size);
    
  const hasMore = !isReachingEnd;

  useEffect(() => {
    if (inView && hasMore && !loadingMore) {
      setSize(size + 1);
    }
  }, [inView, hasMore, loadingMore, setSize, size]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col overflow-x-hidden">
      <Navbar />

      {/* Fixed ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-red/[0.08] blur-[160px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-brand-orange/[0.05] blur-[130px] rounded-full" />
      </div>

      <main className="flex-grow pt-36 pb-32 px-4 sm:px-8 max-w-[1400px] mx-auto w-full relative z-10">

        {/* ── Heading ── */}
        <div className="mb-14 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-brand-orange/60 font-montserrat text-[10px] tracking-[0.4em] uppercase mb-4"
          >
            Universe Compendium
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-6xl md:text-8xl font-bangers tracking-wider leading-none mb-5"
          >
            DEMON SLAYER{" "}
            <span className="text-brand-orange drop-shadow-[0_0_24px_rgba(255,138,0,0.4)]">
              ROSTER
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-white/40 font-montserrat text-sm max-w-md mx-auto leading-relaxed"
          >
            Every demon, slayer, and soul caught between — all in one place.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-8 mx-auto w-20 h-px bg-gradient-to-r from-transparent via-brand-orange to-transparent"
          />
        </div>

        {/* ── Skeleton ── */}
        {initialLoad && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7">
            {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Grid ── */}
        {!initialLoad && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-7 auto-rows-[420px] sm:auto-rows-[480px] lg:auto-rows-[520px]">
            {characters.map((char, i) => (
              <CharacterCard key={char.id} char={char} index={i} />
            ))}
          </div>
        )}

        {/* Scroll sentinel — sits just below the grid */}
        <div ref={ref} className="h-2 mt-4" />

        {/* Loading more indicator */}
        <AnimatePresence>
          {loadingMore && (
            <motion.div
              key="loader"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center gap-3 mt-14"
            >
              <div className="w-9 h-9 border-[2.5px] border-brand-orange border-t-transparent rounded-full animate-spin" />
              <span className="font-montserrat text-[11px] text-white/35 tracking-[0.22em] uppercase">
                Loading more
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* End of list */}
        {!hasMore && !loadingMore && characters.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center gap-5">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-white/10" />
              <span className="font-montserrat text-[10px] text-white/20 tracking-[0.3em] uppercase">
                All {characters.length} characters loaded
              </span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-white/10" />
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}