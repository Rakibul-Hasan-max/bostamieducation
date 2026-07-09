"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Star } from "lucide-react";

export default function WhyChoose() {
  const benefits = [
    "1:1 Mentorship from industry leaders",
    "Flexible schedule tailored to your life",
    "Hands-on projects with real-world impact",
    "Expert instructors with proven track records",
    "Industry-recognized certificates",
  ];

  return (
    <section className="w-full bg-[#f8fafc]/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          <div className="col-span-1 md:col-span-6">
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy leading-tight">
              From <span className="text-brand-coral">knowledge</span> <br />
              to action
            </h2>
          </div>
          <div className="col-span-1 md:col-span-6 md:pt-2">
            <p className="text-brand-slate text-[15px] sm:text-base leading-relaxed">
              To deliver the exact experience of a traditional classroom, we have built features that 
              simulate active collaboration, mentorship, and practical application. Learn by doing 
              with industry leaders who guide you at every step of your career.
            </p>
          </div>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Large Image */}
          <div className="col-span-1 lg:col-span-5">
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=800"
                alt="Student coding on laptop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Right: Benefits checklist and Stats */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-extrabold text-brand-navy mb-6">
              Why choose BostamiEducation?
            </h3>

            {/* Checklist */}
            <div className="flex flex-col gap-4 mb-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <span className="text-[15px] font-medium text-brand-slate">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mb-10">
              <Link
                href="/about"
                className="inline-block rounded-full bg-brand-yellow px-8 py-3 text-[15px] font-bold text-brand-navy shadow-md shadow-amber-100 hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Read details
              </Link>
            </div>

            {/* Stats Block */}
            <div className="grid grid-cols-2 gap-6 border-t border-slate-100 pt-8">
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-extrabold text-brand-navy">4.8</span>
                  <span className="text-brand-slate text-sm font-semibold">/5</span>
                  <div className="ml-2 flex gap-0.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  </div>
                </div>
                <p className="text-xs text-brand-slate font-medium mt-1">Student review rating</p>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-brand-navy">20k+</div>
                <p className="text-xs text-brand-slate font-medium mt-1">Active global students</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
