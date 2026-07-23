"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin, Globe, ChevronUp } from "lucide-react";

export default function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const languages = [
    { code: "en" as const, label: "English", flag: "🇺🇸" },
    { code: "bn" as const, label: "বাংলা", flag: "🇧🇩" },
  ];

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  const changeLanguage = (newLocale: "en" | "bn") => {
    router.replace(pathname, { locale: newLocale });
    setLangOpen(false);
  };

  return (
    <footer className="w-full bg-[#f8fafc] border-t border-slate-100/80 pt-16 pb-8 text-brand-navy">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Top Newsletter & Brand Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/60">
          {/* Logo & Description */}
          <div className="col-span-1 lg:col-span-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/icon.png"
                alt="Bostami Education"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-xl font-bold tracking-tight text-brand-navy">
                Bostami<span className="text-brand-coral">Education</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-brand-slate leading-relaxed">
              {t("description")}
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="col-span-1 lg:col-span-6 flex flex-col md:items-end justify-center">
            <div className="w-full max-w-md">
              <h4 className="text-sm font-bold text-brand-navy mb-2">
                {t("newsletterTitle")}
              </h4>
              <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex flex-col sm:flex-row gap-2.5 w-full">
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full sm:flex-1 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm text-brand-navy placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  required
                />
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-brand-yellow px-6 py-2.5 text-sm font-bold text-brand-navy hover:bg-brand-yellow-hover transition-colors"
                >
                  {t("subscribe")}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Middle Links Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 py-12">
          
          {/* Column 1: Pages */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">{t("pages")}</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-slate font-medium">
              <li>
                <Link href="/" className="hover:text-brand-coral transition-colors">{t("home")}</Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-brand-coral transition-colors">{t("courses")}</Link>
              </li>
              <li>
                <Link href="/mentors" className="hover:text-brand-coral transition-colors">{t("mentors")}</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-brand-coral transition-colors">{t("contact")}</Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Utility */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">{t("utility")}</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-slate font-medium">
              <li>
                <Link href="/login" className="hover:text-brand-coral transition-colors">{t("signIn")}</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-brand-coral transition-colors">{t("signUp")}</Link>
              </li>
              <li>
                <Link href="/forgot-password" className="hover:text-brand-coral transition-colors">{t("forgotPassword")}</Link>
              </li>
              <li>
                <Link href="/reset-password" className="hover:text-brand-coral transition-colors">{t("resetPassword")}</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">{t("contactInfo")}</h4>
            <ul className="flex flex-col gap-3 text-sm text-brand-slate font-medium">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-slate shrink-0" />
                <span className="truncate">info@bostamieducation.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-brand-slate shrink-0" />
                <span>+880 176888 3213</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-brand-slate shrink-0 mt-0.5" />
                <span>{t("address")}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us */}
          <div>
            <h4 className="text-[15px] font-bold text-brand-navy mb-4">{t("followUs")}</h4>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/bostamieducation"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/>
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/bostamieducation/"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="LinkedIn"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@bostami-education"
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-100 text-brand-slate hover:bg-brand-coral hover:text-white shadow-sm hover:border-brand-coral transition-all"
                aria-label="Youtube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/60 pt-8 text-xs text-brand-slate font-semibold">
          <p>© {new Date().getFullYear()} BostamiEducation. {t("allRightsReserved")}</p>

          {/* Design and developed */}
          <p>{t("designBy")} <a href="https://epciln.com" target="_blank">Epciln</a></p>

          <div className="flex items-center gap-5">
            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-xs font-semibold text-brand-slate hover:text-brand-navy transition-colors cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLang.label}</span>
                <ChevronUp className={`h-3 w-3 transition-transform duration-200 ${langOpen ? "" : "rotate-180"}`} />
              </button>

              {langOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-36 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex items-center gap-2.5 w-full rounded-lg px-3 py-2 text-xs transition-colors cursor-pointer ${
                        locale === lang.code
                          ? "bg-blue-50 text-blue-600 font-bold"
                          : "text-brand-slate hover:bg-slate-50 hover:text-brand-navy font-medium"
                      }`}
                    >
                      <span className="text-base leading-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link href="/privacy" className="hover:text-brand-navy">{t("privacyPolicy")}</Link>
            <Link href="/terms" className="hover:text-brand-navy">{t("termsOfService")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
