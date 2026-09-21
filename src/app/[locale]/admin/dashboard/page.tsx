"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  TrendingUp, 
  DollarSign, 
  Search, 
  Filter, 
  Eye, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Star,
  Bell,
  ArrowUpRight,
  Layers,
  Phone,
  Mail,
  School
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import { collection, getDocs, updateDoc, doc, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COURSES_DATA } from "@/constants/coursesData";
import { Link } from "@/i18n/routing";

// Monthly revenue & admissions trend data for Bostami Education
const analyticsData = [
  { month: "Jan", revenue: 65000, students: 42 },
  { month: "Feb", revenue: 85000, students: 58 },
  { month: "Mar", revenue: 120000, students: 80 },
  { month: "Apr", revenue: 95000, students: 64 },
  { month: "May", revenue: 140000, students: 95 },
  { month: "Jun", revenue: 185000, students: 125 },
  { month: "Jul", revenue: 210000, students: 140 },
  { month: "Aug", revenue: 260000, students: 175 },
  { month: "Sep", revenue: 310000, students: 210 },
  { month: "Oct", revenue: 290000, students: 195 },
  { month: "Nov", revenue: 380000, students: 255 },
  { month: "Dec", revenue: 420000, students: 280 },
];

interface EnrollmentItem {
  id: string;
  enrollmentId?: string;
  studentName: string;
  schoolName?: string;
  guardianPhone?: string;
  email?: string;
  courseTitle: string;
  amount: string;
  paymentMethod: "bkash" | "nagad" | "rocket" | "bank" | string;
  senderPhone?: string;
  transactionId: string;
  status: "pending" | "approved" | "rejected";
  dateFormatted?: string;
}

const initialMockEnrollments: EnrollmentItem[] = [
  {
    id: "mock-1",
    enrollmentId: "BST-849201",
    studentName: "Shakil Hossain",
    schoolName: "Dhaka Residential Model College",
    guardianPhone: "01712345678",
    email: "shakil.ssc27@gmail.com",
    courseTitle: "Revision Course for SSC 2027 Batch",
    amount: "৳1,500",
    paymentMethod: "bkash",
    senderPhone: "01712345678",
    transactionId: "9KJ3N8L2PX",
    status: "pending",
    dateFormatted: "10 mins ago"
  },
  {
    id: "mock-2",
    enrollmentId: "BST-756192",
    studentName: "Tanvir Ahmed",
    schoolName: "Ideal School and College, Motijheel",
    guardianPhone: "01823456789",
    email: "tanvir.ahmed@yahoo.com",
    courseTitle: "Revision Course for SSC 2027 Batch",
    amount: "৳1,500",
    paymentMethod: "nagad",
    senderPhone: "01823456789",
    transactionId: "7MN4B1P9QR",
    status: "pending",
    dateFormatted: "35 mins ago"
  },
  {
    id: "mock-3",
    enrollmentId: "BST-634812",
    studentName: "Nusrat Jahan",
    schoolName: "Viqarunnisa Noon School & College",
    guardianPhone: "01934567890",
    email: "nusrat.jahan@gmail.com",
    courseTitle: "Higher Math & Physics Special Batch",
    amount: "৳2,000",
    paymentMethod: "bkash",
    senderPhone: "01934567890",
    transactionId: "BK8294N10Z",
    status: "approved",
    dateFormatted: "2 hours ago"
  },
  {
    id: "mock-4",
    enrollmentId: "BST-519823",
    studentName: "Fahim Shahriar",
    schoolName: "Rajuk Uttara Model College",
    guardianPhone: "01645678901",
    email: "fahim.shahriar@gmail.com",
    courseTitle: "SSC 2027 Physics Conceptual Marathon",
    amount: "৳1,500",
    paymentMethod: "rocket",
    senderPhone: "01645678901",
    transactionId: "ROC91827364",
    status: "approved",
    dateFormatted: "5 hours ago"
  },
  {
    id: "mock-5",
    enrollmentId: "BST-428174",
    studentName: "Sadia Sultana",
    schoolName: "Chittagong Collegiate School",
    guardianPhone: "01556789012",
    email: "sadia.ctg@gmail.com",
    courseTitle: "Revision Course for SSC 2027 Batch",
    amount: "৳1,500",
    paymentMethod: "bkash",
    senderPhone: "01556789012",
    transactionId: "8XA92M10PQ",
    status: "approved",
    dateFormatted: "1 day ago"
  }
];

