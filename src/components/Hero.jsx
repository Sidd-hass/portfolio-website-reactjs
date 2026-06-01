import React, { useEffect, useState, useRef } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
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
      
      // Pull element 30% towards mouse coordinates
      element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = "translate(0px, 0px)";
      element.style.transition = "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)";
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

// Text Scramble component for name/title reveal
function ScrambleText({ text, delay = 0 }) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%-=[]{}*+&%";
    let timer;
    let interval;
    let iterations = 0;

    const start = () => {
      interval = setInterval(() => {
        setDisplayText(() => {
          return text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              if (index < iterations) return text[index];
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        });

        iterations += 1 / 2;
        if (iterations >= text.length) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, 30);
    };

    timer = setTimeout(start, delay * 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, delay]);

  return <span className="font-display tracking-tight text-white font-black">{displayText}</span>;
}

// Typewriter Subtitle
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
        }, 500);
      } else {
        timer = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 45);
      }
    } else {
      if (displayText === currentWord) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        timer = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 85);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIdx, words]);

  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const cursorTimer = setInterval(() => setBlink(b => !b), 500);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className="font-heading font-medium text-slate-300">
      {displayText}
      <span className={`text-[#00f5ff] ml-1 font-bold ${blink ? "opacity-100" : "opacity-0"}`}>|</span>
    </span>
  );
}

// Torus Knot floating geometric shape
function TorusKnotShape() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const { x, y } = state.mouse;

    // Slowly rotate knot + subtle mouse parallax coordinates mapping
    meshRef.current.rotation.x = time * 0.12 + y * 0.4;
    meshRef.current.rotation.y = time * 0.18 + x * 0.4;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1.2, 0.4, 150, 16]} />
      <meshStandardMaterial
        color="#00f5ff"
        wireframe={true}
        emissive="#00f5ff"
        emissiveIntensity={0.7}
        roughness={0.1}
        metalness={0.95}
      />
    </mesh>
  );
}

export default function Hero() {
  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-start md:justify-center relative w-full container mx-auto px-6 pt-36 md:pt-24 z-10 overflow-hidden">
      {/* Glow overlays */}
      <div className="ambient-glow glow-1 absolute -top-1/4 -right-1/4" />
      <div className="ambient-glow glow-2 absolute bottom-1/4 -left-1/4" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center w-full min-h-[80vh] relative z-10">
        
        {/* Left Side: Copy and Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="md:col-span-7 flex flex-col gap-5 text-left"
        >
          {/* Mobile Spacer to clear navbar */}
          <div className="h-24 md:hidden" />

          {/* Status Header Badge */}
          <div className="flex">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#7c3aed]/10 border border-[#7c3aed]/25 rounded-full font-display text-[10px] tracking-[1.5px] font-semibold text-[#7c3aed] uppercase">
              <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full shadow-[0_0_8px_#7c3aed] animate-pulse" />
              SYSTEM CORE INSTALLED // v2.0.26
            </div>
          </div>

          {/* User Name Header */}
          <div className="flex flex-col gap-1">
            <span className="font-display text-[10px] tracking-[2.5px] text-[#00f5ff] uppercase font-bold">
              // SECURE LINK PROTOCOL
            </span>
            <h2 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-widest uppercase">
              <ScrambleText text="SIDDHANT PANDEY" delay={0.1} />
            </h2>
          </div>

          {/* Name Header with Scramble reveal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-black leading-[1.05] tracking-tight uppercase">
            ORCHESTRATING THE <br />
            <span className="text-gradient">
              <ScrambleText text="CLOUD FRONTIER" delay={0.6} />
            </span>
          </h1>

          {/* Role Subtitle with Typewriter effect */}
          <p className="text-xl sm:text-2xl text-slate-300 font-heading min-h-[3rem] flex items-center">
            I am a&nbsp;
            <Typewriter words={ROLES} />
          </p>

          <p className="text-slate-400 font-body text-sm sm:text-base max-w-lg leading-relaxed">
            I engineer cloud network infrastructures, design scalable container fabrics, and develop fullstack applications using cutting-edge telemetry observability and automation models.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Magnetic>
              <button
                onClick={() => handleScrollTo("projects")}
                className="btn-premium interactive-hover flex items-center gap-2 bg-[#00f5ff]/10 border border-[#00f5ff] text-white hover:bg-transparent rounded-xl px-6 py-3 font-heading uppercase text-xs font-semibold tracking-wider transition-all duration-300"
              >
                Scan Projects
                <ArrowUpRight size={16} />
              </button>
            </Magnetic>
            
            <Magnetic>
              <button
                onClick={() => handleScrollTo("contact")}
                className="btn-premium btn-premium-secondary interactive-hover flex items-center gap-2 border border-white/20 text-white hover:border-[#7c3aed] rounded-xl px-6 py-3 font-heading uppercase text-xs font-semibold tracking-wider transition-all duration-300"
              >
                Connect Protocol
              </button>
            </Magnetic>

            <Magnetic>
              <a
                href="https://drive.google.com/file/d/1PlEqaMFdAAvsdEVW93m4FX1WXq4cJcWm/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="btn-premium interactive-hover flex items-center gap-2 bg-[#7c3aed]/10 border border-[#7c3aed]/50 text-white hover:border-[#7c3aed] rounded-xl px-6 py-3 font-heading uppercase text-xs font-semibold tracking-wider transition-all duration-300"
              >
                Download CV
                <Download size={16} />
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* Right Side: Profile Image + R3F Torus Knot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
          className="md:col-span-5 h-[350px] md:h-[500px] w-full flex justify-center items-center relative"
        >
          {/* Subtle backdrop circle glow behind shape */}
          <div className="absolute w-[250px] h-[250px] bg-gradient-to-r from-[#00f5ff]/15 to-[#7c3aed]/15 rounded-full filter blur-[50px] pointer-events-none" />
          
          {/* 3D Torus Knot behind the profile */}
          <Canvas camera={{ position: [0, 0, 4], fov: 55 }} dpr={[1, 2]}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00f5ff" />
            <directionalLight position={[-10, -10, 5]} intensity={1} color="#7c3aed" />
            <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.6}>
              <TorusKnotShape />
            </Float>
          </Canvas>

          {/* Profile Image Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
              {/* Animated glowing ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#00f5ff] via-[#7c3aed] to-[#f43f5e] opacity-60 blur-md animate-spin" style={{ animationDuration: '8s' }} />
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#7c3aed] opacity-80" />
              {/* Image container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#0c0e17]">
                <img
                  src={profileImage}
                  alt="Siddhant Pandey"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
