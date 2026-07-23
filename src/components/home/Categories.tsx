"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { FlaskConical, BookOpen, Atom, Leaf, Monitor, Languages, ArrowRight } from "lucide-react";

export default function Categories() {
  const t = useTranslations("Categories");

  const categories = [
    {
      name: t("physics"),
      val: "Physics",
      icon: Atom,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      name: t("math"),
      val: "Math",
      icon: BookOpen,
      iconColor: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      name: t("chemistry"),
      val: "Chemistry",
      icon: FlaskConical,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
    },
    {
      name: t("biology"),
      val: "Biology",
      icon: Leaf,
      iconColor: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: t("ict"),
      val: "Technical & ICT",
      icon: Monitor,
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
    {
      name: t("english"),
      val: "English",
      icon: Languages,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
    },
    {
      name: t("bangla"),
      val: "Bangla",
      icon: Languages,
      iconColor: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight">
            {t("title1")} <br />
            {t("title2")} <span className="text-brand-coral">{t("title3")}</span>
          </h2>
          <p className="mt-4 text-[15px] text-brand-slate">
            {t("subtitle")}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <Link
                key={index}
                href={`/courses?category=${encodeURIComponent(cat.val)}`}
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

          {/* Explore all categories CTA */}
          <Link
            href="/courses"
            className="flex items-center justify-between bg-brand-yellow p-5 rounded-2xl hover:bg-brand-yellow-hover shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200 text-brand-navy font-bold text-[15px]"
          >
            <span>{t("exploreAll")}</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <ArrowRight className="h-5 w-5" />
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}
