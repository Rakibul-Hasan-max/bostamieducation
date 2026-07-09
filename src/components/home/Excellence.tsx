"use client";

export default function Excellence() {
  const steps = [
    {
      step: "Step 01",
      title: "Explore categories",
      desc: "Browse our wide range of categories to find the course that fits your goals.",
      offset: "lg:translate-y-12",
    },
    {
      step: "Step 02",
      title: "Select your course",
      desc: "Choose the perfect course from our curated selection of high-quality courses.",
      offset: "lg:translate-y-4",
    },
    {
      step: "Step 03",
      title: "Pay & register",
      desc: "Complete the easy check out to gain lifetime access to all learning materials.",
      offset: "lg:-translate-y-4",
    },
    {
      step: "Step 04",
      title: "Start learning",
      desc: "Learn at your own pace from industry experts with hands-on projects.",
      offset: "lg:-translate-y-12",
    },
  ];

  return (
    <section className="relative w-full bg-[#f0f5ff]/60 py-20 md:py-32 overflow-hidden">
      {/* Background SVG decorative line */}
      <div className="absolute inset-0 z-0 hidden lg:block pointer-events-none">
        <svg
          className="absolute w-full h-full left-0 top-0 text-indigo-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="8 8"
          viewBox="0 0 1440 600"
        >
          {/* A smooth S-curve connecting the staggered steps */}
          <path
            d="M 150 450 C 400 450, 450 350, 720 300 C 990 250, 1040 180, 1290 180"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy">
            How we <span className="text-brand-coral">deliver</span> excellence
          </h2>
          <p className="mt-4 text-brand-slate text-[15px]">
            Follow our simplified, structured path to start achieving your professional milestones.
          </p>
        </div>

        {/* Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:h-[350px] items-center pt-8">
          {steps.map((item, idx) => (
            <div
              key={idx}
              className={`flex flex-col bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-100/50 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${item.offset} relative`}
            >
              {/* Step Badge */}
              <div className="self-start rounded-full bg-indigo-50 px-3.5 py-1 text-xs font-bold text-indigo-600">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="mt-5 text-lg font-bold text-brand-navy">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-brand-slate leading-relaxed">
                {item.desc}
              </p>

              {/* Connector dots for mobile/tablet timeline style */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-4 border-indigo-100 hidden md:block lg:hidden z-10" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
