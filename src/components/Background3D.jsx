import React from "react";
import { motion } from "framer-motion";

export default function Background3D() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0A0A0A] overflow-hidden pointer-events-none">
      {/* Grid Overlay */}
      <div className="grid-overlay" />
      
      {/* Very subtle ambient drifting light blooms */}
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, -30, 30, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full filter blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -40, 40, 0],
          y: [0, 30, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 26,
          ease: "easeInOut",
        }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/15 via-purple-600/10 to-transparent rounded-full filter blur-[120px]"
      />
    </div>
  );
}
