"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Award, Star, Search } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface Mentor {
  name: string;
  role: string;
  department: "Physics" | "Biology" | "Chemistry" | "Math" | "Technical & ICT";
  bio: string;
  img: string;
  students: string;
  courses: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  rating: number;
}

export default function MentorsPage() {
  const t = useTranslations("Mentors");
  const tCourses = useTranslations("Courses");

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = `${t("badge")} | Bostami Education`;
  }, [t]);

  const categories = [
    { key: "All", label: tCourses("catAll") },
    { key: "Physics", label: tCourses("catPhysics") },
    { key: "Math", label: tCourses("catMath") },
    { key: "Chemistry", label: tCourses("catChemistry") },
    { key: "Biology", label: tCourses("catBiology") },
    { key: "Technical & ICT", label: tCourses("catICT") },
  ];

  const mentorsData: Mentor[] = [
    {
      name: "Bayzid Bostami",
      role: t("roleCEO"),
      department: "Physics",
      bio: t("bioCEO"),
      img: "/about-ceo.png",
      students: "20k+",
      courses: "15+",
      facebook: "https://www.facebook.com/bostamieducationpage/",
      linkedin: "https://www.linkedin.com/in/bostami-education-ltd/",
      youtube: "https://www.youtube.com/@bostamieducation",
      rating: 4.9,
    },
    {
      name: "Rakibul Hasan",
      role: t("roleCTO"),
      department: "Technical & ICT",
      bio: t("bioCTO"),
      img: "/hasan.png",
      students: "10k+",
      courses: "8+",
      facebook: "https://facebook.com/rakibulhasan.cn",
      linkedin: "https://www.linkedin.com/in/rakibulhasan-bd/",
      rating: 4.8,
    },
    {
      name: "Asrafi Islam Orpita",
      role: t("roleBiology"),
      department: "Biology",
      bio: t("bioBiology"),
      img: "/tutor8.png",
      students: "5k+",
      courses: "6+",
      rating: 4.8,
    },
    {
      name: "Md. Akash",
      role: t("rolePhysics"),
      department: "Physics",
      bio: t("bioPhysics"),
      img: "/tutor5.png",
      students: "8k+",
      courses: "10+",
      rating: 4.6,
    },
    {
      name: "Foysal Ahamed",
      role: t("roleHigherMath"),
      department: "Math",
      bio: t("bioHigherMath"),
      img: "/tutor10.png",
      students: "6k+",
      courses: "7+",
      rating: 4.6,
    },
    {
      name: "Akkash Ali",
      role: t("roleGeneralMath"),
      department: "Math",
      bio: t("bioGeneralMath"),
      img: "/tutor11.png",
      students: "4k+",
      courses: "5+",
      rating: 4.8,
    },
    {
      name: "Majharul Islam",
      role: t("roleChemistry"),
      department: "Chemistry",
      bio: t("bioChemistry"),
      img: "/tutor9.png",
      students: "3k+",
      courses: "4+",
      rating: 4.7,
    },
  ];

  const getDeptLabel = (dept: string) => {
    if (dept === "Physics") return tCourses("catPhysics");
    if (dept === "Math") return tCourses("catMath");
    if (dept === "Chemistry") return tCourses("catChemistry");
    if (dept === "Biology") return tCourses("catBiology");
    if (dept === "Technical & ICT") return tCourses("catICT");
    return dept;
  };

  // Filter mentors based on category and search query
  const filteredMentors = mentorsData.filter((mentor) => {
    const matchesCategory = selectedCategory === "All" || mentor.department === selectedCategory;
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          mentor.bio.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

            {/* Filter and Search Bar Container */}
            <div className="mx-auto max-w-4xl bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      selectedCategory === cat.key
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "text-slate-500 hover:text-[#1a1a2e] hover:bg-slate-100"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            MENTORS GRID
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6">
            {filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {filteredMentors.map((mentor) => (
                  <div
                    key={mentor.name}
                    className="group flex flex-col sm:flex-row bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Mentor Photo Container - Fixed Width on SM+ */}
                    <div className="relative w-full sm:w-[220px] md:w-[240px] shrink-0 h-64 sm:h-auto bg-slate-100 p-3">
                      <div className="relative w-full h-full rounded-xl overflow-hidden">
                        <Image
                          src={mentor.img}
                          alt={mentor.name}
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Name and Rating */}
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="text-xl font-bold text-[#1a1a2e]">
                            {mentor.name}
                          </h3>
                          <div className="flex items-center gap-1 shrink-0 mt-1">
                            <span className="text-[13px] font-bold text-slate-700">{mentor.rating}</span>
                            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          </div>
                        </div>
                        <p className="text-[13px] text-slate-500 mb-5">
                          {mentor.role}
                        </p>

                        {/* Bio */}
                        <p className="text-[14px] text-slate-500 leading-relaxed mb-6 line-clamp-3 md:line-clamp-2">
                          {mentor.bio}
                        </p>
                      </div>

                      {/* Footer Row: Department & Socials */}
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-[14px] font-bold text-[#f7823b]">
                          {getDeptLabel(mentor.department)}
                        </span>

                        <div className="flex items-center gap-2.5">
                          {mentor.facebook && (
                            <Link
                              href={mentor.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#1877F2] hover:text-white transition shadow-sm"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                              </svg>
                            </Link>
                          )}
                          {mentor.linkedin && (
                            <Link
                              href={mentor.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#0A66C2] hover:text-white transition shadow-sm"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                                <rect x="2" y="9" width="4" height="12" />
                                <circle cx="4" cy="4" r="2" />
                              </svg>
                            </Link>
                          )}
                          {mentor.youtube && (
                            <Link
                              href={mentor.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-[#FF0000] hover:text-white transition shadow-sm"
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M23.498 6.163c-.272-1.022-1.074-1.826-2.097-2.097C19.56 3.5 12 3.5 12 3.5s-7.56 0-9.401.566C1.576 4.337.774 5.14.502 6.163.0 8.01.0 12 .0 12s.0 3.99.502 5.837c.272 1.022 1.074 1.826 2.097 2.097C4.44 20.5 12 20.5 12 20.5s7.56 0 9.401-.566c1.023-.271 1.825-1.075 2.097-2.097C24 15.99 24 12 24 12s.0-3.99-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
                <Award className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">{t("noMentorsTitle")}</h3>
                <p className="text-slate-400 text-xs">
                  {t("noMentorsDesc")}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ══════════════════════════════════════
            JOIN TEAM BANNER (CTA)
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
                    href="/contact"
                    className="px-6 py-3 bg-[#ffd260] hover:bg-[#fcc13d] text-slate-900 font-extrabold text-xs rounded-full transition shadow-md shadow-yellow-500/10 cursor-pointer"
                  >
                    {t("applyInstructor")}
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full transition border border-white/20 cursor-pointer"
                  >
                    {t("contactSupport")}
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
