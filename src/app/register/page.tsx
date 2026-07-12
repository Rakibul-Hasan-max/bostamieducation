"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
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
    <div className="relative min-h-screen w-full flex items-center justify-end overflow-hidden bg-slate-900">
      {/* Background Image using Next.js Image for optimization */}
      <Image
        src="/studio4.png"
        alt="Library Background"
        fill
        priority
        className="absolute inset-0 object-cover object-center pointer-events-none select-none z-0"
      />

      {/* Login Card on the right */}
      <div className="relative z-10 w-full max-w-[440px] bg-white rounded-[32px] p-9 md:p-10 shadow-2xl mr-6 md:mr-16 lg:mr-24 my-8 flex flex-col justify-between">
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
            Sign Up
          </h1>
          <p className="text-[13px] text-slate-500 font-medium mb-6">
            Fill in your details to create an account.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rakibul Hasan"
                className="w-full rounded-full bg-[#f2f2f2] px-5 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-full bg-[#f2f2f2] px-5 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Password
              </label>
              <input
                id="register-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-full bg-[#f2f2f2] px-5 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-[12px] font-semibold text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                id="register-confirm-password"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-full bg-[#f2f2f2] px-5 py-3 text-[14px] text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-center gap-2 py-1">
              <input
                id="register-terms"
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label
                htmlFor="register-terms"
                className="text-[12px] font-semibold text-slate-500 select-none cursor-pointer"
              >
                I agree to the terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <button
              id="register-submit"
              type="submit"
              className="w-full rounded-full bg-[#ffd260] hover:bg-[#fcc13d] active:scale-[0.98] py-3 text-[13px] font-bold text-slate-800 transition-all duration-200 cursor-pointer text-center"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="mt-6 pt-2">
          <p className="text-[12px] font-medium text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
