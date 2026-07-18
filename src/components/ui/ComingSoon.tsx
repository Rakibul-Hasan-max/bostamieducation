"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";

interface ComingSoonProps {
  pageName?: string;
}

export default function ComingSoon({ pageName = "Page" }: ComingSoonProps) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-12 md:py-20 lg:py-24">
      {/* Background decorative wavy lines & floating shapes */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {/* Wavy line bottom-left to top-right */}
        <svg
          className="absolute -bottom-10 -left-10 w-[60%] opacity-20 text-amber-400 fill-none stroke-current"
          strokeWidth="1.5"
          viewBox="0 0 400 400"
        >
          <path d="M -50 450 C 100 350, 200 450, 450 200 C 500 150, 480 50, 550 0" />
        </svg>

        <svg
          className="absolute -top-10 -right-10 w-[50%] opacity-20 text-rose-400 fill-none stroke-current"
          strokeWidth="1.5"
          viewBox="0 0 400 400"
        >
          <path d="M 450 -50 C 300 100, 200 -50, -50 200" />
        </svg>

        {/* Floating circles/squares */}
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 h-3 w-3 bg-pink-500 rounded-sm"
        />
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 left-1/2 h-4 w-4 rounded-full border-2 border-amber-400"
        />
        <motion.div
          animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/3 h-3 w-3 bg-indigo-500 rotate-12"
        />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight tracking-tight mb-4"
            >
              We are building <br />
              something awesome!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-500 text-[15px] font-medium leading-relaxed mb-8 max-w-md"
            >
              Hey you! Bostami Education is coming. We are doing our best to launch our website and we will be back soon.
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full max-w-md mb-8"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">
                  Launch progress
                </span>
              </div>
              <div className="relative pt-6">
                {/* 85% Tooltip Indicator */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, x: "-50%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%" }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                  className="absolute -top-1.5 left-[85%] bg-[#1a1a2e] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-sm after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#1a1a2e]"
                >
                  85%
                </motion.div>
                {/* Progress Track */}
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85%" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-[#1a1a2e] rounded-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Subscribe Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="w-full max-w-md"
            >
              <h3 className="text-sm font-bold text-slate-800 mb-3">
                Notify me when website is launched
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-center gap-2.5 bg-emerald-50 text-emerald-700 px-4 py-3.5 rounded-2xl border border-emerald-100 text-sm font-semibold"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  <span>Thank you! We will notify you when we launch.</span>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative flex items-center bg-white border border-slate-200 rounded-2xl p-1.5 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition shadow-sm"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent px-4 py-2.5 text-sm text-[#1a1a2e] placeholder-slate-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-[#1a1a2e] text-white px-5 py-2.5 text-xs font-bold hover:bg-slate-800 active:scale-[0.97] transition-all shrink-0 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Notify Me!</span>
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Right: SVG Illustration */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative w-full max-w-[500px] aspect-[4/3] flex items-center justify-center select-none"
            >
              <img
                src="/coming-soon.svg"
                alt="We are building something awesome illustration"
                className="w-full h-full object-contain"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
