import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import visual elements & sections
import Background3D from "./components/Background3D";
import CustomCursor from "./components/CustomCursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import SoundToggle from "./components/SoundToggle";
import { AudioProvider, useAudio } from "./hooks/useAudio";

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const { playSound } = useAudio();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    let frameId;
    const rafLoop = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(rafLoop);
    };
    frameId = requestAnimationFrame(rafLoop);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      cancelAnimationFrame(frameId);
    };
  }, []);

  // Section whoosh trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger whoosh sound when section enters viewport
            playSound("whoosh");
          }
        });
      },
      { threshold: 0.15 } // Trigger when 15% visible
    );

    const sections = ["hero", "about", "skills", "projects", "education", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [playSound]);

  return (
    <div className="bg-[#0A0A0A] min-h-screen text-neutral-200 selection:bg-neutral-800 selection:text-white relative">
      
      {/* 3D Grid & Drifting blooms Background */}
      <Background3D />

      {/* Minimal custom cursor */}
      <CustomCursor />

      {/* Minimal navigation bar */}
      <Header />

      {/* Main sections sequence */}
      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Persistent global sound toggle */}
      <SoundToggle />

      {/* Clean minimal editorial footer */}
      <footer className="relative z-10 bg-[#0A0A0A] border-t border-neutral-900 pt-12 pb-24 md:pb-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-neutral-500 font-sans">
            <span className="text-xs tracking-wider uppercase">
              © {new Date().getFullYear()} SIDDHANT PANDEY. ALL RIGHTS RESERVED.
            </span>
            <div className="flex gap-4 items-center text-[10px] tracking-[2px] text-neutral-600 font-medium">
              <span>[ SYSTEM STATUS: ONLINE ]</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}
