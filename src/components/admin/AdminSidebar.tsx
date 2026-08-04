"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import logo from "../../../public/icon.png"
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  UserCircle, 
  MessageSquare, 
  DollarSign, 
  Settings, 
  Lock,
  ChevronDown,
  Globe,
  Power
} from "lucide-react";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [instructorsOpen, setInstructorsOpen] = useState(true);
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <aside className="w-[260px] bg-[#1d232c] h-screen flex flex-col text-[#9da5b3] fixed left-0 top-0 z-40 font-sans">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 mb-4">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image src={logo} alt="Logo" width={100} className="mx-auto"/>
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
        <Link 
          href="/admin/dashboard" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg mb-6 transition-colors ${
            pathname.includes('/dashboard') ? "text-blue-500 bg-blue-500/10 font-bold" : "text-blue-500 hover:text-white"
          }`}
        >
          <LayoutDashboard size={18} className="text-blue-500" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>

        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 px-3">
          Pages
        </div>

        <nav className="space-y-1">
          {/* Courses */}
          <div>
            <button 
              onClick={() => setCoursesOpen(!coursesOpen)}
              className="w-full flex items-center justify-between px-3 py-2 hover:text-white transition-colors rounded-lg group"
            >
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-blue-500" />
                <span className="text-sm font-medium">Courses</span>
              </div>
              <ChevronDown size={14} className={`transition-transform ${coursesOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${coursesOpen ? "max-h-40" : "max-h-0"}`}>
              <div className="pl-10 pr-3 py-1 space-y-3 mt-1 text-sm font-medium">
                <Link href="/courses" className="block hover:text-white text-white">All Courses</Link>
                <Link href="#" className="block hover:text-white">Course Category</Link>
                <Link href="#" className="block hover:text-white">Course Detail</Link>
              </div>
            </div>
          </div>

          {/* Students */}
          <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:text-white rounded-lg transition-colors">
            <Users size={18} />
            <span className="text-sm font-medium">Students</span>
          </Link>

          {/* Instructors */}
          <div>
            <button 
              onClick={() => setInstructorsOpen(!instructorsOpen)}
              className="w-full flex items-center justify-between px-3 py-2 hover:text-white transition-colors rounded-lg group"
            >
              <div className="flex items-center gap-3">
                <UserCircle size={18} className="text-blue-500" />
                <span className="text-sm font-medium">Instructors</span>
              </div>
              <ChevronDown size={14} className={`transition-transform ${instructorsOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${instructorsOpen ? "max-h-40" : "max-h-0"}`}>
              <div className="pl-10 pr-3 py-1 space-y-3 mt-1 text-sm font-medium">
                <Link href="/mentors" className="block hover:text-white">Instructors</Link>
                <Link href="#" className="block hover:text-white">Instructor Detail</Link>
                <Link href="#" className="flex items-center justify-between hover:text-white">
                  <span>Instructor requests</span>
                  <span className="bg-teal-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">2</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:text-white rounded-lg transition-colors">
            <MessageSquare size={18} />
            <span className="text-sm font-medium">Reviews</span>
          </Link>

          {/* Earnings */}
          <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:text-white rounded-lg transition-colors">
            <DollarSign size={18} />
            <span className="text-sm font-medium">Earnings</span>
          </Link>

          {/* Admin Settings */}
          <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:text-white rounded-lg transition-colors">
            <Settings size={18} />
            <span className="text-sm font-medium">Admin Settings</span>
          </Link>

          {/* Authentication */}
          <div>
            <button 
              onClick={() => setAuthOpen(!authOpen)}
              className="w-full flex items-center justify-between px-3 py-2 hover:text-white transition-colors rounded-lg group"
            >
              <div className="flex items-center gap-3">
                <Lock size={18} className="text-blue-500" />
                <span className="text-sm font-medium">Authentication</span>
              </div>
              <ChevronDown size={14} className={`transition-transform ${authOpen ? "rotate-180 text-blue-500" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${authOpen ? "max-h-40" : "max-h-0"}`}>
              <div className="pl-10 pr-3 py-1 space-y-3 mt-1 text-sm font-medium">
                <Link href="/register" className="block hover:text-white">Sign Up</Link>
                <Link href="/login" className="block hover:text-white">Sign In</Link>
                <Link href="/forgot-password" className="block hover:text-white">Forgot Password</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Footer */}
      <div className="h-16 flex items-center justify-between px-6 border-t border-slate-700/50 text-slate-500 mt-2">
        <button className="hover:text-white transition-colors">
          <Settings size={18} />
        </button>
        <button className="hover:text-white transition-colors">
          <Globe size={18} />
        </button>
        <button className="hover:text-white transition-colors">
          <Power size={18} />
        </button>
      </div>
    </aside>
  );
}
