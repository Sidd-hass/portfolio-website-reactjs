import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" }
];

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 200;
      for (const item of NAV_ITEMS) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9990] transition-all duration-500 ${
        scrolled
          ? "py-2.5 bg-[#05070f]/75 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "py-4 md:py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Futuristic Brand Logo */}
        <motion.div
          onClick={() => scrollTo("hero")}
          className="font-display font-extrabold text-xl tracking-[3px] bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] bg-clip-text text-transparent cursor-none select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SIDDHANT.P
        </motion.div>

        {/* Floating Navigation Links */}
        <nav className="hidden md:flex gap-8 items-center">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative px-1 py-2 font-heading text-xs uppercase tracking-[2px] cursor-none transition-colors duration-300 ${
                  isActive ? "text-[#00f5ff]" : "text-slate-400 hover:text-white"
                }`}
              >
                {item.label}

                {/* Animated active underline */}
                {isActive && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] shadow-[0_0_8px_rgba(0,245,255,0.5)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Hover line-draw visual effect */}
                {!isActive && hoveredItem === item.id && (
                  <motion.span
                    layoutId="hoverLine"
                    className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Pulse Hire Status Badge */}
        <div className="flex items-center">
          <div className="hire-badge inline-flex items-center gap-1.5 px-2.5 py-1 md:px-4 md:py-1.5 bg-[#00f5ff]/5 border border-[#00f5ff]/20 rounded-full font-display text-[9px] md:text-[10px] tracking-[1px] md:tracking-[1.5px] font-medium text-[#00f5ff] shadow-[0_0_15px_rgba(0,245,255,0.05)]">
            <span className="hire-pulse w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00f5ff] rounded-full animate-ping" />
            <span className="hidden sm:inline">AVAILABLE FOR HIRE</span>
            <span className="inline sm:hidden">ACTIVE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
