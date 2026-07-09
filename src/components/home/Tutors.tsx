"use client";

import Image from "next/image";
import Link from "next/link";

export default function Tutors() {
  const tutors = [
    {
      name: "Amanda Seyfried",
      role: "Python Expert",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "David Atten",
      role: "Marketing Expert",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "Sarah Jenkins",
      role: "UI/UX Expert",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "Jane Doe",
      role: "Business Expert",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=300",
    },
    {
      name: "John Smith",
      role: "QA Tester Expert",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Main Box with soft cream background */}
        <div className="bg-[#fffdf5] rounded-[32px] border border-amber-100/50 p-8 md:p-16 shadow-sm shadow-amber-50">
          
          {/* Header */}
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy leading-tight">
              Meet the <span className="text-brand-coral">tutors</span> behind your <br />
              learning journey
            </h2>
            <p className="mt-4 text-brand-slate text-[15px]">
              Learn from a global team of developers, designers, marketers, and entrepreneurs.
            </p>
          </div>

          {/* Tutors Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {tutors.map((tutor, i) => (
              <div
                key={i}
                className="group flex flex-col bg-white rounded-2xl border border-slate-100/70 p-4 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
              >
                {/* Photo container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={tutor.image}
                    alt={tutor.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                </div>
                {/* Info */}
                <div className="mt-4 text-center">
                  <h4 className="text-sm font-bold text-brand-navy group-hover:text-brand-coral transition-colors">
                    {tutor.name}
                  </h4>
                  <p className="text-xs text-brand-slate font-medium mt-1">
                    {tutor.role}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo/Discount Banner below */}
          <div className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-amber-100/60 pt-10">
            <div className="text-center md:text-left">
              <h3 className="text-lg md:text-xl font-extrabold text-brand-navy">
                Join us today to get 20% discount on all courses
              </h3>
              <p className="text-xs md:text-sm text-brand-slate mt-1 font-medium">
                Unlock lifetime access and learn at your own pace. Offers end soon.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/register"
                className="rounded-full bg-brand-yellow px-6 py-3 text-[14px] font-bold text-brand-navy shadow-md shadow-amber-100 hover:bg-brand-yellow-hover hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Get started now
              </Link>
              <Link
                href="/courses"
                className="rounded-full border border-slate-200 bg-white px-6 py-3 text-[14px] font-bold text-brand-navy hover:bg-slate-50 hover:border-slate-300 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Explore courses
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
