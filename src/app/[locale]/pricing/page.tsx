"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState, useEffect } from "react";
import { Check, ChevronDown, HelpCircle, Star } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  ctaText: string;
  ctaLink: string;
  popular: boolean;
  color: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function PricingPage() {
  const t = useTranslations("Pricing");

  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  useEffect(() => {
    document.title = `${t("badge")} | Bostami Education`;
  }, [t]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const plans: PricingPlan[] = [
    {
      name: t("starterPlan"),
      description: t("starterDesc"),
      monthlyPrice: 0,
      yearlyPrice: 0,
      features: [
        { text: t("fStarter1"), included: true },
        { text: t("fStarter2"), included: true },
        { text: t("fStarter3"), included: true },
        { text: t("fStarter4"), included: false },
        { text: t("fStarter5"), included: false },
        { text: t("fStarter6"), included: false },
      ],
      ctaText: t("getStarted"),
      ctaLink: "/register",
      popular: false,
      color: "border-slate-200 bg-white",
    },
    {
      name: t("proLearner"),
      description: t("proDesc"),
      monthlyPrice: 19,
      yearlyPrice: 15,
      features: [
        { text: t("fPro1"), included: true },
        { text: t("fPro2"), included: true },
        { text: t("fPro3"), included: true },
        { text: t("fPro4"), included: true },
        { text: t("fPro5"), included: true },
        { text: t("fPro6"), included: true },
      ],
      ctaText: t("startProTrial"),
      ctaLink: "/register",
      popular: true,
      color: "border-blue-500 bg-white shadow-xl shadow-blue-50/70",
    },
    {
      name: t("mentorPlus"),
      description: t("mentorDesc"),
      monthlyPrice: 49,
      yearlyPrice: 39,
      features: [
        { text: t("fPlus1"), included: true },
        { text: t("fPlus2"), included: true },
        { text: t("fPlus3"), included: true },
        { text: t("fPlus4"), included: true },
        { text: t("fPlus5"), included: true },
        { text: t("fPlus6"), included: true },
      ],
      ctaText: t("joinMentorPlus"),
      ctaLink: "/register",
      popular: false,
      color: "border-slate-200 bg-white",
    },
  ];

  const faqs: FAQItem[] = [
    {
      question: t("faqQ1"),
      answer: t("faqA1"),
    },
    {
      question: t("faqQ2"),
      answer: t("faqA2"),
    },
    {
      question: t("faqQ3"),
      answer: t("faqA3"),
    },
    {
      question: t("faqQ4"),
      answer: t("faqA4"),
    },
    {
      question: t("faqQ5"),
      answer: t("faqA5"),
    },
    {
      question: t("faqQ6"),
      answer: t("faqA6"),
    },
  ];

  const formatPrice = (price: number) => {
    // If the locale is Bengali (using a marker translated in messages/bn.json)
    if (t("month") === "মাস") {
      const bnNumbers: { [key: string]: string } = {
        "0": "০", "1": "১", "2": "২", "3": "৩", "4": "৪", "5": "৫", "6": "৬", "7": "৭", "8": "৮", "9": "৯"
      };
      return price.toString().split("").map(char => bnNumbers[char] || char).join("");
    }
    return price.toString();
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1">
        {/* ══════════════════════════════════════
            PAGE HEADER — dot pattern background
        ══════════════════════════════════════ */}
        <section
          className="relative py-20 text-center overflow-hidden bg-white border-b border-slate-100"
          style={{
            backgroundImage:
              "radial-gradient(circle, #d1d5db 1.2px, transparent 1.2px)",
            backgroundSize: "22px 22px",
          }}
        >
          {/* Fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/60 pointer-events-none" />
          <div className="relative mx-auto max-w-7xl px-6">
            <span className="block text-blue-600 text-sm font-bold tracking-wider mb-3">
              {t("badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight mb-4">
              {t("title")}
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
              {t("subtitle")}
            </p>

            {/* Toggle Switch */}
            <div className="inline-flex items-center justify-center bg-slate-100 p-1 rounded-full border border-slate-200 shadow-inner">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  billingCycle === "monthly"
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-slate-500 hover:text-[#1a1a2e]"
                }`}
              >
                {t("monthlyBilling")}
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`relative px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  billingCycle === "yearly"
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-slate-500 hover:text-[#1a1a2e]"
                }`}
              >
                {t("yearlyBilling")}
                <span className="absolute -top-3.5 -right-6 bg-green-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-sm scale-95 border border-white">
                  -20%
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════
            PRICING CARDS
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan) => {
              const currentPrice =
                billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;

              return (
                <div
                  key={plan.name}
                  className={`relative flex flex-col justify-between rounded-3xl border p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${plan.color}`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-bold px-4 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" /> {t("mostPopular")}
                    </span>
                  )}

                  <div>
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-[#1a1a2e] mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-[13px] text-slate-500 leading-relaxed min-h-[40px]">
                        {plan.description}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 pb-6 border-b border-slate-100 flex items-baseline gap-1.5">
                      <span className="text-4xl md:text-5xl font-black text-[#1a1a2e]">
                        ${formatPrice(currentPrice)}
                      </span>
                      <span className="text-[13px] font-bold text-slate-400">
                        / {billingCycle === "monthly" ? t("month") : t("billedAnnually")}
                      </span>
                    </div>

                    {/* Features list */}
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[13px]">
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5 ${
                              feature.included
                                ? "bg-blue-50 text-blue-600"
                                : "bg-slate-50 text-slate-300"
                            }`}
                          >
                            <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                          </div>
                          <span
                            className={
                              feature.included ? "text-slate-600 font-medium" : "text-slate-400 line-through decoration-slate-200"
                            }
                          >
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA button */}
                  <div>
                    <Link
                      href={plan.ctaLink}
                      className={`block w-full text-center py-3.5 px-6 rounded-xl text-[13px] font-extrabold transition-all duration-200 ${
                        plan.popular
                          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-100"
                          : "border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════
            FAQ SECTION (ACCORDION)
        ══════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-white border-t border-slate-100 w-full">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4 shadow-inner">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a1a2e] tracking-tight">
                {t("faqTitle")}
              </h2>
              <p className="mt-4 text-slate-500 text-[14px] font-medium">
                {t("faqSubtitle")}
              </p>
            </div>

            {/* Accordion Layout */}
            <div className="mx-auto max-w-3xl space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;

                return (
                  <div
                    key={index}
                    className="border border-slate-200/80 rounded-2xl overflow-hidden transition-all duration-300 bg-white"
                  >
                    <button
                      onClick={() => toggleFaq(index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-slate-50/50 transition-colors duration-200 cursor-pointer group"
                    >
                      <span className="text-[14px] md:text-[15px] font-bold text-[#1a1a2e] group-hover:text-blue-600 transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4.5 w-4.5 text-slate-400 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-blue-600" : ""
                        }`}
                      />
                    </button>

                    {/* Expandable answer panel */}
                    <div
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[300px] border-t border-slate-100" : "max-h-0"
                      }`}
                    >
                      <div className="p-5 md:p-6 text-[13px] text-slate-500 leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
