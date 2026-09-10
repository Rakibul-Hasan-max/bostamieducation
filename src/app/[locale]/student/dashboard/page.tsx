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
  FileDown
} from "lucide-react";

// ── Types ──
interface EnrolledCourse {
  id: string;
  title: string;
  category: "Physics" | "Math" | "Chemistry" | "Biology" | "Technical & ICT";
  instructor: string;
  instructorAvatar: string;
  progress: number;
  totalLectures: number;
  completedLectures: number;
  currentLesson: string;
  nextLesson: string;
  thumbnail: string;
  lastWatched: string;
  status: "in-progress" | "completed";
  notesPdfUrl?: string;
  certificateId?: string;
}

interface QuizResult {
  id: string;
  title: string;
  subject: string;
  score: number;
  totalScore: number;
  percentage: number;
  date: string;
  status: "Passed" | "Pending" | "Excellent";
  duration: string;
}

interface LiveClassSchedule {
  id: string;
  title: string;
  subject: string;
  instructor: string;
  instructorTitle: string;
  date: string;
  time: string;
  isToday: boolean;
  joinUrl: string;
  platform: "Google Meet" | "Zoom";
}

interface StudyResource {
  id: string;
  title: string;
  subject: string;
  fileSize: string;
  uploadDate: string;
  downloads: number;
  type: "PDF Handout" | "Formula Sheet" | "Model Test Paper";
}

