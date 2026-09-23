"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "@/i18n/routing";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "text-amber-400",
    activeBg: "bg-amber-400/10 border-amber-400/20 text-amber-400",
  },
  {
    href: "/courses",
    label: "Courses",
    icon: BookOpen,
    color: "text-blue-400",
    activeBg: "bg-blue-400/10 border-blue-400/20 text-blue-400",
  },
  {
    href: "/mentors",
    label: "Mentors",
    icon: GraduationCap,
    color: "text-emerald-400",
    activeBg: "bg-emerald-400/10 border-emerald-400/20 text-emerald-400",
  },
  {
    href: "/admin/students",
    label: "Student Directory",
    icon: Users,
    color: "text-indigo-400",
    activeBg: "bg-indigo-400/10 border-indigo-400/20 text-indigo-400",
  },
  {
    href: "/admin/reports",
    label: "Reports",
    icon: BarChart3,
    color: "text-rose-400",
    activeBg: "bg-rose-400/10 border-rose-400/20 text-rose-400",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    color: "text-slate-400",
    activeBg: "bg-slate-600/30 border-slate-500/30 text-slate-200",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <aside className="w-[260px] bg-[#111827] h-screen flex flex-col text-slate-400 fixed left-0 top-0 z-40 font-sans border-r border-slate-800 select-none">
      {/* Brand Header — matches home page logo */}
      <div className="h-16 flex items-center px-5 border-b border-slate-800/80">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/icon.png"
            alt="Bostami Education"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <div>
            <div className="text-[15px] font-bold text-white tracking-tight leading-tight group-hover:opacity-90 transition-opacity">
              Bostami<span className="text-[#FF6B6B]">Education</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
        {NAV_ITEMS.map(({ href, label, icon: Icon, color, activeBg }) => {
          const active = isActive(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                active
                  ? `${activeBg} border shadow-sm`
                  : "border-transparent hover:bg-slate-800/60 hover:text-slate-200"
              }`}
            >
              <Icon
                size={18}
                className={active ? "" : color}
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

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
