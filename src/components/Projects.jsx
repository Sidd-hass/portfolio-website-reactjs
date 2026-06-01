import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Terminal, Shield, Cpu, Layers } from "lucide-react";
import { projects as PREVIOUS_PROJECTS } from "../constants";

const PROJECTS_DATA = [
  {
    title: "CYBERGUARD CI/CD GATEWAY",
    category: "SecOps / Gating",
    description: "Designed a continuous auditing pipeline integrating Jenkins, Snyk, and OWASP ZAP scanners to intercept vulnerable dependencies and block unverified container builds.",
    tags: ["Jenkins API", "Snyk Scanner", "Docker", "Bash Scripting"],
    imageSvg: (
      <svg className="w-full h-full stroke-cyan-400 opacity-60" viewBox="0 0 100 60" fill="none">
        <path d="M 10 50 L 30 15 L 70 15 L 90 50 Z" strokeWidth="0.75" strokeDasharray="2 2" />
        <circle cx="50" cy="28" r="12" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" />
        <circle cx="50" cy="28" r="4" fill="#00f5ff" />
      </svg>
    ),
    stats: {
      audits: "100% Automated",
      blockRate: "94% CVE Detection",
      latency: "< 3.5 Min Run"
    },
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  },
  {
    title: "KUBERNETES FABRIC CONTROL",
    category: "Cloud Orchestration",
    description: "Managed high-availability bare-metal micro-services across hybrid cloud providers, utilizing Helm charts for uniform configurations and Prometheus logs routing.",
    tags: ["Kubernetes", "Helm Charts", "AWS EKS", "Observability"],
    imageSvg: (
      <svg className="w-full h-full stroke-violet-500 opacity-60" viewBox="0 0 100 60" fill="none">
        <grid x="0" y="0" width="10" height="10" />
        <circle cx="30" cy="20" r="6" stroke="#00f5ff" strokeWidth="1" />
        <circle cx="70" cy="20" r="6" stroke="#00f5ff" strokeWidth="1" />
        <circle cx="50" cy="45" r="8" stroke="#7c3aed" strokeWidth="1.5" />
        <line x1="30" y1="20" x2="50" y2="45" strokeWidth="0.75" />
        <line x1="70" y1="20" x2="50" y2="45" strokeWidth="0.75" />
        <circle cx="50" cy="45" r="2.5" fill="#7c3aed" />
      </svg>
    ),
    stats: {
      uptime: "99.98% SLA",
      containers: "120+ Active Pods",
      deployments: "GitOps Triggers"
    },
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  },
  {
    title: "NEURAL INFERENCE ENGINE",
    category: "AI Infrastructure",
    description: "Deployed a local distributed inference hub cluster loading LLMs with vLLM engine optimization, routing private tokens and decreasing third-party API dependencies.",
    tags: ["vLLM Engine", "Nvidia CUDA", "FastAPI", "Python"],
    imageSvg: (
      <svg className="w-full h-full stroke-pink-500 opacity-60" viewBox="0 0 100 60" fill="none">
        <path d="M10 30 Q 30 10, 50 30 T 90 30" strokeWidth="1" />
        <path d="M10 40 Q 30 20, 50 40 T 90 40" stroke="#7c3aed" strokeWidth="0.75" />
        <circle cx="50" cy="35" r="5" stroke="#00f5ff" strokeWidth="1.5" />
        <line x1="50" y1="5" x2="50" y2="55" strokeWidth="0.5" strokeDasharray="3 3" />
      </svg>
    ),
    stats: {
      throughput: "72 Tokens/Sec",
      models: "Llama-3 / Mistral",
      saving: "70% API License"
    },
    demoUrl: "https://github.com",
    githubUrl: "https://github.com"
  }
];

// Combine hardcoded DevSecOps/Cloud projects with imported fullstack/frontend projects
const ALL_PROJECTS = [
  ...PROJECTS_DATA,
  ...PREVIOUS_PROJECTS.map((proj) => ({
    title: proj.title,
    category: proj.tags.includes("Chrome Extension") ? "Chrome Extension" : "Web Application",
    description: proj.description,
    tags: proj.tags,
    image: proj.image,
    stats: {
      framework: proj.tags[0] || "React JS",
      deployment: proj.tags.includes("Chrome Extension") ? "Chrome Web Store" : "Vercel / Netlify",
      architecture: proj.tags.includes("Node.js") || proj.tags.includes("Express") ? "Full Stack" : "Client Side"
    },
    demoUrl: proj.webapp,
    githubUrl: proj.github
  }))
];

