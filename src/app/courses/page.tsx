"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Image from "next/image";
import { BookOpen, Clock, Search, Star, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  category: "Physics" | "Math" | "Chemistry" | "Biology" | "Technical & ICT";
  price: string;
  numericPrice: number; // For sorting
  duration: string;
  lectures: string;
  rating: number;
  reviewCount: number;
  instructorName: string;
  instructorImg: string;
  img: string;
  badge?: string;
}

const coursesData: Course[] = [
  {
    id: "hsc-physics-1st",
    title: "HSC Physics 1st Paper Complete Syllabus Course",
    category: "Physics",
    price: "৳২,৫০০",
    numericPrice: 2500,
    duration: "40 Hours",
    lectures: "50 Lectures",
    rating: 4.8,
    reviewCount: 156,
    instructorName: "Md. Akash",
    instructorImg: "/tutor7.png",
    img: "/studio1.png",
    badge: "Recommended",
  },
  {
    id: "univ-physics-masterclass",
    title: "University Admission Physics Masterclass",
    category: "Physics",
    price: "৳৩,০০০",
    numericPrice: 3000,
    duration: "60 Hours",
    lectures: "75 Lectures",
    rating: 4.9,
    reviewCount: 320,
    instructorName: "Bayzid Bostami",
    instructorImg: "/about-ceo.png",
    img: "/studio4.png",
    badge: "Popular",
  },
  {
    id: "hsc-math-admission",
    title: "HSC Higher Mathematics Admission Prep Special",
    category: "Math",
    price: "৳২,৮০০",
    numericPrice: 2800,
    duration: "55 Hours",
    lectures: "70 Lectures",
    rating: 4.7,
    reviewCount: 184,
    instructorName: "Foysal Ahamed",
    instructorImg: "/tutor10.png",
    img: "/studio2.png",
  },
  {
    id: "calculus-geometry",
    title: "Calculus & Geometry Foundation Masterclass",
    category: "Math",
    price: "৳১,৫০০",
    numericPrice: 1500,
    duration: "30 Hours",
    lectures: "40 Lectures",
    rating: 4.6,
    reviewCount: 98,
    instructorName: "Akkash Ali",
    instructorImg: "/tutor11.png",
    img: "/studio1.png",
  },
  {
    id: "chemistry-2nd-organic",
    title: "HSC Chemistry 2nd Paper Organic Chemistry Special",
    category: "Chemistry",
    price: "৳২,২০০",
    numericPrice: 2200,
    duration: "45 Hours",
    lectures: "55 Lectures",
    rating: 4.8,
    reviewCount: 215,
    instructorName: "Majharul Islam",
    instructorImg: "/tutor9.png",
    img: "/studio3.png",
    badge: "Hot",
  },
  {
    id: "biology-crash",
    title: "HSC Biology Complete Syllabus Crash Course",
    category: "Biology",
    price: "৳২,০০০",
    numericPrice: 2000,
    duration: "38 Hours",
    lectures: "48 Lectures",
    rating: 4.7,
    reviewCount: 142,
    instructorName: "Asrafi Islam Orpita",
    instructorImg: "/tutor8.png",
    img: "/studio5.png",
  },
  {
    id: "hsc-ict-prep",
    title: "HSC ICT Board Prep & Practical Course",
    category: "Technical & ICT",
    price: "৳১,৮০০",
    numericPrice: 1800,
    duration: "35 Hours",
    lectures: "45 Lectures",
    rating: 4.9,
    reviewCount: 260,
    instructorName: "Rakibul Hasan",
    instructorImg: "/cto.png",
    img: "/studio2.png",
    badge: "Best Seller",
  },
  {
    id: "fullstack-js",
    title: "Full-Stack Web Development Foundation Bootcamp",
    category: "Technical & ICT",
    price: "৳৫,০০০",
    numericPrice: 5000,
    duration: "80 Hours",
    lectures: "120 Lectures",
    rating: 4.9,
    reviewCount: 195,
    instructorName: "Rakibul Hasan",
    instructorImg: "/cto.png",
    img: "/studio4.png",
  },
];

