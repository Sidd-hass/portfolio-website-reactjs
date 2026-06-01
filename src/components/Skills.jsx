import React from "react";
import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";
import { SkillsInfo } from "../constants";

export default function Skills() {
  const { playSound } = useAudio();

  // Extract all individual skills for the marquees
  const allSkills = SkillsInfo.flatMap(group => group.skills);
  // Split into two arrays for dual direction marquee
  const midPoint = Math.ceil(allSkills.length / 2);
  const row1Skills = allSkills.slice(0, midPoint);
  const row2Skills = allSkills.slice(midPoint);

  // Helper to render marquee list
  const renderMarqueeRow = (skills, reverse = false) => {
    // Duplicate skills list to ensure seamless looping
    const doubledSkills = [...skills, ...skills, ...skills];
    
    return (
      <div className="marquee-container py-3">
        <div 
          className="marquee-content flex items-center gap-6"
          style={{ animationDirection: reverse ? "reverse" : "normal", animationDuration: "35s" }}
        >
          {doubledSkills.map((skill, idx) => (
            <div
              key={idx}
              onMouseEnter={() => playSound("hover")}
              className="flex items-center gap-2.5 px-5 py-2.5 bg-neutral-900/60 border border-neutral-800/40 hover:border-indigo-500/50 rounded-full cursor-none opacity-90 hover:opacity-100 transition-all duration-300 shadow-sm"
            >
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-4 h-4 object-contain"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <span className="text-xs font-sans font-medium text-neutral-300 tracking-wide uppercase">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="skills" className="min-h-screen py-32 flex flex-col justify-center relative w-full container mx-auto px-6 z-10 overflow-hidden">
      
      {/* Editorial Title */}
      <div className="section-title-wrap mb-16 text-left">
        <span className="section-subtitle">03 / CAPABILITIES</span>
        <h2 className="section-title text-neutral-200">THE TECH STACK</h2>
      </div>

      {/* Double Row Marquee */}
      <div className="flex flex-col gap-2 w-full my-8 relative">
        {/* Subtle blur fades at edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        
        {renderMarqueeRow(row1Skills, false)}
        {renderMarqueeRow(row2Skills, true)}
      </div>

      {/* Categorized Minimal Textual Layout with stylish glass cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16 w-full border-t border-neutral-900 pt-12">
        {SkillsInfo.map((group, groupIdx) => (
          <motion.div
            key={groupIdx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: groupIdx * 0.1 }}
            className="glass-card-stylish flex flex-col gap-4 text-left"
          >
            <div className="flex items-center gap-2 border-b border-neutral-950 pb-2">
              <span className="font-sans text-[10px] text-neutral-500 font-bold tracking-wider">
                0{groupIdx + 1} //
              </span>
              <h3 className="font-display font-bold text-sm tracking-widest text-neutral-200 uppercase">
                {group.title}
              </h3>
            </div>
            
            <ul className="flex flex-col gap-2">
              {group.skills.map((skill, sIdx) => (
                <li
                  key={sIdx}
                  onMouseEnter={() => playSound("hover")}
                  className="font-sans text-xs text-neutral-400 hover:text-indigo-400 hover:pl-2 transition-all duration-300 py-1.5 border-b border-neutral-950/40 flex items-center justify-between group/item"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 scale-0 group-hover/item:scale-100 transition-transform duration-300" />
                    {skill.name}
                  </span>
                  <span className="text-[9px] text-neutral-600 font-medium group-hover/item:text-indigo-500/50 transition-colors">ACTIVE</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
