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

gsap.registerPlugin(ScrollTrigger);

export default function App() {
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

  return (
    <div className="bg-[#05070f] min-h-screen text-slate-100 selection:bg-[#00f5ff]/20 selection:text-white relative">
      {/* Procedural Grain Noise Overlay */}
      <div className="noise-overlay" />

      {/* 3D WebGL Starfield Background */}
      <Background3D />

      {/* Cybernetic Pointer Dot & Ring Custom Cursor */}
      <CustomCursor />

      {/* Frosted Floating Header Navbar */}
      <Header />

      {/* Sections scroll sequence */}
      <main className="relative z-10 w-full flex flex-col items-center">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>

      {/* Minimalist Footer System Telemetry */}
      <footer className="relative z-10 bg-[#05070f] border-t border-white/5 py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Subtle animated gradient line */}
          <div className="w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#00f5ff] to-transparent shadow-[0_0_8px_rgba(0,245,255,0.4)] animate-pulse mb-8" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <span className="font-heading text-xs text-slate-500 tracking-[1px] uppercase">
              © {new Date().getFullYear()} SIDDHANT PANDEY. DESIGNED FOR PREMIUM FULLSTACK INFRASTRUCTURES.
            </span>
            <div className="flex gap-4 items-center text-[10px] font-display text-slate-500 tracking-wider">
              <span className="text-[#00f5ff]">[ STACK: REACT // R3F // TAILWIND ]</span>
              <span>SYSTEM_ONLINE_v2.0.26</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
