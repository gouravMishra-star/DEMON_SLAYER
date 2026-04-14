"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Lightning from "@/components/Lightning";
import Plasma from "@/components/Plasma";
import Hyperspeed from "@/components/Hyperspeed";
import Balatro from "@/components/Balatro";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────
   Journey Step Data — single source of truth
───────────────────────────────────────────── */
const STEPS = [
  {
    id: 1,
    label: "The First Strike",
    roman: "I",
    desc: "Hesitation is death. Tanjiro's first true slash is a baptism of fire and water. Precision over panic. A single breath determines who walks away.",
    color: "sky",
    videoSrc: "/videos/tanjiro_slash.mp4",
    alt: false,
    bg: <Balatro isRotate={false} mouseInteraction={true} pixelFilter={745} color1="#DE443B" color2="#162325" color3="#006BB4" />,
    bgGradient: "via-cyan-900/10",
    shadow: "rgba(14,165,233,0.4)",
    border: "border-sky-400/20",
    hoverBorder: "hover:border-sky-400/60",
    hoverShadow: "hover:shadow-[0_20px_80px_-15px_rgba(14,165,233,0.6)]",
    glow: "#0ea5e9",
  },
  {
    id: 2,
    label: "Fearless Assault",
    roman: "II",
    desc: "Cornered beasts bite hardest. Awakening the true spirit of a slayer means transforming panic into unrelenting fury. Blood spills, but the attack never stops.",
    color: "red",
    videoSrc: "/videos/attack.mp4",
    alt: true,
    bg: <Plasma color="#ff6b35" speed={0.6} direction="forward" scale={1.2} opacity={1} />,
    bgGradient: "via-transparent",
    shadow: "rgba(215,31,39,0.4)",
    border: "border-brand-red/20",
    hoverBorder: "hover:border-brand-red/60",
    hoverShadow: "hover:shadow-[0_20px_80px_-15px_rgba(215,31,39,0.7)]",
    glow: "#d71f27",
  },
  {
    id: 3,
    label: "Thunder Calling",
    roman: "III",
    desc: "A trance between absolute terror and lethal focus. Thunder Breathing strikes before the sound arrives. One perfected form, repeated a thousand times.",
    color: "yellow",
    videoSrc: "/videos/genetuse_fan_moment.mp4",
    alt: false,
    bg: <Lightning hue={55} xOffset={0} speed={1.5} intensity={1.5} size={1} />,
    bgGradient: "via-yellow-900/10",
    shadow: "rgba(250,204,21,0.4)",
    border: "border-yellow-400/20",
    hoverBorder: "hover:border-yellow-400/60",
    hoverShadow: "hover:shadow-[0_20px_80px_-15px_rgba(250,204,21,0.6)]",
    glow: "#facc15",
  },
  {
    id: 4,
    label: "Unbreakable Bonds",
    roman: "IV",
    desc: "Beyond the blood, laughter echoes. The bonds forged in the darkest times transform a lonely path of vengeance into an unstoppable crusade.",
    color: "purple",
    videoSrc: "/videos/fan_moment.mp4",
    alt: true,
    bg: (
      <Hyperspeed
        effectOptions={{
          distortion: "turbulentDistortion",
          length: 400,
          roadWidth: 12,
          islandWidth: 2,
          lanesPerRoad: 3,
          fov: 90,
          fovSpeedUp: 150,
          speedUp: 2,
          carLightsFade: 0.4,
          totalSideLightSticks: 20,
          lightPairsPerRoadWay: 40,
          shoulderLinesWidthPercentage: 0.05,
          brokenLinesWidthPercentage: 0.1,
          brokenLinesLengthPercentage: 0.5,
          lightStickWidth: [0.12, 0.5],
          lightStickHeight: [1.3, 1.7],
          movingAwaySpeed: [60, 80],
          movingCloserSpeed: [-120, -160],
          carLightsLength: [12, 80],
          carLightsRadius: [0.05, 0.14],
          carWidthPercentage: [0.3, 0.5],
          carShiftX: [-0.8, 0.8],
          carFloorSeparation: [0, 5],
          colors: {
            roadColor: 0x000000,
            islandColor: 0x111111,
            background: 0x000000,
            shoulderLines: 0xa855f7,
            brokenLines: 0xa855f7,
            leftCars: [0xd71f27, 0xa855f7, 0xffffff],
            rightCars: [0x0ea5e9, 0xfacc15, 0xa855f7],
            sticks: 0xa855f7,
          },
        }}
      />
    ),
    bgGradient: "via-purple-900/10",
    shadow: "rgba(168,85,247,0.4)",
    border: "border-purple-400/20",
    hoverBorder: "hover:border-purple-400/60",
    hoverShadow: "hover:shadow-[0_20px_80px_-15px_rgba(168,85,247,0.6)]",
    glow: "#a855f7",
  },
];

