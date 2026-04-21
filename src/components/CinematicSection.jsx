"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedCanvas from "./AnimatedCanvas";
import GlassPanel from "./GlassPanel";
import { SCENES } from "@/data/scenes";

gsap.registerPlugin(ScrollTrigger);

export default function CinematicSection() {
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      // Total scroll height: 100vh per scene
      end: `+=${SCENES.length * 100}%`, 
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        // Calculate the active scene based on scroll progress
        const progress = self.progress;
        const newScene = Math.min(
          Math.floor(progress * SCENES.length),
          SCENES.length - 1
        );
        
        // Update React state if changed
        setActiveScene((current) => (current !== newScene ? newScene : current));
      }
    });

    // We can also animate any entrance effects for the entire section here
    gsap.fromTo(containerRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 1, ease: "power2.inOut", 
          scrollTrigger: {
             trigger: containerRef.current,
             start: "top 80%",
             end: "top 20%",
             scrub: true
          }
        }
    );

  }, { scope: containerRef }); // only run once on mount

  return (
    <section ref={containerRef} className="relative w-full text-white bg-black z-10">
      {/* 
        This is the inner container that gets pinned by GSAP. 
        It stays fixed at top:0 and occupies 100vh.
      */}
      <div className="relative w-full h-[100dvh] overflow-hidden flex flex-col md:flex-row">
        
        {/* Background Canvas Layer */}
        <AnimatedCanvas activeScene={activeScene} />

        {/* Foreground Content Layer */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end md:justify-center items-center md:items-end pb-12 md:pb-0 px-4 md:px-12 lg:px-24 pointer-events-none">
          <GlassPanel activeScene={activeScene} />
        </div>
        
        {/* Cinematic letterbox overlay to frame the top/bottom slightly */}
        <div className="absolute top-0 left-0 w-full h-[10vh] bg-gradient-to-b from-black to-transparent pointer-events-none z-30" />
        <div className="absolute bottom-0 left-0 w-full h-[10vh] bg-gradient-to-t from-black to-transparent pointer-events-none z-30" />
        
        {/* Diagonal scratch overlay just for extra flair */}
        <div 
           className="absolute inset-0 pointer-events-none z-30 opacity-10 mix-blend-screen"
           style={{
               backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)"
           }}
        />
      </div>
    </section>
  );
}