export default function StudentDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [activeVideoModal, setActiveVideoModal] = useState<EnrolledCourse | null>(null);
  const [activeCertModal, setActiveCertModal] = useState<EnrolledCourse | null>(null);

  // Profile data
  const [profile, setProfile] = useState({
    name: "Lori Stevens",
    studentId: "BST-2026-4089",
    email: "lori.stevens@bostamiedu.com",
    phone: "+880 1712-345678",
    track: "HSC 2026 Science & ICT Special Batch",
    institution: "Dhaka City College",
    target: "BUET & Medical Admission 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  });

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/student/dashboard");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.displayName || prev.name,
        email: user.email || prev.email,
        avatar: user.photoURL || prev.avatar,
      }));
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // ── Mock Data ──
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([
    {
      id: "phy-1st",
      title: "HSC Physics 1st Paper Masterclass",
      category: "Physics",
      instructor: "Engr. Mahmudul Hasan",
      instructorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      progress: 72,
      totalLectures: 50,
      completedLectures: 36,
      currentLesson: "Chapter 4: Newtonian Mechanics & Friction",
      nextLesson: "Chapter 4.5: Banking of Roads & Centripetal Acceleration",
      thumbnail: "/course1.png",
      lastWatched: "Today, 2:30 PM",
      status: "in-progress",
      notesPdfUrl: "Physics_Ch4_Lecture_Notes.pdf"
    },
    {
      id: "math-higher",
      title: "HSC Higher Mathematics (Calculus & Vectors)",
      category: "Math",
      instructor: "Dr. Rafiqul Islam",
      instructorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
      progress: 85,
      totalLectures: 42,
      completedLectures: 36,
      currentLesson: "Differentiation: Product Rule & Chain Rule",
      nextLesson: "Integration by Parts & Definite Integrals",
      thumbnail: "/course2.png",
      lastWatched: "Yesterday",
      status: "in-progress",
      notesPdfUrl: "HigherMath_Calculus_Cheatsheet.pdf"
    },
    {
      id: "chem-organic",
      title: "HSC Chemistry 2nd Paper (Organic Chemistry)",
      category: "Chemistry",
      instructor: "Afsana Rahman",
      instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
      progress: 100,
      totalLectures: 35,
      completedLectures: 35,
      currentLesson: "Course Completed (All Modules Finished)",
      nextLesson: "All lessons complete! Certificate generated.",
      thumbnail: "/course3.png",
      lastWatched: "3 days ago",
      status: "completed",
      certificateId: "BST-CHEM-2026-891",
      notesPdfUrl: "Organic_Reactions_Summary.pdf"
    },
    {
      id: "ict-full",
      title: "HSC ICT Complete Board & Admission Prep",
      category: "Technical & ICT",
      instructor: "Tanvir Ahmed",
      instructorAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120",
      progress: 45,
      totalLectures: 28,
      completedLectures: 13,
      currentLesson: "Chapter 5: C Programming Basics & Loops",
      nextLesson: "Chapter 5.3: Array and Functions in C",
      thumbnail: "/course4.png",
      lastWatched: "5 days ago",
      status: "in-progress",
      notesPdfUrl: "ICT_C_Programming_Handbook.pdf"
    }
  ]);

  const quizResults: QuizResult[] = [
    {
      id: "q-01",
      title: "Physics Mechanics Board Standard CQ & MCQ Test",
      subject: "Physics",
      score: 24,
      totalScore: 25,
      percentage: 96,
      date: "May 18, 2026",
      status: "Excellent",
      duration: "25 mins"
    },
    {
      id: "q-02",
      title: "Calculus Differentiation Mid-term Exam",
      subject: "Higher Math",
      score: 22,
      totalScore: 25,
      percentage: 88,
      date: "May 12, 2026",
      status: "Passed",
      duration: "30 mins"
    },
    {
      id: "q-03",
      title: "Organic Chemistry Reaction Mechanism Test",
      subject: "Chemistry",
      score: 25,
      totalScore: 25,
      percentage: 100,
      date: "Apr 28, 2026",
      status: "Excellent",
      duration: "20 mins"
    },
    {
      id: "q-04",
      title: "ICT Number Systems & Logic Gates Model Test",
      subject: "ICT",
      score: 18,
      totalScore: 20,
      percentage: 90,
      date: "Apr 15, 2026",
      status: "Passed",
      duration: "15 mins"
    }
  ];

  const liveClasses: LiveClassSchedule[] = [
    {
      id: "live-1",
      title: "Live Doubt Clearing: Newtonian Mechanics Problem Solving",
      subject: "Physics",
      instructor: "Engr. Mahmudul Hasan",
      instructorTitle: "Ex-BUET, Senior Faculty",
      date: "Today",
      time: "8:00 PM - 9:30 PM",
      isToday: true,
      joinUrl: "https://meet.google.com/bostami-physics-live",
      platform: "Google Meet"
    },
    {
      id: "live-2",
      title: "Higher Math Special: Definite Integrals Shortcut Tricks",
      subject: "Higher Math",
      instructor: "Dr. Rafiqul Islam",
      instructorTitle: "Dept. of Mathematics, DU",
      date: "Tomorrow",
      time: "7:30 PM - 9:00 PM",
      isToday: false,
      joinUrl: "https://meet.google.com/bostami-math-live",
      platform: "Google Meet"
    },
    {
      id: "live-3",
      title: "Weekly CQ Solving Session: C Programming in ICT",
      subject: "ICT",
      instructor: "Tanvir Ahmed",
      instructorTitle: "Lead ICT Specialist",
      date: "Friday, May 22",
      time: "5:00 PM - 6:30 PM",
      isToday: false,
      joinUrl: "https://zoom.us/j/bostami-ict",
      platform: "Zoom"
    }
  ];

  const studyResources: StudyResource[] = [
    {
      id: "res-1",
      title: "Physics 1st Paper: Complete Vector & Dynamics Formula Sheet",
      subject: "Physics",
      fileSize: "3.4 MB",
      uploadDate: "May 15, 2026",
      downloads: 420,
      type: "Formula Sheet"
    },
    {
      id: "res-2",
      title: "Higher Math: 100 Essential Differentiation & Integration Practice CQ",
      subject: "Higher Math",
      fileSize: "5.8 MB",
      uploadDate: "May 10, 2026",
      downloads: 380,
      type: "Model Test Paper"
    },
    {
      id: "res-3",
      title: "Chemistry Organic Reactions Complete Summary Chart (Colored)",
      subject: "Chemistry",
      fileSize: "2.1 MB",
      uploadDate: "May 02, 2026",
      downloads: 512,
      type: "PDF Handout"
    },
    {
      id: "res-4",
      title: "ICT C Programming 50 Common Board Exam Solutions Handout",
      subject: "ICT",
      fileSize: "4.2 MB",
      uploadDate: "Apr 25, 2026",
      downloads: 290,
      type: "PDF Handout"
    }
  ];

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return enrolledCourses.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchSearch) return false;
      if (courseFilter === "in-progress") return c.status === "in-progress";
      if (courseFilter === "completed") return c.status === "completed";
      return true;
    });
  }, [enrolledCourses, searchQuery, courseFilter]);

  const primaryContinueCourse = enrolledCourses[0];

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f8fafc]">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-200 border-t-emerald-600 animate-spin mb-4" />
          <p className="text-sm font-semibold text-slate-700">
            {loading ? "Verifying student session..." : "Redirecting to login..."}
          </p>
          <p className="text-xs text-slate-400 mt-1">Please wait a moment</p>
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
        <section className="bg-white border-b border-slate-200/80">
          <div className="mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8">
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "courses", label: "My Courses", icon: BookOpen },
                { id: "quizzes", label: "Quizzes & Marks", icon: FileCheck2 },
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
              {/* Trailing spacer so last tab is never clipped */}
              <div className="shrink-0 w-4" />
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════
            2. MAIN CONTENT AREA
        ══════════════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-6">
          
          {/* ─────────────────────────────────────────────────────────────
              TAB 1: DASHBOARD OVERVIEW (CLEAN & SIMPLE)
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              
              {/* 4 Clean Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <BookOpen size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">4 Courses</h3>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
                    <CheckCircle2 size={12} /> 3 In progress, 1 completed
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Completed Lectures</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <FileCheck2 size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">120 / 162</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    74% Total syllabus finished
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Average Quiz Score</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <TrendingUp size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">93.5%</h3>
                  <p className="text-[11px] text-emerald-600 font-medium mt-1">
                    Grade: Excellent (Top Rank)
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Study Time Logged</span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <Clock size={16} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">42.8 Hours</h3>
                  <p className="text-[11px] text-slate-500 font-medium mt-1">
                    +6.2 hours this week
                  </p>
                </div>

              </div>

              {/* CONTINUE LEARNING HERO BANNER */}
              <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 rounded-2xl p-6 text-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="inline-block text-[11px] font-semibold bg-emerald-700/80 text-emerald-100 px-2.5 py-0.5 rounded-md">
                    Continue Learning
                  </span>
                  <h3 className="text-lg md:text-xl font-bold text-white">
                    {primaryContinueCourse.title}
                  </h3>
                  <p className="text-xs text-emerald-100/90 leading-relaxed">
                    Current Topic: <span className="font-semibold text-white">{primaryContinueCourse.currentLesson}</span>
                  </p>

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
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => setActiveVideoModal(primaryContinueCourse)}
                    className="inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-950 font-bold px-5 py-2.5 rounded-xl text-xs transition cursor-pointer shadow-sm"
                  >
                    <Play size={14} className="fill-emerald-950 text-emerald-950" />
                    <span>Resume Video</span>
                  </button>

                  <button
                    onClick={() => showToast("Downloading Chapter 4 Lecture Notes PDF...")}
                    className="inline-flex items-center justify-center gap-2 bg-emerald-700/80 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl text-xs transition cursor-pointer border border-emerald-600"
                  >
                    <Download size={14} />
                    <span>Download Notes</span>
                  </button>
                </div>
              </div>

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
                        <span>View all</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {enrolledCourses.map((course) => (
                        <div 
                          key={course.id}
                          className="p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                {course.category}
                              </span>
                              <span className="text-xs text-slate-500">• {course.instructor}</span>
                            </div>

                            <h4 className="text-sm font-bold text-slate-900 truncate">
                              {course.title}
                            </h4>

                            <p className="text-xs text-slate-500 truncate">
                              Next: {course.nextLesson}
                            </p>

                            <div className="flex items-center gap-3 pt-1">
                              <div className="flex-1 bg-slate-200 h-1.5 rounded-full overflow-hidden max-w-xs">
                                <div 
                                  className="bg-emerald-600 h-full rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                              <span className="text-[11px] font-bold text-slate-700">
                                {course.progress}%
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                            {course.status === "completed" ? (
                              <button
                                onClick={() => setActiveCertModal(course)}
                                className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold px-3.5 py-2 rounded-xl text-xs border border-emerald-200 transition cursor-pointer"
                              >
                                <Award size={14} />
                                <span>Certificate</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => setActiveVideoModal(course)}
                                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3.5 py-2 rounded-xl text-xs transition cursor-pointer shadow-2xs"
                              >
                                <Play size={12} className="fill-white" />
                                <span>Watch</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Quiz Scores */}
                  <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-slate-900">Recent Model Test Marks</h3>
                        <p className="text-xs text-slate-500">Your latest quiz results and evaluations</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("quizzes")}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        Full Report
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-200/80 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                            <th className="pb-2.5">Test Title</th>
                            <th className="pb-2.5">Subject</th>
                            <th className="pb-2.5">Score</th>
                            <th className="pb-2.5">Percentage</th>
                            <th className="pb-2.5 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {quizResults.slice(0, 3).map((quiz) => (
                            <tr key={quiz.id} className="hover:bg-slate-50">
                              <td className="py-3 font-semibold text-slate-800">{quiz.title}</td>
                              <td className="py-3 text-slate-500">{quiz.subject}</td>
                              <td className="py-3 font-bold text-slate-900">{quiz.score} / {quiz.totalScore}</td>
                              <td className="py-3 font-bold text-emerald-600">{quiz.percentage}%</td>
                              <td className="py-3 text-right">
                                <span className="inline-block bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                                  {quiz.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right 1 Col: Live Classes & Quick Resources */}
                <div className="space-y-4">
                  
                  {/* Today's Live Class */}
                  <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900">Live Classes</h3>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Active Today
                      </span>
                    </div>

                    <div className="space-y-3">
                      {liveClasses.map((live) => (
                        <div 
                          key={live.id}
                          className={`p-3.5 rounded-xl border transition ${
                            live.isToday 
                              ? "bg-emerald-50/50 border-emerald-200" 
                              : "bg-slate-50 border-slate-200/60"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 mb-1">
                            <span className="text-emerald-700 font-bold">{live.subject}</span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <Clock size={11} /> {live.time}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 leading-snug mb-2">
                            {live.title}
                          </h4>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-[11px] text-slate-500">{live.instructor}</span>
                            <a
                              href={live.joinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs"
                            >
                              <Video size={12} />
                              <span>Join</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Study PDF Resources */}
                  <div className="bg-white rounded-2xl p-5 md:p-6 border border-slate-200/80 shadow-2xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-slate-900">Lecture Handouts</h3>
                      <button 
                        onClick={() => setActiveTab("resources")}
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {studyResources.slice(0, 3).map((res) => (
                        <div 
                          key={res.id}
                          className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 transition flex items-center justify-between gap-3"
                        >
                          <div className="min-w-0">
                            <h5 className="text-xs font-semibold text-slate-900 truncate">
                              {res.title}
                            </h5>
                            <p className="text-[10px] text-slate-500 mt-0.5">
                              {res.subject} • {res.fileSize}
                            </p>
                          </div>

                          <button
                            onClick={() => showToast(`Downloading ${res.title}...`)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-300 text-slate-600 hover:text-emerald-600 transition cursor-pointer shrink-0"
                            title="Download Handout"
                          >
                            <Download size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 2: ENROLLED COURSES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "courses" && (
            <div className="space-y-6">
              
              {/* Controls bar */}
              <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {(["all", "in-progress", "completed"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setCourseFilter(filter)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer capitalize ${
                        courseFilter === filter
                          ? "bg-emerald-600 text-white shadow-2xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {filter === "all" ? "All Courses" : filter.replace("-", " ")}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-72">
                  <input
                    type="text"
                    placeholder="Search enrolled courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 pr-9"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredCourses.map((course) => (
                  <div 
                    key={course.id}
                    className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-2xs hover:shadow-xs transition flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                          {course.category}
                        </span>
                        <span className="text-xs text-slate-400">
                          Last active: {course.lastWatched}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900">
                        {course.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <div className="relative w-5 h-5 rounded-full overflow-hidden bg-slate-200">
                          <Image src={course.instructorAvatar} alt={course.instructor} fill className="object-cover" />
                        </div>
                        <span>Instructor: <strong className="text-slate-700 font-semibold">{course.instructor}</strong></span>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600 space-y-1">
                        <p><span className="font-semibold text-slate-700">Current:</span> {course.currentLesson}</p>
                        <p><span className="font-semibold text-slate-700">Next:</span> {course.nextLesson}</p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-600">
                          <span>{course.completedLectures} of {course.totalLectures} lectures completed</span>
                          <span className="text-emerald-700 font-bold">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-full rounded-full transition-all"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <button
                          onClick={() => showToast(`Downloading ${course.notesPdfUrl}...`)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-emerald-700 cursor-pointer"
                        >
                          <FileDown size={14} />
                          <span>Lecture Notes</span>
                        </button>

                        {course.status === "completed" ? (
                          <button
                            onClick={() => setActiveCertModal(course)}
                            className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-4 py-2 rounded-xl text-xs border border-emerald-200 transition cursor-pointer"
                          >
                            <Award size={14} />
                            <span>View Certificate</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setActiveVideoModal(course)}
                            className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer shadow-2xs"
                          >
                            <Play size={12} className="fill-white" />
                            <span>Continue Watching</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 3: QUIZZES & MARKS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "quizzes" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Quiz & Model Test Evaluations</h3>
                  <p className="text-xs text-slate-500">Review your past scores, answer solutions, and rank</p>
                </div>

                <div className="divide-y divide-slate-100">
                  {quizResults.map((quiz) => (
                    <div key={quiz.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            {quiz.subject}
                          </span>
                          <span className="text-xs text-slate-400">• Date: {quiz.date}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{quiz.title}</h4>
                        <p className="text-xs text-slate-500">Exam duration: {quiz.duration}</p>
                      </div>

                      <div className="flex items-center gap-4 self-end sm:self-center">
                        <div className="text-right">
                          <span className="text-lg font-bold text-emerald-600">{quiz.score} / {quiz.totalScore}</span>
                          <p className="text-[11px] font-semibold text-slate-500">{quiz.percentage}% Mark</p>
                        </div>
                        <button
                          onClick={() => showToast("Loading detailed answer explanations...")}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-3.5 py-2 rounded-xl text-xs transition cursor-pointer"
                        >
                          Review Answers
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 4: LIVE CLASSES ROUTINE
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "live" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Weekly Live Interactive Schedule</h3>
                    <p className="text-xs text-slate-500">Join your live batches, doubt clearing, and mentor Q&A sessions</p>
                  </div>
                  <button
                    onClick={() => showToast("Calendar sync file (.ics) downloaded!")}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl cursor-pointer self-start sm:self-auto"
                  >
                    <Calendar size={14} />
                    <span>Sync with Google Calendar</span>
                  </button>
                </div>

                <div className="space-y-3 pt-2">
                  {liveClasses.map((item) => (
                    <div 
                      key={item.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                            {item.subject}
                          </span>
                          <span className="text-xs font-bold text-slate-600">{item.date} • {item.time}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500">{item.instructor} ({item.instructorTitle})</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                          {item.platform}
                        </span>
                        <a
                          href={item.joinUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-2xs"
                        >
                          <Video size={14} />
                          <span>Join Live Class</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 5: LECTURE NOTES & PDF RESOURCES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "resources" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Lecture Handouts & Formula Cheatsheets</h3>
                  <p className="text-xs text-slate-500">Download high-resolution chapter notes curated by course faculty</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {studyResources.map((res) => (
                    <div 
                      key={res.id}
                      className="p-4 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start justify-between gap-4 hover:bg-slate-100/70 transition"
                    >
                      <div className="space-y-1 min-w-0">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {res.type}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">
                          {res.title}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {res.subject} • {res.fileSize} • {res.downloads} downloads
                        </p>
                      </div>

                      <button
                        onClick={() => showToast(`Downloading ${res.title}...`)}
                        className="inline-flex items-center gap-1.5 bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer shrink-0 shadow-2xs"
                      >
                        <Download size={13} />
                        <span>PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 6: CERTIFICATES
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "certificates" && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Achieved Course Certificates</h3>
                  <p className="text-xs text-slate-500">Download and verify your earned credentials</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-emerald-200 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                          Completed • Grade: Distinction (100%)
                        </span>
                        <span className="text-xs text-slate-400 font-medium">April 2026</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900">
                        HSC Chemistry 2nd Paper (Organic Chemistry)
                      </h4>
                      <p className="text-xs text-slate-600">
                        Instructor: <strong>Afsana Rahman</strong> • Verified Credential ID: <code className="font-mono text-emerald-700">BST-CHEM-2026-891</code>
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200/60">
                      <button
                        onClick={() => setActiveCertModal(enrolledCourses[2])}
                        className="text-xs font-semibold text-emerald-700 hover:underline cursor-pointer"
                      >
                        Preview Certificate
                      </button>
                      <button
                        onClick={() => showToast("Downloading certificate PDF...")}
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition cursor-pointer shadow-2xs"
                      >
                        <Download size={13} />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              TAB 7: PROFILE & SETTINGS
          ───────────────────────────────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-2xs space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Student Profile & Preferences</h3>
                <p className="text-xs text-slate-500">Update your academic information and personal details</p>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  showToast("Profile details updated successfully!");
                }}
                className="space-y-4 max-w-2xl"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Full Name</label>
                    <input 
                      type="text" 
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Email Address</label>
                    <input 
                      type="email" 
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">Phone Number</label>
                    <input 
                      type="text" 
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-700">College / Institution</label>
                    <input 
                      type="text" 
                      value={profile.institution}
                      onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-xs font-semibold text-slate-700">Target Goal</label>
                    <input 
                      type="text" 
                      value={profile.target}
                      onChange={(e) => setProfile({ ...profile, target: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                <div className="pt-3 flex justify-end">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs transition cursor-pointer shadow-2xs"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </main>

      {/* ══════════════════════════════════════════════
          3. INTERACTIVE MODALS
      ══════════════════════════════════════════════ */}

      {/* VIDEO PLAYER MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 md:p-6 shadow-xl relative border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveVideoModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                {activeVideoModal.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {activeVideoModal.title}
              </h3>
              <p className="text-xs text-slate-500">
                Playing: {activeVideoModal.currentLesson}
              </p>
            </div>

            {/* Video Frame Placeholder */}
            <div className="aspect-video rounded-xl bg-slate-900 flex items-center justify-center relative overflow-hidden group">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-105 transition cursor-pointer">
                <Play size={24} className="fill-white translate-x-0.5" />
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-slate-300 font-medium bg-slate-950/60 px-3 py-1.5 rounded-lg">
                <span>Instructor: {activeVideoModal.instructor}</span>
                <span>1080p HD</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button
                onClick={() => showToast("Previous lesson loaded")}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs cursor-pointer"
              >
                ← Previous
              </button>
              <button
                onClick={() => {
                  showToast("Lecture marked completed! Keep it up 🚀");
                  setActiveVideoModal(null);
                }}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Check size={14} />
                <span>Mark Complete & Next</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CERTIFICATE MODAL */}
      {activeCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl relative border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setActiveCertModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Certificate Frame */}
            <div className="border-4 border-emerald-600/30 rounded-xl p-6 bg-emerald-50/20 text-center space-y-3">
              <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-[11px] tracking-wider uppercase">
                <Award size={16} />
                <span>Bostami Education • Certificate of Completion</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                {activeCertModal.title}
              </h3>

              <p className="text-xs text-slate-500">Presented to</p>
              <h2 className="text-xl font-serif font-bold text-emerald-800">
                {profile.name}
              </h2>

              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                For successfully fulfilling all curriculum requirements and passing final exams in <strong>{activeCertModal.title}</strong>.
              </p>

              <div className="pt-3 border-t border-emerald-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Instructor: <strong>{activeCertModal.instructor}</strong></span>
                <span>ID: <strong className="font-mono text-emerald-700">{activeCertModal.certificateId || "BST-2026-990"}</strong></span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveCertModal(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs transition cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => {
                  showToast("Downloading verified certificate PDF...");
                  setActiveCertModal(null);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-xs transition cursor-pointer flex items-center gap-1.5"
              >
                <Download size={13} />
                <span>Download PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
