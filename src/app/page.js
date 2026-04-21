"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import CinematicSection from "@/components/CinematicSection";

gsap.registerPlugin(ScrollTrigger);



/* ─────────────────────────────────────────────
   Loading Screen
───────────────────────────────────────────── */
const LoadingScreen = () => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
    {/* Animated noise/radial background */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(215,31,39,0.18) 0%, rgba(10,0,0,0.98) 70%)",
      }}
    />
    {/* Pulsing rings */}
    {[1, 2, 3].map((i) => (
      <span
        key={i}
        className="absolute rounded-full border border-brand-red/30 animate-ping"
        style={{
          width: `${i * 180}px`,
          height: `${i * 180}px`,
          animationDuration: `${1.2 + i * 0.5}s`,
          animationDelay: `${i * 0.2}s`,
          opacity: 1 / i,
        }}
      />
    ))}

    {/* Floating kanji */}
    <span
      className="absolute top-[8%] left-[5%] text-[18vw] font-black text-brand-red/10 font-bangers pointer-events-none select-none"
      style={{ animation: "float 6s ease-in-out infinite" }}
    >
      滅
    </span>
    <span
      className="absolute bottom-[5%] right-[3%] text-[16vw] font-black text-red-700/10 font-bangers pointer-events-none select-none"
      style={{ animation: "float 8s ease-in-out infinite reverse" }}
    >
      鬼
    </span>

    {/* Core content */}
    <div className="relative flex flex-col items-center gap-8 z-10">
      {/* Sword icon */}
      <svg
        className="animate-pulse"
        width="56"
        height="56"
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M28 4 L32 24 L52 28 L32 32 L28 52 L24 32 L4 28 L24 24 Z"
          fill="none"
          stroke="#d71f27"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="28" r="5" fill="#d71f27" opacity="0.8" />
      </svg>

      {/* Dots loader */}
      <div className="flex gap-3">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-3 h-3 rounded-full bg-brand-red"
            style={{
              animation: "bounce 1.2s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <p className="font-bangers text-xl tracking-[0.4em] text-brand-red/80 uppercase animate-pulse">
        Awakening Breathing…
      </p>
    </div>

    {/* Inline keyframes */}
    <style>{`
      @keyframes float {
        0%,100% { transform: translateY(0) rotate(-3deg); }
        50%      { transform: translateY(-24px) rotate(3deg); }
      }
      @keyframes bounce {
        0%,100% { transform: scaleY(1); opacity:0.5; }
        50%      { transform: scaleY(1.8); opacity:1; }
      }
    `}</style>
  </div>
);

/* ─────────────────────────────────────────────
   Main Page
───────────────────────────────────────────── */
const Index = () => {
  const [isDemonMode, setIsDemonMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const loadedVideosRef = useRef(0);
  const totalVideos = 5;
  const mouseParallaxRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  /* ── Loader: video count + fallback ── */
  const handleVideoLoad = () => {
    loadedVideosRef.current += 1;
    if (loadedVideosRef.current >= totalVideos) setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "auto";
  }, [loading]);

  /* ── Mouse parallax (hero only) ── */
  useEffect(() => {
    if (loading) return;
    const onMove = (e) => {
      mouseParallaxRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const kanji = document.querySelectorAll(".bg-kanji");
      const { x, y } = mouseParallaxRef.current;
      kanji.forEach((el, i) => {
        const depth = (i + 1) * 12;
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [loading]);

  /* ── GSAP scroll animations ── */
  useGSAP(() => {
    if (loading) return;

    // Hero clip + parallax
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    })
      .from("#video-frame", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0%",
        ease: "power1.inOut",
      })
      .fromTo("#hero-video", { scale: 1 }, { scale: 1.4, y: 150, ease: "none" }, 0);

    // Hero text entrance
    gsap.from(".hero-text-block", {
      y: 150,
      opacity: 0,
      skewY: 15,
      rotationX: -45,
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.2,
      delay: 0.2,
    });

    // Scroll-driven bg kanji
    gsap.to(".bg-kanji", {
      yPercent: -80,
      rotation: 15,
      scale: 1.2,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });


  }, [loading]);

  return (
    <div className={`min-h-screen bg-background text-foreground overflow-hidden ${isDemonMode ? "demon-mode" : ""}`}>

      {/* Background kanji watermarks (mouse-parallaxed) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-overlay opacity-10">
        <span className="bg-kanji absolute top-[10%] left-[-10%] text-[40vw] font-black text-brand-red font-bangers will-change-transform">滅</span>
        <span className="bg-kanji absolute top-[40%] right-[-15%] text-[40vw] font-black text-brand-orange font-bangers will-change-transform">斬</span>
        <span className="bg-kanji absolute top-[70%] left-[10%] text-[40vw] font-black text-purple-600 font-bangers will-change-transform">鬼</span>
      </div>

      {/* Loading screen */}
      {loading && <LoadingScreen />}

      <Navbar isDemonMode={isDemonMode} setIsDemonMode={setIsDemonMode} />

      {/* ── Hero ── */}
      <div className="relative h-screen w-full overflow-x-hidden perspective-[1000px]">
        <div
          id="video-frame"
          style={{ willChange: "transform, clip-path, border-radius" }}
          className="relative z-10 h-screen w-full overflow-hidden bg-black shadow-[0_30px_60px_-15px_rgba(215,31,39,0.5)]"
        >
          <video
            id="hero-video"
            src="/videos/main_seen.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={handleVideoLoad}
            className="absolute inset-0 h-full w-full object-cover origin-center will-change-transform"
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent" />

          <div className="absolute top-[35%] left-6 md:left-[10%] z-20 pointer-events-none perspective-[500px]">
            <h1 className="hero-text-block text-6xl md:text-[9rem] font-bangers text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 uppercase tracking-tighter leading-[0.8] drop-shadow-[0_10px_30px_rgba(215,31,39,0.8)] mix-blend-screen scale-y-110">
              Destroy <br />
              <span
                className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-red-600 to-red-900 block mt-2"
                style={{ WebkitTextStroke: "2px black" }}
              >
                All Demons
              </span>
            </h1>
            <p className="hero-text-block font-montserrat text-white/90 text-lg md:text-2xl mt-8 max-w-2xl leading-relaxed drop-shadow-[0_5px_15px_rgba(0,0,0,1)] uppercase tracking-widest font-bold border-l-4 border-brand-red pl-6 backdrop-blur-sm bg-black/20 py-2">
              Unleash the blade. Sever the nightmare.
            </p>
          </div>
        </div>
      </div>

      {/* ── Cinematic Journey Reveal ── */}
      <CinematicSection />

      <Footer />
    </div>
  );
};

export default Index;