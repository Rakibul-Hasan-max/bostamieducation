"use client";

import Link from "next/link";
import { Laptop, Megaphone, Palette, Shield, FileCheck, Briefcase, Database, ArrowRight } from "lucide-react";

export default function Categories() {
  const categories = [
    {
      name: "Development",
      icon: Laptop,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: "Digital Marketing",
      icon: Megaphone,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      name: "UI/UX Design",
      icon: Palette,
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      name: "Cyber Security",
      icon: Shield,
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      name: "Software Testing",
      icon: FileCheck,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      name: "Business",
      icon: Briefcase,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-50",
    },
    {
      name: "Data Science",
      icon: Database,
      iconColor: "text-cyan-500",
      bgColor: "bg-cyan-50",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight">
            Explore diverse learning paths within <br />
            our <span className="text-brand-coral">course categories</span>
          </h2>
          <p className="mt-4 text-[15px] text-brand-slate">
            Choose from our wide range of course categories to start your learning journey.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Link
                key={index}
                href={`/courses?category=${encodeURIComponent(cat.name)}`}
                className="group flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 hover:border-slate-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cat.bgColor} ${cat.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className="font-semibold text-brand-navy text-[15px] group-hover:text-brand-coral transition-colors">
                  {cat.name}
                </span>
              </Link>
            );
          })}

          {/* 8th Slot: Explore all categories CTA */}
          <Link
            href="/courses"
            className="flex items-center justify-between bg-brand-yellow p-5 rounded-2xl hover:bg-brand-yellow-hover shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 text-brand-navy font-bold text-[15px]"
          >
            <span>Explore all categories</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
