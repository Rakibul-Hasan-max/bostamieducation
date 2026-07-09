"use client";

import Image from "next/image";
import Link from "next/link";
import { Users, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full bg-white pt-10 pb-16 md:pt-16 md:pb-24">
      {/* Decorative background glows */}
      <div className="absolute top-10 left-1/2 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-6 text-center">
        {/* Main Header */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-brand-navy leading-[1.15]">
          Lighting the <br />
          path to <span className="text-brand-coral">future</span> success
        </h1>
        
        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-[15px] sm:text-base text-brand-slate leading-relaxed">
          We are a library that provides a variety of courses for you. Learn new skills, 
          start a new career, and achieve your goals with us.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-full bg-brand-yellow px-8 py-3.5 text-[15px] font-bold text-brand-navy shadow-md shadow-amber-100 hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Start learning
          </Link>
          <Link
            href="/courses"
            className="rounded-full border border-slate-200 bg-white px-8 py-3.5 text-[15px] font-bold text-brand-navy hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Explore courses
          </Link>
        </div>

        {/* Showcase Grid (Image gallery & stats cards) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          
          {/* Left card: Popular mentor stats */}
          <div className="col-span-1 md:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 text-left flex flex-col gap-6">
            <h4 className="font-semibold text-brand-navy text-[15px]">Popular mentors</h4>
            
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-bold text-brand-navy">150+</div>
                <div className="text-xs text-brand-slate font-medium">Expert mentors</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-base font-bold text-brand-navy">170+</div>
                <div className="text-xs text-brand-slate font-medium">Courses details</div>
              </div>
            </div>
          </div>

          {/* Middle: Horizontal mentor image */}
          <div className="col-span-1 md:col-span-5 h-[220px] md:h-[280px] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
              alt="Mentor teaching"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
            {/* Soft border styling */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
          </div>

          {/* Right: Portrait student image */}
          <div className="col-span-1 md:col-span-4 h-[250px] md:h-[320px] relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600"
              alt="Student learning"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 30vw"
            />
            {/* Soft border styling */}
            <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10" />
          </div>

        </div>
      </div>
    </section>
  );
}
