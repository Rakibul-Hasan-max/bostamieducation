"use client";

import { use, useState, useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  COURSES_DATA,
  getCourseById,
  CourseDetail,
} from "@/constants/coursesData";
import {
  Star,
  Clock,
  LayoutGrid,
  Users,
  Calendar,
  Globe,
  CheckCircle2,
  PlayCircle,
  FileText,
  Award,
  Lock,
  ChevronDown,
  ChevronUp,
  Share2,
  Heart,
  ArrowRight,
  ShieldCheck,
  HelpCircle,
  MessageSquare,
  BookOpen,
} from "lucide-react";

export default function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.id;

  const t = useTranslations("CourseDetails");
  const tCourses = useTranslations("Courses");

  const course: CourseDetail | undefined = getCourseById(courseId);

  const [activeTab, setActiveTab] = useState<
    "overview" | "curriculum" | "instructor" | "reviews" | "faq"
  >("overview");

  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    "mod-1": true,
    "mod-c2-1": true,
    "mod-c3-1": true,
  });

  const [openFaqs, setOpenFaqs] = useState<Record<number, boolean>>({
    0: true,
  });

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (course) {
      document.title = `${course.defaultTitle} | Bostami Education`;
    } else {
      document.title = `Course Not Found | Bostami Education`;
    }
  }, [course]);

  const isScrollingRef = useRef(false);

  const handleTabClick = (
    tabId: "overview" | "curriculum" | "instructor" | "reviews" | "faq"
  ) => {
    setActiveTab(tabId);
    isScrollingRef.current = true;

    const element = document.getElementById(tabId);
    if (element) {
      const yOffset = -110;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    setTimeout(() => {
      isScrollingRef.current = false;
    }, 800);
  };

  useEffect(() => {
    const sectionIds: Array<"overview" | "curriculum" | "instructor" | "reviews" | "faq"> = [
      "overview",
      "curriculum",
      "instructor",
      "reviews",
      "faq",
    ];

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      let currentTab: "overview" | "curriculum" | "instructor" | "reviews" | "faq" = "overview";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 160) {
            currentTab = sectionIds[i];
            break;
          }
        }
      }
      setActiveTab(currentTab);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20 px-6">
          <div className="text-center max-w-md bg-white rounded-3xl p-8 border border-slate-100 shadow-xl">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h1 className="text-2xl font-extrabold text-[#1a1a2e] mb-2">
              {t("notFoundTitle")}
            </h1>
            <p className="text-slate-500 text-sm mb-6">{t("notFoundDesc")}</p>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-full transition shadow-md shadow-blue-500/20"
            >
              {t("backToCourses")}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Translated title fallback
  const courseTitle = tCourses.has(course.titleKey)
    ? tCourses(course.titleKey)
    : course.defaultTitle;

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqs((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedCourses = COURSES_DATA.filter(
    (c) => c.id !== course.id && (c.category === course.category || c.rating >= 4.8)
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════
            HERO HEADER SECTION
        ══════════════════════════════════════ */}
        <section className="relative bg-[#1a1a2e] text-white py-12 lg:py-16 overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative mx-auto max-w-7xl px-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 flex-wrap">
              <Link href="/" className="hover:text-white transition">
                {t("home")}
              </Link>
              <span>/</span>
              <Link href="/courses" className="hover:text-white transition">
                {t("courses")}
              </Link>
              <span>/</span>
              <span className="text-blue-400 font-semibold">{course.category}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Info Column */}
              <div className="lg:col-span-8">
                {/* Category & Level Badges */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30">
                    {course.category}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${course.levelBg} ${course.levelColor}`}
                  >
                    {course.level}
                  </span>
                </div>

                {/* Course Title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
                  {courseTitle}
                </h1>

                {/* Short Description */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 max-w-3xl">
                  {course.defaultShortDesc}
                </p>

                {/* Course Quick Stats Row */}
                <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-xs text-slate-300 mb-6">
                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-amber-400 text-sm">
                      {course.rating.toFixed(1)}
                    </span>
                    <div className="flex text-amber-400">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3.5 h-3.5 ${
                            star <= Math.floor(course.rating)
                              ? "fill-amber-400"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-slate-400">
                      ({course.reviewCount} {t("reviewsCount")})
                    </span>
                  </div>

                  {/* Enrolled Students */}
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>
                      <strong className="text-white">
                        {course.studentCount.toLocaleString()}
                      </strong>{" "}
                      {t("students")}
                    </span>
                  </div>

                  {/* Last Updated */}
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>
                      {t("lastUpdated")} {course.lastUpdated}
                    </span>
                  </div>

                  {/* Language */}
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Globe className="w-4 h-4 text-purple-400" />
                    <span>{course.language}</span>
                  </div>
                </div>

                {/* Instructor Quick Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm border border-slate-600">
                    {course.instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">{t("instructor")}</p>
                    <p className="text-xs font-bold text-white">
                      {course.instructor.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MAIN CONTENT & STICKY SIDEBAR CONTAINER
        ══════════════════════════════════════ */}
        <section className="relative mx-auto max-w-7xl px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: TABS & CONTENT (lg:col-span-8) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* TAB NAVIGATION BAR */}
              <div className="bg-white rounded-2xl border border-slate-100 p-1.5 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar sticky top-20 z-20">
                {(
                  [
                    { id: "overview", label: t("overview") },
                    { id: "curriculum", label: t("curriculum") },
                    { id: "instructor", label: t("instructor") },
                    { id: "reviews", label: t("reviews") },
                    { id: "faq", label: t("faq") },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-5 py-2.5 text-xs font-bold rounded-xl transition cursor-pointer shrink-0 ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* OVERVIEW SECTION */}
              <div
                id="overview"
                className="space-y-8 scroll-mt-28"
              >
                {/* What You Will Learn Card */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    {t("whatYouWillLearn")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                          {outcome}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Description */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-4">
                    {t("courseDescription")}
                  </h2>
                  <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {course.description.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-4">
                    {t("requirements")}
                  </h2>
                  <ul className="space-y-2 text-slate-600 text-xs sm:text-sm">
                    {course.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CURRICULUM SECTION */}
              <div
                id="curriculum"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm scroll-mt-28"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h2 className="text-xl font-extrabold text-[#1a1a2e]">
                      {t("courseContent")}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {course.curriculum.length > 0
                        ? `${course.curriculum.length} ${t("modules")} • ${course.lectures} ${t("courses")} • ${course.duration} ${t("totalDuration")}`
                        : `${course.lectures} lectures • ${course.duration} total length`}
                    </p>
                  </div>
                </div>

                {/* Accordion Modules */}
                {course.curriculum.length > 0 ? (
                  <div className="space-y-4">
                    {course.curriculum.map((mod) => {
                      const isOpen = !!openModules[mod.id];
                      return (
                        <div
                          key={mod.id}
                          className="border border-slate-200 rounded-2xl overflow-hidden transition"
                        >
                          {/* Module Header */}
                          <button
                            onClick={() => toggleModule(mod.id)}
                            className="w-full bg-slate-50 hover:bg-slate-100/80 p-4 flex items-center justify-between text-left transition cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              {isOpen ? (
                                <ChevronUp className="w-4 h-4 text-slate-500" />
                              ) : (
                                <ChevronDown className="w-4 h-4 text-slate-500" />
                              )}
                              <span className="text-xs sm:text-sm font-bold text-slate-900">
                                {mod.title}
                              </span>
                            </div>
                            <span className="text-[11px] font-semibold text-slate-500 shrink-0">
                              {mod.lessonsCount} lessons • {mod.duration}
                            </span>
                          </button>

                          {/* Lessons List */}
                          {isOpen && (
                            <div className="divide-y divide-slate-100 bg-white">
                              {mod.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="p-3.5 sm:px-5 flex items-center justify-between hover:bg-slate-50/50 transition"
                                >
                                  <div className="flex items-center gap-3">
                                    {lesson.isPreview ? (
                                      <PlayCircle className="w-4 h-4 text-blue-600 shrink-0" />
                                    ) : (
                                      <Lock className="w-4 h-4 text-slate-300 shrink-0" />
                                    )}
                                    <span className="text-xs font-medium text-slate-800">
                                      {lesson.title}
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-3 shrink-0">
                                    {lesson.isPreview && (
                                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded">
                                        {t("preview")}
                                      </span>
                                    )}
                                    <span className="text-xs text-slate-400 font-medium">
                                      {lesson.duration}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-6 bg-slate-50 rounded-2xl text-center">
                    <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs text-slate-500 font-medium">
                      Detailed syllabus topics are included in the downloadable course roadmap sheet after enrollment.
                    </p>
                  </div>
                )}
              </div>

              {/* INSTRUCTOR SECTION */}
              <div
                id="instructor"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm scroll-mt-28"
              >
                <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-6">
                  {t("instructorTitle")}
                </h2>

                <div className="flex flex-col sm:flex-row items-start gap-6">
                  {/* Instructor Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-2xl shrink-0 shadow-lg shadow-blue-500/20">
                    {course.instructor.name.charAt(0)}
                  </div>

                  {/* Instructor Bio & Stats */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.instructor.name}
                    </h3>
                    <p className="text-xs text-blue-600 font-semibold mb-3">
                      {course.instructor.title}
                    </p>

                    {/* Stats Grid */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-slate-800">
                          {course.instructor.rating}
                        </span>{" "}
                        {t("instructorRating")}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-500" />
                        <span className="font-bold text-slate-800">
                          {course.instructor.studentsCount.toLocaleString()}
                        </span>{" "}
                        {t("instructorStudents")}
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5 text-purple-500" />
                        <span className="font-bold text-slate-800">
                          {course.instructor.coursesCount}
                        </span>{" "}
                        {t("instructorCourses")}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* REVIEWS SECTION */}
              <div
                id="reviews"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm scroll-mt-28"
              >
                <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-6">
                  {t("studentFeedback")}
                </h2>

                {/* Rating Overview Box */}
                <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-slate-50/80 rounded-2xl mb-8">
                  <div className="text-center sm:text-left shrink-0">
                    <span className="text-4xl font-extrabold text-[#1a1a2e]">
                      {course.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-slate-400 ml-1">
                      {t("outOf5")}
                    </span>
                    <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 my-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className="w-4 h-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <p className="text-xs text-slate-500">
                      {t("basedOn")} {course.reviewCount} {t("reviewsCount")}
                    </p>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="flex-1 w-full space-y-1.5">
                    {[
                      { stars: 5, pct: "88%" },
                      { stars: 4, pct: "9%" },
                      { stars: 3, pct: "2%" },
                      { stars: 2, pct: "1%" },
                      { stars: 1, pct: "0%" },
                    ].map((row) => (
                      <div
                        key={row.stars}
                        className="flex items-center gap-3 text-xs text-slate-500"
                      >
                        <span className="w-12 text-right font-medium">
                          {row.stars} stars
                        </span>
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-400 rounded-full"
                            style={{ width: row.pct }}
                          />
                        </div>
                        <span className="w-8 font-semibold text-slate-700">
                          {row.pct}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews Cards */}
                {course.reviews.length > 0 ? (
                  <div className="space-y-4">
                    {course.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-5 border border-slate-100 rounded-2xl bg-slate-50/40 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center">
                              {rev.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-900">
                                {rev.name}
                              </h4>
                              <span className="text-[10px] text-slate-400">
                                {rev.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex text-amber-400">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating
                                    ? "fill-amber-400"
                                    : "text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-medium">
                          &ldquo;{rev.comment}&rdquo;
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">
                    No individual text reviews written yet. All ratings are 5-star verified board examinees.
                  </p>
                )}
              </div>

              {/* FAQ SECTION */}
              <div
                id="faq"
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm scroll-mt-28"
              >
                <h2 className="text-xl font-extrabold text-[#1a1a2e] mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  {t("faq")}
                </h2>

                <div className="space-y-3">
                  {course.faqs.length > 0 ? (
                    course.faqs.map((faq, idx) => {
                      const isOpen = !!openFaqs[idx];
                      return (
                        <div
                          key={idx}
                          className="border border-slate-100 rounded-2xl overflow-hidden"
                        >
                          <button
                            onClick={() => toggleFaq(idx)}
                            className="w-full bg-slate-50/70 hover:bg-slate-100/80 p-4 text-left flex items-center justify-between gap-4 transition cursor-pointer"
                          >
                            <span className="text-xs sm:text-sm font-bold text-slate-900">
                              {faq.question}
                            </span>
                            {isOpen ? (
                              <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                            )}
                          </button>

                          {isOpen && (
                            <div className="p-4 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="space-y-3">
                      {[
                        {
                          q: "How do I enroll in this course?",
                          a: "Click on the 'Enroll Now' button on the sidebar, select your preferred payment method (bKash, Nagad, Rocket, or Card), and get instant access immediately.",
                        },
                        {
                          q: "Can I access lessons on mobile phone?",
                          a: "Yes! Our application is 100% mobile friendly and works smoothly on smartphones, tablets, laptops, and desktops.",
                        },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50"
                        >
                          <h4 className="text-xs font-bold text-slate-900 mb-1">
                            {item.q}
                          </h4>
                          <p className="text-xs text-slate-600">{item.a}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: STICKY ENROLLMENT SIDEBAR CARD (lg:col-span-4) */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden p-6 space-y-6">
                
                {/* Course Preview Thumbnail / Card Header */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 group cursor-pointer">
                  <Image
                    src={course.img}
                    alt={courseTitle}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center group-hover:bg-slate-900/30 transition">
                    <div className="w-14 h-14 rounded-full bg-white/90 text-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <PlayCircle className="w-8 h-8 fill-blue-600 text-white" />
                    </div>
                  </div>
                  <span className="absolute bottom-3 left-3 bg-black/70 text-white text-[10px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                    {t("preview")}
                  </span>
                </div>

                {/* Pricing Block */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#1a1a2e]">
                      {course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-base text-slate-400 line-through font-semibold">
                        {course.originalPrice}
                      </span>
                    )}
                    {course.originalPrice && (
                      <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-extrabold rounded">
                        37% OFF
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-red-500 font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Special Discount ends in 2 days!
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link
                    href={`/enroll?courseId=${course.id}`}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl transition-all shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t("enrollNow")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={handleShare}
                    className="w-full py-3 px-6 bg-slate-100 hover:bg-slate-200/80 text-slate-800 font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Share2 className="w-4 h-4 text-slate-500" />
                    <span>{copied ? "Link Copied!" : t("shareCourse")}</span>
                  </button>
                </div>

                {/* Money Back Guarantee */}
                <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-semibold pt-1 border-t border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>{t("moneyBackGuarantee")}</span>
                </div>

                {/* Course Includes Checklist */}
                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#1a1a2e] uppercase tracking-wider">
                    {t("courseIncludes")}
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {course.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════
            RELATED COURSES GRID
        ══════════════════════════════════════ */}
        {relatedCourses.length > 0 && (
          <section className="py-16 bg-white border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-extrabold text-[#1a1a2e]">
                  {t("relatedCourses")}
                </h2>
                <Link
                  href="/courses"
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  <span>{t("viewDetails")}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedCourses.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/courses/${rel.id}`}
                    className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-[0_4px_24px_-12px_rgba(0,0,0,0.08)] overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative aspect-[5/4] w-full overflow-hidden bg-slate-50">
                      <Image
                        src={rel.img}
                        alt={rel.defaultTitle}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-600">
                          {rel.category}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 my-2 group-hover:text-blue-600 transition">
                          {tCourses.has(rel.titleKey)
                            ? tCourses(rel.titleKey)
                            : rel.defaultTitle}
                        </h3>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                        <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-amber-400" /> {rel.rating.toFixed(1)}
                        </span>
                        <span className="text-xs font-extrabold text-slate-900">
                          {rel.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
