"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Phone } from "lucide-react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Simulate successful registration and redirect to login
    router.push("/login");
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
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
              <Image src="/tutor1.png" alt="Student" fill className="object-cover object-top" />
            </div>
            <div className="h-9 w-9 rounded-full border-[2px] border-white overflow-hidden relative">
              <Image src="/tutor4.png" alt="Student" fill className="object-cover object-top" />
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
          <div className="mb-8">
            <h2 className="text-[28px] font-bold text-slate-900 mb-2.5 flex items-center gap-2">
              <span role="img" aria-label="hands">👋</span> Sign up for your account!
            </h2>
            <p className="text-slate-500 text-[14px]">
              Nice to see you! Please Sign up with your account.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="E-mail"
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
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[13px] font-medium text-slate-700 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="password"
                  required
                  placeholder="********"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg bg-[#f4f7f9] border-none px-4 py-3.5 pl-11 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2 py-1">
              <input
                id="terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[13px] text-slate-500 cursor-pointer">
                By signing up, you agree to the{" "}
                <Link href="/terms" className="text-[#0d6efd] font-medium hover:underline">
                  terms of service
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#0d6efd] hover:bg-[#0b5ed7] active:scale-[0.99] py-3 text-[14px] font-medium text-white transition-all duration-200 mt-2"
            >
              Sign Up
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 text-[12px]">Or</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 rounded-lg bg-[#4285F4] hover:bg-[#3367d6] text-white py-2.5 text-[13px] font-medium transition-colors">
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Signup with Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 rounded-lg bg-slate-700 hover:bg-slate-700 text-white py-2.5 text-[13px] font-medium transition-colors">
              <Phone className="w-4 h-4 text-white" />
              Signup with Phone number
            </button>
          </div>

          <p className="text-center text-[13px] text-slate-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-[#0d6efd] font-medium hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