function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Maximum tilt angle of 15 degrees
    const rX = ((centerY - y) / centerY) * 15;
    const rY = ((x - centerX) / centerX) * 15;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsFlipped(!isFlipped)}
      className="project-card-container relative h-[520px] cursor-none select-none"
      style={{ perspective: "1200px" }}
    >
      <div
        className="project-card-inner relative w-full h-full transition-transform duration-700 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
            isFlipped ? "rotateY(180deg)" : ""
          }`
        }}
      >
        {/* CARD FRONT */}
        <div
          className="project-card-front absolute w-full h-full backface-hidden bg-[#0c0e17]/85 backdrop-blur-md border border-white/5 hover:border-[#00f5ff]/30 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-lg"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Subtle Cyber Grid Grid Background */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_0)] bg-[size:16px_16px]" />

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-display text-[10px] tracking-[2px] text-[#7c3aed] uppercase font-semibold">
                {project.category}
              </span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] shadow-[0_0_8px_#00f5ff] animate-pulse" />
            </div>

            {/* Glowing Wireframe Graph / Image Area */}
            <div className="h-[120px] w-full border border-white/5 bg-[#05070f]/80 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-[#00f5ff]/5 to-transparent pointer-events-none" />
              {project.imageSvg ? (
                project.imageSvg
              ) : (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              )}
            </div>

            <h3 className="font-heading font-bold text-lg text-white mt-2">
              {project.title}
            </h3>

            <p className="text-xs text-slate-400 font-body leading-relaxed line-clamp-4">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="project-tag text-[9px] px-2 py-0.5 border border-white/5 bg-white/[0.02] rounded-full text-slate-400"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="text-[9px] font-display text-slate-500 text-right tracking-[1px] mt-1">
              CLICK CARD TO SCAN TELEMETRY //
            </div>
          </div>
        </div>

        {/* CARD BACK */}
        <div
          className="project-card-back absolute w-full h-full backface-hidden bg-[#141724]/90 backdrop-blur-md border border-[#7c3aed]/30 rounded-2xl p-6 flex flex-col justify-between shadow-2xl shadow-[#7c3aed]/5"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-2">
              <Layers size={14} className="text-[#00f5ff]" />
              <span className="font-display text-[10px] tracking-[1.5px] text-[#00f5ff] font-semibold">
                SYSTEM TELEMETRY
              </span>
            </div>

            <p className="text-xs text-slate-300 font-body leading-relaxed">
              Diagnostic data generated from cloud execution clusters:
            </p>

            {/* Stats list */}
            <div className="flex flex-col gap-2.5 mt-2 bg-[#05070f]/50 border border-white/5 p-4 rounded-xl font-display">
              {Object.entries(project.stats).map(([key, val]) => (
                <div key={key} className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 capitalize">{key}:</span>
                  <span className="text-white font-semibold tracking-wide">
                    {val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Source links */}
          <div className="flex gap-3">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex justify-center items-center gap-2 bg-[#00f5ff]/10 hover:bg-[#00f5ff]/20 border border-[#00f5ff]/30 text-white rounded-xl py-2.5 text-xs font-heading font-semibold uppercase tracking-wider transition-colors duration-300"
            >
              Live Demo
              <ExternalLink size={12} />
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex justify-center items-center bg-white/5 hover:bg-white/10 border border-white/15 text-white rounded-xl px-4 py-2.5 transition-colors duration-300"
            >
              <Terminal size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="min-h-screen py-24 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      <div className="ambient-glow glow-2 absolute -bottom-1/4 -left-1/4" />

      <div className="section-title-wrap mb-12 text-left relative z-10">
        <span className="section-subtitle">// COMPUTATIONAL GRID</span>
        <h2 className="section-title text-glow-purple text-white">THE WORKS</h2>
      </div>

      {/* Projects 3D Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {ALL_PROJECTS.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}
