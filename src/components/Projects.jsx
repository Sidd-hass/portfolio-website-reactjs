import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, Terminal, Plus, Minus, ArrowUpRight } from "lucide-react";
import { useAudio } from "../hooks/useAudio";
import { projects as PREVIOUS_PROJECTS } from "../constants";

const PROJECTS_DATA = [
  {
    title: "CYBERGUARD CI/CD GATEWAY",
    category: "SecOps / Gating",
    description: "Designed a continuous auditing pipeline integrating Jenkins, Snyk, and OWASP ZAP scanners to intercept vulnerable dependencies and block unverified container builds.",
    tags: ["Jenkins API", "Snyk Scanner", "Docker", "Bash Scripting"],
    imageSvg: (
      <svg className="w-full h-full stroke-neutral-400 opacity-60" viewBox="0 0 100 60" fill="none">
        <path d="M 10 50 L 30 15 L 70 15 L 90 50 Z" strokeWidth="0.75" strokeDasharray="2 2" />
        <circle cx="50" cy="28" r="12" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="10" y1="50" x2="90" y2="50" strokeWidth="1" />
        <circle cx="50" cy="28" r="4" fill="#FFFFFF" />
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
      <svg className="w-full h-full stroke-neutral-400 opacity-60" viewBox="0 0 100 60" fill="none">
        <circle cx="30" cy="20" r="6" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="70" cy="20" r="6" stroke="#FFFFFF" strokeWidth="1" />
        <circle cx="50" cy="45" r="8" stroke="#FFFFFF" strokeWidth="1.5" />
        <line x1="30" y1="20" x2="50" y2="45" strokeWidth="0.75" />
        <line x1="70" y1="20" x2="50" y2="45" strokeWidth="0.75" />
        <circle cx="50" cy="45" r="2.5" fill="#FFFFFF" />
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
      <svg className="w-full h-full stroke-neutral-400 opacity-60" viewBox="0 0 100 60" fill="none">
        <path d="M10 30 Q 30 10, 50 30 T 90 30" strokeWidth="1" />
        <path d="M10 40 Q 30 20, 50 40 T 90 40" stroke="#FFFFFF" strokeWidth="0.75" />
        <circle cx="50" cy="35" r="5" stroke="#FFFFFF" strokeWidth="1.5" />
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

export default function Projects() {
  const { playSound } = useAudio();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Mouse positions for hover thumbnail follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 14, mass: 0.15 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    // Offset so thumbnail is centered above the mouse cursor
    mouseX.set(e.clientX - 120);
    mouseY.set(e.clientY - 90);
  };

  const handleRowClick = (idx) => {
    playSound("click");
    playSound("whoosh");
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const handleRowMouseEnter = (idx) => {
    playSound("scan");
    setHoveredIndex(idx);
  };

  const handleRowMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <section 
      id="projects" 
      className="min-h-screen py-32 flex flex-col justify-center relative w-full container mx-auto px-6 z-10"
      onMouseMove={handleMouseMove}
    >
      {/* Title */}
      <div className="section-title-wrap mb-16 text-left">
        <span className="section-subtitle">04 / SELECTED WORKS</span>
        <h2 className="section-title text-neutral-200">THE PROJECTS</h2>
      </div>

      {/* Projects List */}
      <div className="flex flex-col w-full border-t border-neutral-900">
        {ALL_PROJECTS.map((project, idx) => {
          const isHovered = hoveredIndex === idx;
          const isExpanded = expandedIndex === idx;
          const isAnyHovered = hoveredIndex !== null;

          return (
            <div
              key={idx}
              onMouseEnter={() => handleRowMouseEnter(idx)}
              onMouseLeave={handleRowMouseLeave}
              className="project-list-item w-full transition-all duration-300"
              style={{
                opacity: isAnyHovered ? (isHovered || isExpanded ? 1 : 0.35) : 1
              }}
            >
              {/* Row Header - Clickable */}
              <button
                onClick={() => handleRowClick(idx)}
                className="w-full flex items-center justify-between text-left py-4 focus:outline-none cursor-none"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                  <span className="font-sans text-[11px] text-neutral-500 font-bold tracking-wider">
                    0{idx + 1}
                  </span>
                  <h3 className={`font-display font-bold text-xl sm:text-3xl md:text-4xl uppercase tracking-tight transition-all duration-300 ${
                    isHovered || isExpanded
                      ? "text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text"
                      : "text-neutral-200"
                  }`}>
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline font-sans text-xs tracking-wider text-neutral-500 uppercase">
                    {project.category}
                  </span>
                  {isExpanded ? (
                    <Minus className="w-5 h-5 text-neutral-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-neutral-400" />
                  )}
                </div>
              </button>

              {/* Collapsible Expanded Panel */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 pb-8 border-t border-neutral-900/50 mt-4 text-left">
                      {/* Left: Summary & Tags */}
                      <div className="lg:col-span-6 flex flex-col gap-6">
                        <p className="text-neutral-400 font-sans text-sm leading-relaxed max-w-xl">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] font-sans tracking-wide text-neutral-400 bg-neutral-950 border border-neutral-900 px-2.5 py-1 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Middle: Stats / Technical Details */}
                      <div className="lg:col-span-3 flex flex-col gap-4 font-sans text-xs">
                        <span className="text-neutral-500 font-bold uppercase tracking-wider block border-b border-neutral-950 pb-2">
                          // TELEMETRY LOG
                        </span>
                        <div className="flex flex-col gap-2">
                          {Object.entries(project.stats).map(([key, val]) => (
                            <div key={key} className="flex justify-between border-b border-neutral-950 py-1">
                              <span className="text-neutral-500 capitalize">{key}</span>
                              <span className="text-neutral-300 font-semibold">{val}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Actions and Mobile Thumbnail */}
                      <div className="lg:col-span-3 flex flex-col justify-between gap-6">
                        {/* Mobile Image (rendered in-place since hover cursor is hidden on mobile) */}
                        <div className="lg:hidden w-full h-32 rounded-lg border border-neutral-900 bg-neutral-950 overflow-hidden flex items-center justify-center p-4">
                          {project.imageSvg ? (
                            project.imageSvg
                          ) : (
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-contain filter brightness-90"
                            />
                          )}
                        </div>

                        {/* Link Buttons */}
                        <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-auto">
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => playSound("click")}
                            onMouseEnter={() => playSound("hover")}
                            className="flex items-center justify-center gap-1.5 py-2.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 text-white rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-opacity duration-200 cursor-none shadow-[0_0_15px_rgba(99,102,241,0.2)]"
                          >
                            Live Deploy
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => playSound("click")}
                            onMouseEnter={() => playSound("hover")}
                            className="flex items-center justify-center gap-1.5 py-2.5 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-colors duration-200 cursor-none"
                          >
                            Source Code
                            <Terminal className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Floating cursor-following thumbnail preview frame (desktop only) */}
      <motion.div
        style={{
          position: "fixed",
          left: x,
          top: y,
          width: "240px",
          height: "155px",
          pointerEvents: "none",
          zIndex: 9995
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: hoveredIndex !== null && expandedIndex !== hoveredIndex ? 1 : 0, 
          scale: hoveredIndex !== null && expandedIndex !== hoveredIndex ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
        className="hidden lg:flex overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl p-4 items-center justify-center"
      >
        {hoveredIndex !== null && (
          ALL_PROJECTS[hoveredIndex].imageSvg ? (
            <div className="w-full h-full flex items-center justify-center">
              {ALL_PROJECTS[hoveredIndex].imageSvg}
            </div>
          ) : (
            <img
              src={ALL_PROJECTS[hoveredIndex].image}
              alt=""
              className="w-full h-full object-cover rounded-md filter brightness-90"
            />
          )
        )}
      </motion.div>
    </section>
  );
}
