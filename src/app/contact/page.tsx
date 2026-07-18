import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";

export const metadata = {
  title: "Contact Us | Bostami Education",
  description:
    "Get in touch with Bostami Education. We're here to help you with any questions about our courses, mentors, or partnerships.",
};

/* ─── Info cards data ─── */
const cards = [
  {
    title: "Customer Support",
    address: "House 10, Road 7, Sector 3, Uttara, Dhaka 1230",
    phone: "+880 176888 3213",
    email: "support@bostamieducation.com",
    highlight: true,
  },
  {
    title: "Contact Address",
    address: "House 10, Road 7, Sector 3, Uttara, Dhaka 1230",
    phone: "+880 176888 3213",
    email: "info@bostamieducation.com",
    highlight: false,
  },
  {
    title: "Main Office Address",
    address: "House 10, Road 7, Sector 3, Uttara, Dhaka 1230",
    phone: "+880 176888 3213",
    email: "office@bostamieducation.com",
    highlight: false,
  },
];

/* ─── Social icons (inline SVG — lucide removed brand icons) ─── */
const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/bostamieducation",
    color: "bg-[#1877F2]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/bostamieducation",
    color: "bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "https://twitter.com/bostamiedu",
    color: "bg-[#000000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/bostamieducation",
    color: "bg-[#0A66C2]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@bostami-education",
    color: "bg-[#FF0000]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000" />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════
            PAGE HEADER — dot pattern background
        ══════════════════════════════════════ */}
        <section
          className="relative py-16 text-center overflow-hidden bg-white"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        >
          {/* White fade overlay so dots fade out from center */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <span className="block text-blue-600 text-sm font-bold tracking-wider mb-3">
              Contact Us
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight">
              We&apos;re here to help!
            </h1>
          </div>
        </section>

        {/* ══════════════════════════════════════
            THREE INFO CARDS
        ══════════════════════════════════════ */}
        <section className="pb-12 -mt-2">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {cards.map((card) => (
              <div
                key={card.title}
                className={`rounded-2xl p-7 ${
                  card.highlight
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "border border-slate-200 bg-white text-[#1a1a2e]"
                }`}
              >
                <h3 className="text-[16px] font-bold mb-5">{card.title}</h3>
                <div className="space-y-3 text-[13px] font-medium">
                  <div className="flex items-start gap-2.5">
                    <MapPin
                      className={`h-4 w-4 mt-0.5 shrink-0 ${
                        card.highlight ? "text-white/80" : "text-blue-600"
                      }`}
                    />
                    <span className={card.highlight ? "text-white/90" : "text-slate-600"}>
                      {card.address}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone
                      className={`h-4 w-4 shrink-0 ${
                        card.highlight ? "text-white/80" : "text-blue-600"
                      }`}
                    />
                    <span className={card.highlight ? "text-white/90" : "text-slate-600"}>
                      {card.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail
                      className={`h-4 w-4 shrink-0 ${
                        card.highlight ? "text-white/80" : "text-blue-600"
                      }`}
                    />
                    <span className={card.highlight ? "text-white/90" : "text-slate-600"}>
                      {card.email}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════
            LET'S TALK — illustration + form
        ══════════════════════════════════════ */}
        <section className="py-12">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* ── Left: illustration + socials ── */}
            <div className="flex flex-col items-center md:items-start">
              {/* SVG Envelope illustration */}
              <div className="relative w-full max-w-[320px] aspect-square select-none">
                <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  {/* Background circle */}
                  <circle cx="160" cy="170" r="110" fill="#E8F0FE" opacity="0.7" />

                  {/* Envelope body */}
                  <rect x="72" y="110" width="176" height="120" rx="8" fill="white" stroke="#CBD5E1" strokeWidth="2" />
                  {/* Envelope flap */}
                  <path d="M72 118 L160 175 L248 118" stroke="#CBD5E1" strokeWidth="2" fill="none" />
                  {/* Envelope lines (paper) */}
                  <rect x="96" y="135" width="80" height="6" rx="3" fill="#E2E8F0" />
                  <rect x="96" y="148" width="60" height="6" rx="3" fill="#E2E8F0" />
                  <rect x="96" y="161" width="70" height="6" rx="3" fill="#E2E8F0" />

                  {/* Blue paper plane top-right */}
                  <g transform="translate(210, 80) rotate(-20)">
                    <polygon points="0,0 40,15 0,30" fill="#3B82F6" />
                    <polygon points="0,15 40,15 0,30" fill="#1D4ED8" />
                  </g>

                  {/* Yellow paper plane bottom */}
                  <g transform="translate(60, 195) rotate(15)">
                    <polygon points="0,0 36,12 0,24" fill="#F59E0B" />
                    <polygon points="0,12 36,12 0,24" fill="#D97706" />
                  </g>

                  {/* Notification bell top-left */}
                  <g transform="translate(78, 75)">
                    <circle cx="22" cy="22" r="22" fill="#3B82F6" opacity="0.15" />
                    <path d="M22 10 C16 10 12 14.5 12 20 L12 26 L10 28 L34 28 L32 26 L32 20 C32 14.5 28 10 22 10 Z" fill="#3B82F6" />
                    <rect x="19" y="28" width="6" height="3" rx="1.5" fill="#3B82F6" />
                    <circle cx="29" cy="13" r="5" fill="#EF4444" />
                  </g>

                  {/* Heart / chat bubble top */}
                  <g transform="translate(220, 68)">
                    <rect x="0" y="0" width="36" height="28" rx="8" fill="#3B82F6" />
                    <circle cx="10" cy="14" r="3" fill="white" />
                    <circle cx="18" cy="14" r="3" fill="white" />
                    <circle cx="26" cy="14" r="3" fill="white" />
                    <polygon points="8,27 16,36 16,27" fill="#3B82F6" />
                  </g>

                  {/* Location pin bottom-right */}
                  <g transform="translate(225, 200)">
                    <circle cx="18" cy="18" r="18" fill="#EF4444" opacity="0.15" />
                    <path d="M18 6 C12.5 6 8 10.5 8 16 C8 23 18 32 18 32 C18 32 28 23 28 16 C28 10.5 23.5 6 18 6 Z" fill="#EF4444" />
                    <circle cx="18" cy="16" r="4" fill="white" />
                  </g>

                  {/* Cross decorations */}
                  <text x="48" y="95" fontSize="14" fill="#94A3B8" fontWeight="bold">×</text>
                  <text x="265" y="175" fontSize="14" fill="#94A3B8" fontWeight="bold">×</text>
                  <text x="56" y="260" fontSize="14" fill="#94A3B8" fontWeight="bold">×</text>
                  <text x="280" y="260" fontSize="10" fill="#94A3B8" fontWeight="bold">×</text>
                  <text x="292" y="145" fontSize="10" fill="#94A3B8" fontWeight="bold">×</text>
                </svg>
              </div>

              {/* Follow us on */}
              <div className="mt-6 flex flex-wrap items-center gap-3 justify-center md:justify-start">
                <span className="text-[14px] font-bold text-[#1a1a2e]">Follow us on:</span>
                {socials.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-white ${s.color} hover:scale-110 active:scale-95 transition-transform duration-200 shadow-sm`}
                  >
                    {s.svg}
                  </Link>
                ))}
              </div>
            </div>

            {/* ── Right: Contact form ── */}
            <div>
              <h2 className="text-3xl font-extrabold text-[#1a1a2e] mb-3">Let&apos;s talk</h2>
              <p className="text-[14px] text-slate-500 mb-7 leading-relaxed">
                To request a{" "}
                <span className="text-blue-600 font-medium">quote</span> or want to
                meet up for coffee, contact us directly or{" "}
                <span className="text-blue-600 font-medium">fill out the form</span>{" "}
                and we will get back to you promptly.
              </p>

              <form className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                    Your name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Rakibul Hasan"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-[14px] text-[#1a1a2e] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-[14px] text-[#1a1a2e] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[13px] font-semibold text-slate-600 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Enter something..."
                    className="w-full rounded-lg border border-slate-200 px-4 py-3 text-[14px] text-[#1a1a2e] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  id="contact-submit"
                  type="submit"
                  className="w-full rounded-lg bg-blue-600 py-3.5 text-[15px] font-bold text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 shadow-md shadow-blue-200"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            GOOGLE MAP EMBED — Uttara, Dhaka
        ══════════════════════════════════════ */}
        <section className="mx-auto max-w-7xl px-6 mb-16 mt-8">
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              title="Bostami Education Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.2!2d90.3854!3d23.8759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5bdfd7b0b0b%3A0x2b5c2f0b0b0b0b0b!2sUttara%2C+Dhaka!5e0!3m2!1sen!2sbd!4v1"
              className="w-full h-[320px] md:h-[380px] border-0 grayscale-[20%]"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
