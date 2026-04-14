"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, Swords, Users } from "lucide-react";
import Navbar from "../../../components/Navbar";

export default function CharacterDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params.id) return;

    const fetchCharacterDetail = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://www.demonslayer-api.com/api/v1/characters?id=${params.id}`);
        const data = await res.json();
        if (data && data.content && data.content.length > 0) {
          setCharacter(data.content[0]);
        }
      } catch (error) {
        console.error("Failed to fetch character details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacterDetail();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex justify-center items-center">
        <div className="w-16 h-16 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bangers mb-4">Character Not Found</h1>
        <button
          onClick={() => router.back()}
          className="text-brand-orange font-montserrat flex items-center gap-2"
        >
          <ArrowLeft size={16} /> GO BACK
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white relative font-inter overflow-x-hidden">
      <Navbar />

      {/* ── Hero Section ── */}
      <div className="w-full relative min-h-[85vh] flex items-center pt-32 pb-16">
        {/* Background */}
        <div className="absolute inset-0 z-0 opacity-30">
          {character.combat_style?.length > 0 && character.combat_style[0].img ? (
            <img
              src={character.combat_style[0].img}
              alt="Background"
              className="w-full h-full object-cover blur-[2px]"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-brand-red/20 to-brand-orange/20" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          {/* Left – Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-grow max-w-2xl py-8"
          >
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-1.5 rounded border-l-2 border-brand-orange bg-brand-orange/10 text-brand-orange text-xs font-montserrat font-bold tracking-widest uppercase">
                {character.race}
              </span>
              {character.affiliation && (
                <span className="px-4 py-1.5 rounded border-l-2 border-blue-500 bg-blue-500/10 text-blue-400 text-xs font-montserrat font-bold tracking-widest uppercase">
                  {character.affiliation.name}
                </span>
              )}
            </div>

            <h1 className="text-6xl md:text-8xl font-bangers tracking-widest mb-6 filter drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] text-white leading-none">
              {character.name}
            </h1>

            <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-white/80 font-montserrat mt-8 bg-white/5 border border-white/10 p-5 sm:p-6 rounded-2xl backdrop-blur-sm">
              {character.age && (
                <div>
                  <span className="text-white/40 uppercase text-[10px] font-bold tracking-widest block mb-1">Age</span>
                  <span className="text-lg">{character.age}</span>
                </div>
              )}
              {character.gender && (
                <div>
                  <span className="text-white/40 uppercase text-[10px] font-bold tracking-widest block mb-1">Gender</span>
                  <span className="text-lg">{character.gender}</span>
                </div>
              )}
              {character.first_arc_appearance && (
                <div>
                  <span className="text-white/40 uppercase text-[10px] font-bold tracking-widest block mb-1">First Appearance</span>
                  <span className="text-lg text-brand-orange font-bold tracking-wide">{character.first_arc_appearance.name}</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right – Character Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="w-full md:w-1/2 h-[50vh] md:h-[75vh] flex justify-center md:justify-end shrink-0 pointer-events-none"
          >
            <img
              src={character.img}
              alt={character.name}
              className="w-auto h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,138,0,0.15)]"
              crossOrigin="anonymous"
            />
          </motion.div>
        </div>
      </div>

      {/* ── About + Quote ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full py-16 relative z-10 space-y-12">
        {/* Quote */}
        {character.quote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 text-brand-orange/10">
              <Quote size={80} />
            </div>
            <p className="text-xl sm:text-2xl font-montserrat font-medium italic text-white/90 leading-relaxed relative z-10">
              "{character.quote}"
            </p>
          </motion.div>
        )}

        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-montserrat font-bold mb-6 flex items-center gap-3">
            <span className="w-8 h-1 bg-brand-orange block" /> ABOUT
          </h2>
          <p className="text-white/70 font-inter leading-relaxed text-lg">
            {character.description}
          </p>
        </motion.div>
      </div>

      {/* ── Combat Style ── */}
      {character.combat_style && character.combat_style.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pb-16 relative z-10">
          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-3"
          >
            <Swords size={20} className="text-brand-red" />
            <h2 className="text-2xl font-montserrat font-bold flex items-center gap-3">
              <span className="w-8 h-1 bg-brand-red block" /> COMBAT STYLE
            </h2>
          </motion.div>

          {/* Cards grid – 1 col on mobile, 2 on md, 3 on xl */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {character.combat_style.map((style, i) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl flex flex-col"
              >
                {/* Style image */}
                {style.img && (
                  <div className="w-full bg-[#0a0a0a] border-b border-white/5 flex items-center justify-center p-4">
                    <img
                      src={style.img}
                      alt={style.name}
                      className="w-full h-56 object-contain rounded-lg"
                      crossOrigin="anonymous"
                    />
                  </div>
                )}

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bangers text-4xl tracking-widest text-brand-orange mb-4 drop-shadow-md leading-none">
                    {style.name}
                  </h3>
                  <p className="text-white/75 font-inter leading-relaxed text-sm flex-1">
                    {style.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ── Affiliation ── */}
      {character.affiliation && (
        <div className="max-w-7xl mx-auto px-4 sm:px-8 w-full pb-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-lg font-montserrat font-bold mb-4 uppercase text-white/50 tracking-widest flex items-center gap-2">
              <Users size={16} /> Affiliation
            </h2>
            <div className="p-5 sm:p-6 rounded-xl border border-white/10 bg-white/5">
              <h3 className="font-bold font-montserrat text-lg text-white mb-2">
                {character.affiliation.name}
              </h3>
              <p className="text-sm text-white/60 font-inter">
                {character.affiliation.description}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}