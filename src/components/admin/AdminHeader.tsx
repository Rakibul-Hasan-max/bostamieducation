"use client";

import { Search, Bell } from "lucide-react";
import Image from "next/image";

export default function AdminHeader() {
  return (
    <header className="h-[72px] bg-white flex items-center justify-between px-6 border-b border-slate-100 z-30 sticky top-0">
      {/* Search Bar */}
      <div className="relative w-[300px]">
        <input 
          type="text" 
          placeholder="Search" 
          className="w-full bg-[#f4f7fb] border-none rounded-lg py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700 placeholder-slate-400"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 h-4 w-4" />
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-5">
        {/* Notification */}
        <button className="relative w-10 h-10 bg-[#f4f7fb] rounded-full flex items-center justify-center text-slate-500 hover:text-blue-500 hover:bg-blue-50 transition-colors">
          <Bell size={18} />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>

        {/* User Profile */}
        <button className="w-10 h-10 rounded-full overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors bg-slate-200">
          <Image 
            src="/user.jpg" 
            alt="User profile" 
            width={40} 
            height={40} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff";
            }}
          />
        </button>
      </div>
    </header>
  );
}
