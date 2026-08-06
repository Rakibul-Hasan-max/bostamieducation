"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard,
  Tv,
  HelpCircle,
  TrendingUp,
  Users,
  ShoppingBag,
  Star,
  Edit3,
  CreditCard,
  Settings,
  Trash2,
  LogOut,
  GraduationCap,
  Gem,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const earningsData = [
  { month: "Jan", amount: 2909 },
  { month: "Feb", amount: 1259 },
  { month: "Mar", amount: 950 },
  { month: "Apr", amount: 1563 },
  { month: "Jun", amount: 1825 },
  { month: "Jul", amount: 2526 },
  { month: "Aug", amount: 2010 },
  { month: "Sep", amount: 3260 },
  { month: "Oct", amount: 3005 },
  { month: "Nov", amount: 3860 },
  { month: "Dec", amount: 4039 },
];

/* Custom dot – renders value badge above each chart node */
const CustomDot = (props: any) => {
  const { cx, cy, value } = props;
  if (!cx || !cy) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill="#0d8abc" stroke="#fff" strokeWidth={2} />
      <g transform={`translate(${cx - 16}, ${cy - 18})`}>
        <rect x={0} y={0} width={32} height={14} rx={3} fill="#0d8abc" />
        <text x={16} y={10} textAnchor="middle" fill="#fff" fontSize={9} fontWeight="bold">
          {value}
        </text>
      </g>
    </g>
  );
};

export default function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const sidebarNavItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "My Courses", icon: Tv },
    { label: "Quiz", icon: HelpCircle },
    { label: "Earnings", icon: TrendingUp },
    { label: "Students", icon: Users },
    { label: "Orders", icon: ShoppingBag },
    { label: "Reviews", icon: Star },
    { label: "Edit Profile", icon: Edit3 },
    { label: "Payouts", icon: CreditCard },
    { label: "Settings", icon: Settings },
    { label: "Delete Profile", icon: Trash2 },
  ];

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* ══════════════════════════════════════
            DARK BLUE HERO BANNER
        ══════════════════════════════════════ */}
        <div className="relative h-44 md:h-52 bg-[#132238] overflow-hidden">
          <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-blue-600/10 blur-2xl" />
          <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl" />
        </div>

        {/* ══════════════════════════════════════
            PROFILE HEADER CARD (FLOATING)
        ══════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 -mt-16 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              {/* Profile Avatar */}
              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-200 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
                  alt="Lori Stevens"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-[#1a1a2e]">Lori Stevens</h1>
                  <CheckCircle2 className="w-5 h-5 text-blue-500 fill-blue-500/20" />
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs font-semibold text-slate-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <strong className="text-slate-700">4.5/5.0</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-orange-500" />
                    <span>12k Enrolled Students</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Tv className="w-3.5 h-3.5 text-purple-500" />
                    <span>25 Courses</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="bg-[#00c9a7] hover:bg-[#00b395] text-white font-bold px-5 py-2.5 rounded-lg text-sm transition shadow-md shadow-teal-500/15 flex items-center gap-2 cursor-pointer">
              <Plus size={16} />
              Create a course
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
                        <Icon
                          size={17}
                          className={isActive ? "text-slate-900" : "text-slate-400"}
                        />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}

                  <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer mt-2">
                    <LogOut size={17} />
                    <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* ── RIGHT COLUMN: MAIN CONTENT ── */}
            <div className="lg:col-span-3 space-y-6">

              {/* TOP 3 SUMMARY CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Total Courses */}
                <div className="bg-[#fff3e6] border border-amber-100 rounded-2xl p-6 flex items-center gap-4 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                    <Tv size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">25</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Total Courses</p>
                  </div>
                </div>

                {/* Card 2: Total Students */}
                <div className="bg-[#f3edff] border border-purple-100 rounded-2xl p-6 flex items-center gap-4 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center text-purple-600 shrink-0">
                    <GraduationCap size={34} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">25K+</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Total Students</p>
                  </div>
                </div>

                {/* Card 3: Enrolled Students */}
                <div className="bg-[#e6f8f6] border border-teal-100 rounded-2xl p-6 flex items-center gap-4 shadow-xs">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-[#00c9a7] shrink-0">
                    <Gem size={32} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">12K</h3>
                    <p className="text-xs font-bold text-slate-500 mt-0.5">Enrolled Students</p>
                  </div>
                </div>
              </div>

              {/* EARNINGS CHART CARD */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-100 shadow-sm">
                {/* Header Badge Stats */}
                <div className="flex flex-wrap items-center gap-10 md:gap-16 mb-8">
                  {/* Current Month */}
                  <div>
                    <span className="inline-block bg-[#1e232a] text-white text-[11px] font-bold px-2.5 py-1 rounded-md mb-2">
                      Current Month
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-[#0d8abc]">$35000</h2>
                    <p className="text-xs font-bold text-emerald-500 flex items-center gap-1 mt-1">
                      0.20% <ArrowUpRight size={14} /> vs last month
                    </p>
                  </div>

                  {/* Last Month */}
                  <div>
                    <span className="inline-block bg-[#1e232a] text-slate-300 text-[11px] font-bold px-2.5 py-1 rounded-md mb-2">
                      Last Month
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-800">$28000</h2>
                    <p className="text-xs font-bold text-rose-500 flex items-center gap-1 mt-1">
                      0.10% <ArrowDownRight size={14} /> Then last month
                    </p>
                  </div>
                </div>

                {/* Area Chart */}
                <div className="h-[320px] w-full pt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={earningsData}
                      margin={{ top: 25, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="instructorEarningsGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0d8abc" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#0d8abc" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#94a3b8" }}
                        ticks={[0, 800, 1600, 2400, 3200, 4000]}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "10px",
                          border: "none",
                          boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}
                        labelStyle={{ fontWeight: "bold", color: "#1a1a2e" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="amount"
                        stroke="#0d8abc"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#instructorEarningsGrad)"
                        dot={<CustomDot />}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
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
