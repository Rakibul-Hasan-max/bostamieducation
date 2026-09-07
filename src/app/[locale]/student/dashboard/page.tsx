"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useMemo } from "react";
import Image from "next/image";
import { 
  LayoutDashboard, 
  Tv, 
  HelpCircle, 
  Edit3, 
  Settings, 
  LogOut,
  Search,
  ChevronDown,
  Award,
  ClipboardCheck,
  PlayCircle,
  Check,
  Layers,
  Flame,
  Zap,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
  Share2,
  CheckCircle2,
  Video,
  Sparkles,
  Target,
  ExternalLink,
  ShieldCheck,
  X,
  Grid,
  List,
  ChevronRight,
  Bookmark
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

// ── Types ──
interface CourseItem {
  id: number;
  title: string;
  category: string;
  instructor: string;
  instructorAvatar: string;
  progress: number;
  totalLectures: number;
  completedLectures: number;
  duration: string;
  gradient: string;
  iconType: "react" | "figma" | "python" | "physics" | "ai";
  status: "in-progress" | "completed";
  nextLesson: string;
  bookmarked?: boolean;
  certificateId?: string;
}

interface QuizItem {
  id: number;
  title: string;
  courseTitle: string;
  score: number;
  totalQuestions: number;
  date: string;
  status: "Passed" | "Needs Review" | "Pending";
  timeSpent: string;
}

interface CertificateItem {
  id: string;
  title: string;
  courseName: string;
  issueDate: string;
  grade: string;
  instructor: string;
  credentialUrl: string;
  skills: string[];
}

interface LiveSession {
  id: number;
  title: string;
  mentor: string;
  mentorRole: string;
  mentorAvatar: string;
  date: string;
  time: string;
  joinUrl: string;
  type: "Live Workshop" | "1-on-1 Mentorship" | "Doubt Clearing";
  status: "Upcoming" | "Starting Soon" | "Recorded";
}

// ── Weekly Activity Mock Data ──
const weeklyActivityData = [
  { day: "Mon", hours: 2.5, target: 2.0 },
  { day: "Tue", hours: 3.8, target: 2.0 },
  { day: "Wed", hours: 1.5, target: 2.0 },
  { day: "Thu", hours: 4.2, target: 2.0 },
  { day: "Fri", hours: 3.0, target: 2.0 },
  { day: "Sat", hours: 5.4, target: 2.0 },
  { day: "Sun", hours: 3.6, target: 2.0 },
];

// ── Custom Tooltip for Chart ──
const CustomChartTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#132238] text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700/50">
        <p className="font-bold text-slate-200 mb-1">{label} Study Time</p>
        <p className="text-amber-400 font-extrabold">{payload[0].value} Hours</p>
        <p className="text-[10px] text-slate-400 mt-0.5">Goal: {payload[0].payload.target}h/day</p>
      </div>
    );
  }
  return null;
};

