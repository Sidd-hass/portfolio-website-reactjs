import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../hooks/useAudio";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "hero", label: "Home", num: "01" },
  { id: "about", label: "About", num: "02" },
  { id: "skills", label: "Skills", num: "03" },
  { id: "projects", label: "Projects", num: "04" },
  { id: "education", label: "Education", num: "05" },
  { id: "contact", label: "Contact", num: "06" }
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playSound } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    playSound("click");
    playSound("menu");
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (id) => {
    playSound("click");
    setIsOpen(false);
    
    // Smooth scroll using target element
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 300);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[9990] transition-all duration-300 ${
        scrolled ? "py-3 bg-[#0A0A0A]/85 backdrop-blur-md" : "py-4 md:py-6 bg-transparent"
      }`}>
        <div className="container mx-auto flex justify-between items-center">
          {/* Minimal Branding */}
          <div 
            onClick={() => handleLinkClick("hero")}
            className="flex items-center gap-3 cursor-none select-none"
          >
            <span className="font-display font-bold text-sm tracking-[2px] hover:text-neutral-400 transition-colors">
              <span className="hidden md:inline">SIDDHANT PANDEY</span>
              <span className="inline md:hidden">SIDDHANT.P</span>
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            onMouseEnter={() => playSound("hover")}
            className="flex items-center gap-2 font-display text-[10px] tracking-[2px] uppercase text-neutral-400 hover:text-white transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <span>{isOpen ? "[ CLOSE ]" : "[ MENU ]"}</span>
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9980] bg-[#0A0A0A] flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Subtle Grid Background in menu */}
            <div className="grid-overlay" />

            <div className="flex flex-col items-center justify-center gap-6 z-10">
              <nav className="flex flex-col items-center gap-4">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    className="overflow-hidden group"
                  >
                    <button
                      onClick={() => handleLinkClick(item.id)}
                      onMouseEnter={() => playSound("hover")}
                      className="flex items-baseline gap-4 text-center cursor-none"
                    >
                      <span className="font-sans text-xs text-neutral-500 font-medium tracking-wider">
                        {item.num}
                      </span>
                      <span className="font-display text-4xl sm:text-6xl font-bold uppercase text-neutral-300 hover:text-white transition-colors group-hover:scale-105 transform origin-left transition-transform duration-300">
                        {item.label}
                      </span>
                    </button>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="absolute bottom-12 left-0 w-full text-center text-[10px] text-neutral-500 tracking-[2px] font-sans">
              AVAILABLE FOR HIRE WORLDWIDE • GET IN TOUCH
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
