"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";

/* ─── Partner brand logos ─── */
const partners = [
  { name: "Artistry",  icon: "◎" },
  { name: "Dexign",    icon: "⊙" },
  { name: "Emblem",    icon: "⦿" },
  { name: "Grapherz",  icon: "◈" },
  { name: "Grapho",    icon: "◉" },
];

export default function Hero() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          HERO SECTION — warm cream split layout
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden bg-[#fdf6ef] min-h-screen flex flex-col">

        {/* ── Decorative green rounded-rectangle (top-right) ── */}
        <div className="pointer-events-none absolute top-0 right-0 h-[55%] w-[28%] rounded-bl-[60%] bg-[#d9ecd0] opacity-70 hidden md:block" />

        {/* ── Decorative × cross marks (top-right area) ── */}
        <div className="pointer-events-none absolute top-14 right-[22%] hidden md:flex flex-col gap-2.5 opacity-50">
          <div className="flex gap-2.5">
            <span className="text-slate-400 font-bold text-sm">×</span>
            <span className="text-slate-400 font-bold text-sm">×</span>
          </div>
          <div className="flex gap-2.5 ml-3">
            <span className="text-slate-400 font-bold text-sm">×</span>
            <span className="text-slate-400 font-bold text-sm">×</span>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 flex-1 flex flex-col w-full">
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-16">

            {/* ══════════════════════════════════════
                LEFT — Text Content
            ══════════════════════════════════════ */}
            <div className="flex flex-col items-start">

              {/* Badge pill */}
              <div className="mb-6 flex items-center gap-2 rounded-full bg-[#fce8dd] px-4 py-1.5 text-[13px] font-semibold text-[#c0694a]">
                <span className="text-[#c0694a]">•</span>
                <span>Get started with Bostami Education</span>
                <span className="text-[#c0694a]">•</span>
              </div>

              {/* Main heading — with inline avatar cluster + arrow icons */}
              <h1 className="text-[2.6rem] sm:text-5xl md:text-[3.25rem] font-extrabold leading-[1.12] tracking-tight text-[#1a1a2e] mb-6">
                Find suitable <br />
                courses from the{" "}
                <span className="inline-flex items-center gap-2 align-middle">
                  {/* Stacked mentor avatar cluster */}
                  <span className="inline-flex items-center">
                    <span className="relative inline-block h-10 w-10 rounded-full border-2 border-[#fdf6ef] overflow-hidden z-30 -mr-3 shadow">
                      <Image
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=80"
                        alt="Mentor 1"
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span className="relative inline-block h-10 w-10 rounded-full border-2 border-[#fdf6ef] overflow-hidden z-20 -mr-3 shadow">
                      <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80"
                        alt="Mentor 2"
                        fill
                        className="object-cover"
                      />
                    </span>
                    <span className="relative inline-block h-10 w-10 rounded-full border-2 border-[#fdf6ef] overflow-hidden z-10 shadow">
                      <Image
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80"
                        alt="Mentor 3"
                        fill
                        className="object-cover"
                      />
                    </span>
                  </span>
                  {/* >> arrow icon */}
                  <span className="inline-flex h-10 items-center gap-0.5 rounded-full bg-[#1a1a2e] px-3 text-white text-lg font-bold tracking-tighter">
                    ›› 
                  </span>
                </span>{" "}
                best mentors
              </h1>

              {/* Subtitle */}
              <p className="mb-8 max-w-sm text-[15px] leading-relaxed text-slate-500">
                The good gathering doesn&apos;t bearing day stars over open behold 
                may male tree replenish don&apos;t blessed beast days earth fifth 
                let multiply and he every blessed.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-6">
                {/* Primary dark button */}
                <Link
                  href="/courses"
                  className="rounded-xl bg-[#1a1a2e] px-7 py-3.5 text-[15px] font-bold text-white shadow-md hover:bg-[#2d2d4a] hover:scale-105 active:scale-95 transition-all duration-200 leading-tight text-center"
                >
                  Start<br />Learning
                </Link>

                {/* Watch Video text link */}
                <Link
                  href="https://www.youtube.com/@bostami-education"
                  target="_blank"
                  className="flex items-center gap-3 text-[15px] font-semibold text-[#1a1a2e] hover:text-slate-600 transition-colors group"
                >
                  <span>Watch Video</span>
                  {/* Circle arrow button */}
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1a1a2e] text-[#1a1a2e] group-hover:bg-[#1a1a2e] group-hover:text-white transition-all duration-200">
                    <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
                  </span>
                </Link>
              </div>
            </div>

            {/* ══════════════════════════════════════
                RIGHT — Image Stack
            ══════════════════════════════════════ */}
            <div className="relative flex justify-center lg:justify-end">

              {/* ── Small top-left floating image ── */}
              <div className="absolute -top-4 left-4 lg:left-0 z-20 hidden sm:block">
                <div className="h-[90px] w-[110px] overflow-hidden rounded-2xl shadow-xl border-2 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=300"
                    alt="Small course preview"
                    width={110}
                    height={90}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* ── Main large center image ── */}
              <div className="relative h-[380px] sm:h-[440px] md:h-[500px] w-[300px] sm:w-[360px] md:w-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-10">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=700"
                  alt="Featured mentor"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 420px"
                  priority
                />
              </div>

              {/* ── Small bottom-right floating image ── */}
              <div className="absolute bottom-16 -right-2 lg:-right-6 z-20 hidden sm:block">
                <div className="h-[110px] w-[130px] overflow-hidden rounded-2xl shadow-xl border-2 border-white">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
                    alt="Another mentor"
                    width={130}
                    height={110}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* ── Floating course info card ── */}
              <div className="absolute bottom-6 left-0 lg:-left-8 z-30 w-[190px] rounded-2xl bg-white p-4 shadow-2xl border border-slate-100/80">
                {/* Card header */}
                <p className="text-[13px] font-bold text-[#1a1a2e] mb-3">
                  UI Design Pattern
                </p>
                {/* Instructor row */}
                <div className="flex items-center gap-2.5">
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border border-slate-100 shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=80"
                      alt="Dennis Barrett"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-[#1a1a2e] leading-tight">Dennis Barrett</p>
                    <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5">
                      📚 123 Courses
                    </p>
                  </div>
                </div>
              </div>

            </div>{/* end right */}
          </div>

          {/* ══════════════════════════════════════════════════════════════
              PARTNER LOGOS STRIP — mt-auto anchors it to the bottom
              while staying inside the min-h-screen section boundary
          ══════════════════════════════════════════════════════════════ */}
          <div className="mt-auto w-full border-t border-slate-200/60">
            <div className="py-6">
              <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:justify-between">

                {/* EPCILN — actual image logo */}
                <a
                  href="https://epciln.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center opacity-60 hover:opacity-90 transition-opacity"
                  aria-label="Epciln"
                >
                  <Image
                    src="/epciln-logo.png"
                    alt="Epciln"
                    width={96}
                    height={32}
                    className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </a>

                {/* Text-based partner logos */}
                {partners.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-2.5 text-slate-400 opacity-60 hover:opacity-90 transition-opacity cursor-default"
                  >
                    <span className="text-2xl leading-none">{p.icon}</span>
                    <span className="text-[15px] font-semibold tracking-wide">{p.name}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>

        </div>{/* end inner flex-col */}

      </section>
    </>
  );
}
