import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldAlert } from "lucide-react";
import emailjs from "@emailjs/browser";

// Custom inline SVG icons matching Lucide props interface
const Github = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 24, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export default function Contact() {
  const containerRef = useRef(null);
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.subject || !formData.message) return;

    setStatus("sending");

    emailjs
      .sendForm(
        "service_o57fwgj",
        "template_3n52yce",
        formRef.current,
        "Bl_FRU8S_ZoraGxP4"
      )
      .then(
        () => {
          setStatus("success");
          setFormData({ user_name: "", user_email: "", subject: "", message: "" });
          setTimeout(() => setStatus("idle"), 6000);
        },
        (error) => {
          console.error("Error sending message:", error);
          setStatus("error");
          setTimeout(() => setStatus("idle"), 6000);
        }
      );
  };

  return (
    <section id="contact" ref={containerRef} className="min-h-screen py-24 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      <div className="ambient-glow glow-3 absolute -bottom-1/4 -left-1/4" />

      <div className="max-w-[700px] w-full mx-auto relative z-10">
        
        <div className="section-title-wrap text-center mb-12">
          <span className="section-subtitle">// ENCRYPTED LINK</span>
          <h2 className="section-title text-glow-cyan text-white">CONNECT PROTOCOL</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0 }}
          className="glass-panel border border-white/5 bg-[#0c0e17]/85 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-2xl"
        >
          {/* Tunnel header */}
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-display tracking-[1.5px] mb-8 border-b border-white/5 pb-4">
            <span>SECURE TUNNEL // TLS_1.3</span>
            <span className="text-[#00f5ff]">sidhant24121999@gmail.com</span>
          </div>

          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <CheckCircle2 size={54} className="text-[#00f5ff] drop-shadow-[0_0_10px_rgba(0,245,255,0.4)] animate-bounce" />
              <h3 className="font-heading font-bold text-xl text-white mt-2">
                TRANSMISSION COMPLETE
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Your transmission was broadcasted across the grid. I will analyze the metrics and reply shortly.
              </p>
            </motion.div>
          ) : status === "error" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center gap-4"
            >
              <ShieldAlert size={54} className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
              <h3 className="font-heading font-bold text-xl text-white mt-2">
                TRANSMISSION FAIL
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
                Security firewall or config key mismatch. Please retry or contact me directly at <span className="text-[#00f5ff]">sidhant24121999@gmail.com</span>.
              </p>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Name */}
              <div className="relative group w-full">
                <input
                  type="text"
                  name="user_name"
                  id="form-name"
                  value={formData.user_name}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="w-full py-2 bg-transparent border-b border-white/20 text-white text-sm outline-none transition-colors duration-300 focus:border-[#00f5ff] peer cursor-none"
                />
                <label
                  htmlFor="form-name"
                  className="absolute left-0 top-2 text-xs sm:text-sm text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f5ff] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#00f5ff] font-display uppercase tracking-wider"
                >
                  Name / Protocol
                </label>
                <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
              </div>

              {/* Email */}
              <div className="relative group w-full">
                <input
                  type="email"
                  name="user_email"
                  id="form-email"
                  value={formData.user_email}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="w-full py-2 bg-transparent border-b border-white/20 text-white text-sm outline-none transition-colors duration-300 focus:border-[#00f5ff] peer cursor-none"
                />
                <label
                  htmlFor="form-email"
                  className="absolute left-0 top-2 text-xs sm:text-sm text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f5ff] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#00f5ff] font-display uppercase tracking-wider"
                >
                  Email / Address
                </label>
                <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
              </div>

              {/* Subject */}
              <div className="relative group w-full">
                <input
                  type="text"
                  name="subject"
                  id="form-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="w-full py-2 bg-transparent border-b border-white/20 text-white text-sm outline-none transition-colors duration-300 focus:border-[#00f5ff] peer cursor-none"
                />
                <label
                  htmlFor="form-subject"
                  className="absolute left-0 top-2 text-xs sm:text-sm text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f5ff] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#00f5ff] font-display uppercase tracking-wider"
                >
                  Subject / Domain
                </label>
                <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
              </div>

              {/* Message */}
              <div className="relative group w-full">
                <textarea
                  name="message"
                  id="form-message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder=" "
                  required
                  className="w-full py-2 bg-transparent border-b border-white/20 text-white text-sm outline-none transition-colors duration-300 focus:border-[#00f5ff] peer resize-none cursor-none"
                />
                <label
                  htmlFor="form-message"
                  className="absolute left-0 top-2 text-xs sm:text-sm text-slate-500 pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-[#00f5ff] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:text-[#00f5ff] font-display uppercase tracking-wider"
                >
                  Transmission Body
                </label>
                <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-gradient-to-r from-[#00f5ff] to-[#7c3aed] scale-x-0 origin-left transition-transform duration-300 group-focus-within:scale-x-100" />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                {/* Social Badges */}
                <div className="flex gap-4">
                  {[
                    { icon: Github, link: "https://github.com/Sidd-hass", label: "GitHub" },
                    { icon: Linkedin, link: "https://linkedin.com", label: "LinkedIn" },
                    { icon: Twitter, link: "https://twitter.com", label: "Twitter" }
                  ].map((social, sIdx) => {
                    const IconComp = social.icon;
                    return (
                      <motion.a
                        key={sIdx}
                        href={social.link}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.2, color: "#00f5ff" }}
                        whileTap={{ scale: 0.9 }}
                        className="text-slate-400 hover:text-[#00f5ff] p-1.5 bg-white/5 border border-white/10 rounded-lg transition-colors duration-300 cursor-none"
                      >
                        <IconComp size={16} />
                      </motion.a>
                    );
                  })}
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="btn-premium interactive-hover flex items-center justify-center gap-2 bg-[#00f5ff]/10 border border-[#00f5ff]/40 text-white rounded-xl px-6 py-2.5 font-heading text-xs font-semibold uppercase tracking-wider transition-colors duration-300 disabled:opacity-50 disabled:cursor-none"
                >
                  {status === "sending" ? (
                    <>
                      Transmitting...
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Data
                      <Send size={12} />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
