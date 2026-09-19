"use client";

import { useState, useEffect, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useSearchParams, useRouter } from "next/navigation";
import { COURSES_DATA, CourseDetail } from "@/constants/coursesData";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  GraduationCap,
  User,
  School,
  Phone,
  Mail,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Copy,
  Sparkles,
  Check,
  QrCode,
  Smartphone,
  CheckCircle,
} from "lucide-react";

function EnrollFormContent() {
  const t = useTranslations("Enrollment");
  const tCourses = useTranslations("Courses");
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const initialCourseId = searchParams.get("courseId") || COURSES_DATA[0].id;

  // Form State
  const [selectedCourseId, setSelectedCourseId] = useState(initialCourseId);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Student Info Inputs
  const [formData, setFormData] = useState({
    fullName: "",
    schoolName: "",
    guardianPhone: "",
    emailAddress: "",
    paymentMethod: "bkash" as "bkash" | "nagad" | "rocket" | "card",
    senderPhone: "",
    transactionId: "",
  });

  const [copiedNumber, setCopiedNumber] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState("");

  const selectedCourse: CourseDetail =
    COURSES_DATA.find((c) => c.id === selectedCourseId) || COURSES_DATA[0];

  // Protect route: Redirect to login if user is not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      const targetUrl = `/enroll?courseId=${selectedCourseId}`;
      router.push(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  }, [user, authLoading, selectedCourseId, router]);

  // Pre-fill user information if logged in
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: prev.fullName || user.displayName || "",
        emailAddress: prev.emailAddress || user.email || "",
      }));
    }
  }, [user]);

  useEffect(() => {
    document.title = `${t("title")} | Bostami Education`;
  }, [t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCopyNumber = (num: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(num);
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.schoolName || !formData.guardianPhone) {
      alert("অনুগ্রহ করে সকল আবশ্যকীয় তথ্য পূরণ করুন।");
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.senderPhone || !formData.transactionId) {
      alert("অনুগ্রহ করে প্রেরকের মোবাইল নম্বর এবং ট্রানজেকশন আইডি প্রদান করুন।");
      return;
    }
    setIsSubmitting(true);
    try {
      const generatedId = "BST-" + Math.floor(100000 + Math.random() * 900000);

      await addDoc(collection(db, "enrollments"), {
        enrollmentId: generatedId,
        studentName: formData.fullName,
        schoolName: formData.schoolName,
        guardianPhone: formData.guardianPhone,
        email: formData.emailAddress,
        courseId: selectedCourse.id,
        courseTitle: selectedCourse.defaultTitle,
        amount: selectedCourse.price,
        paymentMethod: formData.paymentMethod,
        senderPhone: formData.senderPhone,
        transactionId: formData.transactionId.toUpperCase(),
        status: "pending",
        createdAt: serverTimestamp(),
        verifiedAt: null,
      });

      setEnrollmentId(generatedId);
      setStep(3);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Firestore enrollment error:", error);
      alert("তথ্য সংরক্ষণে সমস্যা হয়েছে। ইন্টারনেট সংযোগ চেক করুন এবং আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  const paymentNumbers = { 
    bkash: "+880 176888 3213",
    nagad: "+880 176888 3213",
    rocket: "+880 176888 3213", 
    card: "Visa / Mastercard / AMEX",
  };

  return (
    <main className="flex-1 py-8 sm:py-12 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        
        {/* Main Enrollment Container */}
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-slate-100 min-h-[600px]">
          
          {/* ══════════════════════════════════════
              LEFT SIDEBAR: DARK PANEL (bg-slate-900)
          ══════════════════════════════════════ */}
          <div className="lg:w-5/12 relative bg-slate-900 text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
            {/* Background Ambient Glow & Overlay */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-white/10 backdrop-blur-md mb-6 border border-white/15 text-xs font-bold text-blue-300">
                <GraduationCap className="w-4 h-4 text-blue-400" />
                <span>Bostami Education</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                {t("title")}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {t("subtitle")}
              </p>

              {/* Course Summary Pill */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 mb-6 space-y-2">
                <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                  {t("selectCourse")}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {tCourses.has(selectedCourse.titleKey)
                    ? tCourses(selectedCourse.titleKey)
                    : selectedCourse.defaultTitle}
                </h3>
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-xs text-slate-300">কোর্স ফি:</span>
                  <span className="text-lg font-extrabold text-blue-400">
                    {selectedCourse.price}
                  </span>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  {t("featuresHeader")}
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t("f1")}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t("f2")}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t("f3")}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{t("f4")}</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Payment Partner Footer */}
            <div className="relative z-10 mt-8 pt-4 border-t border-white/10">
              <p className="text-[11px] text-slate-400 mb-2 font-medium">
                {t("securePartner")}
              </p>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-1 bg-white text-[#e2136e] font-extrabold rounded-lg shadow-sm">
                  bKash
                </span>
                <span className="px-2.5 py-1 bg-white text-[#f7931e] font-extrabold rounded-lg shadow-sm">
                  Nagad
                </span>
                <span className="px-2.5 py-1 bg-white text-[#8c3494] font-extrabold rounded-lg shadow-sm">
                  Rocket
                </span>
                <span className="px-2.5 py-1 bg-white/20 text-white font-bold rounded-lg backdrop-blur-sm">
                  Cards
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════
              RIGHT SIDEBAR: FORM AREA
          ══════════════════════════════════════ */}
          <div className="lg:w-7/12 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            
            {/* STEP 1: STUDENT & ACADEMIC INFO */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                {/* Section 1 Header */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1a1a2e] mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User className="w-5 h-5 text-blue-600" />
                    {t("studentDetails")}
                  </h3>

                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("fullName")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder={t("fullNamePlaceholder")}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-xs text-slate-800 bg-slate-50 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* School Name */}
                  <div className="mt-3">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("schoolName")} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <School className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="schoolName"
                        required
                        value={formData.schoolName}
                        onChange={handleChange}
                        placeholder={t("schoolPlaceholder")}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-xs text-slate-800 bg-slate-50 focus:bg-white transition"
                      />
                    </div>
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t("guardianPhone")} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          name="guardianPhone"
                          required
                          value={formData.guardianPhone}
                          onChange={handleChange}
                          placeholder={t("phonePlaceholder")}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-xs text-slate-800 bg-slate-50 focus:bg-white transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        {t("emailAddress")} <span className="text-slate-400 font-normal">{t("optional")}</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          name="emailAddress"
                          value={formData.emailAddress}
                          onChange={handleChange}
                          placeholder="student@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-xs text-slate-800 bg-slate-50 focus:bg-white transition"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Course / Batch Selector */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#1a1a2e] mb-3 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    {t("academicDetails")}
                  </h3>

                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {t("selectCourse")} <span className="text-red-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1 border border-slate-200 rounded-2xl bg-slate-50/50">
                    {COURSES_DATA.map((c) => {
                      const isSelected = c.id === selectedCourseId;
                      const title = tCourses.has(c.titleKey)
                        ? tCourses(c.titleKey)
                        : c.defaultTitle;
                      return (
                        <label
                          key={c.id}
                          onClick={() => setSelectedCourseId(c.id)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-2.5 ${
                            isSelected
                              ? "border-blue-600 bg-blue-50/80 shadow-sm"
                              : "border-slate-200 bg-white hover:bg-slate-100/60"
                          }`}
                        >
                          <input
                            type="radio"
                            name="courseSelect"
                            checked={isSelected}
                            onChange={() => setSelectedCourseId(c.id)}
                            className="mt-0.5 text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-slate-900 line-clamp-1">
                              {title}
                            </p>
                            <p className="text-[11px] font-extrabold text-blue-600">
                              {c.price}
                            </p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Total Fee & Next Step Button */}
                <div className="bg-[#1a1a2e] rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg text-white">
                  <div>
                    <p className="text-slate-400 text-xs font-medium">
                      {t("totalPayable")}
                    </p>
                    <p className="text-2xl font-extrabold text-blue-400">
                      {selectedCourse.price}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm rounded-xl transition shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{t("nextStepPayment")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: PAYMENT & TRANSACTION INFO */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base sm:text-lg font-bold text-[#1a1a2e] flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    {t("paymentDetails")}
                  </h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{t("backToStep1")}</span>
                  </button>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    {t("selectPaymentMethod")} <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "bkash", name: "bKash", color: "text-[#e2136e] bg-pink-50 border-pink-200" },
                      { id: "nagad", name: "Nagad", color: "text-[#f7931e] bg-orange-50 border-orange-200" },
                      { id: "rocket", name: "Rocket", color: "text-[#8c3494] bg-purple-50 border-purple-200" },
                      { id: "card", name: "Cards", color: "text-blue-600 bg-blue-50 border-blue-200" },
                    ].map((pm) => {
                      const isSelected = formData.paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: pm.id as any }))}
                          className={`p-3 rounded-2xl border text-center transition cursor-pointer font-bold text-xs ${
                            isSelected
                              ? `${pm.color} ring-2 ring-blue-500 shadow-sm`
                              : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {pm.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Instructions Box */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      {formData.paymentMethod.toUpperCase()} Send Money / Merchant Number:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopyNumber(paymentNumbers[formData.paymentMethod])}
                      className="text-[11px] font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedNumber ? "কপি করা হয়েছে!" : "নম্বর কপি করুন"}</span>
                    </button>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200 font-extrabold text-sm text-[#1a1a2e] text-center tracking-wider">
                    {paymentNumbers[formData.paymentMethod]}
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                    * নির্দেশনা: আপনার মোবাইল অ্যাপ থেকে উপরের নম্বরে{" "}
                    <strong className="text-slate-800">{selectedCourse.price}</strong> সেন্ড মানি/ক্যাশ ইন সম্পন্ন করে নিচে প্রেরকের নম্বর ও ট্রানজেকশন আইডি দিন।
                  </p>
                </div>

                {/* Sender Phone & Transaction ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("senderPhone")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="senderPhone"
                      required
                      value={formData.senderPhone}
                      onChange={handleChange}
                      placeholder={t("senderPhonePlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-xs text-slate-800 bg-white transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {t("transactionId")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="transactionId"
                      required
                      value={formData.transactionId}
                      onChange={handleChange}
                      placeholder={t("txidPlaceholder")}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 outline-none text-xs text-slate-800 bg-white uppercase transition"
                    />
                  </div>
                </div>

                {/* Submit Confirmation Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm rounded-2xl transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>ভেরিফাই করা হচ্ছে...</span>
                  ) : (
                    <>
                      <span>{t("confirmEnrollment")}</span>
                      <CheckCircle className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* STEP 3: SUCCESS CONFIRMATION MODAL / SCREEN */}
            {step === 3 && (
              <div className="py-6 space-y-6">

                {/* Header */}
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/20">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a2e] mb-1">
                      আবেদন সফলভাবে জমা হয়েছে! ✅
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                      আপনার পেমেন্ট তথ্য পাওয়া গেছে। আমাদের টিম ২৪ ঘণ্টার মধ্যে যাচাই করবে।
                    </p>
                  </div>
                </div>

                {/* Enrollment Summary Card */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 text-left space-y-2.5 max-w-md mx-auto text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-semibold">{t("orderId")}:</span>
                    <span className="font-extrabold text-slate-900">{enrollmentId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-semibold">{t("fullName")}:</span>
                    <span className="font-bold text-slate-900">{formData.fullName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-semibold">{t("enrolledCourse")}:</span>
                    <span className="font-bold text-blue-600 line-clamp-1">{selectedCourse.defaultTitle}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500 font-semibold">TxID:</span>
                    <span className="font-mono font-extrabold text-slate-900 uppercase">{formData.transactionId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-semibold">{t("amountPaid")}:</span>
                    <span className="font-extrabold text-emerald-600">{selectedCourse.price}</span>
                  </div>
                </div>

                {/* Verification Steps — what happens next */}
                <div className="max-w-md mx-auto space-y-3">
                  <p className="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">পেমেন্ট ভেরিফিকেশন প্রক্রিয়া</p>

                  <div className="space-y-2.5">
                    {[
                      {
                        step: "১",
                        color: "bg-emerald-500",
                        title: "তথ্য জমা হয়েছে",
                        desc: "আপনার Transaction ID ও ফোন নম্বর আমাদের সিস্টেমে পাঠানো হয়েছে।",
                        done: true,
                      },
                      {
                        step: "২",
                        color: "bg-amber-500",
                        title: "যাচাই চলছে (Pending)",
                        desc: "আমাদের টিম আপনার bKash/Nagad ট্রানজেকশন ম্যানুয়ালি যাচাই করবে। সাধারণত ১–২৪ ঘণ্টা সময় লাগে।",
                        done: false,
                      },
                      {
                        step: "৩",
                        color: "bg-blue-500",
                        title: "ফোনে/WhatsApp এ কনফার্মেশন",
                        desc: `যাচাই হলে আপনার নম্বরে (${formData.guardianPhone || "দেওয়া নম্বরে"}) SMS / WhatsApp এ কনফার্মেশন পাঠানো হবে।`,
                        done: false,
                      },
                      {
                        step: "৪",
                        color: "bg-indigo-500",
                        title: "Dashboard Access চালু হবে",
                        desc: "কনফার্মেশনের পর আপনার Student Dashboard এ কোর্স অ্যাক্সেস সক্রিয় হয়ে যাবে।",
                        done: false,
                      },
                    ].map((item) => (
                      <div key={item.step} className={`flex items-start gap-3 p-3.5 rounded-xl border ${item.done ? "bg-emerald-50 border-emerald-200" : "bg-white border-slate-200"}`}>
                        <div className={`w-7 h-7 rounded-full ${item.color} text-white text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5`}>
                          {item.done ? <Check className="w-3.5 h-3.5" /> : item.step}
                        </div>
                        <div>
                          <p className={`text-xs font-bold ${item.done ? "text-emerald-700" : "text-slate-800"}`}>{item.title}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contact note */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-[11px] text-blue-700 leading-relaxed font-medium text-center">
                    📞 সমস্যা হলে WhatsApp করুন:{" "}
                    <a href="https://wa.me/8801768883213" target="_blank" rel="noopener noreferrer" className="font-extrabold underline">
                      +880 176888 3213
                    </a>
                    <br />
                    Enrollment ID উল্লেখ করুন: <span className="font-mono font-extrabold text-blue-900">{enrollmentId}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 max-w-md mx-auto">
                  <Link
                    href="/student/dashboard"
                    className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-full transition shadow-md shadow-blue-500/20 text-center"
                  >
                    {t("goToDashboard")}
                  </Link>
                  <Link
                    href="/"
                    className="w-full sm:w-auto px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-full transition border border-slate-200 text-center"
                  >
                    {t("backToHome")}
                  </Link>
                </div>

              </div>
            )}

          </div>
        </div>

      </div>
    </main>
  );
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-sans">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center py-20 text-slate-400">Loading...</div>}>
        <EnrollFormContent />
      </Suspense>
      <Footer />
    </div>
  );
}
