"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Tv, 
  HelpCircle, 
  Edit3, 
  Settings, 
  Trash2, 
  LogOut,
  Search,
  ChevronDown,
  Award,
  ClipboardCheck,
  PlayCircle,
  RotateCcw,
  Check,
  CreditCard,
  Heart,
  FileText,
  Layers,
  User
} from "lucide-react";

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const sidebarNavItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Subscriptions", icon: Layers },
    { label: "My Courses", icon: Tv },
    { label: "Course Resume", icon: FileText },
    { label: "Quiz", icon: HelpCircle },
    { label: "Payment Info", icon: CreditCard },
    { label: "Wishlist", icon: Heart },
    { label: "Edit Profile", icon: Edit3 },
    { label: "Settings", icon: Settings },
    { label: "Delete Profile", icon: Trash2 },
  ];

  const coursesList = [
    {
      id: 1,
      title: "Building Scalable APIs with GraphQL",
      progress: 85,
      totalLectures: 56,
      completedLectures: 40,
      gradient: "from-amber-400 to-orange-500",
      iconType: "diamond",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Create a Design System In Figma",
      progress: 100,
      totalLectures: 42,
      completedLectures: 42,
      gradient: "from-pink-400 to-rose-500",
      iconType: "figma",
      status: "completed"
    },
    {
      id: 3,
      title: "The Complete Web Development in Python",
      progress: 60,
      totalLectures: 28,
      completedLectures: 12,
      gradient: "from-blue-500 to-amber-400",
      iconType: "python",
      status: "in-progress"
    }
  ];

  const filteredCourses = coursesList.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* ══════════════════════════════════════
            DARK BLUE HERO BANNER
        ══════════════════════════════════════ */}
        <div className="relative h-44 md:h-52 bg-[#132238] overflow-hidden">
          {/* Abstract background circles */}
          <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-2xl" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        {/* ══════════════════════════════════════
            PROFILE HEADER CARD (FLOATING)
        ══════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 -mt-16 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              {/* Profile Avatar with Pro Badge */}
              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-200 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                  alt="Lori Stevens"
                  fill
                  className="object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-emerald-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                  Pro
                </span>
              </div>

              <div>
                <h1 className="text-2xl font-bold text-[#1a1a2e] mb-1">Lori Stevens</h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-500">
                  <span><strong className="text-slate-800 font-bold">255</strong> points</span>
                  <span><strong className="text-slate-800 font-bold">7</strong> Completed courses</span>
                  <span><strong className="text-slate-800 font-bold">52</strong> Completed lessons</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="border border-blue-500 text-blue-500 hover:bg-blue-50 font-bold px-5 py-2.5 rounded-lg text-xs transition shadow-2xs cursor-pointer">
              View my courses
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════
            DASHBOARD CONTENT GRID
        ══════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* ── LEFT COLUMN: SIDEBAR ── */}
            <aside className="lg:col-span-1">
              <div className="bg-[#1e232a] rounded-2xl p-4 text-slate-300 shadow-md">
                <nav className="space-y-1">
                  {sidebarNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.label;

                    return (
                      <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                        }`}
                      >
                        <Icon size={17} className={isActive ? "text-slate-900" : "text-slate-400"} />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer mt-1">
                    <LogOut size={17} />
                    <span>Sign Out</span>
                  </button>

                  {/* Dropdown level */}
                  <button className="w-full flex items-center justify-between px-4 py-3 text-xs font-bold text-slate-400 hover:text-white cursor-pointer mt-1">
                    <div className="flex items-center gap-3">
                      <User size={17} />
                      <span>Dropdown level</span>
                    </div>
                    <ChevronDown size={14} />
                  </button>
                </nav>
              </div>
            </aside>

            {/* ── RIGHT COLUMN: MAIN CONTENT ── */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* TOP 3 SUMMARY CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1: Total Courses */}
                <div className="bg-[#fff3e6] border border-amber-100 rounded-2xl p-6 flex items-center gap-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Tv size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">9</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Total Courses</p>
                  </div>
                </div>

                {/* Card 2: Complete lessons */}
                <div className="bg-[#f0e6ff] border border-purple-100 rounded-2xl p-6 flex items-center gap-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-600 shrink-0">
                    <ClipboardCheck size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">52</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Complete lessons</p>
                  </div>
                </div>

                {/* Card 3: Achieved Certificates */}
                <div className="bg-[#e6f8f6] border border-teal-100 rounded-2xl p-6 flex items-center gap-4 shadow-2xs">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-[#00c9a7] shrink-0">
                    <Award size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">8</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Achieved Certificates</p>
                  </div>
                </div>

              </div>

              {/* MY COURSES LIST PANEL */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                
                <h2 className="text-2xl font-bold text-[#1a1a2e] mb-6">My Courses List</h2>

                {/* Search & Sort Filter Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  {/* Search Box */}
                  <div className="relative w-full sm:w-80">
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 pr-10"
                    />
                    <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  </div>

                  {/* Sort By Dropdown */}
                  <div className="relative w-full sm:w-40">
                    <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-600 focus:outline-none appearance-none cursor-pointer">
                      <option>Sort by</option>
                      <option>Most Recent</option>
                      <option>Highest Progress</option>
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>

                {/* Courses Table Header */}
                <div className="hidden md:grid grid-cols-12 gap-4 bg-[#1e232a] text-white rounded-xl px-6 py-3.5 text-xs font-bold mb-4">
                  <div className="col-span-6">Course Title</div>
                  <div className="col-span-2 text-center">Total Lectures</div>
                  <div className="col-span-2 text-center">Completed Lecture</div>
                  <div className="col-span-2 text-right">Action</div>
                </div>

                {/* Courses List Rows */}
                <div className="space-y-4">
                  {filteredCourses.map((course) => (
                    <div 
                      key={course.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-4 md:px-6 md:py-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-100 rounded-2xl transition"
                    >
                      {/* Course Title + Progress Bar (Spans 6 cols) */}
                      <div className="md:col-span-6 flex items-center gap-4">
                        {/* Course Thumbnail Icon */}
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white shrink-0 shadow-xs`}>
                          {course.iconType === "diamond" && (
                            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                              <path d="M12 2L2 9l10 13L22 9l-10-7z"/>
                            </svg>
                          )}
                          {course.iconType === "figma" && (
                            <svg className="w-6 h-6 fill-white" viewBox="0 0 38 57">
                              <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z"/>
                              <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
                              <path d="M0 28.5A9.5 9.5 0 0 1 9.5 19H19v19H9.5A9.5 9.5 0 0 1 0 28.5z"/>
                              <path d="M0 9.5A9.5 9.5 0 0 1 9.5 0H19v19H9.5A9.5 9.5 0 0 1 0 9.5z"/>
                              <path d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z"/>
                            </svg>
                          )}
                          {course.iconType === "python" && (
                            <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24">
                              <path d="M12 2c-5.5 0-5 2.4-5 2.4v2.5h5v.7H5.2S2 7.2 2 12.8c0 5.6 2.8 5.4 2.8 5.4h1.7v-2.4s-.1-2.9 2.8-2.9h4.8s2.7 0 2.7-2.6V5.4S17.5 2 12 2zm-2.4 1.7c.5 0 .9.4.9.9 0 .5-.4.9-.9.9-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9zm2.4 18.3c5.5 0 5-2.4 5-2.4v-2.5h-5v-.7h6.8s3.2.4 3.2-5.2c0-5.6-2.8-5.4-2.8-5.4h-1.7v2.4s.1 2.9-2.8 2.9H9.8s-2.7 0-2.7 2.6v4.9s-.8 3.4 4.9 3.4zm2.4-1.7c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9.5 0 .9.4.9.9 0 .5-.4.9-.9.9z"/>
                            </svg>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-bold text-[#1a1a2e] mb-2 truncate">
                            {course.title}
                          </h4>

                          {/* Progress Bar */}
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-slate-200 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${course.progress}%` }}
                              />
                            </div>
                            <span className="text-xs font-extrabold text-slate-700 shrink-0">
                              {course.progress}%
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Total Lectures */}
                      <div className="md:col-span-2 text-left md:text-center text-xs font-medium text-slate-600">
                        <span className="md:hidden font-bold mr-2">Total Lectures:</span>
                        {course.totalLectures}
                      </div>

                      {/* Completed Lectures */}
                      <div className="md:col-span-2 text-left md:text-center text-xs font-medium text-slate-600">
                        <span className="md:hidden font-bold mr-2">Completed Lectures:</span>
                        {course.completedLectures}
                      </div>

                      {/* Actions */}
                      <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-2">
                        {course.status === "completed" ? (
                          <>
                            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer">
                              <Check size={14} />
                              Complete
                            </button>
                            <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer">
                              <RotateCcw size={14} />
                              Restart
                            </button>
                          </>
                        ) : (
                          <button className="bg-blue-50 border border-blue-100 hover:bg-blue-100 text-blue-600 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition cursor-pointer">
                            <PlayCircle size={14} />
                            Continue
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
