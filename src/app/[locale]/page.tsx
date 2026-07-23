import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import PopularCourses from "@/components/home/PopularCourses";
import WhyChoose from "@/components/home/WhyChoose";
import Excellence from "@/components/home/Excellence";
import Testimonials from "@/components/home/Testimonials";
import Tutors from "@/components/home/Tutors";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Course Categories Grid */}
        <Categories />

        {/* Most Popular Courses Showcase */}
        <PopularCourses />

        {/* Why Choose BostamiEducation Benefits Section */}
        <WhyChoose />

        {/* Staggered Excellence Steps Section */}
        <Excellence />

        {/* Testimonials Carousel Section */}
        <Testimonials />

        {/* Tutors Grid & Promotions Block */}
        <Tutors />

        {/* Ready to Achieve Greatness Action Banner */}
        <CTA />
      </main>

      {/* Global Footer Section */}
      <Footer />
    </div>
  );
}
