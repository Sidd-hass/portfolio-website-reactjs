import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import backgroundMusic from "../assets/background.mp3";

const AudioContext = createContext(null);

const SFX_VOLUME = 0.5; // base/max SFX volume
const MUSIC_VOLUME = SFX_VOLUME * 0.7; // 70% of SFX volume = 0.35

export function AudioProvider({ children }) {
  const [isMuted, setIsMuted] = useState(() => {
    const saved = localStorage.getItem("portfolio-muted");
    return saved ? JSON.parse(saved) : true;
  });

  const audioCtxRef = useRef(null);
  const musicRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const startMusic = () => {
    if (isMuted) return;
    initAudio();
    if (!musicRef.current) {
      musicRef.current = new Audio(backgroundMusic);
      musicRef.current.loop = true;
      musicRef.current.volume = MUSIC_VOLUME; // 70% of SFX volume
    }
    musicRef.current.play().catch((err) => {
      console.log("Audio playback deferred until interaction:", err);
    });
  };

  const stopMusic = () => {
    if (musicRef.current) {
      musicRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio-muted", JSON.stringify(next));
      return next;
    });
  };

  // Sync music state with mute and window hover/focus states
  useEffect(() => {
    const handleWindowEnter = () => {
      if (!isMuted) {
        startMusic();
      }
    };

    const handleWindowLeave = () => {
      stopMusic();
    };

    // Sync initial state on mount or mute toggle
    if (isMuted) {
      stopMusic();
    } else {
      // Only play if document has focus
      if (document.hasFocus()) {
        startMusic();
      }
    }

    // Bind document mouseleave and window blur (no window mouseleave to prevent scrollbar stutter)
    window.addEventListener("mouseenter", handleWindowEnter);
    window.addEventListener("focus", handleWindowEnter);
    window.addEventListener("blur", handleWindowLeave);
    document.addEventListener("mouseleave", handleWindowLeave);

    return () => {
      stopMusic();
      window.removeEventListener("mouseenter", handleWindowEnter);
      window.removeEventListener("focus", handleWindowEnter);
      window.removeEventListener("blur", handleWindowLeave);
      document.removeEventListener("mouseleave", handleWindowLeave);
    };
  }, [isMuted]);

  // Advanced synthesis engine for distinct SFX
  const playSound = (type) => {
    if (isMuted) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === "hover") {
      // High-tech crisp digital tick
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = "sine";
      osc1.frequency.setValueAtTime(2400, now);
      osc1.frequency.exponentialRampToValueAtTime(800, now + 0.03);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(1200, now);
      osc2.frequency.exponentialRampToValueAtTime(400, now + 0.03);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(SFX_VOLUME * 0.3, now + 0.002); // Louder crisp hover
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.04);
      osc2.stop(now + 0.04);
    } 
    
    else if (type === "click") {
      // Futuristic tactile clack/pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // FM-like quick modulator
      osc.type = "triangle";
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.07);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.07);
      filter.Q.setValueAtTime(2.0, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(SFX_VOLUME * 1.0, now + 0.005); // Tactile click
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } 
    
    else if (type === "whoosh") {
      // Heavy cinematic filter whoosh (deep atmospheric sweep)
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, now);
      osc.frequency.linearRampToValueAtTime(140, now + 0.45);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(80, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.25);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.5);
      filter.Q.setValueAtTime(4.0, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(SFX_VOLUME * 0.5, now + 0.2); // Atmospheric whoosh
      gain.gain.linearRampToValueAtTime(0, now + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
    } 
    
    else if (type === "scan") {
      // Futuristic holographic scanning sweep (high-tech feedback)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.linearRampToValueAtTime(2200, now + 0.2);
      osc.frequency.linearRampToValueAtTime(1400, now + 0.35);

      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1500, now);
      filter.Q.setValueAtTime(6.0, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(SFX_VOLUME * 0.5, now + 0.05); // Holographic scan
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.4);
    } 
    
    else if (type === "menu") {
      // Tech slide menu whoosh/chirp
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(720, now + 0.16);
      
      gain.gain.setValueAtTime(SFX_VOLUME * 0.4, now); // Menu slide sound
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.18);
    } 
    
    else if (type === "success") {
      // Rich cascading major 7th chime (C5 -> E5 -> G5 -> B5 -> C6)
      const notes = [523.25, 659.25, 783.99, 987.77, 1046.50];
      
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(1500, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(SFX_VOLUME * 0.5, now + idx * 0.06 + 0.02); // Success chimes
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.6);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.75);
      });
    }
  };

  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!isMuted && (!musicRef.current || musicRef.current.paused)) {
        startMusic();
      }
    };
    window.addEventListener("click", handleFirstInteraction);
    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [isMuted]);

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute, playSound, initAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