/* ─────────────────────────────────────────────
   Colour token maps (Tailwind JIT-safe strings)
───────────────────────────────────────────── */
const COLOR_MAP = {
  sky: {
    text: "text-sky-400",
    drop: "drop-shadow-[0_0_20px_rgba(14,165,233,0.8)]",
    hover: "group-hover:text-blue-300",
    cap: "text-sky-400/20 group-hover:text-sky-400/50",
    origin: "origin-left",
  },
  red: {
    text: "text-brand-red",
    drop: "drop-shadow-[0_0_40px_rgba(215,31,39,1)]",
    hover: "group-hover:text-red-400",
    cap: "text-brand-red/20 group-hover:text-brand-red/50",
    origin: "origin-right",
  },
  yellow: {
    text: "text-yellow-400",
    drop: "drop-shadow-[0_0_40px_rgba(250,204,21,0.8)]",
    hover: "group-hover:text-yellow-200",
    cap: "text-yellow-400/20 group-hover:text-yellow-400/50",
    origin: "origin-left",
  },
  purple: {
    text: "text-purple-400",
    drop: "drop-shadow-[0_0_40px_rgba(168,85,247,0.8)]",
    hover: "group-hover:text-purple-300",
    cap: "text-purple-400/20 group-hover:text-purple-400/50",
    origin: "origin-right",
  },
};

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
   Journey Step Card
