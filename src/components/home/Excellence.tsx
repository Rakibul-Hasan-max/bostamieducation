"use client";

const steps = [
  {
    badge: "Step 1",
    title: "Explore categories",
    desc: "Browse through our various course categories to find the area that interests you the most.",
    yOffset: 300,
  },
  {
    badge: "Step 2",
    title: "Select your course",
    desc: "Our course listings include all the details you need to make an informed decision.",
    yOffset: 200,
  },
  {
    badge: "Step 3",
    title: "Enroll today",
    desc: "Sign up for your chosen course directly through our website.",
    yOffset: 100,
  },
  {
    badge: "Step 4",
    title: "Start learning",
    desc: "Begin your educational journey with access to high-quality course materials, engaging content, and support from instructors and peers.",
    yOffset: 0,
  },
];

export default function Excellence() {
  return (
    <section className="relative w-full bg-[#f0f5ff] overflow-hidden pt-20 pb-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* ── Section heading (top-left aligned) ── */}
        <h2 className="text-3xl md:text-[2.5rem] font-extrabold leading-[1.2] text-[#1a1a2e]">
          How we{" "}
          <span className="text-brand-coral">deliver</span>
          <br />excellence
        </h2>

        {/* ── Staircase card grid ── */}
        <div className="relative mt-14 hidden lg:block" style={{ height: "520px" }}>
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1200 520"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="2"
            strokeDasharray="4 4"
          >
            {/* Line: Step 1 → Step 2 */}
            <path d="M 250 390 V 210 H 550 V 290" />

            {/* Line: Step 2 → Step 3 */}
            <path d="M 550 290 V 110 H 850 V 190" />

            {/* Line: Step 3 → Step 4 */}
            <path d="M 850 190 V 10 H 1150 V 90" />
          </svg>

          {/* ── The 4 cards ── */}
          <div className="grid grid-cols-4 gap-6 h-full items-start">
            {steps.map((s) => (
              <div
                key={s.badge}
                className="flex flex-col relative"
                style={{ transform: `translateY(${s.yOffset}px)` }}
              >
                {/* White card with absolute-positioned Badge pill on top-right */}
                <div className="relative rounded-2xl bg-white p-6 shadow-md shadow-indigo-100/50 pt-8">
                  {/* Badge pill */}
                  <div className="absolute -top-3 right-6 rounded-lg bg-blue-500 px-3 py-1 text-[11px] font-bold text-white shadow-sm">
                    {s.badge}
                  </div>

                  <h3 className="text-[1.05rem] font-extrabold text-[#1a1a2e] mb-2 leading-snug">
                    {s.title}
                  </h3>
                  <p className="text-[13px] text-slate-500 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Mobile fallback: simple vertical list ── */}
        <div className="mt-10 flex flex-col gap-6 lg:hidden">
          {steps.map((s, i) => (
            <div key={s.badge} className="flex gap-4 items-start">
              {/* Step indicator line */}
              <div className="flex flex-col items-center">
                <div className="rounded-full bg-indigo-500 px-3 py-1 text-[11px] font-bold text-white whitespace-nowrap">
                  {s.badge}
                </div>
                {i < steps.length - 1 && (
                  <div className="mt-2 w-px flex-1 min-h-[40px] bg-indigo-200" />
                )}
              </div>
              {/* Card */}
              <div className="flex-1 rounded-2xl bg-white p-5 shadow-md shadow-indigo-100/50 mb-2">
                <h3 className="text-base font-extrabold text-[#1a1a2e] mb-1">{s.title}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
