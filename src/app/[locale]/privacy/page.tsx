"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  Shield,
  Database,
  Eye,
  Share2,
  Cookie,
  Lock,
  Clock,
  UserCheck,
  Baby,
  ExternalLink as ExternalLinkIcon,
  RefreshCw,
  Mail,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

const sectionIcons = [
  Database,
  Eye,
  Share2,
  Cookie,
  Lock,
  Clock,
  UserCheck,
  Baby,
  ExternalLinkIcon,
  RefreshCw,
];

const sectionColors = [
  { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  { bg: "bg-violet-50", text: "text-violet-600", border: "border-violet-100" },
  { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
  { bg: "bg-cyan-50", text: "text-cyan-600", border: "border-cyan-100" },
  { bg: "bg-indigo-50", text: "text-indigo-600", border: "border-indigo-100" },
  { bg: "bg-pink-50", text: "text-pink-600", border: "border-pink-100" },
  { bg: "bg-teal-50", text: "text-teal-600", border: "border-teal-100" },
  { bg: "bg-orange-50", text: "text-orange-600", border: "border-orange-100" },
];

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    document.title = `${t("title")} | Bostami Education`;
  }, [t]);

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    for (let i = 1; i <= 10; i++) {
      const el = document.getElementById(`section-${i}`);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const sections = Array.from({ length: 10 }, (_, i) => ({
    id: `section-${i + 1}`,
    title: t(`s${i + 1}Title`),
    desc: t(`s${i + 1}Desc`),
    Icon: sectionIcons[i],
    color: sectionColors[i],
  }));

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#fafbfc]">
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════
            PAGE HEADER
        ══════════════════════════════════════ */}
        <section
          className="relative py-20 md:py-24 text-center overflow-hidden bg-white border-b border-slate-100"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            {/* Shield Icon */}
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-5 shadow-inner border border-blue-100">
              <Shield className="h-7 w-7" />
            </div>

            <span className="block text-blue-600 text-sm font-bold tracking-wider mb-3 uppercase">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-[15px] font-medium leading-relaxed mb-5">
              {t("subtitle")}
            </p>
            <span className="inline-block text-[12px] font-semibold text-slate-400 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-200">
              {t("lastUpdated")}
            </span>
          </div>
        </section>

        {/* ══════════════════════════════════════
            CONTENT — 2 Column (TOC sidebar + sections)
        ══════════════════════════════════════ */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-6 flex flex-col lg:flex-row gap-10">
            {/* ── LEFT: Sticky Table of Contents ── */}
            <aside className="lg:w-[280px] shrink-0">
              <div className="lg:sticky lg:top-24">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5">
                  <h3 className="text-[13px] font-extrabold text-slate-400 uppercase tracking-wider mb-4">
                    {t("tocTitle")}
                  </h3>
                  <nav className="space-y-0.5">
                    {sections.map((sec, i) => {
                      const isActive = activeSection === sec.id;
                      return (
                        <button
                          key={sec.id}
                          onClick={() => scrollToSection(sec.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-[13px] font-medium transition-all duration-200 cursor-pointer group ${
                            isActive
                              ? "bg-blue-50 text-blue-700 font-bold"
                              : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                          }`}
                        >
                          <div
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold transition-colors ${
                              isActive
                                ? "bg-blue-600 text-white"
                                : "bg-slate-100 text-slate-400 group-hover:bg-slate-200 group-hover:text-slate-500"
                            }`}
                          >
                            {i + 1}
                          </div>
                          <span className="truncate">
                            {sec.title.replace(/^\d+\.\s*/, "")}
                          </span>
                          {isActive && (
                            <ChevronRight className="h-3.5 w-3.5 ml-auto text-blue-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </aside>

            {/* ── RIGHT: Policy Sections ── */}
            <div className="flex-1 min-w-0 space-y-6">
              {sections.map((sec) => {
                const Icon = sec.Icon;
                return (
                  <article
                    key={sec.id}
                    id={sec.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden scroll-mt-24 hover:shadow-md transition-shadow duration-300"
                  >
                    {/* Section Header */}
                    <div className={`flex items-center gap-3.5 px-6 md:px-8 py-5 border-b ${sec.color.border} bg-gradient-to-r from-white to-slate-50/50`}>
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${sec.color.bg} ${sec.color.text} shadow-inner`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg md:text-xl font-bold text-[#1a1a2e] tracking-tight">
                        {sec.title}
                      </h2>
                    </div>

                    {/* Section Body */}
                    <div className="px-6 md:px-8 py-6">
                      <p className="text-[14px] md:text-[15px] text-slate-600 leading-[1.85] font-medium">
                        {sec.desc}
                      </p>
                    </div>
                  </article>
                );
              })}

              {/* ══════════════════════════════════════
                  CONTACT CTA CARD
              ══════════════════════════════════════ */}
              <div className="bg-[#1a1a2e] rounded-2xl p-8 md:p-10 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white border border-white/10">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {t("contactTitle")}
                    </h3>
                    <p className="text-slate-300 text-[14px] leading-relaxed mb-1">
                      {t("contactDesc")}
                    </p>
                    <a
                      href={`mailto:${t("contactEmail")}`}
                      className="text-blue-400 text-[14px] font-semibold hover:text-blue-300 transition-colors"
                    >
                      {t("contactEmail")}
                    </a>
                  </div>
                  <Link
                    href="/contact"
                    className="shrink-0 px-6 py-3 bg-[#ffd260] hover:bg-[#fcc13d] text-slate-900 font-extrabold text-[13px] rounded-full transition shadow-md shadow-yellow-500/10 active:scale-[0.97]"
                  >
                    {t("contactButton")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