const categories = ["All", "Physics", "Math", "Chemistry", "Biology", "Technical & ICT"];

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  // Filter and Sort Courses
  const filteredCourses = coursesData
    .filter((course) => {
      const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructorName.toLowerCase().includes(searchQuery.toLowerCase());
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
              ACADEMIC & SKILL COURSES
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight mb-4">
              Explore Our Courses
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
              Choose from our curated courses designed to help you excel in board exams, university admissions, and modern industrial programming skills.
            </p>

            {/* Filter, Search, and Sort Container */}
            <div className="mx-auto max-w-5xl bg-white rounded-3xl p-4 md:p-5 shadow-lg border border-slate-100 flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 w-full lg:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2.5 text-xs font-bold rounded-full transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white shadow-md shadow-blue-100"
                        : "text-slate-500 hover:text-[#1a1a2e] hover:bg-slate-100"
                    }`}
                  >
                    {cat}
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
                    placeholder="Search courses..."
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
                    <option value="default">Sort: Default</option>
                    <option value="popularity">Most Reviews</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <div
                    key={course.id}
                    className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Course Thumbnail */}
                    <div className="relative w-full aspect-[16/10] bg-slate-100 overflow-hidden">
                      <Image
                        src={course.img}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Category Badge */}
                      <span className="absolute top-4 left-4 bg-[#1a1a2e]/85 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-wider border border-white/10 uppercase">
                        {course.category}
                      </span>
                      {/* Optional Custom Badge (Hot, Best Seller, etc) */}
                      {course.badge && (
                        <span className="absolute top-4 right-4 bg-orange-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow">
                          {course.badge}
                        </span>
                      )}
                    </div>

                    {/* Course Details Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Instructor Info */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="relative h-6 w-6 rounded-full overflow-hidden border border-slate-100 bg-slate-50">
                            <Image
                              src={course.instructorImg}
                              alt={course.instructorName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="text-[11px] font-bold text-slate-400">
                            {course.instructorName}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-[15px] font-extrabold text-[#1a1a2e] leading-snug mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[44px]">
                          {course.title}
                        </h3>

                        {/* Rating & Reviews */}
                        <div className="flex items-center gap-1.5 mb-4">
                          <div className="flex items-center text-amber-400">
                            <Star className="h-3.5 w-3.5 fill-current" />
                          </div>
                          <span className="text-xs font-bold text-[#1a1a2e]">{course.rating}</span>
                          <span className="text-[11px] text-slate-400 font-bold">
                            ({course.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div>
                        {/* Stats Row */}
                        <div className="flex items-center justify-between py-3 border-y border-slate-100 mb-5 text-[11px] text-slate-400 font-bold">
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-slate-300" />
                            <span>{course.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 text-slate-300" />
                            <span>{course.lectures}</span>
                          </div>
                        </div>

                        {/* Price & Action Row */}
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] font-bold text-slate-400 leading-none mb-0.5">Price</p>
                            <p className="text-lg font-black text-blue-600 leading-none">{course.price}</p>
                          </div>
                          <Link
                            href="/register"
                            className="py-2.5 px-5 bg-[#ffd260] hover:bg-[#fcc13d] text-[#1a1a2e] text-[11px] font-extrabold rounded-xl transition shadow-md shadow-yellow-500/5 cursor-pointer"
                          >
                            Enroll Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
                <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#1a1a2e] mb-1">No courses found</h3>
                <p className="text-slate-400 text-xs">
                  Try adjusting your search query or selecting another category tab.
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
                  Ready to start your learning journey?
                </h2>
                <p className="text-slate-300 text-[14px] leading-relaxed mb-8">
                  Sign up today and get immediate access to all free course materials, quizzes, and community forums.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/register"
                    className="px-6 py-3 bg-[#ffd260] hover:bg-[#fcc13d] text-slate-900 font-extrabold text-xs rounded-full transition shadow-md shadow-yellow-500/10 cursor-pointer"
                  >
                    Sign Up for Free
                  </Link>
                  <Link
                    href="/pricing"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full transition border border-white/20 cursor-pointer"
                  >
                    View Pricing Plans
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
