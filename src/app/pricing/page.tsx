"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useState } from "react";
import { Check, ChevronDown, HelpCircle, Star } from "lucide-react";
import Link from "next/link";

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

const plans: PricingPlan[] = [
  {
    name: "Starter Plan",
    description: "Perfect for exploring our platform and starting your learning journey.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { text: "Access to free course materials", included: true },
      { text: "Basic video lectures (720p)", included: true },
      { text: "Community support forum", included: true },
      { text: "Course completion certificates", included: false },
      { text: "Interactive quizzes & assignments", included: false },
      { text: "1-on-1 mentor guidance", included: false },
    ],
    ctaText: "Get Started",
    ctaLink: "/register",
    popular: false,
    color: "border-slate-200 bg-white",
  },
  {
    name: "Pro Learner",
    description: "Our most popular plan for dedicated students seeking full academic growth.",
    monthlyPrice: 19,
    yearlyPrice: 15,
    features: [
      { text: "Unlimited access to all courses", included: true },
      { text: "Full HD video lectures (1080p)", included: true },
      { text: "Interactive quizzes & assignments", included: true },
      { text: "Verified completion certificates", included: true },
      { text: "Priority Q&A with mentors", included: true },
      { text: "Offline downloads & mobile access", included: true },
    ],
    ctaText: "Start Pro Trial",
    ctaLink: "/register",
    popular: true,
    color: "border-blue-500 bg-white shadow-xl shadow-blue-50/70",
  },
  {
    name: "Mentor Plus",
    description: "Designed for advanced study, career tracks, and personalized coding support.",
    monthlyPrice: 49,
    yearlyPrice: 39,
    features: [
      { text: "Everything in Pro Learner", included: true },
      { text: "1-on-1 monthly live mentorship session", included: true },
      { text: "Personalized study plans & reviews", included: true },
      { text: "Job placement assistance & mock interviews", included: true },
      { text: "Exclusive live bootcamps access", included: true },
      { text: "Direct slack channel with instructors", included: true },
    ],
    ctaText: "Join Mentor Plus",
    ctaLink: "/register",
    popular: false,
    color: "border-slate-200 bg-white",
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Can I try Bostami Education for free?",
    answer: "Yes! Our Starter Plan is 100% free forever. It allows you to access all free video courses and basic quizzes. No credit card is required to sign up.",
  },
  {
    question: "What is the difference between Monthly and Yearly billing?",
    answer: "Yearly billing is billed in one upfront payment and comes with a 20% discount compared to monthly payments. It is the most cost-effective way to achieve your learning goals.",
  },
  {
    question: "Can I change or cancel my plan anytime?",
    answer: "Absolutely. You can upgrade, downgrade, or cancel your subscription at any time directly from your account settings page. If you cancel, you will maintain access to your plan benefits until the end of your current billing cycle.",
  },
  {
    question: "Do you provide certificates upon course completion?",
    answer: "Yes! Under the Pro Learner and Mentor Plus plans, you will receive a verified digital certificate of completion once you finish all video lectures, pass the final quiz, and submit the required assignments.",
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee for our premium plans. If you are not satisfied with your purchase, contact us at refund@bostamieducation.com within 7 days, and we will issue a full refund, no questions asked.",
  },
  {
    question: "Are there any student or institutional discounts?",
    answer: "Yes, we offer special group pricing for schools, coaching centers, and corporate training. Please reach out to our team at corporate@bostamieducation.com for custom offers.",
  },
];

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
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
              Pricing Plans
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a2e] tracking-tight mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="max-w-2xl mx-auto text-slate-500 text-[15px] font-medium leading-relaxed mb-8">
              Choose the perfect plan to jumpstart your education. Gain access to premium content, expert mentors, and structural learning paths.
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
                Monthly Billing
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`relative px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
                  billingCycle === "yearly"
                    ? "bg-white text-[#1a1a2e] shadow-sm"
                    : "text-slate-500 hover:text-[#1a1a2e]"
                }`}
              >
                Yearly Billing
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
                      <Star className="h-3 w-3 fill-current" /> Most Popular
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
                        ${currentPrice}
                      </span>
                      <span className="text-[13px] font-bold text-slate-400">
                        / {billingCycle === "monthly" ? "month" : "month, billed annually"}
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
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-slate-500 text-[14px] font-medium">
                Have questions about our plans? Here are the most common things people ask.
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
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? "max-h-56 border-t border-slate-100" : "max-h-0"
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
