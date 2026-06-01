import React from "react";
import { useAudio } from "../hooks/useAudio";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export default function SoundToggle() {
  const { isMuted, toggleMute, playSound } = useAudio();

  const handleToggle = () => {
    // If it was muted, we unmute, so initAudio will be called by toggleMute
    toggleMute();
    // Play a click sound *after* toggling if it was muted (meaning now unmuted)
    setTimeout(() => {
      playSound("click");
    }, 50);
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={() => playSound("hover")}
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-100 hover:text-white shadow-xl hover:border-neutral-700 transition-colors"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      title={isMuted ? "Unmute Ambient Sound" : "Mute Ambient Sound"}
      aria-label="Toggle Sound"
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 opacity-70" />
      ) : (
        <div className="relative w-5 h-5">
          <Volume2 className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neutral-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-100"></span>
          </span>
        </div>
      )}
    </motion.button>
  );
}
