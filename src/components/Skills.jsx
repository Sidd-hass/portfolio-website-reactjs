import React from "react";
import { motion } from "framer-motion";
import { SkillsInfo } from "../constants";

// Assign custom border/glow accent colors per category card
const ACCENT_COLORS = [
  "border-[#00f5ff]/15 hover:border-[#00f5ff]/40 hover:shadow-[0_0_20px_rgba(0,245,255,0.15)]", // Frontend
  "border-[#7c3aed]/15 hover:border-[#7c3aed]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]", // Backend
  "border-pink-500/15 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",   // Languages
  "border-[#00f5ff]/15 hover:border-[#7c3aed]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)]"  // DevOps & Tools
];

const HEADING_COLORS = [
  "text-[#00f5ff] text-glow-cyan",
  "text-[#7c3aed] text-glow-purple",
  "text-pink-500 [text-shadow:0_0_10px_rgba(244,63,94,0.4)]",
  "text-white bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] bg-clip-text text-transparent"
];

export default function Skills() {
  return (
    <section id="skills" className="min-h-screen py-24 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      {/* Background neon glows */}
      <div className="ambient-glow glow-1 absolute top-1/4 left-1/3" />
      <div className="ambient-glow glow-2 absolute bottom-1/4 right-1/4" />

      <div className="section-title-wrap mb-16 text-left relative z-10">
        <span className="section-subtitle">// INTELLECT MATRIX</span>
        <h2 className="section-title text-glow-cyan text-white">THE STACK</h2>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10 w-full">
        {SkillsInfo.map((group, groupIdx) => (
          <motion.div
            key={groupIdx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: groupIdx * 0.15 }}
            className={`glass-panel bg-[#0c0e17]/85 backdrop-blur-md border ${ACCENT_COLORS[groupIdx]} rounded-3xl p-8 flex flex-col gap-6 transition-all duration-500`}
          >
            {/* Category Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 className={`font-heading font-extrabold text-xl tracking-wider uppercase ${HEADING_COLORS[groupIdx]}`}>
                {group.title}
              </h3>
              <span className="font-display text-[9px] text-slate-500 tracking-[1.5px] bg-white/5 px-3 py-1 rounded-full border border-white/5">
                SEC.0{groupIdx + 1} // ACTIVE
              </span>
            </div>

            {/* Badges Flex Grid */}
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, sIdx) => (
                <motion.div
                  key={sIdx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2.5 px-3.5 py-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#00f5ff]/30 rounded-full transition-all duration-300 cursor-none"
                >
                  <img
                    src={skill.logo}
                    alt={skill.name}
                    className="w-5 h-5 object-contain"
                    onError={(e) => {
                      // Fallback icon styling if source fails
                      e.target.style.display = "none";
                    }}
                  />
                  <span className="text-xs font-heading font-medium text-slate-300">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