───────────────────────────────────────────── */
const JourneyStep = ({ step, index }) => {
  const c = COLOR_MAP[step.color];
  const isAlt = step.alt;

  return (
    <div
      className={`journey-step${isAlt ? " alt-layout" : ""} relative w-full h-[100vh] flex flex-col md:flex-row items-center justify-center border-b border-white/5 overflow-hidden`}
    >
      {/* ── 3-D background layer ── */}
      <div
        className="absolute inset-0 z-0 parallax-bg"
        data-speed={isAlt ? "-0.3" : "0.4"}
        style={{ height: "130vh", top: isAlt ? "0" : "-15vh", opacity: step.id === 3 ? 1 : 0.7 }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black ${step.bgGradient} to-black z-10 pointer-events-none`}
        />
        <div className="absolute inset-0 pointer-events-auto">{step.bg}</div>
      </div>

      {/* ── Diagonal step-number watermark ── */}
      <span
        className="absolute font-bangers select-none pointer-events-none z-[1] text-[30vw] leading-none opacity-[0.04]"
        style={{
          color: step.glow,
          bottom: "-5%",
          [isAlt ? "left" : "right"]: "-3%",
          transform: `rotate(${isAlt ? -8 : 8}deg)`,
        }}
      >
        {step.roman}
      </span>

      {/* ── Glowing orb accent ── */}
      <div
        className="absolute w-72 h-72 rounded-full blur-[120px] opacity-20 pointer-events-none z-[1]"
        style={{
          background: step.glow,
          [isAlt ? "left" : "right"]: "10%",
          top: "20%",
        }}
      />

      {/* ── Content row ── */}
      <div
        className={`relative z-10 flex flex-col ${isAlt ? "md:flex-row-reverse" : "md:flex-row"
          } items-center justify-between w-full max-w-[100rem] mx-auto px-4 md:px-8 gap-8 md:gap-16`}
      >
        {/* Video */}
        <div
          className="step-video-container relative w-full md:w-[55%] z-10 group"
          style={{ aspectRatio: "16/9" }}
        >
          {/* Diagonal clip frame */}
          <div
            className="absolute inset-0 rounded-2xl z-0 opacity-60"
            style={{ background: step.glow, clipPath: isAlt ? "polygon(0 0,6px 0,6px 100%,0 100%)" : "polygon(calc(100% - 6px) 0,100% 0,100% 100%,calc(100% - 6px) 100%)" }}
          />
          <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-black/40 backdrop-blur-sm">
            <video
              src={step.videoSrc}
              preload="auto"
              loop
              muted
              playsInline
              className="step-video w-full h-full object-cover scale-[1.02] group-hover:scale-100 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-black/20 mix-blend-overlay group-hover:bg-black/0 transition-colors duration-700" />
            {/* Corner accent lines */}
            <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 opacity-60" style={{ borderColor: step.glow }} />
            <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 opacity-60" style={{ borderColor: step.glow }} />
          </div>
        </div>

        {/* Text card */}
        <div
          className={`step-text relative w-full md:w-[40%] z-20 p-8 md:p-12 backdrop-blur-2xl bg-black/40 ${step.border} border rounded-3xl shadow-2xl hover:bg-black/80 hover:scale-[1.02] hover:-translate-y-2 ${step.hoverShadow} ${step.hoverBorder} transition-all duration-500 ease-out cursor-default group ${isAlt ? "text-right" : ""
            }`}
          data-speed="1.2"
        >

          <h2
            className={`step-title text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bangers ${c.text} mb-6 uppercase ${c.drop} group-hover:scale-105 ${c.hover} transition-transform duration-500 transform ${c.origin} break-words leading-none`}
          >
            {step.label}
          </h2>

          <div className={`step-slash h-[2px] w-16 mb-6 ${isAlt ? "ml-auto" : ""}`} style={{ background: `linear-gradient(90deg, ${step.glow}, transparent)` }} />

          <p className="step-desc font-inter text-xl md:text-2xl text-gray-300 leading-relaxed font-light group-hover:text-white transition-colors duration-500">
            <span
              className={`text-7xl font-bangers ${c.cap} ${isAlt ? "float-right ml-4" : "float-left mr-4"} leading-[0.8] mt-2 transition-colors duration-500`}
            >
              {step.roman}
            </span>
            {step.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

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

    // Journey steps
    gsap.utils.toArray(".journey-step").forEach((section) => {
      const isAlt = section.classList.contains("alt-layout");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      // Slash line
      tl.from(section.querySelector(".step-slash"), {
        scaleX: 0,
        transformOrigin: isAlt ? "right center" : "left center",
        duration: 0.4,
        ease: "power4.inOut",
      }, 0);

      // Title
      tl.from(section.querySelector(".step-title"), {
        x: isAlt ? 150 : -150,
        opacity: 0,
        skewX: isAlt ? -30 : 30,
        duration: 0.6,
        ease: "back.out(2)",
      }, 0.1);

      // Description
      tl.from(section.querySelector(".step-desc"), {
        y: 60,
        opacity: 0,
        skewY: 5,
        duration: 0.5,
        ease: "power3.out",
      }, 0.3);

      // Video clip reveal
      tl.fromTo(
        section.querySelector(".step-video-container"),
        { clipPath: isAlt ? "polygon(100% 0,100% 0,120% 100%,120% 100%)" : "polygon(0 0,0 0,-20% 100%,-20% 100%)" },
        { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", duration: 0.7, ease: "power3.inOut" },
        0
      );

      // Video zoom + de-rotate
      tl.fromTo(
        section.querySelector(".step-video"),
        { scale: 1.8, rotation: isAlt ? 8 : -8, filter: "brightness(2) contrast(1.5)" },
        { scale: 1, rotation: 0, filter: "brightness(1) contrast(1)", duration: 1, ease: "power3.out" },
        0.1
      );

      // Play / pause on visibility
      const video = section.querySelector(".step-video");
      if (video) {
        ScrollTrigger.create({
          trigger: section,
          start: "top 120%",
          end: "bottom -20%",
          onEnter: () => video.play().catch(() => { }),
          onLeave: () => video.pause(),
          onEnterBack: () => video.play().catch(() => { }),
          onLeaveBack: () => video.pause(),
        });
      }
    });

    // Parallax layers
    gsap.utils.toArray(".parallax-bg").forEach((layer) => {
      const speed = parseFloat(layer.dataset.speed) || 1;
      gsap.to(layer, {
        y: -100 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: layer.closest(".journey-step"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
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

      {/* ── Journey Steps ── */}
      <div className="relative z-10 min-h-screen w-full overflow-hidden border-t border-white/10">
        {STEPS.map((step, i) => (
          <JourneyStep key={step.id} step={step} index={i} />
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Index;