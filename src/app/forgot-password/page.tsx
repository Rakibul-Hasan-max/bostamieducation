"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate reset password process
    alert("Password reset link sent to your email!");
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
              <span role="img" aria-label="thinking">🤔</span> Forgot Password?
            </h2>
            <p className="text-slate-600 text-[15px] font-medium">
              To receive a new password, enter your email address below.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* Reset Button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#0d6efd] hover:bg-[#0b5ed7] active:scale-[0.99] py-3 text-[14px] font-medium text-white transition-all duration-200 mt-2"
            >
              Reset password
            </button>
          </form>
          
          <p className="text-center text-[13px] text-slate-500 mt-8">
            Remembered your password?{" "}
            <Link href="/login" className="text-[#0d6efd] font-medium hover:underline">
              Back to login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
