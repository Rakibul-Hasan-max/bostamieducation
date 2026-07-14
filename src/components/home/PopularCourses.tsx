"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ArrowRight } from "lucide-react";

export default function PopularCourses() {
  const courses = [
    {
      title: "University Admission Physics Masterclass",
      category: "Physics",
      image: "/studio4.png",
      rating: 4.9,
      reviews: 320,
      price: "৳৩,০০০",
      originalPrice: "৳৫,০০০",
      author: "Bayzid Bostami",
      authorImage: "/about-ceo.png",
      tagColor: "bg-blue-50 text-blue-600",
    },
    {
      title: "HSC ICT Board Prep & Practical Course",
      category: "Technical & ICT",
      image: "/studio2.png",
      rating: 4.9,
      reviews: 260,
      price: "৳১,৮০০",
      originalPrice: "৳৩,৫০০",
      author: "Rakibul Hasan",
      authorImage: "/cto.png",
      tagColor: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "HSC Chemistry 2nd Paper Organic Chemistry Special",
      category: "Chemistry",
      image: "/studio3.png",
      rating: 4.8,
      reviews: 215,
      price: "৳২,২০০",
      originalPrice: "৳৪,০০০",
      author: "Majharul Islam",
      authorImage: "/tutor9.png",
      tagColor: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "HSC Higher Mathematics Admission Prep Special",
      category: "Math",
      image: "/studio2.png",
      rating: 4.7,
      reviews: 184,
      price: "৳২,৮০০",
      originalPrice: "৳৫,০০০",
      author: "Foysal Ahamed",
      authorImage: "/tutor10.png",
      tagColor: "bg-orange-50 text-orange-600",
    },
    {
      title: "HSC Biology Complete Syllabus Crash Course",
      category: "Biology",
      image: "/studio5.png",
      rating: 4.7,
      reviews: 142,
      price: "৳২,০০০",
      originalPrice: "৳৩,৫০০",
      author: "Asrafi Islam Orpita",
      authorImage: "/tutor8.png",
      tagColor: "bg-green-50 text-green-600",
    },
    {
      title: "Full-Stack Web Development Foundation Bootcamp",
      category: "Technical & ICT",
      image: "/studio4.png",
      rating: 4.9,
      reviews: 195,
      price: "৳৫,০০০",
      originalPrice: "৳৮,০০০",
      author: "Rakibul Hasan",
      authorImage: "/cto.png",
      tagColor: "bg-indigo-50 text-indigo-600",
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
