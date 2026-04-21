"use client";

import { motion } from "framer-motion";
import { SCENES } from "@/data/scenes";
import { useEffect, useRef } from "react";

const SceneLayer = ({ scene, isActive }) => {
  const videoRef = useRef(null);

  // Play/pause the video based on scene activity to save resources
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="absolute inset-0 w-full h-full will-change-[opacity]"
      style={{ 
        zIndex: isActive ? 10 : 0, 
        pointerEvents: isActive ? 'auto' : 'none' 
      }}
    >
      {/* The webgl component full background */}
      <div className="absolute inset-0 opacity-80">
        {scene.bg}
      </div>
      
      {/* The Video Layer blended on the left */}
      {scene.videoSrc && (
        <div 
          className={`absolute w-full md:w-[50%] h-[40%] md:h-[60%] top-[5%] md:top-[20%] left-0 md:left-[5%] overflow-hidden md:rounded-3xl shadow-2xl border border-white/10 transition-transform duration-[2s] ease-out ${isActive ? "scale-100" : "scale-105"}`}
        >
          {/* Light Color tint matching character glow */}
          <div 
            className="absolute inset-0 z-10 mix-blend-overlay opacity-20 pointer-events-none" 
            style={{ backgroundColor: scene.glow }} 
          />
          <video 
            ref={videoRef}
            src={scene.videoSrc} 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover brightness-110 filter drop-shadow-2xl"
          />
          {/* Vignette edge fading so it melts into background without losing center clarity */}
          <div className="absolute inset-0 pointer-events-none z-20" style={{ backgroundImage: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)" }} />
        </div>
      )}
      
      {/* Subtle screen overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/80 pointer-events-none z-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none z-30" />
    </motion.div>
  );
};

export default function AnimatedCanvas({ activeScene }) {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0 pointer-events-none">
      {SCENES.map((scene, index) => (
        <SceneLayer 
           key={scene.id} 
           scene={scene} 
           isActive={activeScene === index} 
        />
      ))}
    </div>
  );
}
