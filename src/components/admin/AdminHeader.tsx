"use client";

import { Search, Bell, ExternalLink, Globe, Sparkles } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/context/AuthContext";

export default function AdminHeader() {
  const { user } = useAuth();
  

  return (
    <header className="h-[70px] bg-white border-b border-slate-200/80 flex items-center justify-between px-6 z-30 sticky top-0 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      {/* Left Search & Greeting */}
      <div className="flex items-center gap-6">
        <div className="relative w-[280px] md:w-[320px]">
          <input 
            type="text" 
            placeholder="Search courses, students, TrxID..." 
            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl py-2 pl-9 pr-4 text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-slate-700 placeholder-slate-400 transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4" />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* Notification indicator */}
        <button 
          title="Notifications"
          className="relative w-9 h-9 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-center text-slate-600 hover:text-amber-600 hover:bg-amber-50/80 transition-all cursor-pointer"
        >
          <Bell size={17} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center shadow-xs overflow-hidden border border-amber-300">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" />
            ) : user?.displayName ? (
              user.displayName.slice(0, 2).toUpperCase()
            ) : (
              "AD"
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-800 leading-tight">
              {user?.displayName || "Admin Authority"}
            </div>
            <div className="text-[10px] font-medium text-amber-600">
              Super Admin
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
