"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
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

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
      />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3A6.75 6.75 0 0 0 3 9.75c0 2.18 1.04 4.12 2.66 5.36A4.5 4.5 0 0 0 9 19.5h6a4.5 4.5 0 0 0 3.34-1.14A6.75 6.75 0 0 0 21 9.75 6.75 6.75 0 0 0 14.25 3"
      />
    </svg>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
  detail: string;
  accentColor: string;
  delay?: number;
  inView: boolean;
}

function FeatureCard({
  icon,
  label,
  title,
  description,
  detail,
  accentColor,
  delay = 0,
  inView,
}: FeatureCardProps) {
  return (
    <div
      className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col gap-5 overflow-hidden cursor-default"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms, box-shadow 300ms ease`,
      }}
    >
      {/* Subtle corner glow on hover */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Icon badge */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors duration-300"
        style={{
          backgroundColor: `${accentColor}14`,
          borderColor: `${accentColor}30`,
          color: accentColor,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2">
        <span
          className="text-[10px] font-bold uppercase tracking-widest"
          style={{ color: accentColor }}
        >
          {label}
        </span>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-[var(--border)]">
        <p className="text-xs text-[var(--text-subtle)] leading-relaxed italic">
          {detail}
        </p>
      </div>
    </div>
  );
}

export default function FeatureCards() {
  const { ref, inView } = useInView();

  return (
    <section id="features" className="max-w-5xl mx-auto px-6 py-24" ref={ref}>
      {/* Section header */}
      <div
        className="text-center mb-14"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 600ms ease, transform 600ms ease",
        }}
      >
        <span className="text-xs font-bold uppercase tracking-widest text-[var(--accent)] mb-3 block">
          Dual Perspective
        </span>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] mb-3 tracking-tight">
          Two Lenses, One Dream
        </h2>
        <p className="text-[var(--text-muted)] text-base max-w-md mx-auto leading-relaxed">
          We combine centuries of Islamic scholarship with evidence-based
          psychology for a meaningful, grounded reading.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<MoonIcon />}
          label="Traditional Lens"
          title="Islamic Interpretation"
          description="Rooted in the classical tradition of scholars like Ibn Sirin and Al-Nabulsi — interpreting symbols through Islamic understanding and spiritual meaning."
          detail="References classical rulings and symbolic traditions — not a fatwa or religious authority."
          accentColor="#6b5b47"
          delay={0}
          inView={inView}
        />
        <FeatureCard
          icon={<BrainIcon />}
          label="Modern Lens"
          title="Scientific Explanation"
          description="Drawing from Freudian theory, Jungian archetypes, and modern neuroscience — exploring what your dream may reflect about your mental and emotional state."
          detail="Informational only — not a diagnosis or therapeutic advice."
          accentColor="#c9a96e"
          delay={120}
          inView={inView}
        />
      </div>
    </section>
  );
}
