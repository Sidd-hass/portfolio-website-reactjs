import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float } from "@react-three/drei";
import { motion } from "framer-motion";
import { Cpu, Terminal, Shield } from "lucide-react";
import { experiences } from "../constants";

// Interactive 3D morphing blob shape
function DistortedBlob() {
  const solidRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Subtle rotation
    solidRef.current.rotation.x = time * 0.1;
    solidRef.current.rotation.y = time * 0.12;

    wireframeRef.current.rotation.x = time * -0.08;
    wireframeRef.current.rotation.y = time * -0.1;
  });

  return (
    <group>
      {/* Solid Distorted Core */}
      <mesh ref={solidRef}>
        <sphereGeometry args={[1.3, 64, 64]} />
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.45}
          speed={2.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Glowing Wireframe Outer shell */}
      <mesh ref={wireframeRef} scale={1.02}>
        <sphereGeometry args={[1.3, 32, 32]} />
        <MeshDistortMaterial
          color="#00f5ff"
          distort={0.45}
          speed={2.2}
          wireframe={true}
          emissive="#00f5ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function About() {
  return (
    <section id="about" className="min-h-screen py-24 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      <div className="ambient-glow glow-3 absolute -bottom-1/4 -right-1/4" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Bio & Professional Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0 }}
          className="lg:col-span-7 flex flex-col gap-8 text-left"
        >
          <div className="section-title-wrap mb-2">
            <span className="section-subtitle">// BIOSTASIS FILE</span>
            <h2 className="section-title text-glow-cyan text-white">THE ENGINEER</h2>
          </div>

          <p className="text-slate-300 font-body leading-relaxed text-sm sm:text-base">
            I am <strong className="text-[#00f5ff]">Siddhant Pandey</strong>, a DevOps & Cloud Infrastructure Architect designing resilient digital environments. Operating at the cross-section of distributed systems, automated configurations, and Site Reliability Engineering (SRE), I manage production networks across scalable clusters.
          </p>

          <p className="text-slate-300 font-body leading-relaxed text-sm sm:text-base mb-4">
            My methodology centers on Infrastructure as Code (IaC) paradigms, automated CI/CD gating, and deep telemetry observability. I build standardized server playbooks, container configurations, and secure environments that automate workflows.
          </p>

          {/* Timeline */}
          <div className="flex flex-col gap-6 relative border-l border-white/10 pl-6 ml-3">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline Connector node */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-[#05070f] border border-[#00f5ff] rounded-full flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-[#00f5ff] rounded-full animate-pulse" />
                </div>

                <div className="glass-panel p-5 rounded-2xl flex flex-col gap-3 border border-white/[0.05] bg-[#05070f]/50 hover:bg-[#05070f]/75 transition-all duration-300">
                  <div className="flex flex-wrap justify-between items-start gap-2">
                    <div className="flex items-center gap-3">
                      {exp.img && (
                        <div className={`w-10 h-10 flex justify-center items-center rounded-xl bg-[#05070f] border p-1.5 overflow-hidden transition-all duration-300 ${
                          exp.company.includes("Meritech") 
                            ? "border-[#7c3aed]/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]" 
                            : "border-[#00f5ff]/40 shadow-[0_0_12px_rgba(0,245,255,0.2)]"
                        }`}>
                          <img 
                            src={exp.img} 
                            alt={exp.company} 
                            className={`w-full h-full object-contain transition-all duration-300 ${
                              exp.company.includes("Meritech") 
                                ? "filter drop-shadow-[0_0_3px_rgba(124,58,237,0.65)] brightness-125" 
                                : "filter drop-shadow-[0_0_3px_rgba(0,245,255,0.65)] brightness-125"
                            }`}
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-heading font-bold text-sm sm:text-base text-white">{exp.role}</h4>
                        <span className="font-display text-[11px] text-[#7c3aed] uppercase tracking-wider font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <span className="font-display text-[10px] text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
                      {exp.date}
                    </span>
                  </div>

                  <p className="text-slate-400 font-body text-xs sm:text-sm leading-relaxed">{exp.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {exp.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="project-tag text-[9px] px-2 py-0.5 border border-white/5 bg-white/[0.02] rounded-full text-slate-400">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Side: Distorted 3D Blob Canvas */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="lg:col-span-5 h-[350px] lg:h-[500px] w-full flex justify-center items-center relative"
        >
          <div className="absolute w-[280px] h-[280px] bg-[#7c3aed]/10 rounded-full filter blur-[60px] pointer-events-none" />
          
          <Canvas camera={{ position: [0, 0, 3.5], fov: 60 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00f5ff" />
            <directionalLight position={[-5, -5, 5]} intensity={1} color="#7c3aed" />
            <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
              <DistortedBlob />
            </Float>
          </Canvas>
        </motion.div>

      </div>
    </section>
  );
}
