"use client";

import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";

export default function CTA() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Visual Block with Floating Badge */}
        <div className="relative rounded-[32px] overflow-hidden shadow-2xl bg-slate-100 aspect-[16/9] md:aspect-[21/9] w-full">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200"
            alt="Group of students studying"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 80vw"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
          
          {/* Floating Badge (Left overlay) */}
          <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-500">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-brand-slate font-medium">Over</div>
              <div className="text-sm font-bold text-brand-navy">20k+ Students</div>
            </div>
          </div>
        </div>

        {/* Text & Button Area */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy leading-tight">
            Ready to achieve <span className="text-brand-coral">greatness</span> <br />
            in your studies?
          </h2>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
            <Link
              href="/register"
              className="rounded-full bg-brand-yellow px-8 py-3.5 text-[15px] font-bold text-brand-navy shadow-md shadow-amber-100 hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Get started
            </Link>
            <Link
              href="/about"
              className="text-[15px] font-bold text-brand-navy hover:text-brand-coral transition-colors flex items-center gap-1.5 py-2"
            >
              Learn more
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
