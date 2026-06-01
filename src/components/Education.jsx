import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";
import { education } from "../constants";

export default function Education() {
  return (
    <section id="education" className="min-h-screen py-24 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      {/* Glow ambient background */}
      <div className="ambient-glow glow-1 absolute -top-1/4 -left-1/4" />
      <div className="ambient-glow glow-2 absolute bottom-1/4 -right-1/4" />

      <div className="section-title-wrap mb-16 text-left relative z-10">
        <span className="section-subtitle">// COGNITIVE REGISTRY</span>
        <h2 className="section-title text-glow-cyan text-white">EDUCATION</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 w-full">
        {/* Left Side Timeline details */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0 }}
          className="lg:col-span-8 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-6 relative border-l border-white/10 pl-6 ml-3">
            {education.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] top-2 w-4 h-4 bg-[#05070f] border border-[#7c3aed] rounded-full flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-[#7c3aed] rounded-full animate-pulse" />
                </div>

                <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 border border-white/[0.05] bg-[#0c0e17]/80 hover:bg-[#0c0e17]/95 transition-all duration-300 hover:border-[#7c3aed]/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.1)]">
                  <div className="flex flex-wrap justify-between items-start gap-4">
                    <div className="flex items-center gap-4">
                      {edu.img && (
                        <div className="w-12 h-12 flex justify-center items-center rounded-xl bg-white border border-white/10 p-1.5 overflow-hidden shadow-[0_0_12px_rgba(255,255,255,0.05)]">
                          <img
                            src={edu.img}
                            alt={edu.school}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-heading font-extrabold text-sm sm:text-base text-white tracking-wide leading-tight">
                          {edu.degree}
                        </h4>
                        <span className="font-display text-[11px] text-[#00f5ff] uppercase tracking-wider font-bold block mt-1">
                          {edu.school}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:items-end gap-1.5">
                      <span className="font-display text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full w-fit">
                        {edu.date}
                      </span>
                      {edu.grade && (
                        <span className="font-display text-[10px] text-[#7c3aed] bg-[#7c3aed]/10 border border-[#7c3aed]/25 px-2.5 py-1 rounded-full w-fit font-bold tracking-wider">
                          SCORE: {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-slate-400 font-body text-xs sm:text-sm leading-relaxed border-t border-white/5 pt-3 mt-1">
                    {edu.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side Callout Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, delay: 0.15 }}
          className="lg:col-span-4 flex flex-col gap-6"
        >
          <div className="glass-panel p-8 rounded-3xl border border-white/[0.05] bg-[#0c0e17]/85 backdrop-blur-md flex flex-col gap-6 relative overflow-hidden">
            {/* Design accents */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#00f5ff]/5 rounded-full filter blur-2xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#7c3aed]/5 rounded-full filter blur-2xl pointer-events-none" />

            <div className="flex items-center gap-3">
              <GraduationCap className="text-[#00f5ff]" size={24} />
              <h3 className="font-heading font-extrabold text-base text-white uppercase tracking-wider">
                Academic Pathway
              </h3>
            </div>

            <p className="text-slate-400 font-body text-xs sm:text-sm leading-relaxed">
              My educational track is centered around <strong className="text-white">Information Technology</strong> and analytics. I focus on core computing disciplines, including algorithm design, data structures, cloud architectures, and databases.
            </p>

            <div className="border-t border-white/5 pt-6 flex flex-col gap-4">
              <div className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/20 flex items-center justify-center shrink-0">
                  <Award size={16} className="text-[#00f5ff]" />
                </div>
                <div>
                  <h5 className="font-heading text-xs font-bold text-white uppercase tracking-wide">
                    Gate Prep & Foundations
                  </h5>
                  <p className="text-slate-500 font-body text-[11px] leading-relaxed mt-1">
                    Gained intensive skills in GATE syllabus subjects, including OS kernel loops, database design, compiler operations, and computation theories.
                  </p>
                </div>
              </div>

              <div className="flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center shrink-0">
                  <Award size={16} className="text-[#7c3aed]" />
                </div>
                <div>
                  <h5 className="font-heading text-xs font-bold text-white uppercase tracking-wide">
                    Observability Models
                  </h5>
                  <p className="text-slate-500 font-body text-[11px] leading-relaxed mt-1">
                    Practiced system telemetry tracking and automation frameworks as part of academic labs, connecting fullstack structures with operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
