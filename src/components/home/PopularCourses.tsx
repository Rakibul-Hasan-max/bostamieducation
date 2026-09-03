"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Star, ArrowRight, Heart, Clock, LayoutGrid } from "lucide-react";

import { COURSES_DATA } from "@/constants/coursesData";

export default function PopularCourses() {
  const t = useTranslations("PopularCourses");
  const tCourses = useTranslations("Courses");

  const getLevelLabel = (level: string) => {
    if (level === "All level") return t("allLevel");
    if (level === "Beginner") return t("beginner");
    if (level === "Intermediate") return t("intermediate");
    if (level === "Advanced") return t("advanced");
    return level;
  };

  const courses = COURSES_DATA.map((course) => ({
    id: course.id,
    title: tCourses.has(course.titleKey) ? tCourses(course.titleKey) : course.defaultTitle,
    level: getLevelLabel(course.level),
    levelBg: course.levelBg,
    levelColor: course.levelColor,
    image: course.img,
    rating: course.rating,
    price: course.price,
    duration: course.duration,
    lectures: course.lectures,
  }));

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
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group flex flex-col bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
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
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Level and Heart */}
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${course.levelBg} ${course.levelColor}`}>
                      {course.level}
                    </span>
                    <button 
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="p-1 hover:bg-slate-100 rounded-full transition"
                    >
                      <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 hover:fill-red-500 transition-colors" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                </div>

                <div>
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
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
