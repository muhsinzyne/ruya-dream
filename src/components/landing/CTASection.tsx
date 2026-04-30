"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(threshold = 0.15) {
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

export default function CTASection() {
  const { ref, inView } = useInView();

  return (
    <section
      ref={ref}
      id="cta"
      className="max-w-5xl mx-auto px-6 py-28 text-center"
    >
      {/* Card-style CTA block */}
      <div
        className="relative overflow-hidden rounded-3xl border border-[var(--border)] p-12 sm:p-16 shadow-sm"
        style={{
          background:
            "linear-gradient(135deg, var(--surface) 0%, var(--surface-muted) 100%)",
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          transition: "opacity 700ms ease, transform 700ms ease",
        }}
      >
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% -10%, rgba(201,169,110,0.18) 0%, transparent 60%)",
          }}
        />

        {/* Arabic label */}
        <div className="relative z-10 inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-1.5 text-xs text-[var(--text-muted)] mb-8 shadow-sm">
          <span className="text-[var(--accent)]" lang="ar">
            ابدأ الآن
          </span>
          <span className="w-px h-3 bg-[var(--border)]" />
          <span>Start Now</span>
        </div>

        <h2 className="relative z-10 text-2xl sm:text-4xl font-semibold text-[var(--foreground)] tracking-tight mb-4">
          Start analyzing your dream now
        </h2>

        <p className="relative z-10 text-[var(--text-muted)] mb-10 max-w-sm mx-auto leading-relaxed">
          It takes less than a minute. No account, no sign-up — just your dream
          and its meaning.
        </p>

        <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/analyze"
            id="cta-section-btn"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--primary)] text-white font-medium text-base hover:bg-[var(--primary-dark)] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Analyze Your Dream
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <Link
            href="/"
            id="cta-section-home"
            className="text-sm text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors duration-200 underline underline-offset-4 decoration-[var(--border)]"
          >
            Learn more ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
