"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Star, ArrowRight, Heart, Clock, LayoutGrid } from "lucide-react";

export default function PopularCourses() {
  const t = useTranslations("PopularCourses");

  const courses = [
    {
      title: t("physicsMasterclass"),
      level: t("allLevel"),
      levelBg: "bg-purple-50",
      levelColor: "text-purple-600",
      image: "/studio4.png",
      rating: 4.5,
      price: "৳3,000",
      duration: "12h 56m",
      lectures: 15,
    },
    {
      title: t("ictBoardPrep"),
      level: t("beginner"),
      levelBg: "bg-emerald-50",
      levelColor: "text-emerald-500",
      image: "/studio2.png",
      rating: 4.5,
      price: "৳1,800",
      duration: "9h 56m",
      lectures: 65,
    },
    {
      title: t("organicChemistry"),
      level: t("beginner"),
      levelBg: "bg-emerald-50",
      levelColor: "text-emerald-500",
      image: "/studio3.png",
      rating: 4.5,
      price: "৳2,200",
      duration: "5h 56m",
      lectures: 32,
    },
    {
      title: t("higherMathAdmission"),
      level: t("beginner"),
      levelBg: "bg-emerald-50",
      levelColor: "text-emerald-500",
      image: "/studio2.png",
      rating: 4.0,
      price: "৳2,800",
      duration: "18h 56m",
      lectures: 99,
    },
    {
      title: t("biologyCrash"),
      level: t("intermediate"),
      levelBg: "bg-blue-50",
      levelColor: "text-blue-500",
      image: "/studio5.png",
      rating: 4.5,
      price: "৳2,000",
      duration: "14h 30m",
      lectures: 42,
    },
    {
      title: t("webDevBootcamp"),
      level: t("allLevel"),
      levelBg: "bg-purple-50",
      levelColor: "text-purple-600",
      image: "/studio4.png",
      rating: 4.8,
      price: "৳5,000",
      duration: "40h 15m",
      lectures: 120,
    },
    {
      title: t("pythonDataScience"),
      level: t("advanced"),
      levelBg: "bg-orange-50",
      levelColor: "text-orange-500",
      image: "/studio1.png",
      rating: 4.9,
      price: "৳4,500",
      duration: "25h 10m",
      lectures: 85,
    },
    {
      title: t("digitalMarketing"),
      level: t("beginner"),
      levelBg: "bg-emerald-50",
      levelColor: "text-emerald-500",
      image: "/studio3.png",
      rating: 4.6,
      price: "৳2,500",
      duration: "8h 45m",
      lectures: 28,
    },
  ];

  return (
    <section className="w-full bg-slate-50/50 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
              {t("title")} <span className="text-brand-coral">{t("titleCoral")}</span> {t("titleEnd")}
            </h2>
            <p className="mt-2 text-slate-500 text-[15px]">
              {t("subtitle")}
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-800 hover:bg-slate-50 transition-colors"
          >
            <span>{t("viewAll")}</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Courses Grid - 4 Columns */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-50">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              {/* Course Info */}
              <div className="p-5">
                {/* Level and Heart */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${course.levelBg} ${course.levelColor}`}>
                    {course.level}
                  </span>
                  <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors h-11">
                  {course.title}
                </h3>

                {/* Rating & Price */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-3.5 h-3.5 ${star <= Math.floor(course.rating) ? 'fill-amber-400' : 'text-slate-200'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[12px] font-semibold text-slate-600 ml-0.5">
                      {course.rating.toFixed(1)}/5.0
                    </span>
                  </div>
                  <span className="text-[14px] font-extrabold text-slate-900">
                    {course.price}
                  </span>
                </div>

                {/* Separator */}
                <div className="border-t border-slate-100 my-3" />

                {/* Footer (Time & Lectures) */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-[12px] font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <LayoutGrid className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-[12px] font-medium">{course.lectures} {t("lectures")}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
