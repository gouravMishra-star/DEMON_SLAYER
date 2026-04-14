"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CharacterGrid from "@/components/CharacterGrid";

export default function Home() {
    const [arcIndex, setArcIndex] = useState(0);
    const [isDemonMode, setIsDemonMode] = useState(false);

    const getBackgroundColor = () => {
        if (isDemonMode) {
            if (arcIndex === 0) return "bg-rose-950";
            if (arcIndex === 1) return "bg-purple-950";
            return "bg-neutral-900";
        }
        if (arcIndex === 0) return "bg-emerald-950";
        if (arcIndex === 1) return "bg-orange-950";
        return "bg-cyan-950";
    };

    return (
        <div className={`min-h-screen flex flex-col transition-colors duration-1000 ${getBackgroundColor()}`}>
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/40 to-black/80 pointer-events-none z-0" aria-hidden />
            <div className="relative z-10 flex min-h-screen w-full flex-col overflow-x-hidden">
                {/* Navbar is position:absolute — does not reserve height; Hero clears it with padding-top */}
                <Navbar isDemonMode={isDemonMode} setIsDemonMode={setIsDemonMode} />
                <main className="relative w-full min-w-0 flex-1 flex flex-col">
                    <Hero
                        currentArc={arcIndex}
                        setCurrentArc={setArcIndex}
                        isDemonMode={isDemonMode}
                    />
                    <div className="px-8 md:px-24 pb-12 mt-auto w-full max-w-[1400px] mx-auto pt-10">
                        <CharacterGrid currentArc={arcIndex} isDemonMode={isDemonMode} />
                    </div>
                </main>
            </div>
        </div>
    );
}
