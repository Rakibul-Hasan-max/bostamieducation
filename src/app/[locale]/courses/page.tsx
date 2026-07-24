"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Clock, Search, Star, ArrowUpDown, Heart, LayoutGrid } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: "Physics" | "Math" | "Chemistry" | "Biology" | "Technical & ICT";
  price: string;
  numericPrice: number; // For sorting
  duration: string;
  lectures: number;
  rating: number;
  reviewCount: number;
  img: string;
  level: string;
  levelBg: string;
  levelColor: string;
}

export default function CoursesPage() {
  const t = useTranslations("Courses");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    document.title = `${t("badge")} | Bostami Education`;
  }, [t]);

  const categories = [
    { key: "All", label: t("catAll") },
    { key: "Physics", label: t("catPhysics") },
    { key: "Math", label: t("catMath") },
    { key: "Chemistry", label: t("catChemistry") },
    { key: "Biology", label: t("catBiology") },
    { key: "Technical & ICT", label: t("catICT") },
  ];

  const coursesData: Course[] = [
    {
      id: "hsc-physics-1st",
      title: t("c1Title"),
      category: "Physics",
      price: t("c1Price"),
      numericPrice: 2500,
      duration: t("c1Duration"),
      lectures: 50,
      rating: 4.8,
      reviewCount: 156,
      img: "/course1.png",
      level: "All level",
      levelBg: "bg-purple-50",
      levelColor: "text-purple-600",
    },
    {
      id: "univ-physics-masterclass",
      title: t("c2Title"),
      category: "Physics",
      price: t("c2Price"),
      numericPrice: 3000,
      duration: t("c2Duration"),
      lectures: 75,
      rating: 4.9,
      reviewCount: 320,
      img: "/course1.png",
      level: "Advanced",
      levelBg: "bg-orange-50",
      levelColor: "text-orange-500",
    },
    {
      id: "hsc-math-admission",
      title: t("c3Title"),
      category: "Math",
      price: t("c3Price"),
      numericPrice: 2800,
      duration: t("c3Duration"),
      lectures: 70,
      rating: 4.7,
      reviewCount: 184,
      img: "/course1.png",
      level: "Intermediate",
      levelBg: "bg-blue-50",
      levelColor: "text-blue-500",
    },
    {
      id: "calculus-geometry",
      title: t("c4Title"),
      category: "Math",
      price: t("c4Price"),
      numericPrice: 1500,
      duration: t("c4Duration"),
      lectures: 40,
      rating: 4.6,
      reviewCount: 98,
      img: "/course1.png",
      level: "Beginner",
      levelBg: "bg-emerald-50",
      levelColor: "text-emerald-500",
    },
    {
      id: "chemistry-2nd-organic",
      title: t("c5Title"),
      category: "Chemistry",
      price: t("c5Price"),
      numericPrice: 2200,
      duration: t("c5Duration"),
      lectures: 55,
      rating: 4.8,
      reviewCount: 215,
      img: "/course1.png",
      level: "All level",
      levelBg: "bg-purple-50",
      levelColor: "text-purple-600",
    },
    {
      id: "biology-crash",
      title: t("c6Title"),
      category: "Biology",
      price: t("c6Price"),
      numericPrice: 2000,
      duration: t("c6Duration"),
      lectures: 48,
      rating: 4.7,
      reviewCount: 142,
      img: "/course1.png",
      level: "Intermediate",
      levelBg: "bg-blue-50",
      levelColor: "text-blue-500",
    },
    {
      id: "hsc-ict-prep",
      title: t("c7Title"),
      category: "Technical & ICT",
      price: t("c7Price"),
      numericPrice: 1800,
      duration: t("c7Duration"),
      lectures: 45,
      rating: 4.9,
      reviewCount: 260,
      img: "/course1.png",
      level: "Beginner",
      levelBg: "bg-emerald-50",
      levelColor: "text-emerald-500",
    },
    {
      id: "fullstack-js",
      title: t("c8Title"),
      category: "Technical & ICT",
      price: t("c8Price"),
      numericPrice: 5000,
      duration: t("c8Duration"),
      lectures: 120,
      rating: 4.9,
      reviewCount: 195,
      img: "/course1.png",
      level: "Advanced",
      levelBg: "bg-orange-50",
      levelColor: "text-orange-500",
    },
  ];

  const getLevelLabel = (level: string) => {
    if (level === "All level") return t("allLevel");
    if (level === "Beginner") return t("beginner");
    if (level === "Intermediate") return t("intermediate");
    if (level === "Advanced") return t("advanced");
    return level;
  };

  // Filter and Sort Courses
  const filteredCourses = coursesData
    .filter((course) => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-low") return a.numericPrice - b.numericPrice;
      if (sortBy === "price-high") return b.numericPrice - a.numericPrice;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "popularity") return b.reviewCount - a.reviewCount;
      return 0; // default (no sorting)
    });

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════
            PAGE HEADER — dot pattern background
        ══════════════════════════════════════ */}
        <section
          className="relative py-20 text-center overflow-hidden bg-white border-b border-slate-100"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        >
          {/* Fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <span className="block text-blue-600 text-sm font-bold tracking-wider mb-3">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
              {t("subtitle")}
            </p>

            {/* Filter, Search, and Sort Container */}
            <div className="mx-auto max-w-5xl bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full lg:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      selectedCategory === cat.key
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "text-slate-500 hover:text-[#1a1a2e] hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search & Sort Row */}
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto shrink-0">
                {/* Search Input */}
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={t("searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
                  />
                </div>

                {/* Sort Dropdown */}
                <div className="relative w-full sm:w-44">
                  <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full rounded-full bg-slate-50 border border-slate-200 pl-10 pr-8 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition appearance-none cursor-pointer"
                  >
                    <option value="default">{t("sortDefault")}</option>
                    <option value="popularity">{t("sortReviews")}</option>
                    <option value="rating">{t("sortRating")}</option>
                    <option value="price-low">{t("sortPriceLow")}</option>
                    <option value="price-high">{t("sortPriceHigh")}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            COURSES GRID
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group flex flex-col bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Image Container */}
                    <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-50">
                      <Image
                        src={course.img}
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
                          {getLevelLabel(course.level)}
                        </span>
                        <Heart className="w-4 h-4 text-slate-400 hover:text-red-500 hover:fill-red-500 transition-colors cursor-pointer" />
                      </div>

                      {/* Title */}
                      <h3 className="text-[15px] font-bold text-slate-900 leading-snug line-clamp-2 mb-4 group-hover:text-blue-600 transition-colors flex-1">
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
                          <span className="text-[12px] font-medium">{course.lectures} {t("lecturesSuffix")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">{t("noCoursesTitle")}</h3>
                <p className="text-slate-400 text-xs">
                  {t("noCoursesDesc")}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════
            JOIN ACADEMY CTA
        ══════════════════════════════════════ */}
        <section className="pb-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="bg-[#1a1a2e] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl shadow-slate-100">
              {/* Background abstract circles */}
              <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                  {t("ctaTitle")}
                </h2>
                <p className="text-slate-300 text-[14px] leading-relaxed mb-8">
                  {t("ctaDesc")}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-[#ffd260] hover:bg-[#fcc13d] text-slate-900 font-extrabold text-xs rounded-full transition shadow-md shadow-yellow-500/10 cursor-pointer"
                  >
                    {t("signUpFree")}
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full transition border border-white/20 cursor-pointer"
                  >
                    {t("viewPricing")}
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
