import React from "react";
import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";
import { experiences } from "../constants";

export default function About() {
  const { playSound } = useAudio();

  const handleMouseEnter = () => {
    playSound("scan");
  };

  return (
    <section id="about" className="min-h-screen py-24 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      
      {/* Title at the top to prevent overlapping */}
      <div className="section-title-wrap mb-16 text-left">
        <span className="section-subtitle">02 / ABOUT ME</span>
        <h2 className="section-title text-neutral-200">THE ENGINEER</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full border-t border-neutral-900/60 pt-12">
        
        {/* Left Column: Key Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col gap-6 text-left"
        >
          <div className="flex flex-col gap-4 font-sans text-xs tracking-wider text-neutral-500">
            <div className="border-b border-neutral-900 pb-2">
              <span className="text-neutral-400 block mb-0.5">CORE DISCIPLINE</span>
              <span className="text-neutral-300 font-medium">DEVOPS & CLOUD ARCHITECTURE</span>
            </div>
            <div className="border-b border-neutral-900 pb-2">
              <span className="text-neutral-400 block mb-0.5">LOCATION</span>
              <span className="text-neutral-300 font-medium">NEW DELHI, INDIA (GMT +5:30)</span>
            </div>
            <div className="border-b border-neutral-900 pb-2">
              <span className="text-neutral-400 block mb-0.5">PHILOSOPHY</span>
              <span className="text-neutral-300 font-medium">INFRASTRUCTURE AS CODE & SITE RELIABILITY</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Bio & Professional Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col gap-8 text-left"
        >
          <div className="flex flex-col gap-4">
            <p className="text-neutral-300 font-sans text-sm sm:text-base leading-relaxed">
              I am <strong className="text-neutral-100 font-semibold">Siddhant Pandey</strong>. I operate at the junction of distributed backend infrastructures, cloud orchestration platforms, and frontend user interfaces. I configure and manage production architectures with a high focus on automation, health diagnostics, and container security.
            </p>
            <p className="text-neutral-400 font-sans text-sm sm:text-base leading-relaxed">
              My engineering revolves around standardizing configuration tasks, optimizing server performance curves, and creating frictionless build/release cycles. I build reliable codebases that automate repetitive chores so clusters scale smoothly.
            </p>
          </div>

          {/* Timeline Grid */}
          <div className="flex flex-col gap-8 mt-6">
            <h3 className="font-display font-bold text-xs tracking-[2px] text-neutral-400 uppercase">
              // EXPERIENCE HISTORY
            </h3>
            
            <div className="flex flex-col gap-8">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="timeline-item group flex flex-col gap-2"
                  onMouseEnter={handleMouseEnter}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      {exp.img && (
                        <div className="w-12 h-12 shrink-0 flex justify-center items-center rounded-xl bg-neutral-900 border border-neutral-800 p-1.5 transition-all duration-300">
                          <img
                            src={exp.img}
                            alt={exp.company}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-bold text-sm sm:text-base text-neutral-200 group-hover:text-white transition-colors">
                          {exp.role}
                        </h4>
                        <span className="font-sans text-xs text-neutral-400">
                          {exp.company}
                        </span>
                      </div>
                    </div>
                    <span className="font-sans text-[11px] text-neutral-500 font-medium tracking-wide">
                      {exp.date}
                    </span>
                  </div>

                  <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-2xl pl-0 sm:pl-9">
                    {exp.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1 pl-0 sm:pl-9">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[9px] font-sans tracking-wide text-neutral-500 bg-neutral-950 border border-neutral-900 px-2 py-0.5 rounded-md hover:border-indigo-500/30 hover:text-indigo-400 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
