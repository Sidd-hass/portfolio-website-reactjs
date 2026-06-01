import React, { useEffect, useState, useRef } from "react";
import { ArrowDown, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";
import profileImage from "../assets/profile2.png";

// Roles list
const ROLES = [
  "Fullstack Developer",
  "DevOps Specialist",
  "Cloud Infrastructure Architect",
  "Site Reliability Engineer"
];

// Magnetic Button Effect Component
function Magnetic({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      
      // Pull element 25% towards mouse coordinates
      element.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0px, 0px)";
      element.style.transition = "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)";
    };

    const handleMouseEnter = () => {
      element.style.transition = "none";
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return <div ref={ref} className="inline-block transition-transform duration-300">{children}</div>;
}

// Simple Typewriter Subtitle
function Typewriter({ words }) {
  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;
    const currentWord = words[wordIdx];

    if (isDeleting) {
      if (displayText === "") {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        }, 600);
      } else {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
      }
    } else {
      if (displayText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 60);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIdx, words]);

  return (
    <span className="font-sans font-medium text-neutral-400">
      {displayText}
      <span className="animate-pulse ml-0.5 font-bold text-neutral-200">|</span>
    </span>
  );
}

export default function Hero() {
  const { playSound } = useAudio();

  const handleScrollTo = (id) => {
    playSound("click");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onBtnClick = () => {
    playSound("click");
  };

  const nameText = "SIDDHANT PANDEY";

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-start lg:justify-center relative w-full container mx-auto px-6 pb-12 z-10 overflow-hidden">
      {/* Spacer to push content down below the fixed header on all devices */}
      <div className="h-28 lg:h-32 shrink-0" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">
        
        {/* Left Column: Massive Editorial Typography & Info */}
        <div className="lg:col-span-8 flex flex-col gap-6 text-left">
          
          {/* Status Label */}
          <div className="flex">
            <div className="inline-flex items-center gap-2 text-[10px] tracking-[3px] text-neutral-500 uppercase font-sans font-bold">
              <span>[ AVAILABILITY / REMOTE & ONSITE ]</span>
            </div>
          </div>

          {/* Name letter stagger entrance with vibrant gradient */}
          <h1 className="font-display font-bold leading-[0.9] tracking-[-3px] flex flex-wrap max-w-4xl" style={{ fontSize: "clamp(3.2rem, 9.5vw, 7.5rem)" }}>
            {nameText.split("").map((letter, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.04,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className={`${letter === " " ? "mr-4 sm:mr-6" : ""} bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent`}
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle & Role Selection */}
          <div className="flex flex-col gap-2">
            <div className="text-lg md:text-xl min-h-[2rem] flex items-center">
              <Typewriter words={ROLES} />
            </div>
            
            <p className="text-neutral-400 font-sans text-sm md:text-base max-w-xl leading-relaxed mt-2">
              Engineering high-availability cloud fabrics, automating complex deployment routines, and developing robust frontend systems. Designed for premium performance telemetry models.
            </p>
          </div>

          {/* Minimalist CTAs */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Magnetic>
              <button
                onClick={() => handleScrollTo("projects")}
                onMouseEnter={() => playSound("hover")}
                className="btn-pill hover:border-indigo-400 hover:bg-indigo-500 hover:text-white"
              >
                Scan Projects
                <ArrowDown size={14} className="ml-1" />
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="https://drive.google.com/file/d/1PlEqaMFdAAvsdEVW93m4FX1WXq4cJcWm/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                onClick={onBtnClick}
                onMouseEnter={() => playSound("hover")}
                className="btn-pill btn-pill-secondary flex items-center hover:text-pink-400 hover:border-pink-500/50"
              >
                Download CV
                <Download size={14} className="ml-1.5" />
              </a>
            </Magnetic>

            <Magnetic>
              <button
                onClick={() => handleScrollTo("contact")}
                onMouseEnter={() => playSound("hover")}
                className="btn-pill btn-pill-secondary hover:text-cyan-400 hover:border-cyan-500/50"
              >
                Connect Protocol
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Premium floating offset profile picture with spinning gradient outline */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end items-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: [-10, 10, -10]
            }}
            transition={{ 
              opacity: { duration: 1.2, ease: "easeOut" },
              scale: { duration: 1.2, ease: "easeOut" },
              y: { repeat: Infinity, duration: 6, ease: "easeInOut" }
            }}
            onMouseEnter={() => playSound("scan")}
            className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] rounded-full p-1 border-2 border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.3)]"
          >
            {/* Spinning decorative gradient rings */}
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 opacity-60 blur-sm animate-[spin_10s_linear_infinite]" />
            
            <div className="relative w-full h-full rounded-full overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={profileImage}
                alt="Siddhant Pandey"
                className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-700"
              />
            </div>
            
            {/* Glowing floating dot */}
            <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-pink-500 border border-neutral-950 shadow-[0_0_8px_#ff007f] animate-pulse" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
