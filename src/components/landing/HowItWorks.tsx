"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function PenIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4.5 1.5 1.5-4.5 12.362-12.226z"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 0 0-3.09 3.09Z"
      />
    </svg>
  );
}

function InsightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a13.5 13.5 0 0 1-3 0M12 3c-4.97 0-9 4.03-9 9a9 9 0 0 0 4.547 7.901"
      />
    </svg>
  );
}

const STEPS = [
  {
    number: 1,
    icon: <PenIcon />,
    title: "Enter Your Dream",
    description:
      "Describe what you remember — symbols, feelings, and events — in plain language. The more detail, the richer the insight.",
  },
  {
    number: 2,
    icon: <SparkleIcon />,
    title: "AI Analyzes It",
    description:
      "Our system cross-references classical Islamic scholarly sources and psychological frameworks to interpret your dream.",
  },
  {
    number: 3,
    icon: <InsightIcon />,
    title: "Get Dual Insights",
    description:
      "Receive a clear Islamic interpretation alongside a psychological explanation, side by side, with a downloadable PDF report.",
  },
];

export default function HowItWorks() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="how-it-works"
      className="relative bg-[var(--surface-muted)] border-y border-[var(--border)]"
    >
      {/* Subtle background accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,169,110,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-24">
        {/* Header */}
        <div
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 600ms ease, transform 600ms ease",
          }}
        >
          <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Steps — horizontal on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="relative flex flex-col items-center text-center"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 600ms ease ${i * 130}ms, transform 600ms ease ${i * 130}ms`,
              }}
            >
              {/* Connector line (between steps, desktop only) */}
              {i < STEPS.length - 1 && (
                <div
                  aria-hidden="true"
                  className="hidden md:block absolute top-[22px] left-[calc(50%+28px)] right-[-50%] h-px border-t border-dashed border-[var(--border)] z-0"
                />
              )}

              {/* Number bubble */}
              <div className="relative z-10 w-11 h-11 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-semibold shadow-md mb-5">
                {step.number}
              </div>

              {/* Icon + title */}
              <div className="flex items-center gap-1.5 text-[var(--primary)] mb-2">
                {step.icon}
                <h3 className="font-semibold text-[var(--foreground)] text-base">
                  {step.title}
                </h3>
              </div>

              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
