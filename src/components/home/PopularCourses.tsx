"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function PopularCourses() {
  const courses = [
    {
      title: "Python for beginners: - HTML5 & CSS3 for UI/UX",
      category: "Development",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
      reviews: 25,
      price: "$80.00",
      originalPrice: "$140.00",
      author: "Willy Wonka",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      tagColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "Digital Marketing masterclass: - Strategy & Analytics",
      category: "Marketing",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
      rating: 4.8,
      reviews: 18,
      price: "$80.00",
      originalPrice: "$140.00",
      author: "David Atten",
      authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      tagColor: "bg-rose-50 text-rose-600",
    },
    {
      title: "Product design: - Complete Web UI/UX design guide",
      category: "UI/UX",
      image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      reviews: 32,
      price: "$90.00",
      originalPrice: "$240.00",
      author: "Jane Doe",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      tagColor: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Financial modeling & valuation for Analysts",
      category: "Business",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600",
      rating: 4.7,
      reviews: 14,
      price: "$80.00",
      originalPrice: "$140.00",
      author: "John Smith",
      authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
      tagColor: "bg-amber-50 text-amber-600",
    },
    {
      title: "Software testing: - Manual & Automation BootCamp",
      category: "Software Testing",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600",
      rating: 4.9,
      reviews: 21,
      price: "$80.00",
      originalPrice: "$140.00",
      author: "Bob Vance",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150",
      tagColor: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Cyber security: - Ethical hacking & penetration testing",
      category: "Cyber Security",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
      rating: 5.0,
      reviews: 29,
      price: "$120.00",
      originalPrice: "$440.00",
      author: "Alice Allison",
      authorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
      tagColor: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy">
              Most <span className="text-brand-coral">popular</span> courses
            </h2>
            <p className="mt-2 text-brand-slate text-[15px]">
              Explore our best selling courses of all time and master new skills.
            </p>
          </div>
          <Link
            href="/courses"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-brand-navy hover:bg-slate-50 transition-colors"
          >
            <span>View all courses</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Courses Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Course Info */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${course.tagColor}`}>
                    {course.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-bold text-brand-navy">{course.rating.toFixed(1)}</span>
                    <span className="text-xs text-brand-slate">({course.reviews})</span>
                  </div>
                </div>

                <h3 className="mt-4 flex-1 text-base font-bold text-brand-navy line-clamp-2 group-hover:text-brand-coral transition-colors">
                  {course.title}
                </h3>

                {/* Separator */}
                <div className="my-5 border-t border-slate-100" />

                {/* Price and Instructor */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative h-9 w-9 overflow-hidden rounded-full border border-slate-100">
                      <Image
                        src={course.authorImage}
                        alt={course.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium text-brand-navy">{course.author}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-brand-slate line-through mr-1.5 font-medium">
                      {course.originalPrice}
                    </span>
                    <span className="text-base font-extrabold text-brand-navy">
                      {course.price}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
