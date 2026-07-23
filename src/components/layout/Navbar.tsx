"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ChevronDown, Menu, X } from "lucide-react";

export default function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [pagesOpen, setPagesOpen] = useState(false);
  const [desktopPagesOpen, setDesktopPagesOpen] = useState(false);
  const desktopPagesRef = useRef<HTMLDivElement>(null);

  // Returns the correct nav link class based on whether it matches current route
  const navLink = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `text-[15px] font-medium transition-colors ${
      isActive ? "text-brand-yellow" : "text-brand-slate hover:text-brand-navy"
    }`;
  };

  // For mobile links
  const mobileNavLink = (href: string, exact = false) => {
    const isActive = exact ? pathname === href : pathname.startsWith(href);
    return `text-[15px] font-medium ${
      isActive ? "text-brand-yellow" : "text-brand-slate hover:text-brand-navy"
    }`;
  };

  // Close desktop Pages dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (desktopPagesRef.current && !desktopPagesRef.current.contains(e.target as Node)) {
        setDesktopPagesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/icon.png"
            alt="Bostami Education"
            width={36}
            height={36}
            className="h-9 w-9 object-contain"
            priority
          />
          <span className="text-lg sm:text-xl font-bold tracking-tight text-brand-navy">
            Bostami<span className="text-brand-coral">Education</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={navLink("/", true)}>
            {t("home")}
          </Link>
          <Link href="/courses" className={navLink("/courses")}>
            {t("courses")}
          </Link>
          <Link href="/mentors" className={navLink("/mentors")}>
            {t("mentors")}
          </Link>
          {/* Pages dropdown — click-based */}
          <div ref={desktopPagesRef} className="relative">
            <button
              onClick={() => setDesktopPagesOpen(!desktopPagesOpen)}
              className={`flex items-center gap-1 cursor-pointer ${
                ['/about', '/pricing'].some(p => pathname.startsWith(p))
                  ? 'text-[15px] font-medium text-brand-yellow'
                  : 'text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors'
              }`}
            >
              <span>{t("pages")}</span>
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${desktopPagesOpen ? "rotate-180" : ""}`} />
            </button>
            {desktopPagesOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-slate-100 bg-white p-2 shadow-xl z-50">
                <Link
                  href="/about"
                  onClick={() => setDesktopPagesOpen(false)}
                  className={`block rounded-lg px-4 py-2 text-sm transition-colors ${
                    pathname.startsWith('/about') ? 'text-brand-yellow font-bold' : 'text-brand-slate hover:bg-slate-50 hover:text-brand-navy'
                  }`}
                >
                  {t("about")}
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setDesktopPagesOpen(false)}
                  className={`block rounded-lg px-4 py-2 text-sm transition-colors ${
                    pathname.startsWith('/pricing') ? 'text-brand-yellow font-bold' : 'text-brand-slate hover:bg-slate-50 hover:text-brand-navy'
                  }`}
                >
                  {t("pricing")}
                </Link>
              </div>
            )}
          </div>
          <Link href="/contact" className={navLink("/contact")}>
            {t("contact")}
          </Link>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-5">
          <Link href="/login" className="text-[15px] font-medium text-brand-slate hover:text-brand-navy transition-colors">
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-brand-yellow px-6 py-2.5 text-[15px] font-bold text-brand-navy shadow-sm hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
          >
            {t("signup")}
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
              className={mobileNavLink("/", true)}
            >
              {t("home")}
            </Link>
            <Link
              href="/courses"
              onClick={() => setIsOpen(false)}
              className={mobileNavLink("/courses")}
            >
              {t("courses")}
            </Link>
            <Link
              href="/mentors"
              onClick={() => setIsOpen(false)}
              className={mobileNavLink("/mentors")}
            >
              {t("mentors")}
            </Link>

            {/* Pages accordion */}
            <div>
              <button
                onClick={() => setPagesOpen(!pagesOpen)}
                className={`flex w-full items-center justify-between text-[15px] font-medium ${
                  ['/about', '/pricing'].some(p => pathname.startsWith(p))
                    ? 'text-brand-yellow'
                    : 'text-brand-slate hover:text-brand-navy'
                }`}
              >
                <span>{t("pages")}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${pagesOpen ? "rotate-180" : ""}`} />
              </button>
              {pagesOpen && (
                <div className="mt-2 ml-3 flex flex-col gap-3 border-l-2 border-slate-100 pl-4">
                  <Link
                    href="/about"
                    onClick={() => { setIsOpen(false); setPagesOpen(false); }}
                    className="text-[14px] font-medium text-brand-slate hover:text-brand-navy"
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/pricing"
                    onClick={() => { setIsOpen(false); setPagesOpen(false); }}
                    className="text-[14px] font-medium text-brand-slate hover:text-brand-navy"
                  >
                    {t("pricing")}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className={mobileNavLink("/contact")}
            >
              {t("contact")}
            </Link>

            <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="text-center text-[15px] font-medium text-brand-slate hover:text-brand-navy py-2"
              >
                {t("login")}
              </Link>
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-brand-yellow py-3 text-center text-[15px] font-bold text-brand-navy hover:bg-brand-yellow-hover"
              >
                {t("signup")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
