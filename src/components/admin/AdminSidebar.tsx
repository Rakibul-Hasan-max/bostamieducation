"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import logo from "../../../public/icon.png";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCheck, 
  GraduationCap,
  CreditCard, 
  MessageSquareQuote, 
  BellRing,
  Settings, 
  ChevronDown,
  ExternalLink,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Layers
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  
  const [coursesOpen, setCoursesOpen] = useState(true);
  const [mentorsOpen, setMentorsOpen] = useState(false);
  const [enrollmentsOpen, setEnrollmentsOpen] = useState(true);

  const isActive = (path: string) => {
    return pathname === path || (path !== "/admin/dashboard" && pathname.startsWith(path));
  };

  return (
    <aside className="w-[260px] bg-[#111827] h-screen flex flex-col text-slate-400 fixed left-0 top-0 z-40 font-sans border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-800/80">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-1 shadow-md shadow-amber-500/10">
            <Image src={logo} alt="Bostami Education" width={28} height={28} className="object-contain" />
          </div>
          <div>
            <div className="text-[14px] font-bold text-white tracking-wide leading-tight group-hover:text-amber-400 transition-colors">
              Bostami<span className="text-amber-400">Edu</span>
            </div>
            <div className="text-[10px] font-medium text-slate-500 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Admin Panel
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
        {/* Main Section */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Overview
          </div>
          <Link 
            href="/admin/dashboard" 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              pathname.includes('/admin/dashboard') || pathname === '/admin'
                ? "bg-amber-400/10 text-amber-400 border border-amber-400/20 shadow-sm" 
                : "hover:bg-slate-800/60 hover:text-slate-200"
            }`}
          >
            <LayoutDashboard size={18} className={pathname.includes('/admin/dashboard') ? "text-amber-400" : "text-slate-400"} />
            <span>Dashboard</span>
          </Link>
        </div>

        {/* Academics Management */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Academic & Courses
          </div>
          <div className="space-y-1">
            {/* Courses Dropdown */}
            <div>
              <button 
                onClick={() => setCoursesOpen(!coursesOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 transition-colors rounded-xl group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <BookOpen size={18} className="text-blue-400 group-hover:text-blue-300" />
                  <span>Courses & Batches</span>
                </div>
                <ChevronDown size={14} className={`transition-transform text-slate-500 ${coursesOpen ? "rotate-180 text-blue-400" : ""}`} />
              </button>
              {coursesOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1 mt-0.5 text-[13px] font-medium border-l border-slate-800 ml-5">
                  <Link href="/courses" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    All Courses
                  </Link>
                  <Link href="/courses" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    SSC 2027 Batches
                  </Link>
                  <Link href="/courses" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    Subject Categories
                  </Link>
                </div>
              )}
            </div>

            {/* Mentors / Instructors */}
            <div>
              <button 
                onClick={() => setMentorsOpen(!mentorsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 transition-colors rounded-xl group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap size={18} className="text-emerald-400 group-hover:text-emerald-300" />
                  <span>Mentors / Teachers</span>
                </div>
                <ChevronDown size={14} className={`transition-transform text-slate-500 ${mentorsOpen ? "rotate-180 text-emerald-400" : ""}`} />
              </button>
              {mentorsOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1 mt-0.5 text-[13px] font-medium border-l border-slate-800 ml-5">
                  <Link href="/mentors" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    All Mentors
                  </Link>
                  <Link href="/mentors" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    Departments (Physics, Math, ICT)
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Student & Admissions */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Admissions & Students
          </div>
          <div className="space-y-1">
            {/* Student Enrollments */}
            <div>
              <button 
                onClick={() => setEnrollmentsOpen(!enrollmentsOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 transition-colors rounded-xl group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <UserCheck size={18} className="text-amber-400 group-hover:text-amber-300" />
                  <span>Enrollments</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-500/30">Live</span>
                  <ChevronDown size={14} className={`transition-transform text-slate-500 ${enrollmentsOpen ? "rotate-180 text-amber-400" : ""}`} />
                </div>
              </button>
              {enrollmentsOpen && (
                <div className="pl-9 pr-2 py-1 space-y-1 mt-0.5 text-[13px] font-medium border-l border-slate-800 ml-5">
                  <Link href="/admin/dashboard" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    Recent Applications
                  </Link>
                  <Link href="/admin/dashboard" className="block px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/40 transition-colors">
                    Pending Verification
                  </Link>
                </div>
              )}
            </div>

            {/* Students List */}
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 rounded-xl transition-colors"
            >
              <Users size={18} className="text-indigo-400" />
              <span>Student Directory</span>
            </Link>

            {/* Course Reviews */}
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 rounded-xl transition-colors"
            >
              <MessageSquareQuote size={18} className="text-pink-400" />
              <span>Reviews & Ratings</span>
            </Link>
          </div>
        </div>

        {/* Finance & Accounts */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Finance & Payments
          </div>
          <div className="space-y-1">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 rounded-xl transition-colors"
            >
              <CreditCard size={18} className="text-emerald-400" />
              <span>bKash & Nagad Records</span>
            </Link>
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 rounded-xl transition-colors"
            >
              <TrendingUp size={18} className="text-cyan-400" />
              <span>Revenue Reports</span>
            </Link>
          </div>
        </div>

        {/* System & Website */}
        <div>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Platform & Quick Links
          </div>
          <div className="space-y-1">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium hover:bg-slate-800/60 hover:text-slate-200 rounded-xl transition-colors"
            >
              <BellRing size={18} className="text-rose-400" />
              <span>Notice Board</span>
            </Link>
            <Link 
              href="/" 
              target="_blank" 
              className="flex items-center justify-between px-3 py-2 text-sm font-medium text-amber-400/90 hover:bg-amber-400/10 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <ExternalLink size={17} />
                <span>Live Website</span>
              </div>
              <span className="text-[10px] bg-amber-400/20 text-amber-300 font-semibold px-2 py-0.5 rounded">View</span>
            </Link>
          </div>
        </div>
      </div>

      {/* User / Logout Footer */}
      <div className="p-3 border-t border-slate-800 bg-slate-900/60">
        <div className="flex items-center justify-between px-2 py-1.5 rounded-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center font-bold text-xs text-slate-950 shadow">
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                {user?.displayName || "Admin User"}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {user?.email || "admin@bostamiedu.com"}
              </div>
            </div>
          </div>
          <button 
            onClick={() => logout()}
            title="Log Out"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
