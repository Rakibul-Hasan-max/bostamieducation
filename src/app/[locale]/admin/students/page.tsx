"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  RefreshCw,
  BookOpen,
  Phone,
  Mail,
  School,
  Filter,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { collection, getDocs, updateDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

/* ── Types ── */
interface EnrollmentItem {
  id: string;
  enrollmentId?: string;
  studentName: string;
  schoolName?: string;
  guardianPhone?: string;
  senderPhone?: string;
  email?: string;
  courseTitle: string;
  amount: string;
  paymentMethod: "bkash" | "nagad" | "rocket" | "bank" | string;
  transactionId: string;
  status: "pending" | "approved" | "rejected";
  dateFormatted?: string;
}

/* ── Mock fallback ── */
const MOCK: EnrollmentItem[] = [
  { id: "mock-1", enrollmentId: "BST-849201", studentName: "Shakil Hossain",  schoolName: "Dhaka Residential Model College",    guardianPhone: "01712345678", email: "shakil.ssc27@gmail.com",   courseTitle: "Revision Course for SSC 2027 Batch",          amount: "৳1,500", paymentMethod: "bkash",  transactionId: "9KJ3N8L2PX",  status: "pending",  dateFormatted: "10 mins ago" },
  { id: "mock-2", enrollmentId: "BST-756192", studentName: "Tanvir Ahmed",    schoolName: "Ideal School & College, Motijheel", guardianPhone: "01823456789", email: "tanvir.ahmed@yahoo.com",   courseTitle: "Revision Course for SSC 2027 Batch",          amount: "৳1,500", paymentMethod: "nagad",  transactionId: "7MN4B1P9QR",  status: "pending",  dateFormatted: "35 mins ago" },
  { id: "mock-3", enrollmentId: "BST-634812", studentName: "Nusrat Jahan",    schoolName: "Viqarunnisa Noon School & College", guardianPhone: "01934567890", email: "nusrat.jahan@gmail.com",   courseTitle: "Higher Math & Physics Special Batch",         amount: "৳2,000", paymentMethod: "bkash",  transactionId: "BK8294N10Z",  status: "approved", dateFormatted: "2 hours ago" },
  { id: "mock-4", enrollmentId: "BST-519823", studentName: "Fahim Shahriar",  schoolName: "Rajuk Uttara Model College",         guardianPhone: "01645678901", email: "fahim.shahriar@gmail.com", courseTitle: "SSC 2027 Physics Conceptual Marathon",        amount: "৳1,500", paymentMethod: "rocket", transactionId: "ROC91827364", status: "approved", dateFormatted: "5 hours ago" },
  { id: "mock-5", enrollmentId: "BST-428174", studentName: "Sadia Sultana",   schoolName: "Chittagong Collegiate School",       guardianPhone: "01556789012", email: "sadia.ctg@gmail.com",      courseTitle: "Revision Course for SSC 2027 Batch",          amount: "৳1,500", paymentMethod: "bkash",  transactionId: "8XA92M10PQ",  status: "approved", dateFormatted: "1 day ago" },
  { id: "mock-6", enrollmentId: "BST-310921", studentName: "Tahmina Akter",   schoolName: "Holy Cross College, Dhaka",          guardianPhone: "01678901234", email: "tahmina.hc@gmail.com",     courseTitle: "SSC 2027 Chemistry Special Batch",            amount: "৳1,500", paymentMethod: "nagad",  transactionId: "NG9182736",   status: "rejected", dateFormatted: "2 days ago" },
];

/* ── Main Page ── */
export default function StudentDirectoryPage() {
  const [enrollments, setEnrollments] = useState<EnrollmentItem[]>(MOCK);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrollmentItem | null>(null);

  /* Fetch from Firestore */
  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, "enrollments"), orderBy("createdAt", "desc"));
        const snap = await getDocs(q);
        if (!snap.empty) {
          const data: EnrollmentItem[] = snap.docs.map((d) => {
            const raw = d.data();
            return {
              id: d.id,
              enrollmentId: raw.enrollmentId || "BST-" + d.id.substring(0, 6).toUpperCase(),
              studentName: raw.studentName || "Anonymous Student",
              schoolName: raw.schoolName || "",
              guardianPhone: raw.guardianPhone || raw.senderPhone || "",
              senderPhone: raw.senderPhone || "",
              email: raw.email || "",
              courseTitle: raw.courseTitle || "SSC Course",
              amount: raw.amount || "৳1,500",
              paymentMethod: raw.paymentMethod || "bkash",
              transactionId: raw.transactionId || "N/A",
              status: raw.status || "pending",
              dateFormatted: raw.createdAt?.toDate
                ? raw.createdAt.toDate().toLocaleDateString("en-US", { month: "short", day: "numeric" })
                : "Recent",
            };
          });
          setEnrollments(data);
        }
      } catch {
        /* keep mock */
      } finally {
        setLoading(false);
      }
    };
    fetchEnrollments();
  }, []);

  /* Approve / Reject */
  const handleUpdateStatus = async (id: string, newStatus: "approved" | "rejected") => {
    setEnrollments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    if (selectedEnrollment?.id === id) {
      setSelectedEnrollment((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    try {
      if (!id.startsWith("mock-")) {
        await updateDoc(doc(db, "enrollments", id), {
          status: newStatus,
          verifiedAt: new Date(),
        });
      }
    } catch (err) {
      console.error("Firestore update failed:", err);
    }
  };

  /* Counts */
  const pendingCount  = enrollments.filter((e) => e.status === "pending").length;
  const approvedCount = enrollments.filter((e) => e.status === "approved").length;
  const rejectedCount = enrollments.filter((e) => e.status === "rejected").length;

  /* Filtered list */
  const filtered = useMemo(() => {
    return enrollments.filter((item) => {
      const matchTab = activeTab === "all" || item.status === activeTab;
      const q = searchTerm.toLowerCase();
      const matchSearch =
        !q ||
        item.studentName.toLowerCase().includes(q) ||
        (item.schoolName?.toLowerCase().includes(q) ?? false) ||
        item.transactionId.toLowerCase().includes(q) ||
        (item.enrollmentId?.toLowerCase().includes(q) ?? false) ||
        (item.email?.toLowerCase().includes(q) ?? false);
      return matchTab && matchSearch;
    });
  }, [enrollments, activeTab, searchTerm]);

  return (
    <div className="space-y-6">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2.5">
            <Users size={22} className="text-indigo-500" />
            Student Directory
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Review submitted bKash / Nagad Transaction IDs and verify course admissions
          </p>
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-amber-600 font-medium bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
            <RefreshCw size={14} className="animate-spin" />
            Syncing with Firebase…
          </div>
        ) : (
          <div className="text-xs text-slate-400 font-medium">
            {enrollments.length} total records
          </div>
        )}
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          label="Total Students"
          value={enrollments.length}
          icon={<Users size={18} className="text-indigo-500" />}
          bg="bg-indigo-50 border-indigo-100"
          active={activeTab === "all"}
          onClick={() => setActiveTab("all")}
        />
        <KpiCard
          label="Approved"
          value={approvedCount}
          icon={<CheckCircle2 size={18} className="text-emerald-500" />}
          bg="bg-emerald-50 border-emerald-100"
          active={activeTab === "approved"}
          onClick={() => setActiveTab("approved")}
        />
        <KpiCard
          label="Pending Review"
          value={pendingCount}
          icon={<Clock size={18} className="text-amber-500" />}
          bg={pendingCount > 0 ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-100"}
          active={activeTab === "pending"}
          onClick={() => setActiveTab("pending")}
          pulse={pendingCount > 0}
        />
        <KpiCard
          label="Rejected"
          value={rejectedCount}
          icon={<XCircle size={18} className="text-rose-400" />}
          bg="bg-rose-50 border-rose-100"
          active={activeTab === "rejected"}
          onClick={() => setActiveTab("rejected")}
        />
      </div>

      {/* ── Enrollment Table ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        {/* Table Header Controls */}
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-bold text-slate-900">Student Enrollments &amp; Verifications</h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {filtered.length} Records
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-60">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Name, TrxID, email, school…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300/40 focus:border-indigo-400 text-slate-700 transition-all"
              />
            </div>

            {/* Status tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold gap-0.5">
              {(["all", "pending", "approved", "rejected"] as const).map((tab) => {
                const count =
                  tab === "all" ? enrollments.length :
                  tab === "pending" ? pendingCount :
                  tab === "approved" ? approvedCount : rejectedCount;
                const activeStyle =
                  tab === "pending"  ? "bg-amber-400 text-slate-950 shadow-sm" :
                  tab === "approved" ? "bg-emerald-600 text-white shadow-sm" :
                  tab === "rejected" ? "bg-rose-500 text-white shadow-sm" :
                  "bg-white text-slate-900 shadow-sm";
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer capitalize ${
                      activeTab === tab ? activeStyle : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {tab === "all" ? `All (${count})` : `${tab.charAt(0).toUpperCase() + tab.slice(1)} (${count})`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider text-[11px] border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6">Student &amp; School</th>
                <th className="py-3.5 px-4">Enrolled Course</th>
                <th className="py-3.5 px-4">Payment &amp; TrxID</th>
                <th className="py-3.5 px-4">Fee Amount</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-6 text-right">Verification Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-14 text-slate-400 text-sm">
                    No enrollment applications match your filter.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Student */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 font-bold flex items-center justify-center shrink-0 text-sm">
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
                            <School size={11} className="shrink-0 text-slate-400" />
                            <span className="truncate">{item.schoolName || "Not provided"}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800 line-clamp-1 max-w-[200px] flex items-start gap-1">
                        <BookOpen size={12} className="text-blue-400 mt-0.5 shrink-0" />
                        {item.courseTitle}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 pl-4">Batch 2027 · Regular</div>
                    </td>

                    {/* Payment */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide ${
                          item.paymentMethod === "bkash"  ? "bg-pink-100 text-pink-700" :
                          item.paymentMethod === "nagad"  ? "bg-orange-100 text-orange-700" :
                          item.paymentMethod === "rocket" ? "bg-violet-100 text-violet-700" :
                          "bg-blue-100 text-blue-700"
                        }`}>
                          {item.paymentMethod}
                        </span>
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/80">
                          {item.transactionId}
                        </span>
                      </div>
                      {(item.senderPhone || item.guardianPhone) && (
                        <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                          <Phone size={11} />
                          {item.senderPhone || item.guardianPhone}
                        </div>
                      )}
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-slate-900 text-sm">{item.amount}</div>
                      <div className="text-[10px] text-slate-400">{item.dateFormatted || "Today"}</div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {item.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 size={12} /> Approved
                        </span>
                      ) : item.status === "pending" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300 animate-pulse">
                          <Clock size={12} /> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-700 border border-rose-200">
                          <XCircle size={12} /> Rejected
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "approved")}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item.id, "rejected")}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold transition-all cursor-pointer"
                            >
                              <XCircle size={15} />
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

      {/* ── Detail Modal ── */}
      {selectedEnrollment && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedEnrollment(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-indigo-600 to-indigo-500">
              <div>
                <h3 className="text-base font-bold text-white">Enrollment Details</h3>
                <p className="text-xs text-indigo-200 mt-0.5 font-mono">
                  {selectedEnrollment.enrollmentId || selectedEnrollment.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnrollment(null)}
                className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal body */}
            <div className="px-6 py-5 space-y-0 text-xs">
              {[
                ["Student Name",      selectedEnrollment.studentName],
                ["School / College",  selectedEnrollment.schoolName || "N/A"],
                ["Course Applied",    selectedEnrollment.courseTitle],
                ["Payment Gateway",   selectedEnrollment.paymentMethod?.toUpperCase()],
                ["Transaction ID",    selectedEnrollment.transactionId],
                ["Sender Mobile",     selectedEnrollment.senderPhone || selectedEnrollment.guardianPhone || "N/A"],
                ["Email",             selectedEnrollment.email || "N/A"],
                ["Course Fee",        selectedEnrollment.amount],
                ["Submitted",         selectedEnrollment.dateFormatted || "Recent"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between py-2.5 border-b border-slate-50 last:border-0">
                  <span className="text-slate-500">{label}:</span>
                  <span className={`font-semibold text-slate-900 ${label === "Transaction ID" ? "font-mono bg-slate-100 px-2 py-0.5 rounded" : ""}`}>
                    {value}
                  </span>
                </div>
              ))}
              {/* Status row */}
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Status:</span>
                <span className={`font-bold capitalize ${
                  selectedEnrollment.status === "approved" ? "text-emerald-600" :
                  selectedEnrollment.status === "pending"  ? "text-amber-600"   : "text-rose-600"
                }`}>
                  {selectedEnrollment.status}
                </span>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-2 px-6 pb-5">
              {selectedEnrollment.status === "pending" && (
                <>
                  <button
                    onClick={() => handleUpdateStatus(selectedEnrollment.id, "approved")}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all cursor-pointer"
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

/* ── KPI Card ── */
function KpiCard({
  label, value, icon, bg, active, onClick, pulse,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  bg: string;
  active: boolean;
  onClick: () => void;
  pulse?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border p-4 text-left transition-all cursor-pointer shadow-sm ${bg} ${
        active ? "ring-2 ring-offset-1 ring-indigo-300" : "hover:shadow-md"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-xl bg-white/60 ${pulse ? "animate-pulse" : ""}`}>{icon}</div>
        {pulse && value > 0 && (
          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600">
            <ShieldCheck size={11} /> Needs Review
          </span>
        )}
      </div>
      <div className="text-2xl font-extrabold text-slate-800">{value}</div>
      <div className="text-xs font-medium text-slate-500 mt-0.5">{label}</div>
    </button>
  );
}
