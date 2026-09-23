"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Mail, 
  Lock, 
  Phone, 
  AlertCircle, 
  Loader2, 
  CheckCircle2, 
  ArrowLeft, 
  KeyRound,
  RotateCw
} from "lucide-react";
import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber, 
  ConfirmationResult 
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { isUserAdmin } from "@/constants/adminConfig";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

function LoginForm() {
  const [authMode, setAuthMode] = useState<"email" | "phone">("email");
  
  // Email Login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  
  // Phone Login state
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneStep, setPhoneStep] = useState<"phone" | "otp">("phone");
  const [otp, setOtp] = useState("");
  const [phoneLoading, setPhoneLoading] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  // Status & Feedback
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading, signInWithGoogle, loginWithEmail } = useAuth();

  const getDestinationUrl = (userEmail?: string | null) => {
    const redirectParam = searchParams.get("redirect");
    const isAdmin = isUserAdmin(userEmail);

    if (redirectParam) {
      if (redirectParam.startsWith("/admin") && !isAdmin) {
        return "/student/dashboard";
      }
      return redirectParam;
    }

    return isAdmin ? "/admin/dashboard" : "/student/dashboard";
  };

  // If user is already logged in, redirect them directly
  useEffect(() => {
    if (!loading && user) {
      router.push(getDestinationUrl(user.email));
    }
  }, [user, loading, router, searchParams]);

  // Resend OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Cleanup reCAPTCHA on unmount
  useEffect(() => {
    return () => {
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (_) {}
        window.recaptchaVerifier = undefined;
      }
    };
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setEmailLoading(true);
    try {
      const loggedUser = await loginWithEmail(email.trim(), password);
      setSuccessMsg("Logged in successfully! Redirecting...");
      router.push(getDestinationUrl(loggedUser.email));
    } catch (err: any) {
      if (
        err?.code === "auth/invalid-credential" || 
        err?.code === "auth/wrong-password" || 
        err?.code === "auth/user-not-found"
      ) {
        setErrorMsg("ইমেইল বা পাসওয়ার্ড সঠিক নয়। আপনি যদি নতুন হন, অনুগ্রহ করে আগে Sign Up (রেজিস্ট্রেশন) করুন অথবা সঠিক পাসওয়ার্ড দিন।");
      } else if (err?.code === "auth/invalid-email") {
        setErrorMsg("সঠিক ইমেইল অ্যাড্রেস লিখুন (Invalid email format)।");
      } else if (err?.code === "auth/too-many-requests") {
        setErrorMsg("অনেকবার ভুল চেষ্টার কারণে সাময়িকভাবে একাউন্ট লক হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন।");
      } else if (err?.code === "auth/network-request-failed") {
        setErrorMsg("ইন্টারনেট সংযোগে সমস্যা হয়েছে। আপনার নেটওয়ার্ক চেক করে আবার চেষ্টা করুন।");
      } else if (err?.code === "auth/invalid-api-key") {
        setErrorMsg("Invalid Firebase API Key. Please configure NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file.");
      } else {
        setErrorMsg(err?.message || "লগইন ব্যর্থ হয়েছে। অনুগ্রহ করে তথ্য যাচাই করে পুনরায় চেষ্টা করুন।");
      }
    } finally {
      setEmailLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setGoogleLoading(true);
    try {
      const loggedUser = await signInWithGoogle();
      router.push(getDestinationUrl(loggedUser.email));
    } catch (err: any) {
      if (err?.code === "auth/popup-closed-by-user") {
        setErrorMsg("Sign-in popup was closed before completing.");
      } else if (err?.code === "auth/unauthorized-domain") {
        setErrorMsg("This domain is not authorized in Firebase Console. Please add 'localhost' in Firebase Authentication > Settings > Authorized domains.");
      } else if (err?.code === "auth/popup-blocked") {
        setErrorMsg("Sign-in popup was blocked by your browser. Please allow popups for this site.");
      } else if (err?.code === "auth/invalid-api-key") {
        setErrorMsg("Invalid Firebase API Key. Please configure NEXT_PUBLIC_FIREBASE_API_KEY in your .env.local file.");
      } else {
        setErrorMsg(err?.message || "Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  // Helper to format BD numbers into E.164 format (+880...)
  const formatPhoneNumber = (phone: string): string => {
    let cleaned = phone.trim().replace(/[\s-]/g, "");
    if (cleaned.startsWith("+880")) {
      return cleaned;
    }
    if (cleaned.startsWith("880")) {
      return `+${cleaned}`;
    }
    if (cleaned.startsWith("0")) {
      cleaned = cleaned.substring(1);
    }
    return `+880${cleaned}`;
  };

  // Setup / reset invisible reCAPTCHA verifier
  const setupRecaptcha = () => {
    if (typeof window === "undefined") return null;

    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear();
      } catch (_) {}
      window.recaptchaVerifier = undefined;
    }

    const verifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: () => {
        // reCAPTCHA solved
      },
      "expired-callback": () => {
        setErrorMsg("reCAPTCHA expired. Please request OTP again.");
      }
    });

    window.recaptchaVerifier = verifier;
    return verifier;
  };

  // Send OTP
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const cleaned = phoneNumber.trim().replace(/[\s-]/g, "");
    if (!cleaned || cleaned.length < 10) {
      setErrorMsg("Please enter a valid phone number (e.g. 017XXXXXXXX).");
      return;
    }

    const formattedPhone = formatPhoneNumber(phoneNumber);
    setPhoneLoading(true);

    try {
      const appVerifier = setupRecaptcha();
      if (!appVerifier) {
        throw new Error("Could not initialize reCAPTCHA verifier.");
      }

      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      setConfirmationResult(confirmation);
      window.confirmationResult = confirmation;
      setPhoneStep("otp");
      setResendTimer(60);
      setSuccessMsg(`OTP code has been sent to ${formattedPhone}`);
    } catch (err: any) {
      console.error("Phone Auth Error:", err);
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.clear();
        } catch (_) {}
        window.recaptchaVerifier = undefined;
      }

      const errMsg = err?.message || "";
      if (err?.code === "auth/billing-not-enabled" || errMsg.includes("billing-not-enabled")) {
        setErrorMsg("Firebase requires Blaze (Pay-as-you-go) plan to send real carrier SMS. For testing without billing, please add a Test Phone Number in Firebase Console > Authentication > Phone.");
      } else if (errMsg.includes("region") || err?.code === "auth/operation-not-allowed") {
        setErrorMsg("Firebase SMS Region Policy: Please enable Bangladesh (+880) in Firebase Console > Authentication > Settings > SMS Region Policy.");
      } else if (err?.code === "auth/invalid-phone-number") {
        setErrorMsg("Invalid phone number format. Please provide a 11-digit Bangladeshi number.");
      } else if (err?.code === "auth/too-many-requests") {
        setErrorMsg("Too many requests sent. Please wait a few minutes before trying again.");
      } else if (err?.code === "auth/quota-exceeded") {
        setErrorMsg("SMS quota reached for today. Please login with Google or try again tomorrow.");
      } else if (err?.code === "auth/captcha-check-failed") {
        setErrorMsg("reCAPTCHA check failed. Please refresh the page and try again.");
      } else {
        setErrorMsg(err?.message || "Failed to send OTP. Please ensure Phone Auth is enabled in Firebase Console.");
      }
    } finally {
      setPhoneLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp || otp.trim().length !== 6) {
      setErrorMsg("Please enter the 6-digit OTP code.");
      return;
    }

    const conf = confirmationResult || window.confirmationResult;
    if (!conf) {
      setErrorMsg("Session expired. Please request a new OTP code.");
      setPhoneStep("phone");
      return;
    }

    setVerifyingOtp(true);
    try {
      const res = await conf.confirm(otp.trim());
      setSuccessMsg("Logged in successfully! Redirecting...");
      router.push(getDestinationUrl(res.user?.email));
    } catch (err: any) {
      console.error("OTP verification error:", err);
      if (err?.code === "auth/invalid-verification-code") {
        setErrorMsg("Incorrect OTP code. Please check your SMS and try again.");
      } else if (err?.code === "auth/code-expired") {
        setErrorMsg("OTP code has expired. Please request a new one.");
      } else {
        setErrorMsg(err?.message || "Verification failed. Please check the code and try again.");
      }
    } finally {
      setVerifyingOtp(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Hidden reCAPTCHA container for Firebase Phone Auth */}
      <div id="recaptcha-container"></div>

      {/* Left Side - Illustration (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#f0f4f9] flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="text-center mb-10 z-10">
          <h1 className="text-[32px] xl:text-[38px] font-bold text-slate-800 mb-3 tracking-tight">
            Welcome to our largest community
          </h1>
          <p className="text-slate-600 text-[15px]">
            Let's learn something new today!
          </p>
        </div>
        
        <div className="relative w-full max-w-[500px] aspect-square mb-6 z-10 flex items-center justify-center">
          <Image
            src="/login.svg"
            alt="Learning Illustration"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>

        <div className="flex items-center gap-4 mt-auto mb-4 z-10">
          <div className="flex -space-x-3">
            <div className="h-9 w-9 rounded-full border-[2px] border-white overflow-hidden relative">
              <Image src="/about-ceo.png" alt="Student" fill className="object-cover object-top" />
            </div>
            <div className="h-9 w-9 rounded-full border-[2px] border-white overflow-hidden relative">
              <Image src="/cto.png" alt="Student" fill className="object-cover object-top" />
            </div>
            <div className="h-9 w-9 rounded-full border-[2px] border-white overflow-hidden relative">
              <Image src="/tutor7.png" alt="Student" fill className="object-cover object-top" />
            </div>
            <div className="h-9 w-9 rounded-full border-[2px] border-white overflow-hidden relative">
              <Image src="/tutor8.png" alt="Student" fill className="object-cover object-top" />
            </div>
          </div>
          <p className="text-[13px] text-slate-600 font-medium">
            4k+ Students joined us, now it's your turn.
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-20">
        <div className="w-full max-w-[540px]">
          <div className="mb-6">
            <h2 className="text-[28px] font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <span role="img" aria-label="wave">👋</span> Login to Bostami Education!
            </h2>
            <p className="text-slate-500 text-[14px]">
              Nice to see you! Please log in with your account.
            </p>
          </div>

          {/* Login Mode Switch Tabs — Phone tab hidden until Firebase Blaze plan is active */}
          {/* TODO: Uncomment the phone tab button below when SMS billing is enabled */}
          <div className="grid grid-cols-1 gap-1.5 p-1 bg-slate-100/80 rounded-xl mb-6 border border-slate-200/60">
            <button
              type="button"
              onClick={() => {
                setAuthMode("email");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                authMode === "email"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Mail className="w-4 h-4" />
              Email & Password
            </button>
            {/* PHONE TAB — Disabled: Requires Firebase Blaze plan for SMS. Uncomment to re-enable.
            <button
              type="button"
              onClick={() => {
                setAuthMode("phone");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-[13px] font-semibold transition-all cursor-pointer ${
                authMode === "phone"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Phone className="w-4 h-4" />
              Phone Number (OTP)
            </button>
            */}
          </div>

          {/* Error Message Alert */}
          {errorMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 p-3.5 text-[13px] text-red-600 animate-in fade-in duration-200">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMsg}</div>
            </div>
          )}

          {/* Success Message Alert */}
          {successMsg && (
            <div className="mb-5 flex items-start gap-2.5 rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 text-[13px] text-emerald-700 animate-in fade-in duration-200">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{successMsg}</div>
            </div>
          )}

          {/* ══════════ EMAIL / PASSWORD LOGIN MODE ══════════ */}
          {authMode === "email" && (
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-2">
                  Email address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="user@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg bg-[#f4f7f9] border-none px-4 py-3.5 pl-11 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-[13px] font-medium text-slate-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg bg-[#f4f7f9] border-none px-4 py-3.5 pl-11 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition"
                  />
                </div>
                <p className="text-[12px] text-slate-400 mt-2">
                  Your password must be 8 characters at least
                </p>
              </div>

              {/* Remember & Forgot Password */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="text-[13px] text-slate-500 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-[13px] text-slate-400 hover:text-blue-600 underline decoration-slate-300 hover:decoration-blue-600 underline-offset-4 transition-colors">
                  Forgot password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={emailLoading}
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#0d6efd] hover:bg-[#0b5ed7] disabled:opacity-70 active:scale-[0.99] py-3 text-[14px] font-medium text-white transition-all duration-200 mt-2 cursor-pointer shadow-md shadow-blue-500/10"
              >
                {emailLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                {emailLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* ══════════ PHONE NUMBER (OTP) LOGIN MODE ══════════ */}
          {authMode === "phone" && (
            <div className="space-y-5">
              {phoneStep === "phone" ? (
                <form onSubmit={handleSendOtp} className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-2">
                      Mobile Phone Number *
                    </label>
                    <div className="flex items-center rounded-xl bg-[#f4f7f9] border border-slate-200/80 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/40 focus-within:border-blue-500 transition-all">
                      <div className="flex items-center gap-1.5 px-3.5 py-3.5 bg-slate-200/60 border-r border-slate-300/70 text-slate-700 font-bold text-[14px] select-none">
                        <span>🇧🇩</span>
                        <span>+880</span>
                      </div>
                      <input
                        type="tel"
                        required
                        placeholder="01712345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full bg-transparent px-4 py-3.5 text-[15px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none"
                      />
                    </div>
                    <p className="text-[12px] text-slate-500 mt-2">
                      Enter your 11-digit Bangladeshi phone number. We'll send an SMS with a 6-digit OTP.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={phoneLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.99] disabled:opacity-70 py-3.5 text-[14px] font-bold text-white transition-all cursor-pointer shadow-md shadow-blue-500/20"
                  >
                    {phoneLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending OTP Code...</span>
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        <span>Send OTP Verification Code</span>
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* OTP Verification Step */
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="rounded-xl bg-blue-50/60 border border-blue-100 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">SMS Code Sent</p>
                        <p className="text-[14px] font-bold text-slate-800 mt-0.5">{formatPhoneNumber(phoneNumber)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneStep("phone");
                          setErrorMsg("");
                          setSuccessMsg("");
                          setOtp("");
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800 underline cursor-pointer"
                      >
                        <ArrowLeft className="w-3 h-3" /> Change number
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[13px] font-medium text-slate-700 mb-2">
                      Enter 6-digit OTP Code *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <KeyRound className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        required
                        autoFocus
                        placeholder="• • • • • •"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className="w-full rounded-xl bg-[#f4f7f9] border border-slate-200 px-4 py-3.5 pl-11 text-center font-mono text-xl tracking-[0.4em] text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <span>Didn't receive the code?</span>
                    {resendTimer > 0 ? (
                      <span className="font-semibold text-slate-400">Resend in {resendTimer}s</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSendOtp()}
                        disabled={phoneLoading}
                        className="inline-flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 cursor-pointer disabled:opacity-50"
                      >
                        <RotateCw className="w-3 h-3" /> Resend OTP
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={verifyingOtp || otp.length !== 6}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-60 py-3.5 text-[14px] font-bold text-white transition-all cursor-pointer shadow-md shadow-emerald-600/20"
                  >
                    {verifyingOtp ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Verifying OTP...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verify & Login</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 text-[12px]">Or continue with</span>
            </div>
          </div>

          {/* Social Buttons */}
          {/* Phone OTP button hidden — re-enable after Firebase Blaze plan activation */}
          <div className="grid grid-cols-1 gap-3.5">
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="flex items-center justify-center gap-2.5 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] disabled:opacity-70 text-white py-3 text-[13px] font-semibold transition-all cursor-pointer shadow-sm shadow-blue-500/10"
            >
              {googleLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              )}
              <span>{googleLoading ? "Signing in..." : "Google"}</span>
            </button>

            {/* PHONE OTP BUTTON — Disabled: Requires Firebase Blaze plan for SMS. Uncomment to re-enable.
            {authMode === "email" ? (
              <button 
                type="button" 
                onClick={() => {
                  setAuthMode("phone");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white py-3 text-[13px] font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Phone OTP</span>
              </button>
            ) : (
              <button 
                type="button" 
                onClick={() => {
                  setAuthMode("email");
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white py-3 text-[13px] font-semibold transition-all cursor-pointer shadow-sm"
              >
                <Mail className="w-4 h-4 text-blue-400" />
                <span>Email & Password</span>
              </button>
            )}
            */}
          </div>

          <p className="text-center text-[13px] text-slate-500 mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-[#0d6efd] font-semibold hover:underline">
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}


