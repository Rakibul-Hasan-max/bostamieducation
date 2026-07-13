import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Play, Users, BookOpen, Award, Target, Eye } from "lucide-react";

export const metadata = {
  title: "About Us | Bostami Education",
  description: "Learn more about Bostami Education's mission, vision, history, and our team.",
};

const milestones = [
  {
    year: "2023",
    title: "The Beginning",
    desc: "Launched Bostami Education youtube channel in a small room and started sharing educational content.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=500",
  },
  {
    year: "2024",
    title: "Curriculum Expansion",
    desc: "Expanded our course library to cover academic physics and math.Growing our community to 300+ active learners.",
    image: "/studio2.png",
  },
  {
    year: "2025",
    title: "Solo Studio Setup",
    desc: "Launched offline coaching and setup a solo studio for online classes.",
    image: "/studio5.png",
  },
  {
    year: "2026",
    title: "Corporate Office & Team Expansion",
    desc: "Setup a small office and launched corporate training programs in partnership with EPCILN.",
    image: "/studio4.png",
  },
  // {
  //   year: "2027",
  //   title: "AI-Powered Learning",
  //   desc: "Introduced AI learning tracks, personal mentor guidance systems, and reached a milestone of 15,000+ successful graduates.",
  //   image: "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83?auto=format&fit=crop&q=80&w=500",
  // },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════
            PAGE HEADER BANNER
        ══════════════════════════════════════ */}
        <section className="bg-[#f0f5ff]/60 py-16 text-center border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
              About Us
            </h1>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-semibold text-brand-slate">
              <Link href="/" className="hover:text-brand-coral transition-colors">
                Home
              </Link>
              <span>➔</span>
              <span className="text-brand-coral">About Us</span>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 1 — Intro Company Overview
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 w-full bg-white">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column — Image Stack with Badges */}
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-[32px] overflow-hidden shadow-lg shadow-indigo-100/40">
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
                  alt="Students learning"
                  fill
                  className="object-cover"
                />
                {/* Floating experience badge */}
                <div className="absolute bottom-6 right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-50 flex flex-col items-start min-w-[150px]">
                  <span className="text-3xl font-extrabold text-brand-coral leading-none">5+</span>
                  <span className="text-[11px] font-bold text-brand-navy tracking-wider uppercase mt-1">
                    Years of Experience
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column — Text Content & Stats */}
            <div className="flex flex-col items-start">
              <div className="mb-6 rounded-full bg-[#e8f2ff] px-4 py-1.5 text-[13px] font-bold text-blue-600">
                ABOUT BOSTAMI EDUCATION
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.15] text-brand-navy tracking-tight mb-6">
                We provide courses to unlock the transformative potential of learning.
              </h2>
              <p className="text-[15px] leading-relaxed text-brand-slate mb-4">
                Founded to bridge the gap between innovation and education, Bostami Education began with a mission to make world-class learning accessible to everyone. We offer high-quality courses that empower students to build real-world skills, launch successful careers, and achieve their dreams.
              </p>
              <p className="text-[15px] leading-relaxed text-brand-slate mb-8">
                Over the years, we have become a trusted destination for individuals and organizations aiming to build competence, confidence, and excellence in academic subjects and industrial skills.
              </p>

              {/* Counters */}
              <div className="grid grid-cols-2 gap-8 w-full border-t border-slate-100 pt-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-brand-navy">15K+</h4>
                    <p className="text-xs font-bold text-brand-slate tracking-wider uppercase mt-0.5">
                      Happy Learners
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-extrabold text-brand-navy">25+</h4>
                    <p className="text-xs font-bold text-brand-slate tracking-wider uppercase mt-0.5">
                      Expert Tutors
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Decorative Wavy Divider ── */}
        <div className="flex justify-center text-emerald-500/30 overflow-hidden py-4 select-none">
          <svg className="w-24 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 100 20">
            <path d="M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10" />
          </svg>
        </div>

        {/* ══════════════════════════════════════
            SECTION 2 — What Drives Us (Mission/Vision)
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-[#fdfaf5] w-full">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Column — Text & Mission/Vision Cards */}
            <div className="flex flex-col items-start order-2 lg:order-1">
              <div className="mb-6 rounded-full bg-[#fcf0ea] px-4 py-1.5 text-[13px] font-bold text-brand-coral">
                WHAT DRIVES US
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight mb-6">
                Our passion for modern education.
              </h2>
              <p className="text-[15px] leading-relaxed text-brand-slate mb-8">
                We are driven by a deep passion for making learning accessible, engaging, and impactful. Our primary motivation comes from the belief that education has the power to transform career paths, enrich lives, and uplift communities.
              </p>

              {/* Checkmarks grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4 w-full mb-8 font-semibold text-brand-navy text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Innovation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Collaboration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Excellence</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Impact-Driven</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>Accessibility</span>
                </div>
              </div>

              {/* Mission & Vision Mini Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                {/* Mission Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 mb-4">
                    <Target className="h-5 w-5" />
                  </div>
                  <h3 className="text-[16px] font-extrabold text-brand-navy mb-2">Our Mission</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    To empower individuals with AI, ICT, and modern skills through accessible, premium, and relevant coursework that prepares them for global opportunities.
                  </p>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 mb-4">
                    <Eye className="h-5 w-5" />
                  </div>
                  <h3 className="text-[16px] font-extrabold text-brand-navy mb-2">Our Vision</h3>
                  <p className="text-xs text-brand-slate leading-relaxed">
                    To be the leading global platform for digital-first academic and professional skill education, transforming the learning lifecycle of students everywhere.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column — Photo with Play Overlay */}
            <div className="relative flex justify-center lg:justify-end order-1 lg:order-2">
              <div className="relative w-full max-w-[480px] aspect-[4/3] rounded-[32px] overflow-hidden shadow-lg shadow-indigo-100/40 group cursor-pointer">
                <Image
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600"
                  alt="Team collaboration video"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-[#1a1a2e]/20 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg group-hover:scale-110 active:scale-95 transition-all duration-300">
                    <Play className="h-6 w-6 fill-current ml-0.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Decorative Wavy Divider ── */}
        <div className="flex justify-center text-emerald-500/30 overflow-hidden py-4 select-none">
          <svg className="w-24 h-6 fill-none stroke-current" strokeWidth="2.5" viewBox="0 0 100 20">
            <path d="M 0 10 Q 12.5 0 25 10 T 50 10 T 75 10 T 100 10" />
          </svg>
        </div>

        {/* ══════════════════════════════════════
            SECTION 3 — Leadership (CEO & CTO Messages)
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight leading-tight">
                Our Leadership Message
              </h2>
              <p className="mt-4 text-brand-slate text-[15px]">
                Hear directly from our founding leaders about their inspiration and drive to shape education.
              </p>
            </div>

            {/* CEO Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-slate-100">
              {/* CEO Photo */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-md">
                  <Image
                    src="/tutor1.png"
                    alt="Bayzid Bostami - CEO"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* CEO Quote */}
              <div className="lg:col-span-8 flex flex-col items-start">
                <div className="text-brand-coral font-bold text-sm tracking-wider uppercase mb-2">CEO & Founder</div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-4">Bayzid Bostami</h3>
                <p className="text-[17px] italic font-medium text-brand-slate leading-relaxed relative pl-4 border-l-4 border-brand-coral">
                  &ldquo;At Bostami Education, we believe that education is the most powerful tool for creating positive change in the world. Our mission is to break down barriers to learning and build a platform that enables anyone, anywhere, to unlock their full potential and shape a brighter future.&rdquo;
                </p>
                <p className="mt-4 text-[14px] text-brand-slate">
                  As our founder, Bayzid has guided Bostami Education from a localized tutorial setup to a thriving digital academy serving thousands of students across Bangladesh and internationally.
                </p>
              </div>
            </div>

            {/* CTO Block */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-20">
              {/* CTO Quote (order 2 on desktop to align opposite to CEO) */}
              <div className="lg:col-span-8 flex flex-col items-start order-2 lg:order-1">
                <div className="text-green-600 font-bold text-sm tracking-wider uppercase mb-2">Co-Founder & CTO</div>
                <h3 className="text-2xl font-extrabold text-brand-navy mb-4">Rakibul Hasan</h3>
                <p className="text-[17px] italic font-medium text-brand-slate leading-relaxed relative pl-4 border-l-4 border-green-600">
                  &ldquo;Technology is reshaping how we learn and collaborate. We are committed to building an innovative, seamless, and world-class digital learning experience that makes knowledge interactive, engaging, and accessible for everyone.&rdquo;
                </p>
                <p className="mt-4 text-[14px] text-brand-slate">
                  Leading the technical execution and systems, Rakibul ensures Bostami Education leverages next-generation architecture to serve live class streams, interactive assignments, and seamless navigation.
                </p>
              </div>
              {/* CTO Photo */}
              <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
                <div className="relative w-full max-w-[280px] aspect-[4/5] rounded-[24px] overflow-hidden shadow-md">
                  <Image
                    src="/tutor2.png"
                    alt="Rakibul Hasan - CTO"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 4 — Our Story (Timeline)
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-white w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
                Our Story
              </h2>
            </div>

            {/* Timeline Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 items-start">
              {milestones.map((m) => {
                // Determine if this milestone goes to the left column on desktop (even years)
                const isLeft = m.year === "2024" || m.year === "2026";
                
                // Assign grid order classes to keep chronological flow on mobile, and staggered on desktop
                // 2023: order 1 on mobile, 2 on desktop (right col)
                // 2024: order 2 on mobile, 1 on desktop (left col)
                // 2025: order 3 on mobile, 4 on desktop (right col)
                // 2026: order 4 on mobile, 3 on desktop (left col)
                let orderClass = "";
                if (m.year === "2023") orderClass = "order-1 md:order-2";
                else if (m.year === "2024") orderClass = "order-2 md:order-1";
                else if (m.year === "2025") orderClass = "order-3 md:order-4";
                else if (m.year === "2026") orderClass = "order-4 md:order-3";

                return (
                  <div key={m.year} className={`flex flex-col ${orderClass}`}>
                    {isLeft ? (
                      <>
                        {/* Left style: Image then Text */}
                        <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden mb-5 bg-slate-100 shadow-sm border border-slate-100">
                          <Image
                            src={m.image}
                            alt={m.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="text-2xl font-bold text-[#1a1a2e] mb-1.5">{m.year}</span>
                        <p className="text-[13px] text-slate-500 leading-relaxed max-w-lg">
                          {m.desc}
                        </p>
                      </>
                    ) : (
                      <>
                        {/* Right style: Text then Image */}
                        <span className="text-2xl font-bold text-[#1a1a2e] mb-1.5">{m.year}</span>
                        <p className="text-[13px] text-slate-500 leading-relaxed mb-5 max-w-lg">
                          {m.desc}
                        </p>
                        <div className="relative w-full aspect-[16/10] rounded-[24px] overflow-hidden bg-slate-100 shadow-sm border border-slate-100">
                          <Image
                            src={m.image}
                            alt={m.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            SECTION 5 — Our Team
        ══════════════════════════════════════ */}
        <section className="py-20 md:py-28 bg-white w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy tracking-tight">Our Team</h2>
              <p className="mt-4 text-brand-slate text-[15px]">
                Meet the talented people behind Bostami Education.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team member cards */}
              {[
                { name: "Bayzid Bostami", role: "CEO", img: "/tutor1.png" },
                { name: "Rakibul Hasan", role: "CTO", img: "/tutor2.png" },
                { name: "Orpita", role: "Instructor", img: "/tutor3.png" },
                { name: "Akash Sheikh", role: "Instructor", img: "/tutor5.png" },
                { name: "Foysal Ahamed", role: "Instructor", img: "/tutor3.png" },
                { name: "Akkash Ali", role: "Instructor", img: "/tutor4.png" },
                { name: "Majharul Islam", role: "Instructor", img: "/tutor5.png" },
                
              ].map((member, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <div className="relative w-24 h-24 mb-4 rounded-full overflow-hidden shadow">
                    <Image src={member.img} alt={member.name} fill className="object-cover" />
                  </div>
                  <h4 className="text-lg font-bold text-brand-navy">{member.name}</h4>
                  <p className="text-sm text-brand-slate mt-1">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer Section */}
      <Footer />
    </div>
  );
}
