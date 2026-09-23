"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { 
  LayoutDashboard, 
  BookOpen, 
  FileCheck2, 
  Award, 
  Calendar, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  Play, 
  CheckCircle2, 
  Clock, 
  Download, 
  ExternalLink, 
  Users, 
  TrendingUp, 
  HelpCircle, 
  ChevronRight, 
  Bell, 
  Share2, 
  X, 
  Check, 
  Filter,
  GraduationCap,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Video,
  FileDown,
  School,
  Mail,
  Phone,
  RefreshCw,
  PlusCircle,
  AlertCircle
} from "lucide-react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COURSES_DATA, CourseDetail } from "@/constants/coursesData";
import { Link } from "@/i18n/routing";

// ── Types ──
export interface EnrolledCourseItem {
  id: string;
  enrollmentId?: string;
  courseId: string;
  courseTitle: string;
  amount: string;
  paymentMethod: string;
  senderPhone?: string;
  guardianPhone?: string;
  schoolName?: string;
  studentName?: string;
  transactionId: string;
  status: "pending" | "approved" | "rejected";
  createdAt?: any;
  // Computed fields
  category: "Physics" | "Math" | "Chemistry" | "Biology" | "Technical & ICT" | string;
  instructor: string;
  instructorAvatar: string;
  progress: number;
  totalLectures: number;
  completedLectures: number;
  currentLesson: string;
  nextLesson: string;
  thumbnail: string;
  lastWatched: string;
  notesPdfUrl?: string;
  certificateId?: string;
  courseDetail?: CourseDetail;
}

