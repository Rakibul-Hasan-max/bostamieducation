"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { 
  Check, 
  ArrowUpRight, 
  Crown, 
  FileCheck2, 
  MessageSquare, 
  Mail, 
  Globe
} from "lucide-react";

export default function Hero() {
  const t = useTranslations("Hero");
  const router = useRouter();
  const [emailOrSearch, setEmailOrSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrSearch.trim()) {
      if (emailOrSearch.includes("@")) {
        router.push(`/signup?email=${encodeURIComponent(emailOrSearch.trim())}`);
      } else {
        router.push(`/courses?search=${encodeURIComponent(emailOrSearch.trim())}`);
      }
    } else {
      router.push("/courses");
    }
  };

  const featureTabs = [
    {
      id: "memberships",
      icon: Crown,
      label: "Memberships",
      href: "/pricing",
    },
    {
      id: "assessments",
      icon: FileCheck2,
      label: "Assessments",
      href: "/courses",
    },
    {
      id: "community",
      icon: MessageSquare,
      label: "Community",
      href: "/about",
    },
    {
      id: "emails",
      icon: Mail,
      label: "Emails",
      href: "/contact",
    },
    {
      id: "website",
      icon: Globe,
      label: "Website",
      href: "/courses",
    },
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-80px)] w-full flex-col justify-between overflow-hidden border-b border-slate-200/80 bg-gradient-to-b from-white via-[#f0f6ff]/60 to-[#e2eeff]/80 py-8 sm:py-12 lg:py-16">
      {/* Subtle grid pattern background across full width */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px), linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Soft radial glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-4 sm:px-6 lg:px-8">
        {/* Main 2-column Grid */}
        <div className="my-auto grid grid-cols-1 items-center gap-10 py-4 lg:grid-cols-12 lg:gap-12">
          
          {/* ══════════════════════════════════════
              LEFT COLUMN — Content & Actions
          ══════════════════════════════════════ */}
          <div className="flex flex-col items-start lg:col-span-7">
            
            {/* Top Meta Stats Tag */}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wide text-slate-500 sm:text-[13px]">
              <span>50+ Products</span>
              <span className="text-slate-300">|</span>
              <span>155M Enrollments</span>
              <span className="text-slate-300">|</span>
              <span>$880M Earned</span>
              <span className="ml-1 font-bold text-slate-700">#BostamiEdu</span>
            </div>

            {/* Main Heading */}
            <h1 className="mb-5 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl md:text-5xl lg:text-[56px] lg:leading-[1.12]">
              {t("titlePart1")} <br className="hidden sm:inline" />
              {t("titlePart2")} {t("titlePart3")}
            </h1>

            {/* Subtitle description */}
            <p className="mb-8 max-w-lg text-[14px] leading-relaxed text-slate-500 sm:text-[15px] lg:text-base">
              {t("subtitle")}
            </p>

            {/* Email / Course Search Pill Bar */}
            <form 
              onSubmit={handleSubmit}
              className="relative flex w-full max-w-md items-center justify-between rounded-full border border-slate-200/90 bg-white p-1.5 pl-5 shadow-sm transition-all focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100"
            >
              <input
                type="text"
                value={emailOrSearch}
                onChange={(e) => setEmailOrSearch(e.target.value)}
                placeholder="Enter your email or search course..."
                className="w-full bg-transparent text-[13px] sm:text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none"
              />
              
              <button
                type="submit"
                className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#111827] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow active:scale-95"
              >
                <span>{t("startLearning")}</span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-white">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </button>
            </form>

          </div>

          {/* ══════════════════════════════════════
              RIGHT COLUMN — Hero Image with Floating Badges
          ══════════════════════════════════════ */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end">
            <div className="relative w-full max-w-[460px] sm:max-w-[500px] lg:max-w-[540px]">
              
              {/* ── Floating Badge 1 (Top Left) ── */}
              <div className="absolute -top-3 left-4 z-20 flex items-center gap-2 rounded-full border border-slate-100/90 bg-white/95 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-md backdrop-blur-md transition-transform hover:scale-105 sm:-top-4 sm:left-6 sm:text-[13px]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>No credit card required</span>
              </div>

              {/* ── Main Hero Image Container (Increased Height) ── */}
              <div className="relative h-[360px] sm:h-[450px] lg:h-[510px] w-full overflow-hidden rounded-[28px] sm:rounded-[36px] border-4 border-white/90 bg-slate-100 shadow-2xl shadow-slate-300/40">
                <Image
                  src="/hero.png"
                  alt="Bostami Education Mentor"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 540px"
                  priority
                />
              </div>

              {/* ── Floating Badge 2 (Bottom Right) ── */}
              <div className="absolute -bottom-3 right-4 z-20 flex items-center gap-2 rounded-full border border-slate-100/90 bg-white/95 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-md backdrop-blur-md transition-transform hover:scale-105 sm:-bottom-4 sm:right-6 sm:text-[13px]">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-white shadow-xs">
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
                <span>Free up to 25 sale</span>
              </div>

            </div>
          </div>

        </div>

        {/* ══════════════════════════════════════════════════════════════
            BOTTOM ROW — Feature / Category Tabs
        ══════════════════════════════════════════════════════════════ */}
        <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-200/60 pt-6 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {featureTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.id}
                href={tab.href}
                className="group flex items-center justify-center gap-2.5 rounded-xl border border-white/80 bg-white/80 p-3.5 text-xs font-semibold text-slate-700 shadow-xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-md sm:rounded-2xl sm:text-sm"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-100 text-slate-700 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span>{tab.label}</span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
