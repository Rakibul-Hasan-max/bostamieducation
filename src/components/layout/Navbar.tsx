"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-yellow via-brand-coral to-indigo-500 p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-white font-bold text-brand-navy">
              BE
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight text-brand-navy">
            Bostami<span className="text-brand-coral">Education</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-[15px] font-medium text-brand-yellow">
            Home
          </Link>
          <Link href="/courses" className="text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors">
            Courses
          </Link>
          <Link href="/mentors" className="text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors">
            Mentors
          </Link>
          <div className="relative group cursor-pointer flex items-center gap-1 text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors">
            <span>Pages</span>
            <ChevronDown className="h-4 w-4" />
            {/* Simple dropdown overlay on hover */}
            <div className="absolute top-full left-0 mt-2 hidden group-hover:block w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl">
              <Link href="/about" className="block rounded-lg px-4 py-2 text-sm text-brand-slate hover:bg-slate-50 hover:text-brand-navy transition-colors">
                About Us
              </Link>
              <Link href="/pricing" className="block rounded-lg px-4 py-2 text-sm text-brand-slate hover:bg-slate-50 hover:text-brand-navy transition-colors">
                Pricing Plans
              </Link>
              <Link href="/faq" className="block rounded-lg px-4 py-2 text-sm text-brand-slate hover:bg-slate-50 hover:text-brand-navy transition-colors">
                FAQs
              </Link>
            </div>
          </div>
          <Link href="/contact" className="text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors">
            Contact
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/login" className="text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors">
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-brand-yellow px-6 py-2.5 text-[15px] font-bold text-brand-navy shadow-sm hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-brand-slate hover:bg-slate-50 hover:text-brand-navy md:hidden"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-6 py-4 shadow-inner md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-brand-yellow"
            >
              Home
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-brand-slate hover:text-brand-navy"
            >
              Courses
            </Link>
            <Link
              href="/mentors"
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-brand-slate hover:text-brand-navy"
            >
              Mentors
            </Link>
            <Link
              href="/pages"
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-brand-slate hover:text-brand-navy"
            >
              Pages
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-[15px] font-medium text-brand-slate hover:text-brand-navy"
            >
              Contact
            </Link>
            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center text-[15px] font-medium text-brand-slate hover:text-brand-navy py-2"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-brand-yellow py-3 text-center text-[15px] font-bold text-brand-navy hover:bg-brand-yellow-hover"
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
