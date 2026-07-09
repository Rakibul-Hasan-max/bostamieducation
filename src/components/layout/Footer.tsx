"use client";

import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-100/80 pt-16 pb-8 text-brand-navy">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Newsletter & Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60">
          {/* Logo & Description */}
          <div className="col-span-1 lg:col-span-6">
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
            <p className="mt-4 max-w-sm text-sm text-brand-slate leading-relaxed">
              We are a library that provides a variety of courses for you. Learn new skills, 
              start a new career, and achieve your goals with us.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="col-span-1 lg:col-span-6 flex flex-col md:items-end justify-center">
            <div className="w-full max-w-md">
              <h4 className="text-sm font-bold text-brand-navy mb-2">
                Get the latest news and updates delivered to your inbox.
              </h4>
              <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex gap-2 w-full">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-bold text-brand-navy hover:bg-brand-yellow-hover transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
          
          {/* Column 1: Pages */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">Pages</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-slate font-medium">
              <li>
                <Link href="/" className="hover:text-brand-coral transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-coral transition-colors">Courses</Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-brand-coral transition-colors">Mentors</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-brand-coral transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-coral transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Utility */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">Utility</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-slate font-medium">
              <li>
                <Link href="/login" className="hover:text-brand-coral transition-colors">Sign In</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-brand-coral transition-colors">Sign Up</Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-brand-coral transition-colors">Forgot Password</Link>
              </li>
              <li>
                <Link href="/reset-password" className="hover:text-brand-coral transition-colors">Reset Password</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">Contact Info</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-slate font-medium">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-slate shrink-0" />
                <span className="truncate">info@bostamieducation.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-slate shrink-0" />
                <span>+1 (234) 567-890</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-slate shrink-0 mt-0.5" />
                <span>123 Education St, New York, NY 10001</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 pt-8 text-xs text-brand-slate font-semibold">
          <p>© {new Date().getFullYear()} BostamiEducation. All rights reserved.</p>

          {/* Design and developed */}
          <p>Design and developed by <a href="https://epciln.com" target="_blank">Epciln</a></p>

          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-brand-navy">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-brand-navy">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
