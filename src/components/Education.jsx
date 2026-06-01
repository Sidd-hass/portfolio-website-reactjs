import React from "react";
import { motion } from "framer-motion";
import { useAudio } from "../hooks/useAudio";
import { education } from "../constants";

export default function Education() {
  const { playSound } = useAudio();

  return (
    <section id="education" className="min-h-screen py-32 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      
      {/* Title at the top to prevent overlapping */}
      <div className="section-title-wrap mb-16 text-left">
        <span className="section-subtitle">05 / ACADEMICS</span>
        <h2 className="section-title text-neutral-200">EDUCATION</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full border-t border-neutral-900/60 pt-12">
        
        {/* Left Column: Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex flex-col gap-6 text-left"
        >
          <p className="text-neutral-400 font-sans text-xs md:text-sm max-w-xs leading-relaxed">
            My academic training provided a solid grounding in information technology systems, data analytics, OS principles, and database management, laying the groundwork for complex site reliability practices.
          </p>
        </motion.div>

        {/* Right Column: Clean Year-based Rows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 flex flex-col gap-10 text-left"
        >
          <div className="flex flex-col gap-10">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => playSound("hover")}
                className="group grid grid-cols-1 md:grid-cols-12 gap-4 pb-10 border-b border-neutral-950 last:border-0 last:pb-0"
              >
                {/* Year Header */}
                <div className="md:col-span-4 flex flex-col justify-start">
                  <span className="font-display font-bold text-xl sm:text-2xl text-neutral-400 group-hover:text-white transition-colors duration-300">
                    {edu.date.split(" - ")[0]} — {edu.date.split(" - ")[1] || "Present"}
                  </span>
                  <span className="font-sans text-[10px] text-neutral-500 tracking-wider font-semibold uppercase mt-1">
                    {edu.grade ? `SCORE: ${edu.grade}` : "COMPLETED"}
                  </span>
                </div>

                {/* Details Column */}
                <div className="md:col-span-8 flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    {edu.img && (
                      <div className="w-12 h-12 shrink-0 flex justify-center items-center rounded-xl bg-neutral-900 border border-neutral-800 p-1.5 transition-all duration-300">
                        <img
                          src={edu.img}
                          alt={edu.school}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-neutral-200 group-hover:text-white transition-colors">
                        {edu.degree}
                      </h4>
                      <span className="font-sans text-xs text-neutral-400 font-medium">
                        {edu.school}
                      </span>
                    </div>
                  </div>

                  <p className="text-neutral-400 font-sans text-xs sm:text-sm leading-relaxed max-w-xl">
                    {edu.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