export default function StudentDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<"all" | "in-progress" | "completed" | "bookmarked">("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [sortBy, setSortBy] = useState("recent");
  
  // Interactive Modals State
  const [selectedCertificate, setSelectedCertificate] = useState<CertificateItem | null>(null);
  const [activeLessonModal, setActiveLessonModal] = useState<CourseItem | null>(null);
  const [activeQuizModal, setActiveQuizModal] = useState<QuizItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Profile Form State
  const [profileData, setProfileData] = useState({
    fullName: "Lori Stevens",
    email: "lori.stevens@bostamiedu.com",
    phone: "+880 1712-345678",
    bio: "Passionate CS undergraduate focusing on Full Stack Web Development & Machine Learning.",
    careerGoal: "Full-Stack Software Engineer at top tech company",
    dailyTargetHours: 3,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
  });

  // Settings Toggles State
  const [settings, setSettings] = useState({
    emailNotifs: true,
    classReminders: true,
    assignmentAlerts: true,
    weeklyDigest: false,
    twoFactorAuth: false,
    publicProfile: true,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // ── Navigation Tabs ──
  const sidebarNavItems = [
    { label: "Dashboard", icon: LayoutDashboard, badge: undefined },
    { label: "My Courses", icon: Tv, badge: "3 Active" },
    { label: "Quizzes & Tests", icon: HelpCircle, badge: "1 Due" },
    { label: "Certificates", icon: Award, badge: "8" },
    { label: "Live Schedule", icon: Calendar, badge: "Live Today" },
    { label: "My Subscriptions", icon: Layers, badge: "Pro" },
    { label: "Edit Profile", icon: Edit3, badge: undefined },
    { label: "Settings", icon: Settings, badge: undefined },
  ];

  // ── Courses Data ──
  const [courses, setCourses] = useState<CourseItem[]>([
    {
      id: 1,
      title: "Building Scalable APIs with GraphQL & Node.js",
      category: "Technical & ICT",
      instructor: "Engr. Tanvir Ahmed",
      instructorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      progress: 85,
      totalLectures: 56,
      completedLectures: 48,
      duration: "18h 40m",
      gradient: "from-amber-500 to-orange-600",
      iconType: "react",
      status: "in-progress",
      nextLesson: "Module 6: Subscriptions & Realtime WebSocket Events",
      bookmarked: true,
    },
    {
      id: 2,
      title: "Complete Design System & UX in Figma 2026",
      category: "Design",
      instructor: "Ayesha Siddiqua",
      instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
      progress: 100,
      totalLectures: 42,
      completedLectures: 42,
      duration: "12h 15m",
      gradient: "from-pink-500 to-rose-600",
      iconType: "figma",
      status: "completed",
      nextLesson: "Course Completed! You have claimed your certificate.",
      bookmarked: true,
      certificateId: "BST-FGM-2026-9481",
    },
    {
      id: 3,
      title: "HSC 2026 Higher Math Masterclass (Calculus & Vectors)",
      category: "Math",
      instructor: "Dr. Rafiqul Islam",
      instructorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
      progress: 60,
      totalLectures: 36,
      completedLectures: 22,
      duration: "24h 00m",
      gradient: "from-blue-600 to-indigo-700",
      iconType: "physics",
      status: "in-progress",
      nextLesson: "Lesson 23: Definite Integrals by Substitution Method",
      bookmarked: false,
    },
    {
      id: 4,
      title: "Full-Stack Web Development in Python & Django",
      category: "Technical & ICT",
      instructor: "Md. Mahmudul Hasan",
      instructorAvatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=120",
      progress: 35,
      totalLectures: 48,
      completedLectures: 17,
      duration: "21h 30m",
      gradient: "from-emerald-500 to-teal-700",
      iconType: "python",
      status: "in-progress",
      nextLesson: "Module 3: PostgreSQL Database Models and ForeignKeys",
      bookmarked: false,
    },
    {
      id: 5,
      title: "Physics Mechanics & Gravitation for Admission Tests",
      category: "Physics",
      instructor: "Shariful Alam, BUET",
      instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120",
      progress: 100,
      totalLectures: 30,
      completedLectures: 30,
      duration: "15h 45m",
      gradient: "from-violet-600 to-purple-800",
      iconType: "physics",
      status: "completed",
      nextLesson: "Course Completed! You have claimed your certificate.",
      bookmarked: true,
      certificateId: "BST-PHY-2025-7720",
    }
  ]);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCourses(prev => prev.map(c => c.id === id ? { ...c, bookmarked: !c.bookmarked } : c));
    showToast("Course bookmark updated!");
  };

  // ── Quizzes Data ──
  const quizzesList: QuizItem[] = [
    {
      id: 101,
      title: "GraphQL Schema & Mutation Mastery Test",
      courseTitle: "Building Scalable APIs with GraphQL & Node.js",
      score: 95,
      totalQuestions: 20,
      date: "May 18, 2026",
      status: "Passed",
      timeSpent: "14 mins"
    },
    {
      id: 102,
      title: "Figma Components & Auto-layout Capstone Quiz",
      courseTitle: "Complete Design System & UX in Figma 2026",
      score: 100,
      totalQuestions: 25,
      date: "Apr 28, 2026",
      status: "Passed",
      timeSpent: "18 mins"
    },
    {
      id: 103,
      title: "Calculus Differentiation & Tangent Mid-term Test",
      courseTitle: "HSC 2026 Higher Math Masterclass",
      score: 82,
      totalQuestions: 15,
      date: "May 10, 2026",
      status: "Passed",
      timeSpent: "22 mins"
    },
    {
      id: 104,
      title: "Django ORM & QuerySet Optimization Challenge",
      courseTitle: "Full-Stack Web Development in Python",
      score: 0,
      totalQuestions: 20,
      date: "Due in 2 days",
      status: "Pending",
      timeSpent: "--"
    }
  ];

  // ── Certificates Data ──
  const certificatesList: CertificateItem[] = [
    {
      id: "BST-FGM-2026-9481",
      title: "Professional UI/UX & Figma Design Specialist",
      courseName: "Complete Design System & UX in Figma 2026",
      issueDate: "April 29, 2026",
      grade: "Grade: Distinction (98%)",
      instructor: "Ayesha Siddiqua (Lead Product Designer)",
      credentialUrl: "https://bostamiedu.com/verify/BST-FGM-2026-9481",
      skills: ["Design Systems", "Auto-layout", "Design Tokens", "Wireframing", "Prototyping"]
    },
    {
      id: "BST-PHY-2025-7720",
      title: "Excellence in Classical Mechanics & Gravitation",
      courseName: "Physics Mechanics & Gravitation for Admission Tests",
      issueDate: "January 14, 2026",
      grade: "Grade: High Honors (96%)",
      instructor: "Shariful Alam (Senior Physics Faculty, BUET)",
      credentialUrl: "https://bostamiedu.com/verify/BST-PHY-2025-7720",
      skills: ["Newtonian Mechanics", "Circular Motion", "Work Energy Power", "Gravitational Field"]
    },
    {
      id: "BST-WEB-2025-3319",
      title: "Modern JavaScript & React 19 Frontend Developer",
      courseName: "Modern JavaScript (ES2025) & React Mastery",
      issueDate: "November 08, 2025",
      grade: "Grade: Honors (92%)",
      instructor: "Engr. Tanvir Ahmed (Tech Lead)",
      credentialUrl: "https://bostamiedu.com/verify/BST-WEB-2025-3319",
      skills: ["React Hooks", "State Management", "TypeScript", "Performance Tuning"]
    }
  ];

  // ── Live Sessions Data ──
  const liveSessionsList: LiveSession[] = [
    {
      id: 201,
      title: "Live Doubt Clearing: Advanced GraphQL Caching & DataLoader",
      mentor: "Engr. Tanvir Ahmed",
      mentorRole: "Senior Backend Architect",
      mentorAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=120",
      date: "Today",
      time: "8:00 PM - 9:30 PM (BST)",
      joinUrl: "https://meet.google.com/xyz-bostami-live",
      type: "Live Workshop",
      status: "Starting Soon"
    },
    {
      id: 202,
      title: "Higher Math Special: Integral Problem-Solving Secrets",
      mentor: "Dr. Rafiqul Islam",
      mentorRole: "Department of Mathematics, DU",
      mentorAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=120",
      date: "Tomorrow, May 22",
      time: "7:00 PM - 8:30 PM (BST)",
      joinUrl: "https://meet.google.com/math-live-2026",
      type: "Doubt Clearing",
      status: "Upcoming"
    },
    {
      id: 203,
      title: "1-on-1 Career Mentorship & Portfolio Review",
      mentor: "Ayesha Siddiqua",
      mentorRole: "Senior UX Specialist",
      mentorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120",
      date: "Friday, May 24",
      time: "4:00 PM - 4:45 PM (BST)",
      joinUrl: "https://meet.google.com/mentor-portfolio",
      type: "1-on-1 Mentorship",
      status: "Upcoming"
    }
  ];

  // ── Filtered Courses ──
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;
      if (courseFilter === "in-progress") return c.status === "in-progress";
      if (courseFilter === "completed") return c.status === "completed";
      if (courseFilter === "bookmarked") return c.bookmarked;
      return true;
    }).sort((a, b) => {
      if (sortBy === "progress-high") return b.progress - a.progress;
      if (sortBy === "progress-low") return a.progress - b.progress;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return b.id - a.id;
    });
  }, [courses, searchQuery, courseFilter, sortBy]);

  // Handle Profile Update
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile information updated successfully! ✨");
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-amber-400 selection:text-slate-950">
      <Navbar />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#132238] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Check size={14} className="stroke-[3]" />
          </div>
          <p className="text-xs font-bold">{toastMessage}</p>
        </div>
      )}

      <main className="flex-1 pb-20">
        
        {/* ══════════════════════════════════════════════
            1. MODERN HERO BANNER WITH AMBIENT LIGHTING
        ══════════════════════════════════════════════ */}
        <div className="relative h-56 md:h-64 bg-gradient-to-r from-[#0d1627] via-[#132238] to-[#1c2e4a] overflow-hidden">
          {/* Ambient Glow Orbs */}
          <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
          <div className="absolute top-10 left-1/3 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

          {/* Subtle Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "24px 24px" }} 
          />

          <div className="mx-auto max-w-7xl px-4 md:px-6 h-full flex flex-col justify-center pb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 text-white/90">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-2">
                  <Flame size={14} className="text-amber-400 fill-amber-400 animate-pulse" />
                  <span>12-Day Daily Learning Streak!</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">{profileData.fullName}</span> 👋
                </h1>
                <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-xl">
                  You are making phenomenal progress. You have completed <strong className="text-white">82%</strong> of this week&apos;s study goal!
                </p>
              </div>

              {/* Quick Resume Pill */}
              <button 
                onClick={() => setActiveLessonModal(courses[0])}
                className="hidden sm:inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <PlayCircle size={17} className="fill-slate-950 text-amber-400" />
                <span>Resume: GraphQL APIs (Lesson 49)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            2. FLOATING STUDENT PROFILE & STATS BAR
        ══════════════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 -mt-14 relative z-20">
          <div className="bg-white rounded-3xl p-5 md:p-6 shadow-xl shadow-slate-200/60 border border-slate-100 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left: Avatar & Personal Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left w-full lg:w-auto">
              {/* Profile Image with Golden Border & Pro Badge */}
              <div className="relative w-22 h-22 md:w-24 md:h-24 rounded-2xl p-1 bg-gradient-to-br from-amber-400 via-orange-400 to-amber-500 shadow-md shrink-0">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-200">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#132238] border-2 border-white text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <Zap size={10} className="fill-amber-400 text-amber-400" />
                  <span>PRO</span>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mb-1">
                  <h2 className="text-xl md:text-2xl font-black text-[#132238] tracking-tight">{profileData.fullName}</h2>
                  <span className="bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    Level 7 Scholar
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium mb-3">
                  {profileData.careerGoal}
                </p>

                {/* Level / XP Progress Bar */}
                <div className="flex items-center gap-3 w-full sm:w-72">
                  <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full w-[72%]" />
                  </div>
                  <span className="text-[11px] font-extrabold text-slate-600 shrink-0">
                    3,420 / 4,500 XP
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Quick Performance Badges & Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-3 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                  <Flame size={22} className="fill-amber-500 text-amber-500" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-slate-900">12 Days</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Streak</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/80 px-4 py-2.5 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0">
                  <Sparkles size={20} />
                </div>
                <div className="text-left">
                  <div className="text-sm font-black text-slate-900">3,420 pts</div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Reward Pts</div>
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText("https://bostamiedu.com/u/lori-stevens");
                  showToast("Public profile link copied to clipboard!");
                }}
                className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-2xl text-xs transition shadow-xs hover:border-slate-300 cursor-pointer"
              >
                <Share2 size={15} className="text-slate-500" />
                <span>Share Profile</span>
              </button>

              <button
                onClick={() => setActiveTab("Edit Profile")}
                className="flex items-center gap-2 bg-[#132238] hover:bg-[#1a2d4b] text-white font-bold px-4 py-2.5 rounded-2xl text-xs transition shadow-md cursor-pointer"
              >
                <Edit3 size={15} />
                <span>Edit Profile</span>
              </button>

            </div>

          </div>
        </div>

        {/* ══════════════════════════════════════════════
            3. MAIN DASHBOARD CONTENT AREA
        ══════════════════════════════════════════════ */}
        <div className="mx-auto max-w-7xl px-4 md:px-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* ── LEFT COLUMN: SIDEBAR NAVIGATION ── */}
            <aside className="lg:col-span-1 space-y-6">
              
              {/* Sidebar Menu Container */}
              <div className="bg-[#132238] rounded-3xl p-4 text-slate-300 shadow-xl border border-slate-800">
                <div className="px-3 py-2 mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Student Menu
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>

                <nav className="space-y-1.5">
                  {sidebarNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.label;

                    return (
                      <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black shadow-lg shadow-amber-400/20 translate-x-1"
                            : "text-slate-300 hover:text-white hover:bg-slate-800/70"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon 
                            size={18} 
                            className={isActive ? "text-slate-950" : "text-slate-400"} 
                          />
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                            isActive
                              ? "bg-slate-950 text-amber-400"
                              : item.badge.includes("Live") 
                                ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                : "bg-slate-800 text-slate-300"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}

                  <div className="pt-2 mt-2 border-t border-slate-800/80">
                    <button 
                      onClick={() => showToast("You have been signed out.")}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all cursor-pointer"
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </nav>
              </div>

              {/* Mentorship Support Card */}
              <div className="bg-gradient-to-br from-indigo-900 to-[#132238] rounded-3xl p-5 text-white border border-indigo-700/40 relative overflow-hidden shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                    <HelpCircle size={20} className="text-amber-300" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">Need 1-on-1 Guidance?</h4>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    Book a direct 30-minute mentoring session with experienced course instructors.
                  </p>
                  <button 
                    onClick={() => setActiveTab("Live Schedule")}
                    className="w-full bg-white hover:bg-slate-100 text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span>View Mentor Calendar</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </aside>

            {/* ── RIGHT COLUMN: DYNAMIC TAB CONTENT ── */}
            <div className="lg:col-span-3 space-y-8">
              
              {/* ─────────────────────────────────────────────────────────────
                  TAB 1: OVERVIEW / DASHBOARD TAB
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "Dashboard" && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  
                  {/* TOP 4 KEY METRIC CARDS */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    
                    {/* Metric 1: Enrolled Courses */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Courses</span>
                        <div className="w-11 h-11 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
                          <Tv size={22} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">5</h3>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold mt-2">
                        <TrendingUp size={14} />
                        <span>3 In Progress, 2 Completed</span>
                      </div>
                    </div>

                    {/* Metric 2: Completed Lessons */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lessons Finished</span>
                        <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
                          <ClipboardCheck size={22} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">139</h3>
                      <div className="flex items-center gap-1.5 text-xs text-purple-600 font-bold mt-2">
                        <span>+18 lessons this week</span>
                      </div>
                    </div>

                    {/* Metric 3: Certificates */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificates</span>
                        <div className="w-11 h-11 rounded-2xl bg-teal-500/10 text-teal-600 flex items-center justify-center">
                          <Award size={22} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">3</h3>
                      <div className="flex items-center gap-1.5 text-xs text-teal-600 font-bold mt-2">
                        <ShieldCheck size={14} />
                        <span>100% Verifiable credentials</span>
                      </div>
                    </div>

                    {/* Metric 4: Average Quiz Score */}
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Quiz Score</span>
                        <div className="w-11 h-11 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
                          <Target size={22} />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tight">92.3%</h3>
                      <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold mt-2">
                        <span>Top 5% in cohort</span>
                      </div>
                    </div>

                  </div>

                  {/* CONTINUE LEARNING HERO FEATURE CARD */}
                  <div className="bg-gradient-to-br from-[#132238] via-[#182a45] to-[#111c2e] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="space-y-3 max-w-xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold">
                          <PlayCircle size={14} />
                          <span>In-Progress Masterclass</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                          Building Scalable APIs with GraphQL & Node.js
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          Up Next: <span className="text-amber-300 font-bold">Module 6: Subscriptions & Realtime WebSocket Events</span> (Lesson 49 of 56)
                        </p>

                        {/* Progress meter */}
                        <div className="space-y-1.5 pt-2">
                          <div className="flex justify-between text-xs font-bold text-slate-300">
                            <span>Course Progress</span>
                            <span className="text-amber-400">85% Completed (48/56 Lessons)</span>
                          </div>
                          <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700/60">
                            <div className="bg-gradient-to-r from-amber-400 to-amber-500 h-full rounded-full w-[85%]" />
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button 
                        onClick={() => setActiveLessonModal(courses[0])}
                        className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-xs flex items-center gap-2.5 shadow-xl shadow-amber-500/20 hover:scale-105 transition-all cursor-pointer shrink-0"
                      >
                        <PlayCircle size={18} className="fill-slate-950 text-amber-400" />
                        <span>Resume Lesson</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-COLUMN SECTION: WEEKLY ACTIVITY CHART & UPCOMING LIVE SESSIONS */}
                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    
                    {/* Left 2 Cols: Study Hours Bar Chart */}
                    <div className="xl:col-span-2 bg-white rounded-3xl p-6 md:p-7 border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Weekly Learning Activity</h3>
                          <p className="text-xs text-slate-500">Daily study hours logged this week (Total: 24.0h)</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold">
                          <span className="inline-block w-3 h-3 rounded-full bg-amber-500" />
                          <span className="text-slate-600">Hours Studied</span>
                          <span className="inline-block w-3 h-0.5 bg-slate-300 ml-2" />
                          <span className="text-slate-400">Target (2h)</span>
                        </div>
                      </div>

                      <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={weeklyActivityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis 
                              dataKey="day" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: "#64748b", fontSize: 12, fontWeight: "bold" }} 
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: "#94a3b8", fontSize: 11 }}
                              unit="h"
                            />
                            <Tooltip content={<CustomChartTooltip />} />
                            <Bar 
                              dataKey="hours" 
                              fill="#f59e0b" 
                              radius={[8, 8, 0, 0]} 
                              barSize={32}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="flex items-center gap-1.5 text-emerald-600 font-bold">
                          <Sparkles size={15} /> 
                          <span>Great job! You beat your daily goal 6 of 7 days!</span>
                        </span>
                        <button 
                          onClick={() => showToast("Detailed logs exported!")}
                          className="text-blue-600 font-bold hover:underline cursor-pointer"
                        >
                          Export History
                        </button>
                      </div>
                    </div>

                    {/* Right 1 Col: Upcoming Live Sessions */}
                    <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Live Classes</h3>
                          <button 
                            onClick={() => setActiveTab("Live Schedule")}
                            className="text-xs font-bold text-amber-600 hover:text-amber-700 cursor-pointer"
                          >
                            View All
                          </button>
                        </div>

                        <div className="space-y-3.5">
                          {liveSessionsList.slice(0, 2).map((session) => (
                            <div 
                              key={session.id}
                              className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/70 transition space-y-2.5"
                            >
                              <div className="flex items-center justify-between text-[11px] font-bold">
                                <span className={`px-2.5 py-0.5 rounded-full ${
                                  session.status === "Starting Soon" 
                                    ? "bg-rose-100 text-rose-700 animate-pulse" 
                                    : "bg-blue-100 text-blue-700"
                                }`}>
                                  {session.status}
                                </span>
                                <span className="text-slate-500 flex items-center gap-1">
                                  <Clock size={12} /> {session.time}
                                </span>
                              </div>

                              <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                                {session.title}
                              </h4>

                              <div className="flex items-center justify-between pt-1">
                                <div className="flex items-center gap-2">
                                  <div className="relative w-6 h-6 rounded-full overflow-hidden">
                                    <Image src={session.mentorAvatar} alt={session.mentor} fill className="object-cover" />
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-600">{session.mentor}</span>
                                </div>

                                <a
                                  href={session.joinUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                >
                                  Join <ExternalLink size={12} />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <button 
                          onClick={() => setActiveTab("Live Schedule")}
                          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Calendar size={14} />
                          <span>Open Full Schedule</span>
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* GAMIFICATION & BADGES CAROUSEL / GRID */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 tracking-tight">Earned Badges & Milestones</h3>
                        <p className="text-xs text-slate-500">Unlock achievements by studying regularly and conquering quizzes</p>
                      </div>
                      <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
                        4 of 8 Unlocked
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-center space-y-2 group hover:scale-[1.02] transition">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-400/30">
                          <Flame size={24} className="fill-slate-950" />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">7-Day Fire Streak</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Studied 7 days consecutively</p>
                        <span className="inline-block text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">UNLOCKED</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 text-center space-y-2 group hover:scale-[1.02] transition">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-600/30">
                          <Award size={24} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Design Prodigy</h4>
                        <p className="text-[10px] text-slate-500 font-medium">100% in Figma UX Masterclass</p>
                        <span className="inline-block text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">UNLOCKED</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-center space-y-2 group hover:scale-[1.02] transition">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-600/30">
                          <Target size={24} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-900">Quiz Ace</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Scored 90%+ in 3 exams</p>
                        <span className="inline-block text-[9px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">UNLOCKED</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-300 text-center space-y-2 opacity-70 group hover:opacity-100 transition">
                        <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center">
                          <Sparkles size={24} />
                        </div>
                        <h4 className="text-xs font-bold text-slate-700">Century Scholar</h4>
                        <p className="text-[10px] text-slate-500 font-medium">Complete 200 lectures (139/200)</p>
                        <span className="inline-block text-[9px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">69% PROGRESS</span>
                      </div>

                    </div>
                  </div>

                  {/* RECENT ENROLLED COURSES TABLE */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight">Recent Enrolled Courses</h3>
                        <p className="text-xs text-slate-500">Pick up where you left off</p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("My Courses")}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                      >
                        <span>View All My Courses ({courses.length})</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {courses.slice(0, 3).map((course) => (
                        <div 
                          key={course.id}
                          className="p-4 md:p-5 rounded-2xl bg-slate-50/80 hover:bg-slate-100 border border-slate-200/70 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white shrink-0 shadow-sm`}>
                              <Tv size={22} />
                            </div>
                            <div className="space-y-1 min-w-0">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                                {course.category} • {course.instructor}
                              </span>
                              <h4 className="text-sm font-bold text-slate-900 truncate">
                                {course.title}
                              </h4>
                              <div className="flex items-center gap-3 text-xs text-slate-500">
                                <span>{course.completedLectures}/{course.totalLectures} Lessons</span>
                                <span>•</span>
                                <span className="font-bold text-slate-700">{course.progress}% Completed</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end md:self-auto">
                            {course.status === "completed" ? (
                              <button 
                                onClick={() => {
                                  const cert = certificatesList.find(c => c.courseName === course.title) || certificatesList[0];
                                  setSelectedCertificate(cert);
                                }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <Award size={15} />
                                <span>Certificate</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => setActiveLessonModal(course)}
                                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-sm"
                              >
                                <PlayCircle size={15} />
                                <span>Resume</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 2: MY COURSES TAB (RICH FILTERING, GRID / LIST TOGGLE)
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "My Courses" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Header & Controls */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">My Courses</h2>
                        <p className="text-xs text-slate-500">Manage and track your enrolled learning pathways</p>
                      </div>

                      {/* View Mode Toggle */}
                      <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl self-start md:self-auto">
                        <button
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                            viewMode === "list" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <List size={16} />
                        </button>
                        <button
                          onClick={() => setViewMode("grid")}
                          className={`p-2 rounded-lg text-xs font-bold transition cursor-pointer ${
                            viewMode === "grid" ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-900"
                          }`}
                        >
                          <Grid size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 pb-4">
                      {(["all", "in-progress", "completed", "bookmarked"] as const).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setCourseFilter(tab)}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                            courseFilter === tab
                              ? "bg-[#132238] text-white shadow-sm"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {tab === "all" && "All Courses"}
                          {tab === "in-progress" && "In Progress (3)"}
                          {tab === "completed" && "Completed (2)"}
                          {tab === "bookmarked" && "Bookmarked (3)"}
                        </button>
                      ))}
                    </div>

                    {/* Search & Sort Row */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="relative w-full sm:w-80">
                        <input
                          type="text"
                          placeholder="Search courses or instructors..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10"
                        />
                        <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                      </div>

                      <div className="relative w-full sm:w-48">
                        <select 
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 focus:outline-none appearance-none cursor-pointer"
                        >
                          <option value="recent">Sort by: Most Recent</option>
                          <option value="progress-high">Highest Progress</option>
                          <option value="progress-low">Lowest Progress</option>
                          <option value="title">Course Title (A-Z)</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Course Cards Container */}
                  {viewMode === "list" ? (
                    <div className="space-y-4">
                      {filteredCourses.map((course) => (
                        <div 
                          key={course.id}
                          className="bg-white rounded-3xl p-5 md:p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 group"
                        >
                          <div className="flex items-start gap-5 flex-1 min-w-0">
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white shrink-0 shadow-md`}>
                              <Tv size={28} />
                            </div>

                            <div className="space-y-2 flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                  {course.category}
                                </span>
                                <span className="text-xs text-slate-400">•</span>
                                <span className="text-xs text-slate-500 font-medium">
                                  {course.duration} total
                                </span>
                              </div>

                              <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition truncate">
                                {course.title}
                              </h3>

                              <div className="flex items-center gap-2 text-xs text-slate-500">
                                <div className="relative w-5 h-5 rounded-full overflow-hidden">
                                  <Image src={course.instructorAvatar} alt={course.instructor} fill className="object-cover" />
                                </div>
                                <span>{course.instructor}</span>
                              </div>

                              {/* Progress bar */}
                              <div className="space-y-1 pt-1 max-w-md">
                                <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                  <span>{course.completedLectures} of {course.totalLectures} lessons completed</span>
                                  <span className="text-slate-900 font-black">{course.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200/60">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${
                                      course.status === "completed" ? "bg-emerald-500" : "bg-amber-400"
                                    }`}
                                    style={{ width: `${course.progress}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-3 self-end lg:self-center shrink-0">
                            <button
                              onClick={(e) => toggleBookmark(course.id, e)}
                              className={`p-2.5 rounded-xl border transition cursor-pointer ${
                                course.bookmarked 
                                  ? "bg-amber-50 border-amber-300 text-amber-500" 
                                  : "bg-white border-slate-200 text-slate-400 hover:text-slate-600"
                              }`}
                              title={course.bookmarked ? "Remove Bookmark" : "Bookmark Course"}
                            >
                              <Bookmark size={16} className={course.bookmarked ? "fill-amber-500" : ""} />
                            </button>

                            {course.status === "completed" ? (
                              <button 
                                onClick={() => {
                                  const cert = certificatesList.find(c => c.courseName === course.title) || certificatesList[0];
                                  setSelectedCertificate(cert);
                                }}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-sm"
                              >
                                <Award size={16} />
                                <span>View Certificate</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => setActiveLessonModal(course)}
                                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer shadow-md shadow-amber-400/20"
                              >
                                <PlayCircle size={16} className="fill-slate-950 text-amber-400" />
                                <span>Continue Lesson</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredCourses.map((course) => (
                        <div 
                          key={course.id}
                          className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-4 group"
                        >
                          <div>
                            <div className={`h-36 w-full rounded-2xl bg-gradient-to-br ${course.gradient} flex items-center justify-center text-white relative shadow-sm mb-4`}>
                              <Tv size={42} />
                              <button
                                onClick={(e) => toggleBookmark(course.id, e)}
                                className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-md transition cursor-pointer ${
                                  course.bookmarked 
                                    ? "bg-white/90 text-amber-500 shadow-sm" 
                                    : "bg-black/20 text-white hover:bg-black/40"
                                }`}
                              >
                                <Bookmark size={15} className={course.bookmarked ? "fill-amber-500" : ""} />
                              </button>
                            </div>

                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                              {course.category}
                            </span>
                            <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition line-clamp-2 mt-1">
                              {course.title}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                              <div className="relative w-5 h-5 rounded-full overflow-hidden">
                                <Image src={course.instructorAvatar} alt={course.instructor} fill className="object-cover" />
                              </div>
                              <span className="truncate">{course.instructor}</span>
                            </div>
                          </div>

                          <div className="space-y-3 pt-2 border-t border-slate-100">
                            <div className="space-y-1">
                              <div className="flex justify-between text-[11px] font-bold text-slate-600">
                                <span>Progress</span>
                                <span className="text-slate-900 font-black">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${course.status === "completed" ? "bg-emerald-500" : "bg-amber-400"}`}
                                  style={{ width: `${course.progress}%` }}
                                />
                              </div>
                            </div>

                            {course.status === "completed" ? (
                              <button 
                                onClick={() => {
                                  const cert = certificatesList.find(c => c.courseName === course.title) || certificatesList[0];
                                  setSelectedCertificate(cert);
                                }}
                                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                              >
                                <Award size={15} />
                                <span>Certificate</span>
                              </button>
                            ) : (
                              <button 
                                onClick={() => setActiveLessonModal(course)}
                                className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition cursor-pointer"
                              >
                                <PlayCircle size={15} />
                                <span>Continue</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 3: QUIZZES & ASSESSMENTS TAB
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "Quizzes & Tests" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Summary Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                      <span className="text-xs font-bold text-slate-500">Total Quizzes Taken</span>
                      <h3 className="text-2xl font-black text-slate-900 mt-1">4</h3>
                    </div>
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                      <span className="text-xs font-bold text-slate-500">Average Quiz Accuracy</span>
                      <h3 className="text-2xl font-black text-emerald-600 mt-1">92.3%</h3>
                    </div>
                    <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                      <span className="text-xs font-bold text-slate-500">Upcoming Tests</span>
                      <h3 className="text-2xl font-black text-amber-500 mt-1">1 Test Due</h3>
                    </div>
                  </div>

                  {/* Quizzes List Card */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quiz & Assessment History</h2>
                      <p className="text-xs text-slate-500">Review your past scores and answer breakdowns</p>
                    </div>

                    <div className="space-y-4">
                      {quizzesList.map((quiz) => (
                        <div 
                          key={quiz.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                                quiz.status === "Passed" 
                                  ? "bg-emerald-100 text-emerald-700" 
                                  : "bg-amber-100 text-amber-800"
                              }`}>
                                {quiz.status}
                              </span>
                              <span className="text-xs text-slate-400">•</span>
                              <span className="text-xs text-slate-500">{quiz.date}</span>
                            </div>

                            <h4 className="text-base font-bold text-slate-900">
                              {quiz.title}
                            </h4>
                            <p className="text-xs text-slate-500">
                              Course: <span className="font-semibold text-slate-700">{quiz.courseTitle}</span>
                            </p>
                          </div>

                          <div className="flex items-center gap-5 self-end md:self-auto">
                            {quiz.status === "Passed" ? (
                              <div className="text-right">
                                <span className="text-2xl font-black text-emerald-600">{quiz.score}%</span>
                                <p className="text-[10px] font-bold text-slate-400">{quiz.timeSpent}</p>
                              </div>
                            ) : (
                              <div className="text-right">
                                <span className="text-sm font-bold text-amber-600">Pending</span>
                                <p className="text-[10px] font-bold text-slate-400">20 Questions</p>
                              </div>
                            )}

                            {quiz.status === "Passed" ? (
                              <button 
                                onClick={() => setActiveQuizModal(quiz)}
                                className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                              >
                                View Report
                              </button>
                            ) : (
                              <button 
                                onClick={() => showToast("Starting assessment environment...")}
                                className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer"
                              >
                                Start Quiz
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 4: CERTIFICATES & CREDENTIALS TAB
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "Certificates" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  <div className="bg-gradient-to-r from-teal-900 to-[#132238] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-xl space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-400/20 text-teal-300 text-xs font-bold">
                        <ShieldCheck size={14} />
                        <span>Verified Credentials</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-white tracking-tight">
                        Official Bostami Education Certificates
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Every certificate contains a cryptographic verification ID and QR code recognizable worldwide by employers and academic institutions.
                      </p>
                    </div>
                  </div>

                  {/* Certificates Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {certificatesList.map((cert) => (
                      <div 
                        key={cert.id}
                        className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-5"
                      >
                        <div className="space-y-3">
                          {/* Certificate Badge & Issue Date */}
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                              {cert.grade}
                            </span>
                            <span className="text-xs font-medium text-slate-400">
                              Issued: {cert.issueDate}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-900">
                            {cert.title}
                          </h3>

                          <p className="text-xs text-slate-600 font-medium">
                            Course: <strong className="text-slate-800">{cert.courseName}</strong>
                          </p>

                          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-50 p-2 rounded-xl border border-slate-200/60">
                            <span className="font-bold text-slate-500">ID:</span> {cert.id}
                          </div>

                          {/* Skills Tags */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {cert.skills.map((skill, i) => (
                              <span key={i} className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-md">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          <button 
                            onClick={() => setSelectedCertificate(cert)}
                            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Award size={15} />
                            <span>Preview</span>
                          </button>

                          <button 
                            onClick={() => {
                              navigator.clipboard?.writeText(cert.credentialUrl);
                              showToast(`Certificate link for ${cert.id} copied!`);
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Share2 size={14} />
                            <span>Share</span>
                          </button>

                          <button 
                            onClick={() => showToast(`Generating PDF download for ${cert.id}...`)}
                            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer"
                          >
                            <Download size={14} />
                            <span>PDF</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 5: LIVE SCHEDULE & MENTORSHIP TAB
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "Live Schedule" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Live Classes & Mentorship</h2>
                        <p className="text-xs text-slate-500">Upcoming interactive classes, code clinics, and office hours</p>
                      </div>

                      <button 
                        onClick={() => showToast("Syncing with Google Calendar...")}
                        className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition cursor-pointer self-start sm:self-auto"
                      >
                        <Calendar size={15} />
                        <span>Sync with Calendar (.ics)</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {liveSessionsList.map((session) => (
                        <div 
                          key={session.id}
                          className="p-6 rounded-3xl bg-slate-50/80 border border-slate-200/70 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-100/80 transition"
                        >
                          <div className="space-y-3 flex-1">
                            <div className="flex items-center gap-2.5">
                              <span className="text-[11px] font-black px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                                {session.type}
                              </span>
                              <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                                <Clock size={13} className="text-amber-500" /> {session.date} • {session.time}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-slate-900">
                              {session.title}
                            </h3>

                            <div className="flex items-center gap-3 pt-1">
                              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-slate-200">
                                <Image src={session.mentorAvatar} alt={session.mentor} fill className="object-cover" />
                              </div>
                              <div>
                                <h5 className="text-xs font-bold text-slate-800">{session.mentor}</h5>
                                <p className="text-[10px] text-slate-500">{session.mentorRole}</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3 self-end md:self-center">
                            <a 
                              href={session.joinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition hover:scale-105"
                            >
                              <Video size={16} />
                              <span>Join Live Meeting</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 6: MY SUBSCRIPTIONS & BILLING TAB
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "My Subscriptions" && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  
                  {/* Current Active Plan Card */}
                  <div className="bg-gradient-to-br from-[#132238] via-[#1a2e4c] to-[#0f172a] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl border border-slate-800">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-3 max-w-lg">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                          <CheckCircle2 size={14} />
                          <span>Active Subscription</span>
                        </div>

                        <h3 className="text-2xl font-black text-white tracking-tight">
                          All-Access Pro Annual Membership
                        </h3>

                        <p className="text-xs text-slate-300 leading-relaxed">
                          Includes unlimited access to all 50+ masterclasses, certificates of completion, live mentor office hours, and exclusive project code repos.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300 pt-1">
                          <span>Renews: <strong className="text-white font-bold">March 15, 2027</strong></span>
                          <span>•</span>
                          <span>Price: <strong className="text-amber-400 font-bold">৳ 4,999 / year</strong></span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <button 
                          onClick={() => showToast("Redirecting to subscription management portal...")}
                          className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-6 py-3 rounded-xl text-xs transition cursor-pointer shadow-md"
                        >
                          Manage Plan
                        </button>
                        <button 
                          onClick={() => showToast("Invoice receipt downloaded!")}
                          className="w-full bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition cursor-pointer"
                        >
                          Download Latest Receipt
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Payment Invoices Table */}
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Billing & Payment History</h3>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                            <th className="pb-3">Invoice</th>
                            <th className="pb-3">Date</th>
                            <th className="pb-3">Amount</th>
                            <th className="pb-3">Method</th>
                            <th className="pb-3">Status</th>
                            <th className="pb-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          <tr>
                            <td className="py-4 font-bold text-slate-900">#INV-2026-0812</td>
                            <td className="py-4 text-slate-600">Mar 15, 2026</td>
                            <td className="py-4 font-bold text-slate-900">৳ 4,999</td>
                            <td className="py-4 text-slate-600">bKash (017***5678)</td>
                            <td className="py-4">
                              <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">Paid</span>
                            </td>
                            <td className="py-4 text-right">
                              <button 
                                onClick={() => showToast("Downloading invoice PDF...")}
                                className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-4 font-bold text-slate-900">#INV-2025-1104</td>
                            <td className="py-4 text-slate-600">Nov 04, 2025</td>
                            <td className="py-4 font-bold text-slate-900">৳ 1,499</td>
                            <td className="py-4 text-slate-600">Nagad (018***9921)</td>
                            <td className="py-4">
                              <span className="bg-emerald-100 text-emerald-700 font-bold text-[10px] px-2 py-0.5 rounded-full">Paid</span>
                            </td>
                            <td className="py-4 text-right">
                              <button 
                                onClick={() => showToast("Downloading invoice PDF...")}
                                className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                              >
                                Download
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 7: EDIT PROFILE & LEARNING GOALS
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "Edit Profile" && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Student Profile</h2>
                    <p className="text-xs text-slate-500">Update your public profile and educational objectives</p>
                  </div>

                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    {/* Avatar Selection Row */}
                    <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                      <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400 shrink-0">
                        <Image src={profileData.avatarUrl} alt={profileData.fullName} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 mb-1">Profile Photo</h4>
                        <p className="text-[11px] text-slate-500 mb-2">JPG, PNG or WebP under 2MB</p>
                        <div className="flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={() => showToast("Avatar file selector opened!")}
                            className="bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold px-3 py-1.5 rounded-lg text-xs cursor-pointer"
                          >
                            Upload Photo
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              setProfileData(prev => ({ ...prev, avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300" }));
                              showToast("Avatar reset to default");
                            }}
                            className="text-slate-500 hover:text-slate-700 font-bold text-xs px-2 cursor-pointer"
                          >
                            Reset
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Full Name</label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Phone Number</label>
                        <input
                          type="text"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Target Daily Study Time (Hours)</label>
                        <input
                          type="number"
                          min={1}
                          max={12}
                          value={profileData.dailyTargetHours}
                          onChange={(e) => setProfileData({ ...profileData, dailyTargetHours: Number(e.target.value) })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700">Primary Career / Academic Goal</label>
                        <input
                          type="text"
                          value={profileData.careerGoal}
                          onChange={(e) => setProfileData({ ...profileData, careerGoal: e.target.value })}
                          placeholder="e.g. Pass BUET Admission with Top 100 Rank / Full-Stack Engineer"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>

                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-700">Bio & About Me</label>
                        <textarea
                          rows={3}
                          value={profileData.bio}
                          onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => showToast("Edits discarded")}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md shadow-amber-400/20 transition cursor-pointer"
                      >
                        Save Profile Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* ─────────────────────────────────────────────────────────────
                  TAB 8: SETTINGS & PREFERENCES
              ───────────────────────────────────────────────────────────── */}
              {activeTab === "Settings" && (
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-300">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Account & Notification Settings</h2>
                    <p className="text-xs text-slate-500">Configure your security alerts and learning reminders</p>
                  </div>

                  <div className="space-y-4 divide-y divide-slate-100">
                    
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Email Notifications for New Lectures</h4>
                        <p className="text-[11px] text-slate-500">Receive alerts when new videos are published</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={settings.emailNotifs}
                        onChange={(e) => setSettings({ ...settings, emailNotifs: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Live Class Reminder SMS / Push</h4>
                        <p className="text-[11px] text-slate-500">Get notified 15 minutes before any live workshop begins</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={settings.classReminders}
                        onChange={(e) => setSettings({ ...settings, classReminders: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Two-Factor Authentication (2FA)</h4>
                        <p className="text-[11px] text-slate-500">Add an extra layer of security using Google Authenticator</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={settings.twoFactorAuth}
                        onChange={(e) => setSettings({ ...settings, twoFactorAuth: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Public Student Portfolio</h4>
                        <p className="text-[11px] text-slate-500">Allow employers to view your public badges and certificates</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={settings.publicProfile}
                        onChange={(e) => setSettings({ ...settings, publicProfile: e.target.checked })}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                    </div>

                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => showToast("Settings saved successfully!")}
                      className="px-6 py-2.5 bg-[#132238] hover:bg-[#1c3252] text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
                    >
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>

      </main>

      {/* ══════════════════════════════════════════════
          4. INTERACTIVE MODALS
      ══════════════════════════════════════════════ */}

      {/* ── CERTIFICATE PREVIEW MODAL ── */}
      {selectedCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setSelectedCertificate(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* High-fidelity Certificate Visual Frame */}
            <div className="border-8 border-double border-amber-500/50 rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 text-center space-y-4 my-2 shadow-inner">
              <div className="flex items-center justify-center gap-2 text-amber-600 font-extrabold text-xs tracking-widest uppercase">
                <Award size={18} />
                <span>Bostami Education • Certificate of Completion</span>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-[#132238] tracking-tight">
                {selectedCertificate.title}
              </h2>

              <p className="text-xs text-slate-500">
                This is proudly presented to
              </p>

              <div className="text-2xl font-serif font-black text-amber-700 tracking-wide underline decoration-amber-300 underline-offset-8">
                {profileData.fullName}
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                For successfully fulfilling all comprehensive curriculum requirements, assignments, and capstone examinations in <strong>{selectedCertificate.courseName}</strong>.
              </p>

              <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs text-slate-600">
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-bold">ISSUED DATE</p>
                  <p className="font-bold text-slate-800">{selectedCertificate.issueDate}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold">VERIFICATION ID</p>
                  <p className="font-mono font-bold text-slate-800">{selectedCertificate.id}</p>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500 font-medium">
                Verified at <code className="text-blue-600 font-mono">bostamiedu.com/verify</code>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(selectedCertificate.credentialUrl);
                    showToast("Credential link copied!");
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Share2 size={14} />
                  <span>Copy Link</span>
                </button>
                <button
                  onClick={() => {
                    showToast("Downloading verified certificate PDF...");
                    setSelectedCertificate(null);
                  }}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5 shadow-md shadow-amber-400/20"
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── LESSON RESUME / VIDEO PLAYER MODAL ── */}
      {activeLessonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#132238] text-white rounded-3xl max-w-3xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-700 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveLessonModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Now Playing • Lesson 49 of {activeLessonModal.totalLectures}
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeLessonModal.title}
                </h3>
                <p className="text-xs text-slate-300">
                  {activeLessonModal.nextLesson}
                </p>
              </div>

              {/* Video Player Visual Frame */}
              <div className="relative aspect-video rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Play Button Trigger */}
                <div className="w-16 h-16 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-400/40 group-hover:scale-110 transition cursor-pointer">
                  <PlayCircle size={32} className="fill-slate-950 text-amber-400" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-medium">
                  <span>Duration: 18 mins</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold">1080p HD</span>
                </div>
              </div>

              {/* Course Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button 
                  onClick={() => showToast("Navigating to previous lecture...")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs cursor-pointer"
                >
                  ← Previous Lecture
                </button>
                <button 
                  onClick={() => {
                    showToast("Lecture marked complete! +50 XP earned 🎉");
                    setActiveLessonModal(null);
                  }}
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Check size={14} />
                  <span>Mark Complete & Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── QUIZ REPORT MODAL ── */}
      {activeQuizModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setActiveQuizModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="space-y-4">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <ClipboardCheck size={28} />
                </div>
                <h3 className="text-xl font-black text-slate-900">{activeQuizModal.title}</h3>
                <p className="text-xs text-slate-500">{activeQuizModal.courseTitle}</p>
              </div>

              <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Score</span>
                  <p className="text-xl font-black text-emerald-600">{activeQuizModal.score}%</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Questions</span>
                  <p className="text-xl font-black text-slate-900">{activeQuizModal.totalQuestions}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Time</span>
                  <p className="text-xl font-black text-slate-900">{activeQuizModal.timeSpent}</p>
                </div>
              </div>

              <div className="space-y-2 pt-2 text-xs text-slate-600">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <span>✅ Correct Answers</span>
                  <strong className="text-emerald-700">19 / 20</strong>
                </div>
                <div className="p-3 bg-rose-50 rounded-xl border border-rose-100 flex items-center justify-between">
                  <span>❌ Needs Improvement</span>
                  <strong className="text-rose-700">1 / 20</strong>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button
                  onClick={() => {
                    showToast("Retake mode enabled");
                    setActiveQuizModal(null);
                  }}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={() => setActiveQuizModal(null)}
                  className="px-5 py-2.5 bg-[#132238] hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Close Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