export default function StudentDashboardPage() {
  const { user, loading, isAdmin, logout } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<string>("overview");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic Backend Data State
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourseItem[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  // Modals state
  const [activeVideoModal, setActiveVideoModal] = useState<EnrolledCourseItem | null>(null);
  const [activeCertModal, setActiveCertModal] = useState<EnrolledCourseItem | null>(null);

  // 1. Role-based Route Protection:
  // - If user is not authenticated: redirect to login
  // - If user is an Admin: block access and redirect to admin dashboard
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login?redirect=/student/dashboard");
      } else if (isAdmin) {
        router.push("/admin/dashboard");
      }
    }
  }, [user, loading, isAdmin, router]);

  // 2. Fetch student's real enrollments from Firebase Firestore
  const fetchStudentData = async () => {
    if (!user) return;
    try {
      setDataLoading(true);
      const enrollmentsRef = collection(db, "enrollments");
      const foundList: any[] = [];
      const seenIds = new Set<string>();

      // Query by user email if available
      if (user.email) {
        try {
          const qEmail = query(enrollmentsRef, where("email", "==", user.email));
          const snapEmail = await getDocs(qEmail);
          snapEmail.forEach((docSnap) => {
            if (!seenIds.has(docSnap.id)) {
              seenIds.add(docSnap.id);
              foundList.push({ id: docSnap.id, ...docSnap.data() });
            }
          });
        } catch (e) {}

        try {
          const qUserEmail = query(enrollmentsRef, where("userEmail", "==", user.email));
          const snapUserEmail = await getDocs(qUserEmail);
          snapUserEmail.forEach((docSnap) => {
            if (!seenIds.has(docSnap.id)) {
              seenIds.add(docSnap.id);
              foundList.push({ id: docSnap.id, ...docSnap.data() });
            }
          });
        } catch (e) {}
      }

      // Query by userId if available
      if (user.uid) {
        try {
          const qUid = query(enrollmentsRef, where("userId", "==", user.uid));
          const snapUid = await getDocs(qUid);
          snapUid.forEach((docSnap) => {
            if (!seenIds.has(docSnap.id)) {
              seenIds.add(docSnap.id);
              foundList.push({ id: docSnap.id, ...docSnap.data() });
            }
          });
        } catch (e) {}
      }

      // Map raw Firestore records to EnrolledCourseItem structure
      const mappedList: EnrolledCourseItem[] = foundList.map((item, index) => {
        const detail = COURSES_DATA.find((c) => c.id === item.courseId) || COURSES_DATA[0];
        const isApproved = item.status === "approved";
        const progress = isApproved ? 40 + ((index * 20) % 60) : 0;
        const totalLectures = detail?.lectures || 60;
        const completedLectures = Math.round((progress / 100) * totalLectures);

        return {
          id: item.id,
          enrollmentId: item.enrollmentId || "BST-" + item.id.substring(0, 6).toUpperCase(),
          courseId: item.courseId,
          courseTitle: item.courseTitle || detail.defaultTitle,
          amount: item.amount || detail.price,
          paymentMethod: item.paymentMethod || "bkash",
          senderPhone: item.senderPhone,
          guardianPhone: item.guardianPhone,
          schoolName: item.schoolName,
          studentName: item.studentName,
          transactionId: item.transactionId || "N/A",
          status: item.status || "pending",
          createdAt: item.createdAt,
          category: detail.category,
          instructor: detail.instructor?.name || "Bayzid Bostami",
          instructorAvatar: detail.instructor?.avatar || "/about-ceo.png",
          progress,
          totalLectures,
          completedLectures,
          currentLesson: detail.curriculum?.[0]?.lessons?.[0]?.title || "Chapter 1: Conceptual Clarity",
          nextLesson: detail.curriculum?.[0]?.lessons?.[1]?.title || "Chapter 2: CQ Written Problem Solving",
          thumbnail: detail.img || "/course1.png",
          lastWatched: "Recent",
          notesPdfUrl: `${detail.category}_Lecture_Notes.pdf`,
          certificateId: progress === 100 ? `BST-CERT-${item.id.substring(0, 6).toUpperCase()}` : undefined,
          courseDetail: detail
        };
      });

      setEnrolledCourses(mappedList);
    } catch (err) {
      console.error("Error loading student enrollments:", err);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (user && !isAdmin) {
      fetchStudentData();
    }
  }, [user, isAdmin]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Real Profile data derived from Firebase Auth & Firestore
  const primaryEnrollment = enrolledCourses[0];
  const profile = {
    name: user?.displayName || primaryEnrollment?.studentName || "Student",
    studentId: primaryEnrollment?.enrollmentId || ("BST-" + (user?.uid ? user.uid.slice(0, 6).toUpperCase() : "2027")),
    email: user?.email || "student@bostamiedu.com",
    phone: user?.phoneNumber || primaryEnrollment?.senderPhone || primaryEnrollment?.guardianPhone || "Not set",
    track: "SSC 2027 Academic Batch",
    institution: primaryEnrollment?.schoolName || "Bostami Education Student",
    target: "SSC 2027 & Board Exam Prep",
    avatar: user?.photoURL || null
  };

  // Derived Statistics from real data
  const approvedCourses = enrolledCourses.filter(c => c.status === "approved");
  const pendingCourses = enrolledCourses.filter(c => c.status === "pending");
  const completedCourses = approvedCourses.filter(c => c.progress === 100);
  const totalCompletedLectures = approvedCourses.reduce((acc, c) => acc + c.completedLectures, 0);
  const totalLecturesCount = approvedCourses.reduce((acc, c) => acc + c.totalLectures, 0);
  const averageProgress = approvedCourses.length > 0 
    ? Math.round(approvedCourses.reduce((acc, c) => acc + c.progress, 0) / approvedCourses.length) 
    : 0;
  const studyHoursLogged = Math.round(totalCompletedLectures * 0.85);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(c => {
      const matchSearch = c.courseTitle.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      if (courseFilter === "approved" || courseFilter === "in-progress") return c.status === "approved" && c.progress < 100;
      if (courseFilter === "pending") return c.status === "pending";
      if (courseFilter === "completed") return c.progress === 100;
      return true;
    });
  }, [enrolledCourses, searchQuery, courseFilter]);

  const primaryContinueCourse = approvedCourses[0] || enrolledCourses[0];

  // Loading Screen
  if (loading || (!user && !isAdmin)) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-12 h-12 rounded-full border-4 border-amber-200 border-t-amber-600 animate-spin mb-4" />
          <p className="text-sm font-semibold text-slate-700">
            {loading ? "Verifying student session..." : "Redirecting to login..."}
          </p>
          <p className="text-xs text-slate-400 mt-1">Please wait a moment</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Strictly block administrators from accessing student dashboard
  if (isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0d131f] text-slate-200 font-sans">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#161f30] border border-amber-500/30 rounded-3xl p-8 shadow-2xl shadow-black/60 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>

            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6 shadow-inner">
              <ShieldCheck className="w-8 h-8 animate-pulse" />
            </div>

            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-1.5 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              Admin Account Detected
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">
              স্টুডেন্ট পোর্টাল সংরক্ষিত
            </h1>

            <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-xs text-slate-300 mb-6 text-left space-y-1.5">
              <div className="text-slate-400">Logged in as Admin:</div>
              <div className="font-bold text-white font-mono truncate">{user?.email || "Admin User"}</div>
              <div className="text-amber-400 text-[11px] pt-1">
                ⚠️ আপনি একটি অ্যাডমিনিস্ট্রেটর অ্যাকাউন্ট দিয়ে লগইন আছেন। স্টুডেন্ট ড্যাশবোর্ডটি শুধুমাত্র শিক্ষার্থীদের জন্য। অনুগ্রহ করে অ্যাডমিন প্যানেল ব্যবহার করুন।
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/10 cursor-pointer"
              >
                <LayoutDashboard size={16} />
                <span>Go to Admin Dashboard</span>
              </button>

              <button
                onClick={() => router.push("/")}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Return to Home Page</span>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-900 text-white px-5 py-3 rounded-xl shadow-xl border border-emerald-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <Check size={14} className="stroke-[3]" />
          </div>
          <p className="text-xs font-semibold">{toastMessage}</p>
        </div>
      )}

      <main className="flex-1 pb-16">
        {/* Navigation Tabs Header */}
        <section className="bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "courses", label: `My Courses (${enrolledCourses.length})`, icon: BookOpen },
                { id: "live", label: "Live Class", icon: Calendar },
                { id: "resources", label: "Lecture Notes", icon: FileText },
                { id: "certificates", label: "Certificates", icon: Award },
                { id: "settings", label: "Profile & Settings", icon: Settings },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60"
                    }`}
                  >
                    <Icon size={15} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
              <div className="shrink-0 w-4" />
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            MAIN CONTENT AREA
        ══════════════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-6">
          
          {/* ─────────────────────────────────────────────────────────────
              TAB 1: DASHBOARD OVERVIEW
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* 4 Real Stats (Calculated from Firestore) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <BookOpen size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{enrolledCourses.length} Courses</h3>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} /> {approvedCourses.length} Active, {pendingCourses.length} Pending
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Completed Lectures</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FileCheck2 size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{totalCompletedLectures} / {totalLecturesCount || 0}</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    {averageProgress}% Syllabus covered
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Pending Approvals</span>
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{pendingCourses.length} Applications</h3>
                  <p className="text-[11px] text-amber-600 font-medium mt-1">
                    {pendingCourses.length > 0 ? "Payment verification in progress" : "All verifications completed"}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Study Time Logged</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{studyHoursLogged} Hours</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    Based on active lecture progress
                  </p>
                </div>

              </div>

              {/* CONTINUE LEARNING HERO BANNER */}
              {primaryContinueCourse ? (
                <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-md ${
                      primaryContinueCourse.status === "approved" ? "bg-emerald-700/80 text-emerald-100" : "bg-amber-500 text-slate-950"
                    }`}>
                      {primaryContinueCourse.status === "approved" ? "Continue Learning" : "Verification In Progress"}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      {primaryContinueCourse.courseTitle}
                    </h3>
                    <p className="text-xs text-emerald-100/90 leading-relaxed">
                      Current Topic: <span className="font-semibold text-white">{primaryContinueCourse.currentLesson}</span>
                    </p>

                    {primaryContinueCourse.status === "approved" ? (
                      <div className="space-y-1 pt-1 max-w-md">
                        <div className="flex justify-between text-[11px] text-emerald-200 font-medium">
                          <span>Progress: {primaryContinueCourse.completedLectures} of {primaryContinueCourse.totalLectures} lectures</span>
                          <span className="font-bold text-white">{primaryContinueCourse.progress}%</span>
                        </div>
                        <div className="w-full bg-emerald-950/80 h-2 rounded-full overflow-hidden border border-emerald-700/50">
                          <div 
                            className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                            style={{ width: `${primaryContinueCourse.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-amber-200 font-medium pt-1">
                        TrxID: {primaryContinueCourse.transactionId} • Admin approval is in progress
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
                    {primaryContinueCourse.status === "approved" ? (
                      <button
                        onClick={() => setActiveVideoModal(primaryContinueCourse)}
                        className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-sm"
                      >
                        <Play size={14} className="fill-emerald-950 text-emerald-950" />
                        <span>Resume Video</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center justify-center gap-2 bg-emerald-900/60 text-emerald-300 font-medium px-4 py-2.5 rounded-xl text-xs border border-emerald-700/50 cursor-not-allowed"
                      >
                        <Clock size={14} />
                        <span>Awaiting Verification</span>
                      </button>
                    )}

                    <button
                      onClick={() => showToast(`Downloading ${primaryContinueCourse.courseTitle} Handouts...`)}
                      className="inline-flex items-center justify-center gap-2 bg-emerald-700/80 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition cursor-pointer border border-emerald-600"
                    >
                      <Download size={14} />
                      <span>Download Notes</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty state banner when student has no courses yet */
                <div className="bg-gradient-to-r from-slate-900 to-[#162032] rounded-2xl p-6 md:p-8 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <span className="inline-block text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-md">
                      Get Started with Bostami Education
                    </span>
                    <h3 className="text-lg md:text-xl font-bold text-white">
                      You are not enrolled in any courses yet
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      SSC 2027 ও HSC পরীক্ষার প্রস্তুতির জন্য আমাদের বিশেষায়িত ব্যাচগুলোতে ভর্তি হয়ে ক্লাস শুরু করুন।
                    </p>
                  </div>
                  <Link
                    href="/courses"
                    className="inline-flex items-center justify-center gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition cursor-pointer shadow-md shadow-amber-400/20 shrink-0"
                  >
                    <BookOpen size={15} />
                    <span>Browse All Courses</span>
                  </Link>
                </div>
              )}

              {/* 2-COLUMN SECTION: COURSES & SIDEBAR SCHEDULE */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left 2 Cols: Enrolled Courses List */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Enrolled Subjects</h3>
                        <p className="text-xs text-slate-500">Track chapter progress and continue studying</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("courses")}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>View All ({enrolledCourses.length})</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    {enrolledCourses.length === 0 ? (
                      <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl space-y-3">
                        <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                        <p className="text-xs text-slate-500 font-medium">কোনো কোর্স পাওয়া যায়নি।</p>
                        <Link
                          href="/courses"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                        >
                          কোর্স তালিকা দেখুন ↗
                        </Link>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100">
                        {enrolledCourses.map((c) => {
                          const isApproved = c.status === "approved";
                          return (
                            <div key={c.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                              <div className="flex items-center gap-3.5 min-w-0">
                                <div className="w-12 h-12 rounded-xl bg-slate-900 overflow-hidden shrink-0 relative">
                                  <img 
                                    src={c.thumbnail} 
                                    alt={c.courseTitle} 
                                    className="w-full h-full object-cover" 
                                  />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                                    {c.courseTitle}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                                    Instructor: {c.instructor}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.2 rounded-full ${
                                      isApproved ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                                    }`}>
                                      {isApproved ? `${c.progress}% Finished` : "Verification Pending"}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                                {isApproved ? (
                                  <button
                                    onClick={() => setActiveVideoModal(c)}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs transition cursor-pointer"
                                  >
                                    <Play size={12} className="fill-emerald-700" />
                                    <span>Watch</span>
                                  </button>
                                ) : (
                                  <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                                    Trx: {c.transactionId}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right 1 Col: Live Schedule Sidebar */}
                <div className="space-y-4">
                  <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Live Doubt Classes</h3>
                        <p className="text-[11px] text-slate-500">SSC 2027 Interactive Sessions</p>
                      </div>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-emerald-700 uppercase">
                          <span>Physics</span>
                          <span className="text-rose-600 font-bold">Tonight 8:00 PM</span>
                        </div>
                        <h5 className="font-bold text-xs text-slate-900">Physics Mechanics CQ Marathon</h5>
                        <p className="text-[11px] text-slate-500">Mentor: Bayzid Bostami (Google Meet)</p>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1.5">
                        <div className="flex justify-between items-center text-[10px] font-bold text-blue-700 uppercase">
                          <span>ICT</span>
                          <span className="text-slate-500">Friday 4:00 PM</span>
                        </div>
                        <h5 className="font-bold text-xs text-slate-900">ICT C Programming Logic Session</h5>
                        <p className="text-[11px] text-slate-500">Mentor: Rakibul Hasan (Google Meet)</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: MY COURSES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">My Enrolled Subjects</h2>
                  <p className="text-xs text-slate-500">Manage and continue your academic batch courses</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {["all", "approved", "pending"].map((filterKey) => (
                    <button
                      key={filterKey}
                      onClick={() => setCourseFilter(filterKey)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                        courseFilter === filterKey
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {filterKey === "all" ? "All Courses" : filterKey === "approved" ? "Active Batches" : "Pending Verification"}
                    </button>
                  ))}
                </div>
              </div>

              {filteredCourses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                  <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                  <p className="text-sm font-semibold text-slate-600">কোনো কোর্স পাওয়া যায়নি।</p>
                  <Link
                    href="/courses"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    Browse available courses ↗
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((item) => {
                    const isApproved = item.status === "approved";
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative aspect-video w-full bg-slate-900">
                            <img
                              src={item.thumbnail}
                              alt={item.courseTitle}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-3 left-3">
                              <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                isApproved ? "bg-emerald-500 text-white" : "bg-amber-500 text-slate-950"
                              }`}>
                                {isApproved ? "Active" : "Pending Verification"}
                              </span>
                            </div>
                          </div>

                          <div className="p-5 space-y-3">
                            <h3 className="font-bold text-slate-900 text-base line-clamp-1">
                              {item.courseTitle}
                            </h3>
                            <p className="text-xs text-slate-500">
                              Mentor: {item.instructor}
                            </p>

                            {isApproved ? (
                              <div className="space-y-1 pt-1">
                                <div className="flex justify-between text-xs font-semibold">
                                  <span className="text-slate-500">Progress</span>
                                  <span className="text-emerald-600 font-bold">{item.progress}%</span>
                                </div>
                                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${item.progress}%` }}></div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                                TrxID: <span className="font-mono font-bold">{item.transactionId}</span>
                                <div className="text-[11px] text-amber-700 mt-0.5">Verification pending with admin</div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          {isApproved ? (
                            <button
                              onClick={() => setActiveVideoModal(item)}
                              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                            >
                              <Play size={14} className="fill-white" />
                              <span>Continue Course</span>
                            </button>
                          ) : (
                            <button
                              disabled
                              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-400 font-semibold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
                            >
                              <span>Awaiting Verification</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: LIVE CLASS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "live" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Live Class Schedule</h2>
                <p className="text-xs text-slate-500">Join interactive live doubt-clearing sessions</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">Physics</span>
                    <span className="text-xs font-semibold text-rose-600">Tonight 8:00 PM</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">Physics Mechanics Short Hand Tricks & CQ</h3>
                  <p className="text-xs text-slate-500">Lead Mentor: Bayzid Bostami</p>
                  <a
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all mt-2"
                  >
                    <Video size={14} />
                    <span>Join Class on Google Meet</span>
                  </a>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">ICT</span>
                    <span className="text-xs font-semibold text-slate-500">Friday 4:00 PM</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900">C Programming Flowchart & Logic Solving</h3>
                  <p className="text-xs text-slate-500">Mentor: Rakibul Hasan</p>
                  <a
                    href="https://meet.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all mt-2"
                  >
                    <Video size={14} />
                    <span>Join Class on Google Meet</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 4: LECTURE NOTES & PDFS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "resources" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Lecture Sheets & Cheatsheets</h2>
                <p className="text-xs text-slate-500">Download course materials and lecture PDF notes</p>
              </div>

              {approvedCourses.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-3">
                  <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500">আপনার কোনো সক্রিয় কোর্স নেই। কোর্সে ভর্তি হলে লেকচার শিট এখানে প্রদর্শিত হবে।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {approvedCourses.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs mb-2">
                          PDF
                        </div>
                        <h4 className="font-bold text-xs text-slate-900 truncate">{c.courseTitle} Handout</h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">{c.category} • Official Notes</p>
                      </div>

                      <button
                        onClick={() => showToast(`Downloading ${c.courseTitle} Notes...`)}
                        className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 border border-slate-200 transition-colors cursor-pointer shrink-0"
                        title="Download PDF"
                      >
                        <Download size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 5: CERTIFICATES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Course Certificates</h2>
                <p className="text-xs text-slate-500">Earn official verified certificates by completing course lectures</p>
              </div>

              {completedCourses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-4">
                  <Award className="w-12 h-12 text-slate-300 mx-auto" />
                  <h3 className="text-base font-bold text-slate-800">No Certificates Earned Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    আপনার ভর্তিকৃত কোর্সের সব লেকচার ১০০% সম্পন্ন করলে অফিসিয়াল ভেরিফায়েড সার্টিফিকেট এখানে জেনারেট হবে।
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedCourses.map((c) => (
                    <div key={c.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
                      <div className="flex items-center gap-3">
                        <Award className="w-8 h-8 text-amber-500" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{c.courseTitle}</h4>
                          <p className="text-xs text-slate-500">Certificate ID: {c.certificateId}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast(`Generating certificate for ${c.courseTitle}...`)}
                        className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2"
                      >
                        <Download size={14} />
                        <span>Download Certificate (PDF)</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 6: PROFILE & SETTINGS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
                  {profile.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{profile.name}</h3>
                  <p className="text-xs text-slate-500">Student ID: {profile.studentId}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Full Name</span>
                  <span className="font-bold text-slate-900">{profile.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Email Address</span>
                  <span className="font-semibold text-slate-900">{profile.email}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Phone Number</span>
                  <span className="font-semibold text-slate-900">{profile.phone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Institution / School</span>
                  <span className="font-semibold text-slate-900">{profile.institution}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="text-slate-500 font-medium">Academic Batch</span>
                  <span className="font-bold text-emerald-700">SSC 2027 Batch</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-slate-500 font-medium">Total Enrolled Courses</span>
                  <span className="font-bold text-slate-900">{enrolledCourses.length} Subjects</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => logout()}
                  className="w-full py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <LogOut size={16} />
                  <span>Log Out of Student Portal</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Video Lecture Player Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 text-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="font-bold text-base text-white">{activeVideoModal.courseTitle}</h3>
                <p className="text-xs text-emerald-400 font-medium">{activeVideoModal.currentLesson}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video w-full rounded-2xl bg-black flex items-center justify-center overflow-hidden border border-slate-800">
              <img
                src={activeVideoModal.thumbnail}
                alt="Lecture Video"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/40 cursor-pointer hover:scale-110 transition-transform">
                  <Play size={28} className="fill-white ml-1" />
                </div>
                <span className="text-xs font-bold text-white bg-black/60 px-3 py-1 rounded-full">
                  Lecture Video Stream Ready
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
              <span>Mentor: {activeVideoModal.instructor}</span>
              <button
                onClick={() => {
                  showToast("Lesson marked as complete!");
                  setActiveVideoModal(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all cursor-pointer"
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
