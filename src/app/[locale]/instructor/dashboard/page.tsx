"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Sparkles, ArrowLeft, GraduationCap, BellRing } from "lucide-react";
import { useEffect } from "react";

export default function InstructorDashboardPage() {
  useEffect(() => {
    document.title = "Instructor Portal - Coming Soon | Bostami Education";
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-2xl w-full text-center space-y-8">

          {/* Coming Soon Illustration */}
          <div className="relative w-full max-w-md mx-auto aspect-[4/3] flex items-center justify-center">
            <Image
              src="/coming-soon.svg"
              alt="Instructor Portal Coming Soon"
              width={460}
              height={340}
              className="object-contain drop-shadow-md hover:scale-102 transition-transform duration-300"
              priority
            />
          </div>

          {/* Headline & Description */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Instructor Dashboard <span className="text-amber-500">Coming Soon!</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
              মেন্টরদের জন্য ডেডিকেটেড ম্যানেজমেন্ট ড্যাশবোর্ড, লাইভ ক্লাস শিডিউলিং ও স্টুডেন্ট ইন্টার‍্যাকশন ফিচার খুব শীঘ্রই উন্মুক্ত করা হবে।
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all"
            >
              <GraduationCap size={16} />
              <span>Explore Courses</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
