"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  CreditCard,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  GraduationCap,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

/* ── Static mock data ── */
const MONTHLY_ENROLLMENTS = [
  { month: "Apr", count: 12 },
  { month: "May", count: 19 },
  { month: "Jun", count: 27 },
  { month: "Jul", count: 34 },
  { month: "Aug", count: 28 },
  { month: "Sep", count: 41 },
];

const COURSE_STATS = [
  { name: "SSC Physics 2027", enrolled: 148, completion: 72, revenue: 74000 },
  { name: "SSC Math 2027", enrolled: 132, completion: 65, revenue: 66000 },
  { name: "SSC ICT 2027", enrolled: 98, completion: 80, revenue: 49000 },
  { name: "SSC Chemistry 2027", enrolled: 76, completion: 55, revenue: 38000 },
  { name: "SSC Biology 2027", enrolled: 61, completion: 60, revenue: 30500 },
];

const RECENT_TRANSACTIONS = [
  { name: "Rakibul Hasan", course: "SSC Physics 2027", amount: 500, method: "bKash", status: "confirmed", date: "Sep 22" },
  { name: "Nusrat Jahan", course: "SSC Math 2027", amount: 500, method: "Nagad", status: "pending", date: "Sep 22" },
  { name: "Farhan Ahmed", course: "SSC ICT 2027", amount: 500, method: "bKash", status: "confirmed", date: "Sep 21" },
  { name: "Tahmina Akter", course: "SSC Chemistry 2027", amount: 500, method: "bKash", status: "rejected", date: "Sep 21" },
  { name: "Sabbir Rahman", course: "SSC Biology 2027", amount: 500, method: "Nagad", status: "confirmed", date: "Sep 20" },
];

const RANGES = ["Last 7 days", "Last 30 days", "Last 3 months", "All time"];

const maxCount = Math.max(...MONTHLY_ENROLLMENTS.map((m) => m.count));

