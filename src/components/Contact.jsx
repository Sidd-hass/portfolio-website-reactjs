import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, ShieldAlert, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useAudio } from "../hooks/useAudio";

// Custom inline SVG icons
const Github = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const Linkedin = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Twitter = ({ size = 20, ...props }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

export default function Contact() {
  const formRef = useRef(null);
  const { playSound } = useAudio();

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

    playSound("click");
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
          playSound("success");
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
    <section id="contact" className="min-h-screen py-32 flex flex-col justify-center relative w-full container mx-auto px-6 z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full">
        
        {/* Left Column: Headline and Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-between gap-12 text-left"
        >
          <div>
            <span className="section-subtitle">06 / CONTACT PROTOCOL</span>
            <h2 className="section-title text-neutral-200 uppercase" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
              LET'S WORK TOGETHER
            </h2>
            <p className="text-neutral-400 font-sans text-sm leading-relaxed mt-6 max-w-sm">
              If you need cloud setup, high uptime cluster management, custom Docker workflows, or clean React developments, send me a signal.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-1">DIRECT TRANSMISSION</span>
              <a
                href="mailto:sidhant24121999@gmail.com"
                onMouseEnter={() => playSound("hover")}
                onClick={() => playSound("click")}
                className="text-neutral-300 hover:text-white font-sans text-sm font-medium border-b border-neutral-900 pb-1 w-fit flex items-center gap-1 cursor-none"
              >
                sidhant24121999@gmail.com
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Social Grid */}
            <div>
              <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider block mb-2">GRID NETWORKS</span>
              <div className="flex gap-3">
                {[
                  { icon: Github, link: "https://github.com/Sidd-hass", label: "GitHub" },
                  { icon: Linkedin, link: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Twitter, link: "https://twitter.com", label: "Twitter" }
                ].map((social, sIdx) => {
                  const IconComp = social.icon;
                  return (
                    <a
                      key={sIdx}
                      href={social.link}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={() => playSound("hover")}
                      onClick={() => playSound("click")}
                      className="text-neutral-400 hover:text-white p-2.5 bg-neutral-950 border border-neutral-900 rounded-full transition-colors duration-200 cursor-none"
                      title={social.label}
                    >
                      <IconComp size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Restyled Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center text-left"
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-start gap-4 py-8"
            >
              <CheckCircle2 size={40} className="text-white" />
              <h3 className="font-display font-bold text-xl text-neutral-200">
                TRANSMISSION COMPLETE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
                Your message has been successfully routed. I will analyze the parameters and reply as soon as possible.
              </p>
            </motion.div>
          ) : status === "error" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-start gap-4 py-8"
            >
              <ShieldAlert size={40} className="text-red-500" />
              <h3 className="font-display font-bold text-xl text-neutral-200">
                TRANSMISSION FAIL
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 max-w-sm leading-relaxed">
                Security firewall mismatch. Please contact me directly at <a href="mailto:sidhant24121999@gmail.com" className="underline">sidhant24121999@gmail.com</a>.
              </p>
            </motion.div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
              {/* Name */}
              <div className="floating-form-group">
                <input
                  type="text"
                  name="user_name"
                  id="form-name"
                  value={formData.user_name}
                  onChange={handleChange}
                  onMouseEnter={() => playSound("hover")}
                  placeholder=" "
                  required
                  className="floating-input cursor-none"
                />
                <label htmlFor="form-name" className="floating-label">
                  Your Name / Identity
                </label>
              </div>

              {/* Email */}
              <div className="floating-form-group">
                <input
                  type="email"
                  name="user_email"
                  id="form-email"
                  value={formData.user_email}
                  onChange={handleChange}
                  onMouseEnter={() => playSound("hover")}
                  placeholder=" "
                  required
                  className="floating-input cursor-none"
                />
                <label htmlFor="form-email" className="floating-label">
                  Your Email / Address
                </label>
              </div>

              {/* Subject */}
              <div className="floating-form-group">
                <input
                  type="text"
                  name="subject"
                  id="form-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onMouseEnter={() => playSound("hover")}
                  placeholder=" "
                  required
                  className="floating-input cursor-none"
                />
                <label htmlFor="form-subject" className="floating-label">
                  Subject / Domain
                </label>
              </div>

              {/* Message */}
              <div className="floating-form-group">
                <textarea
                  name="message"
                  id="form-message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  onMouseEnter={() => playSound("hover")}
                  placeholder=" "
                  required
                  className="floating-input resize-none cursor-none"
                />
                <label htmlFor="form-message" className="floating-label">
                  Message / Transmission Body
                </label>
              </div>

              {/* Submit */}
              <div className="flex justify-center sm:justify-end mt-4 w-full">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  onMouseEnter={() => playSound("hover")}
                  className="btn-pill w-full sm:w-auto justify-center px-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white shadow-lg hover:opacity-90 transition-opacity duration-300"
                >
                  {status === "sending" ? (
                    <span className="flex items-center gap-2">
                      Transmitting...
                      <span className="w-3.5 h-3.5 border-2 border-neutral-600 border-t-white rounded-full animate-spin" />
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5">
                      Send Signal
                      <Send size={12} />
                    </span>
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
