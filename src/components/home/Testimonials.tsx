"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Arafat Hossain",
      role: t("arafatRole"),
      avatar: "/tutor7.png",
      quote: t("arafatQuote"),
    },
    {
      name: "Nusrat Jahan",
      role: t("nusratRole"),
      avatar: "/tutor8.png",
      quote: t("nusratQuote"),
    },
    {
      name: "Mehedi Hassan",
      role: t("mehediRole"),
      avatar: "/tutor10.png",
      quote: t("mehediQuote"),
    },
    {
      name: "Sumaiya Akter",
      role: t("sumaiyaRole"),
      avatar: "/tutor11.png",
      quote: t("sumaiyaQuote"),
    },
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  // Get index of left and right previews
  const leftIndex = currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1;
  const rightIndex = currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1;

  return (
    <section className="w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy">
            {t("title")} <span className="text-brand-coral">{t("titleCoral")}</span>
          </h2>
          <p className="mt-4 text-brand-slate text-[15px]">
            {t("subtitle")}
          </p>
        </div>

        {/* Testimonial Carousel Area */}
        <div className="relative mx-auto max-w-4xl flex items-center justify-between gap-6">
          
          {/* Left Student Photo Thumbnail (Hidden on mobile) */}
          <div className="hidden md:block w-24 h-24 relative rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-md opacity-40 hover:opacity-75 transition-opacity cursor-pointer" onClick={handlePrev}>
            <Image
              src={testimonials[leftIndex].avatar}
              alt="Previous Student"
              fill
              className="object-cover grayscale"
            />
          </div>

          {/* Center Card */}
          <div className="flex-1 bg-white rounded-3xl border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-100/50 relative text-center">
            
            {/* Quote Icon Background */}
            <div className="absolute top-6 left-6 text-slate-100">
              <Quote className="h-16 w-16 fill-current rotate-180" />
            </div>

            {/* Student Big Avatar */}
            <div className="mx-auto h-20 w-20 relative rounded-full overflow-hidden border-4 border-white shadow-lg -mt-16 md:-mt-20 mb-6 bg-white">
              <Image
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                fill
                className="object-cover"
              />
            </div>

            {/* Testimonial Quote */}
            <p className="text-[15px] md:text-[17px] text-brand-slate italic leading-relaxed z-10 relative">
              "{testimonials[currentIndex].quote}"
            </p>

            {/* Student Name */}
            <h4 className="mt-6 text-base font-bold text-brand-navy">
              {testimonials[currentIndex].name}
            </h4>
            <p className="text-xs text-indigo-600 font-semibold mt-1">
              {testimonials[currentIndex].role}
            </p>
          </div>

          {/* Right Student Photo Thumbnail (Hidden on mobile) */}
          <div className="hidden md:block w-24 h-24 relative rounded-full overflow-hidden shrink-0 border border-slate-100 shadow-md opacity-40 hover:opacity-75 transition-opacity cursor-pointer" onClick={handleNext}>
            <Image
              src={testimonials[rightIndex].avatar}
              alt="Next Student"
              fill
              className="object-cover grayscale"
            />
          </div>

        </div>

        {/* Carousel Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            onClick={handlePrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-slate hover:bg-slate-50 hover:text-brand-navy shadow-sm transition-all active:scale-90"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={handleNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-slate hover:bg-slate-50 hover:text-brand-navy shadow-sm transition-all active:scale-90"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
