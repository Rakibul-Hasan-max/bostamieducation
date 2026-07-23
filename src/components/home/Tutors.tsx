"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Tutors() {
  const t = useTranslations("Tutors");
  const tutors = [
    {
      name: "Bayzid Bostami",
      role: t("physics"),
      image: "/about-ceo.png",
    },
    {
      name: "Rakibul Hasan",
      role: t("ict"),
      image: "/cto.png",
    },
    {
      name: "Asrafi Islam Orpita",
      role: t("biology"),
      image: "/tutor8.png",
    },
    {
      name: "Md. Akash",
      role: t("physics"),
      image: "/tutor5.png",
    },
    {
      name: "Akkash Ali",
      role: t("generalMath"),
      image: "/tutor11.png",
    },
    {
      name: "Majharul Islam",
      role: t("chemistry"),
      image: "/tutor9.png",
    },
    {
      name: "Foysal Ahamed",
      role: t("higherMath"),
      image: "/tutor10.png",
    }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Main Box with soft cream background */}
        <div className="bg-[#fffdf5] rounded-[32px] border border-amber-100/50 p-4 sm:p-8 md:p-16 shadow-sm shadow-amber-50">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight">
                {t("title")} <span className="text-brand-coral">{t("titleCoral")}</span> <br className="hidden md:block" />
                {t("titleEnd")}
              </h2>
              <p className="mt-4 text-brand-slate text-[15px]">
                {t("subtitle")}
              </p>
            </div>
            
            {/* Navigation Buttons */}
            <div className="flex items-center justify-center gap-3">
              <button 
                onClick={() => scroll("left")}
                className="p-3 rounded-full bg-white border border-slate-200 text-brand-navy hover:bg-slate-50 hover:text-brand-coral transition-colors shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll("right")}
                className="p-3 rounded-full bg-white border border-slate-200 text-brand-navy hover:bg-slate-50 hover:text-brand-coral transition-colors shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tutors Scroll Container */}
          <div 
            ref={scrollRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {tutors.map((tutor, i) => (
              <div
                key={i}
                className="group flex flex-col bg-white rounded-2xl border border-slate-100/70 p-2.5 sm:p-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-1rem)] lg:w-[calc(20%-1.2rem)] snap-start shrink-0"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={tutor.image}
                    alt={tutor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                {/* Info */}
                <div className="mt-4 text-center">
                  <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-coral transition-colors">
                    {tutor.name}
                  </h4>
                  <p className="text-xs text-brand-slate font-medium mt-1">
                    {tutor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo/Discount Banner below */}
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-amber-100/60 pt-10">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-extrabold text-brand-navy">
                {t("promoTitle")}
              </h3>
              <p className="text-xs md:text-sm text-brand-slate mt-1 font-medium">
                {t("promoSubtitle")}
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/register"
                className="rounded-full bg-brand-yellow px-6 py-3 text-[14px] font-bold text-brand-navy shadow-md shadow-amber-100 hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {t("getStarted")}
              </Link>
              <Link
                href="/courses"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-[14px] font-bold text-brand-navy hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                {t("exploreCourses")}
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