export default function AdminDashboardPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>(initialMockEnrollments);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [chartView, setChartView] = useState<"revenue" | "students">("revenue");
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentItem | null>(null);

  // Fetch real enrollments from Firestore
  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "enrollments"), orderBy("createdAt", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const firestoreList: EnrollmentItem[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          firestoreList.push({
            id: docSnap.id,
            enrollmentId: data.enrollmentId || "BST-" + docSnap.id.substring(0, 6).toUpperCase(),
            studentName: data.studentName || "Anonymous Student",
            schoolName: data.schoolName || "N/A",
            guardianPhone: data.guardianPhone || data.senderPhone || "N/A",
            email: data.email || "N/A",
            courseTitle: data.courseTitle || "SSC Course",
            amount: data.amount || "৳1,500",
            paymentMethod: data.paymentMethod || "bkash",
            senderPhone: data.senderPhone || "N/A",
            transactionId: data.transactionId || "N/A",
            status: data.status || "pending",
            dateFormatted: data.createdAt?.toDate ? data.createdAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent"
          });
        });

        // Combine firestore records with mocks to have a complete dashboard experience
        setEnrollments(firestoreList);
      }
    } catch (err) {
      console.log("Using fallback mock data for dashboard view:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    // Update local state immediately
    setEnrollments(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
    if (selectedEnrollment && selectedEnrollment.id === id) {
      setSelectedEnrollment(prev => prev ? { ...prev, status: newStatus } : null);
    }

    // Try to update Firestore if it's a real doc
    try {
      if (!id.startsWith("mock-")) {
        const docRef = doc(db, "enrollments", id);
        await updateDoc(docRef, {
          status: newStatus,
          verifiedAt: new Date()
        });
      }
    } catch (err) {
      console.error("Error updating enrollment status in Firestore:", err);
    }
  };

  const pendingCount = enrollments.filter(e => e.status === "pending").length;
  const approvedCount = enrollments.filter(e => e.status === "approved").length;

  const filteredEnrollments = enrollments.filter(item => {
    const matchesTab = activeTab === "all" || item.status === activeTab;
    const matchesSearch = 
      item.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.schoolName && item.schoolName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.enrollmentId && item.enrollmentId.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* 4 Premium Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Enrollments */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Enrolled</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">1,480+</div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-600 font-semibold">
              <TrendingUp size={14} />
              <span>+18.4% this month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Courses & Batches */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Batches</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookOpen size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">SSC 2027 Batch</div>
            <div className="text-xs text-slate-500 font-medium mt-1.5">
              {COURSES_DATA.length} Featured Academic Courses
            </div>
          </div>
        </div>

        {/* Card 3: Total Revenue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-105 transition-transform">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">৳23,45,000</div>
            <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500">
              <span className="text-pink-600 font-semibold">bKash (68%)</span>
              <span>•</span>
              <span className="text-orange-600 font-semibold">Nagad (32%)</span>
            </div>
          </div>
        </div>

        {/* Card 4: Pending Verifications */}
        <div className={`rounded-2xl p-5 border shadow-xs transition-all group ${
          pendingCount > 0 
            ? "bg-amber-50/60 border-amber-200/80" 
            : "bg-white border-slate-200/80"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Pending Approvals</span>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform ${
              pendingCount > 0 ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-100 text-slate-500"
            }`}>
              <Clock size={20} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl font-black text-slate-900">{pendingCount} Applicants</div>
            <div className="text-xs text-amber-700 font-semibold mt-1.5 flex items-center gap-1">
              <ShieldCheck size={14} />
              <span>Requires payment check</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analytics Row: Revenue Chart & Department Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings & Admissions Trend (2 cols) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 lg:col-span-2 flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Revenue & Enrollment Analytics</h2>
              <p className="text-xs text-slate-500 mt-0.5">Monthly financial performance & student growth overview</p>
            </div>
            
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setChartView("revenue")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartView === "revenue"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Revenue (৳ BDT)
              </button>
              <button
                onClick={() => setChartView("students")}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  chartView === "students"
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Admissions (Count)
              </button>
            </div>
          </div>

          <div className="p-6 h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {chartView === "revenue" ? (
                <AreaChart
                  data={analyticsData}
                  margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(val) => `৳${val/1000}k`}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`৳${Number(value).toLocaleString()}`, "Revenue"]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#d97706" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                    activeDot={{ r: 6, fill: '#b45309', stroke: '#fff', strokeWidth: 2 }}
                    dot={{ r: 3, fill: '#d97706', stroke: '#fff', strokeWidth: 1.5 }}
                  />
                </AreaChart>
              ) : (
                <AreaChart
                  data={analyticsData}
                  margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                  />
                  <Tooltip 
                    formatter={(value: any) => [`${value} Students`, "New Admissions"]}
                    contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.08)' }}
                    labelStyle={{ fontWeight: 'bold', color: '#0f172a' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="students" 
                    stroke="#2563eb" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorStudents)"
                    activeDot={{ r: 6, fill: '#1d4ed8', stroke: '#fff', strokeWidth: 2 }}
                    dot={{ r: 3, fill: '#2563eb', stroke: '#fff', strokeWidth: 1.5 }}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Academic Departments & Payment Share (Right - 1 col) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Subject Distribution</h3>
              <span className="text-xs font-semibold text-slate-400">SSC 2027</span>
            </div>

            <div className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Physics (Bayzid Bostami)</span>
                  <span className="text-amber-600 font-bold">42%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Higher Math (Foysal Ahamed)</span>
                  <span className="text-blue-600 font-bold">28%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: "28%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Technical & ICT (Rakibul Hasan)</span>
                  <span className="text-emerald-600 font-bold">18%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "18%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-700">Biology (Asrafi Islam Orpita)</span>
                  <span className="text-purple-600 font-bold">12%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: "12%" }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
              Payment Gateway Share
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-pink-50/70 border border-pink-100">
                <div className="text-[11px] font-semibold text-pink-700">bKash (Send Money)</div>
                <div className="text-base font-black text-pink-900 mt-0.5">68%</div>
              </div>
              <div className="p-2.5 rounded-xl bg-orange-50/70 border border-orange-100">
                <div className="text-[11px] font-semibold text-orange-700">Nagad</div>
                <div className="text-base font-black text-orange-900 mt-0.5">32%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Student Enrollments Table & Verification Panel */}
      <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-900">Student Enrollments & Verifications</h2>
              <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
                {enrollments.length} Records
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review submitted bKash / Nagad Transaction IDs and verify course admissions
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-56">
              <input 
                type="text" 
                placeholder="Search student, TrxID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-700"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "all" ? "bg-white text-slate-900 shadow-xs font-bold" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All ({enrollments.length})
              </button>
              <button
                onClick={() => setActiveTab("pending")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "pending" ? "bg-amber-400 text-slate-950 font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setActiveTab("approved")}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  activeTab === "approved" ? "bg-emerald-600 text-white font-bold shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Approved ({approvedCount})
              </button>
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Student & School</th>
                <th className="py-3.5 px-4">Enrolled Course</th>
                <th className="py-3.5 px-4">Payment & TrxID</th>
                <th className="py-3.5 px-4">Fee Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Verification Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filteredEnrollments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 text-sm">
                    No enrollment applications match your filter.
                  </td>
                </tr>
              ) : (
                filteredEnrollments.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Student Name & School */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-xs">
                          {item.studentName.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-[13px] flex items-center gap-1.5">
                            {item.studentName}
                            {item.enrollmentId && (
                              <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {item.enrollmentId}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5 truncate max-w-[200px]">
                            <School size={12} className="shrink-0 text-slate-400" />
                            <span className="truncate">{item.schoolName || "Not Provided"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Course Title */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 line-clamp-1 max-w-[220px]">
                        {item.courseTitle}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Batch 2027 • Regular Batch
                      </div>
                    </td>

                    {/* Payment Method & TrxID */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${
                          item.paymentMethod === "bkash" 
                            ? "bg-pink-100 text-pink-700" 
                            : item.paymentMethod === "nagad"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {item.paymentMethod}
                        </span>
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                          {item.transactionId}
                        </span>
                      </div>
                      {item.senderPhone && (
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <Phone size={11} /> {item.senderPhone}
                        </div>
                      )}
                    </td>

                    {/* Fee Amount */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm">
                        {item.amount}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {item.dateFormatted || "Today"}
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4">
                      {item.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={13} />
                          Approved
                        </span>
                      ) : item.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                          <Clock size={13} />
                          Pending Review
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                          <XCircle size={13} />
                          Rejected
                        </span>
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "approved")}
                              title="Approve Enrollment"
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-all cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "rejected")}
                              title="Reject"
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-all cursor-pointer"
                            >
                              <XCircle size={16} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => setSelectedEnrollment(item)}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Section: Top Mentors & Notice Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Top Instructors & Mentors (Bostami Education Faculty) */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Faculty & Mentors</h2>
              <p className="text-xs text-slate-500">Lead instructors for SSC 2027</p>
            </div>
            <Link href="/mentors" className="text-xs font-bold text-amber-600 hover:text-amber-700">
              View All
            </Link>
          </div>

          <div className="p-6 space-y-4">
            {/* Bayzid Bostami */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-amber-100 border border-amber-200 shrink-0">
                  <img src="/about-ceo.png" alt="Bayzid Bostami" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    Bayzid Bostami
                    <span className="bg-amber-400 text-slate-950 px-1 py-0.2 rounded text-[9px] font-bold">Lead</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Physics Mentor • 20k+ Students</p>
                  <div className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                    <Star size={11} className="fill-amber-400 text-amber-400" /> 4.9 Rating
                  </div>
                </div>
              </div>
              <Link href="/mentors" className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
                Profile
              </Link>
            </div>

            {/* Rakibul Hasan */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-blue-100 border border-blue-200 shrink-0">
                  <img src="/hasan.png" alt="Rakibul Hasan" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    Rakibul Hasan
                    <span className="bg-blue-100 text-blue-800 px-1 py-0.2 rounded text-[9px] font-bold">CTO</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">Technical & ICT • 10k+ Students</p>
                  <div className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                    <Star size={11} className="fill-amber-400 text-amber-400" /> 4.8 Rating
                  </div>
                </div>
              </div>
              <Link href="/mentors" className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
                Profile
              </Link>
            </div>

            {/* Asrafi Islam Orpita */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl overflow-hidden bg-purple-100 border border-purple-200 shrink-0">
                  <img src="/tutor8.png" alt="Asrafi Islam Orpita" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Asrafi Islam Orpita
                  </h4>
                  <p className="text-[11px] text-slate-500">Biology Lead • 5k+ Students</p>
                  <div className="text-[10px] text-amber-600 font-bold flex items-center gap-1 mt-0.5">
                    <Star size={11} className="fill-amber-400 text-amber-400" /> 4.8 Rating
                  </div>
                </div>
              </div>
              <Link href="/mentors" className="px-2.5 py-1 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50">
                Profile
              </Link>
            </div>
          </div>
        </div>

        {/* Card 2: Academic Notice Board */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Academic Notices</h2>
              <p className="text-xs text-slate-500">Batch schedules & live updates</p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="p-6 space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wide">SSC 2027 Revision</span>
                <span className="text-[10px] text-slate-400">Live Today</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                Physics Mechanics CQ Marathon Class starts tonight at 8:00 PM.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wide">Lecture PDF Update</span>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                Higher Math Coordinate Geometry Hand-notes & Short tricks PDF uploaded.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">ICT Doubt Solve</span>
                <span className="text-[10px] text-slate-400">2 days ago</span>
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1">
                Live Q&A Doubt Session with Engr. Rakibul Hasan on Friday 4:00 PM.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: Featured Courses List */}
        <div className="bg-white rounded-2xl shadow-xs border border-slate-200/80 flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Featured Courses</h2>
              <p className="text-xs text-slate-500">Live on platform</p>
            </div>
            <Link href="/courses" className="text-xs font-bold text-amber-600 hover:text-amber-700">
              All Courses
            </Link>
          </div>

          <div className="p-6 space-y-3.5">
            {COURSES_DATA.slice(0, 3).map((c) => (
              <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-amber-300 transition-all">
                <div className="min-w-0 pr-3">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {c.defaultTitle}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                    <span className="font-semibold text-amber-700">{c.price}</span>
                    <span>•</span>
                    <span>{c.studentCount}+ Enrolled</span>
                  </div>
                </div>
                <Link 
                  href={`/courses/${c.id}`} 
                  target="_blank"
                  className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-white rounded-lg transition-colors shrink-0"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment Details Modal */}
      {selectedEnrollment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Enrollment Details</h3>
                <p className="text-xs text-slate-500">ID: {selectedEnrollment.enrollmentId || selectedEnrollment.id}</p>
              </div>
              <button 
                onClick={() => setSelectedEnrollment(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{selectedEnrollment.studentName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">School / College:</span>
                <span className="font-semibold text-slate-800">{selectedEnrollment.schoolName || "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Course Applied:</span>
                <span className="font-semibold text-slate-800">{selectedEnrollment.courseTitle}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Payment Gateway:</span>
                <span className="font-bold uppercase text-amber-700">{selectedEnrollment.paymentMethod}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Transaction ID (TrxID):</span>
                <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">{selectedEnrollment.transactionId}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Sender Mobile:</span>
                <span className="font-semibold text-slate-800">{selectedEnrollment.senderPhone || selectedEnrollment.guardianPhone || "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Email:</span>
                <span className="font-semibold text-slate-800">{selectedEnrollment.email || "N/A"}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-50">
                <span className="text-slate-500">Course Fee:</span>
                <span className="font-bold text-slate-900 text-sm">{selectedEnrollment.amount}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500">Status:</span>
                <span className={`font-bold capitalize ${
                  selectedEnrollment.status === "approved" ? "text-emerald-600" :
                  selectedEnrollment.status === "pending" ? "text-amber-600" : "text-rose-600"
                }`}>
                  {selectedEnrollment.status}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
              {selectedEnrollment.status === "pending" && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(selectedEnrollment.id, "approved")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer"
                  >
                    Approve Payment
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedEnrollment.id, "rejected")}
                    className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Reject
                  </button>
                </>
              )}
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
