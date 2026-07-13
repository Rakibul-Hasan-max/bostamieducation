"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Image from "next/image";
import { Award, BookOpen, Mail, Search, Users } from "lucide-react";
import Link from "next/link";

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
}

const mentorsData: Mentor[] = [
  {
    name: "Bayzid Bostami",
    role: "Founder & CEO, Physics Head",
    department: "Physics",
    bio: "Passionate about simplifying complex physics concepts for college and university admission seekers. Over 6 years of academic mentoring experience.",
    img: "/tutor1.png",
    students: "20k+",
    courses: "15+",
    facebook: "https://www.facebook.com/bostamieducationpage/",
    linkedin: "https://www.linkedin.com/in/bostami-education-ltd/",
    youtube: "https://www.youtube.com/@bostamieducation",
  },
  {
    name: "Rakibul Hasan",
    role: "Co-Founder & CTO, Technical Lead",
    department: "Technical & ICT",
    bio: "Lead software engineer and tech enthusiast, instructing digital courses in web development, programming foundations, and tech career prep.",
    img: "/tutor2.png",
    students: "10k+",
    courses: "8+",
    facebook: "https://facebook.com/rakibulhasan.cn",
    linkedin: "https://www.linkedin.com/in/rakibulhasan-bd/",
  },
  {
    name: "Asrafi Islam Orpita",
    role: "Biology Instructor",
    department: "Biology",
    bio: "Specializes in organic and inorganic chemistry with a focus on board exams, shortcuts, and university admission prep.",
    img: "/tutor8.png",
    students: "5k+",
    courses: "6+",
    facebook: "https://facebook.com",
  },
  {
    name: "Md. Akash",
    role: "Physics Instructor",
    department: "Physics",
    bio: "Passionate about simplifying complex physics concepts for college and university admission seekers. Over 6 years of academic mentoring experience.",
    img: "/tutor7.png",
    students: "8k+",
    courses: "10+",
    facebook: "https://facebook.com",
  },
  {
    name: "Foysal Ahamed",
    role: "Higher Math Instructor",
    department: "Math",
    bio: "Passionate about simplifying complex math concepts for college and university admission seekers. Over 6 years of academic mentoring experience.",
    img: "/tutor3.png",
    students: "6k+",
    courses: "7+",
    facebook: "https://facebook.com",
  },
  {
    name: "Akkash Ali",
    role: "General Math Instructor",
    department: "Math",
    bio: "Passionate about simplifying complex math concepts for college and university admission seekers. Over 6 years of academic mentoring experience.",
    img: "/tutor4.png",
    students: "4k+",
    courses: "5+",
    facebook: "https://facebook.com",
  },
  {
    name: "Majharul Islam",
    role: "Chemistry Instructor",
    department: "Chemistry",
    bio: "Passionate about simplifying complex chemistry concepts for college and university admission seekers. Over 6 years of academic mentoring experience.",
    img: "/tutor9.png",
    students: "3k+",
    courses: "4+",
    facebook: "https://facebook.com",
  },
];

const categories = ["All", "Physics", "Math", "Chemistry", "Biology", "Technical & ICT"];

export default function MentorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
              OUR INSTRUCTORS
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight mb-4">
              Meet Our Expert Mentors
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
              Learn from top educators, industry specialists, and experienced mentors committed to guiding you towards academic excellence and technical careers.
            </p>

            {/* Filter and Search Bar Container */}
            <div className="mx-auto max-w-4xl bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "text-slate-500 hover:text-[#1a1a2e] hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search mentors..."
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMentors.map((mentor) => (
                  <div
                    key={mentor.name}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Mentor Photo Container */}
                    <div className="relative w-full aspect-[4/3] bg-slate-100 overflow-hidden">
                      <Image
                        src={mentor.img}
                        alt={mentor.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Department Badge */}
                      <span className="absolute top-4 left-4 bg-[#1a1a2e]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider border border-white/10 uppercase">
                        {mentor.department}
                      </span>
                    </div>

                    {/* Content Details */}
                    <div className="p-6 md:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Name and Designation */}
                        <div className="mb-4">
                          <h3 className="text-lg font-bold text-[#1a1a2e] mb-1 group-hover:text-blue-600 transition-colors">
                            {mentor.name}
                          </h3>
                          <p className="text-[12px] font-bold text-slate-400">
                            {mentor.role}
                          </p>
                        </div>

                        {/* Bio */}
                        <p className="text-[13px] text-slate-500 leading-relaxed mb-6 line-clamp-3">
                          {mentor.bio}
                        </p>
                      </div>

                      <div>
                        {/* Stats Row */}
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-slate-100 mb-4 text-[12px]">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-blue-600 shrink-0">
                              <Users className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-extrabold text-[#1a1a2e] leading-none">{mentor.students}</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Students</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-50 text-orange-600 shrink-0">
                              <BookOpen className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-extrabold text-[#1a1a2e] leading-none">{mentor.courses}</p>
                              <p className="text-[10px] font-bold text-slate-400 mt-0.5">Courses</p>
                            </div>
                          </div>
                        </div>

                        {/* Social Links Row */}
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
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">No mentors found</h3>
                <p className="text-slate-400 text-xs">
                  Try adjusting your search criteria or selecting a different category tab.
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
                  Want to teach at Bostami Education?
                </h2>
                <p className="text-slate-300 text-[14px] leading-relaxed mb-8">
                  We are always looking for passionate educators, tech practitioners, and subject experts. Join our teaching community, build quality courses, and impact thousands of students.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-[#ffd260] hover:bg-[#fcc13d] text-slate-900 font-extrabold text-xs rounded-full transition shadow-md shadow-yellow-500/10 cursor-pointer"
                  >
                    Apply as Instructor
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full transition border border-white/20 cursor-pointer"
                  >
                    Contact Support
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
