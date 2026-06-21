"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Sparkles, GraduationCap } from "lucide-react";
import logo from "./favicon.png";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-zinc-950 font-sans">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
          alt="Students learning"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-900/50 mix-blend-multiply" />
        {/* Animated Glows */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-indigo-500/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-violet-600/20 rounded-full blur-[100px] mix-blend-screen"
        />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl px-6 mx-auto text-center">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-white/10 blur-xl rounded-full scale-150" />
          <Image
            src={logo}
            alt="Bostami Education Logo"
            width={100}
            height={100}
            className="relative drop-shadow-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
          />
        </motion.div>

        {/* Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4"
        >
          Bostami{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            Education
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-3xl md:text-5xl font-bold text-zinc-300 mb-8"
        >
          Something Amazing is{" "}
          <span className="text-white italic">Coming Soon</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-12 leading-relaxed"
        >
          We are crafting a next-generation EdTech platform designed to empower students and instructors globally. Get ready to elevate your educational journey.
        </motion.p>

        {/* Notify Me Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex w-full max-w-md flex-col sm:flex-row gap-3 mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent backdrop-blur-md transition-all"
            required
          />
          <button
            type="submit"
            className="group relative flex items-center justify-center gap-2 px-8 py-4 bg-white text-zinc-950 font-semibold rounded-xl hover:bg-zinc-200 transition-colors"
          >
            Notify Us
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.form>
      </main>

      {/* Floating Elements for extra dynamism */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute hidden lg:flex items-center justify-center w-24 h-24 top-1/4 right-[15%] bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-xl rounded-2xl"
      >
        <GraduationCap className="w-10 h-10 text-indigo-400" />
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute hidden lg:flex items-center justify-center w-20 h-20 bottom-1/4 left-[15%] bg-violet-500/10 border border-violet-500/20 backdrop-blur-xl rounded-full"
      >
        <BookOpen className="w-8 h-8 text-violet-400" />
      </motion.div>
    </div>
  );
}
