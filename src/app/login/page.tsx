"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login and redirect
    router.push("/");
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-start overflow-hidden bg-slate-900">
      {/* Background Image using Next.js Image for optimization */}
      <Image
        src="/studio4.png"
        alt="Library Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center pointer-events-none select-none z-0"
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-[440px] bg-white rounded-[32px] p-9 md:p-10 shadow-2xl ml-6 md:ml-16 lg:ml-24 my-8 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="mb-6">
            <Link href="/" className="inline-block">
              <Image
                src="/icon.png"
                alt="Bostami Education Logo"
                width={56}
                height={56}
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Heading */}
          <h1 className="text-[26px] font-bold text-[#ff6b6b] mb-1.5 tracking-tight">
            Login
          </h1>
          <p className="text-[13px] text-slate-500 font-medium mb-6">
            Fill in your email address and password to Login.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full bg-[#f2f2f2] px-5 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full bg-[#f2f2f2] px-5 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 py-1">
              <input
                id="login-remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="login-remember"
                className="text-[12px] font-semibold text-slate-500 select-none cursor-pointer"
              >
                Remember me?
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="login-submit"
              type="submit"
              className="w-full rounded-full bg-[#ffd260] hover:bg-[#fcc13d] active:scale-[0.98] py-3 text-[13px] font-bold text-slate-800 transition-all duration-200 cursor-pointer text-center"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-6 space-y-1.5 pt-2">
          <p className="text-[12px] font-medium text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
          <p className="text-[12px]">
            <Link
              href="/forgot-password"
              className="text-blue-500 font-bold hover:underline"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
