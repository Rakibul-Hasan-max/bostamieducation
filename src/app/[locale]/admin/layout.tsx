"use client";

import { useEffect } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { useAuth } from "@/context/AuthContext";
import { Link, useRouter } from "@/i18n/routing";
import { ShieldAlert, RefreshCw, Home, UserCheck, LogOut } from "lucide-react";
import Image from "next/image";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();

  // Redirect to the main unified login page if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login?redirect=/admin/dashboard");
    }
  }, [user, loading, router]);

  // 1. Loading State
  if (loading || !user) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 text-white font-sans">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-300 p-2 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-4 animate-pulse">
          <Image src="/icon.png" alt="Bostami Education" width={40} height={40} className="object-contain" />
        </div>
        <div className="flex items-center gap-2.5 text-amber-400 font-semibold text-sm">
          <RefreshCw className="w-4 h-4 animate-spin" />
          <span>Verifying Admin Authorization...</span>
        </div>
      </div>
    );
  }

  // 2. Logged in, but NOT an Admin (Access Denied / 403)
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#0d131f] flex items-center justify-center p-4 font-sans text-slate-200">
        <div className="w-full max-w-md bg-[#161f30] border border-rose-500/30 rounded-3xl p-8 shadow-2xl shadow-black/60 text-center relative overflow-hidden">
          {/* Top red alert stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-600 via-rose-400 to-rose-600"></div>

          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-6 shadow-inner">
            <ShieldAlert className="w-8 h-8 animate-pulse" />
          </div>

          <div className="text-[11px] font-bold text-rose-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
            Access Denied • 403 Forbidden
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">
            অ্যাডমিন অনুমতি নেই
          </h1>
          
          <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 mb-6 text-left space-y-1.5">
            <div className="text-slate-400">Signed in as:</div>
            <div className="font-bold text-white font-mono truncate">{user.email || user.displayName || "Unknown User"}</div>
            <div className="text-rose-400 text-[11px] pt-1">
              ⚠️ এই ইমেইলটিতে অ্যাডমিন অ্যাক্সেসের অনুমতি নেই। শুধুমাত্র অনুমোদিত অ্যাডমিন ইমেইল দিয়ে লগইন করলেই এই পেজে প্রবেশ করা যাবে।
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={async () => {
                await logout();
                router.push("/login?redirect=/admin/dashboard");
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/10 cursor-pointer"
            >
              <LogOut size={16} />
              <span>Login with Admin Account</span>
            </button>

            <Link
              href="/student/dashboard"
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <UserCheck size={14} />
              <span>Go to Student Dashboard</span>
            </Link>

            <Link
              href="/"
              className="w-full py-2.5 px-4 rounded-xl text-slate-400 hover:text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Home size={14} />
              <span>Return to Home Page</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authorized Admin Access Granted
  return (
    <div className="min-h-screen bg-[#f4f7fb] flex font-sans">
      {/* Sidebar - fixed width */}
      <AdminSidebar />
      
      {/* Main Content Wrapper */}
      <div className="flex-1 ml-[260px] flex flex-col min-h-screen overflow-hidden">
        <AdminHeader />
        
        {/* Page Content */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
