"use client";

import { Monitor, User, GraduationCap, Clock } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// Mock data for the earnings chart
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

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <h1 className="text-2xl font-bold text-[#1a1a2e] mb-2">Dashboard</h1>

      {/* Summary Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-[#fff9e5] rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-3xl font-bold text-[#1a1a2e] mb-1">1958</h3>
            <p className="text-sm font-medium text-slate-600">Completed Courses</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#fbbc05] flex items-center justify-center text-white shrink-0">
            <Monitor size={22} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-[#f3f0fa] rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-3xl font-bold text-[#1a1a2e] mb-1">1600</h3>
            <p className="text-sm font-medium text-slate-600">Enrolled Courses</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#8c54ff] flex items-center justify-center text-white shrink-0">
            <User size={22} />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-[#eef5fa] rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-3xl font-bold text-[#1a1a2e] mb-1">1235</h3>
            <p className="text-sm font-medium text-slate-600">Course In Progress</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#0d8abc] flex items-center justify-center text-white shrink-0">
            <GraduationCap size={22} />
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-[#e5f5f0] rounded-xl p-6 flex items-center justify-between shadow-sm">
          <div>
            <h3 className="text-3xl font-bold text-[#1a1a2e] mb-1">845hrs</h3>
            <p className="text-sm font-medium text-slate-600">Total Watch Time</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#28a745] flex items-center justify-center text-white shrink-0">
            <Clock size={22} />
          </div>
        </div>
      </div>

      {/* Main Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Earnings Chart (Left - takes 2 cols) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Earnings</h2>
          </div>
          <div className="p-6 h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={earningsData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d8abc" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0d8abc" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#94a3b8' }}
                  ticks={[0, 800, 1600, 2400, 3200, 4000, 4800]}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#1a1a2e' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#0d8abc" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorAmount)"
                  activeDot={{ r: 6, fill: '#0d8abc', stroke: '#fff', strokeWidth: 2 }}
                  dot={{ r: 4, fill: '#0d8abc', stroke: '#fff', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Support Requests (Right - takes 1 col) */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Support Requests</h2>
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-600">View all</button>
          </div>
          
          <div className="flex-1 p-0 overflow-y-auto">
            {/* Request 1 */}
            <div className="px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <img src="https://ui-avatars.com/api/?name=Lori+Stevens&background=fbbc05&color=fff" alt="Lori Stevens" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1a1a2e]">Lori Stevens</h4>
                <p className="text-[13px] text-slate-500 line-clamp-1 mt-0.5">New ticket #759 from Lori Stevens for General Enquiry</p>
                <span className="text-[11px] text-slate-400 mt-1.5 block">8 hour ago</span>
              </div>
            </div>

            {/* Request 2 */}
            <div className="px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
              <div className="w-10 h-10 rounded-full shrink-0 bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                DB
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1a1a2e]">Dennis Barrett</h4>
                <p className="text-[13px] text-slate-500 line-clamp-1 mt-0.5">Comment from Billy Vasquez on ticket #659</p>
                <span className="text-[11px] text-slate-400 mt-1.5 block">8 hour ago</span>
              </div>
            </div>

            {/* Request 3 */}
            <div className="px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
              <div className="w-10 h-10 rounded-full shrink-0 bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm">
                WB
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1a1a2e]">Dennis Barrett</h4>
                <p className="text-[13px] text-slate-500 line-clamp-1 mt-0.5">StackBros assign you a new ticket for Bostami theme</p>
                <span className="text-[11px] text-slate-400 mt-1.5 block">5 hour ago</span>
              </div>
            </div>

            {/* Request 4 */}
            <div className="px-6 py-4 flex gap-4 hover:bg-slate-50 transition-colors cursor-pointer border-b border-slate-50 last:border-0">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200">
                <img src="https://ui-avatars.com/api/?name=Dennis+Barrett&background=1a1a2e&color=fff" alt="Dennis Barrett" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-[14px] font-bold text-[#1a1a2e]">Dennis Barrett</h4>
                <p className="text-[13px] text-slate-500 line-clamp-1 mt-0.5">Thanks for contact us with your issues.</p>
                <span className="text-[11px] text-slate-400 mt-1.5 block">9 hour ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Top Instructors */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[300px]">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Top Instructors</h2>
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-600">View all</button>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200">
                  <img src="https://ui-avatars.com/api/?name=Lori+Stevens&background=fbbc05&color=fff" alt="Lori Stevens" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a1a2e] flex items-center gap-1">
                    Lori Stevens
                    <span className="bg-blue-500 text-white w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold">✓</span>
                  </h4>
                  <p className="text-[12px] text-slate-500">25 Courses • ⭐ 4.5/5.0</p>
                </div>
              </div>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">View</button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full shrink-0 bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                  BV
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a1a2e]">Billy Vasquez</h4>
                  <p className="text-[12px] text-slate-500">18 Courses • ⭐ 4.8/5.0</p>
                </div>
              </div>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">View</button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-200">
                  <img src="https://ui-avatars.com/api/?name=Larry+Lawson&background=1a1a2e&color=fff" alt="Larry Lawson" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-[#1a1a2e]">Larry Lawson</h4>
                  <p className="text-[12px] text-slate-500">12 Courses • ⭐ 4.2/5.0</p>
                </div>
              </div>
              <button className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">View</button>
            </div>
          </div>
        </div>

        {/* Notice board */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[300px]">
          <div className="px-6 py-5 border-b border-slate-100">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Notice board</h2>
          </div>
          <div className="p-6 relative">
             <div className="absolute left-8 top-6 bottom-6 w-px bg-slate-200 z-0"></div>
             
             <div className="relative z-10 flex gap-4 mb-6">
               <div className="w-5 h-5 rounded-full bg-purple-500 border-4 border-white shrink-0 mt-0.5"></div>
               <div>
                 <h4 className="text-[14px] font-bold text-[#1a1a2e]">Join New Instructor</h4>
                 <p className="text-[13px] text-slate-500 mt-1">Amongst moments do in arrived Fat weddings believed...</p>
                 <span className="text-[11px] text-slate-400 mt-2 block">Just now</span>
               </div>
             </div>

             <div className="relative z-10 flex gap-4">
               <div className="w-5 h-5 rounded-full bg-orange-500 border-4 border-white shrink-0 mt-0.5"></div>
               <div>
                 <h4 className="text-[14px] font-bold text-[#1a1a2e]">Update New Course</h4>
                 <p className="text-[13px] text-slate-500 mt-1">Arrived Fat weddings believed amongst moments do in...</p>
                 <span className="text-[11px] text-slate-400 mt-2 block">5 mins ago</span>
               </div>
             </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col min-h-[300px]">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1a1a2e]">Traffic Sources</h2>
            <button className="text-sm font-semibold text-blue-500 hover:text-blue-600">View all</button>
          </div>
          <div className="p-6 flex items-center justify-center">
            <div className="relative w-48 h-48 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0" style={{ background: 'conic-gradient(#fbbc05 0% 35%, #0d8abc 35% 85%, #8c54ff 85% 100%)' }}></div>
               <div className="relative w-32 h-32 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                 <span className="text-2xl font-bold text-[#1a1a2e]">100%</span>
                 <span className="text-xs text-slate-500">Total Visits</span>
               </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