export default function AdminReportsPage() {
  const [range, setRange] = useState("Last 30 days");

  return (
    <div className="space-y-7">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <BarChart3 size={22} className="text-amber-500" />
            Reports & Analytics
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Platform-wide performance overview and financial summary
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Range picker */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-2 shadow-sm">
            <Calendar size={14} className="text-slate-400" />
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="text-sm font-medium text-slate-700 bg-transparent outline-none cursor-pointer"
            >
              {RANGES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 text-sm font-bold rounded-xl shadow-md shadow-amber-100 transition-all cursor-pointer">
            <Download size={15} />
            Export CSV
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Students"
          value="515"
          delta="+12%"
          up
          icon={<Users size={20} className="text-indigo-400" />}
          color="indigo"
        />
        <KpiCard
          label="Total Revenue"
          value="৳2,57,500"
          delta="+18%"
          up
          icon={<CreditCard size={20} className="text-emerald-400" />}
          color="emerald"
        />
        <KpiCard
          label="Active Courses"
          value="5"
          delta="Stable"
          up={null}
          icon={<BookOpen size={20} className="text-blue-400" />}
          color="blue"
        />
        <KpiCard
          label="Avg. Completion"
          value="66%"
          delta="-3%"
          up={false}
          icon={<GraduationCap size={20} className="text-amber-400" />}
          color="amber"
        />
      </div>

      {/* ── Bar Chart + Enrollment Breakdown ── */}
      <div className="grid lg:grid-cols-3 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-base font-bold text-slate-800">Monthly Enrollments</div>
              <div className="text-xs text-slate-400 mt-0.5">New student registrations per month</div>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <TrendingUp size={13} />
              +51% vs last period
            </div>
          </div>

          {/* Bars */}
          <div className="flex items-end justify-between gap-3 h-48">
            {MONTHLY_ENROLLMENTS.map((m) => {
              const pct = (m.count / maxCount) * 100;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1.5 group">
                  <div className="text-[11px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {m.count}
                  </div>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-amber-500 to-amber-300 relative overflow-hidden transition-all duration-300 hover:from-amber-400 hover:to-amber-200 shadow-sm shadow-amber-100"
                    style={{ height: `${pct}%`, minHeight: "6px" }}
                  >
                    <div className="absolute inset-0 bg-white/10" />
                  </div>
                  <div className="text-[11px] font-semibold text-slate-400">{m.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enrollment status donut-style */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="text-base font-bold text-slate-800 mb-1">Enrollment Status</div>
          <div className="text-xs text-slate-400 mb-5">Breakdown of all-time applications</div>

          <div className="space-y-3 flex-1">
            {[
              { label: "Confirmed", count: 423, pct: 82, icon: <CheckCircle2 size={15} className="text-emerald-500" />, bar: "bg-emerald-400" },
              { label: "Pending", count: 68, pct: 13, icon: <Clock size={15} className="text-amber-500" />, bar: "bg-amber-400" },
              { label: "Rejected", count: 24, pct: 5, icon: <XCircle size={15} className="text-rose-400" />, bar: "bg-rose-400" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                    {s.icon}
                    {s.label}
                  </div>
                  <div className="text-xs text-slate-400">{s.count} <span className="text-slate-300">·</span> {s.pct}%</div>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.bar} transition-all duration-500`}
                    style={{ width: `${s.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-500 font-medium">Total Applications</span>
            <span className="font-bold text-slate-800">515</span>
          </div>
        </div>
      </div>

      {/* ── Course Performance Table ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-base font-bold text-slate-800">Course Performance</div>
            <div className="text-xs text-slate-400 mt-0.5">Enrollment and revenue by course</div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="px-6 py-3 text-left">Course</th>
                <th className="px-4 py-3 text-center">Students</th>
                <th className="px-4 py-3 text-left">Completion</th>
                <th className="px-4 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {COURSE_STATS.map((c) => (
                <tr key={c.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800">{c.name}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-9 h-7 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg">
                      {c.enrolled}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                          style={{ width: `${c.completion}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-slate-500 w-8 text-right">{c.completion}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-slate-800">
                    ৳{c.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 border-t border-slate-200">
                <td className="px-6 py-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</td>
                <td className="px-4 py-3 text-center text-xs font-bold text-indigo-600">515</td>
                <td className="px-4 py-3" />
                <td className="px-4 py-3 text-right text-sm font-bold text-slate-800">৳2,57,500</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* ── Recent Transactions ── */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <div className="text-base font-bold text-slate-800">Recent Transactions</div>
          <div className="text-xs text-slate-400 mt-0.5">Latest payment submissions from students</div>
        </div>
        <div className="divide-y divide-slate-50">
          {RECENT_TRANSACTIONS.map((tx, i) => (
            <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-slate-50/70 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-bold text-sm text-slate-600 shrink-0">
                  {tx.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">{tx.name}</div>
                  <div className="text-xs text-slate-400">{tx.course} · {tx.method} · {tx.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-sm font-bold text-slate-700">৳{tx.amount}</div>
                <StatusBadge status={tx.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function KpiCard({
  label, value, delta, up, icon, color,
}: {
  label: string;
  value: string;
  delta: string;
  up: boolean | null;
  icon: React.ReactNode;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    indigo: "bg-indigo-50 border-indigo-100",
    emerald: "bg-emerald-50 border-emerald-100",
    blue: "bg-blue-50 border-blue-100",
    amber: "bg-amber-50 border-amber-100",
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2.5 rounded-xl border ${colorMap[color]}`}>
          {icon}
        </div>
        {up === true && (
          <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600">
            <ArrowUpRight size={13} />
            {delta}
          </div>
        )}
        {up === false && (
          <div className="flex items-center gap-0.5 text-xs font-bold text-rose-500">
            <ArrowDownRight size={13} />
            {delta}
          </div>
        )}
        {up === null && (
          <div className="text-xs font-semibold text-slate-400">{delta}</div>
        )}
      </div>
      <div className="text-2xl font-extrabold text-slate-800 tracking-tight">{value}</div>
      <div className="text-xs text-slate-400 font-medium mt-0.5">{label}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-emerald-50 text-emerald-600 border-emerald-200",
    pending: "bg-amber-50 text-amber-600 border-amber-200",
    rejected: "bg-rose-50 text-rose-500 border-rose-200",
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${map[status]}`}>
      {status}
    </span>
  );
}
