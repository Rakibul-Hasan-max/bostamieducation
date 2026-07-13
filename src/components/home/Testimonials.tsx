"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Arafat Hossain",
      role: "HSC Physics Student — Dhaka College",
      avatar: "/tutor7.png",
      quote: "Bostami Education-এর Physics Masterclass আমার জীবন বদলে দিয়েছে। স্যারের পড়ানোর স্টাইল এত সহজ ও মজার যে কঠিন বিষয়গুলোও সহজ মনে হয়। ঢাকা বিশ্ববিদ্যালয়ে ভর্তির সুযোগ পেয়েছি সম্পূর্ণ এই কোর্সের সাহায্যে।",
    },
    {
      name: "Nusrat Jahan",
      role: "HSC ICT Student — Chittagong Girls' College",
      avatar: "/tutor8.png",
      quote: "ICT কোর্সটা আমার কাছে অনেক কঠিন মনে হত, কিন্তু Rakibul স্যার এমনভাবে বোঝালেন যে বোর্ড পরীক্ষায় A+ পেলাম। লাইভ ক্লাস এবং রেকর্ডেড ভিডিও দুটোই পাই, তাই কোনো কিছু মিস হয় না।",
    },
    {
      name: "Mehedi Hassan",
      role: "Higher Math Student — Rajshahi College",
      avatar: "/tutor4.png",
      quote: "Higher Math-এ আমি সবসময় দুর্বল ছিলাম। কিন্তু Foysal স্যারের কোর্স করার পর বুঝতে পারলাম সমস্যাটা ছিল কনসেপ্টে। এখন Math আমার প্রিয় বিষয়। সবাইকে এই প্ল্যাটফর্ম রেকমেন্ড করব।",
    },
    {
      name: "Sumaiya Akter",
      role: "Biology Student — Viqarunnisa Noon College",
      avatar: "/tutor3.png",
      quote: "Orpita আপার Biology কোর্স অসাধারণ! প্রতিটা চ্যাপ্টার এত সুন্দরভাবে সাজানো যে মুখস্থ না করেই বুঝে পড়া যায়। মেডিকেল ভর্তি পরীক্ষায় অনেক উপকারে এসেছে।",
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
            Words from our <span className="text-brand-coral">students</span>
          </h2>
          <p className="mt-4 text-brand-slate text-[15px]">
            Read testimonials from our global community of learners who changed their lives.
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
