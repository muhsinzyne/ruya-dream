"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import TypingText from "./TypingText";

export default function HeroSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative overflow-hidden min-h-[92vh] flex flex-col items-center justify-center text-center px-6 py-28"
    >
      {/* Layered background glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        {/* Primary warm glow — top-right */}
        <div
          className="absolute top-[-10%] right-[-5%] w-[55vw] h-[55vw] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, rgba(201,169,110,0.35) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Secondary cool glow — bottom-left */}
        <div
          className="absolute bottom-[-8%] left-[-6%] w-[50vw] h-[50vw] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(107,91,71,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        {/* Subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
          }}
        />
      </div>

      <div
        className="relative z-10 flex flex-col items-center gap-6 max-w-3xl mx-auto transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2.5 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-1.5 text-xs text-[var(--text-muted)] shadow-sm backdrop-blur-sm">
          <span
            className="text-[var(--accent)] font-semibold tracking-wider"
            lang="ar"
          >
            رؤيا
          </span>
          <span className="w-px h-3 bg-[var(--border)]" />
          <span>AI Dream Interpretation</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] tracking-tight leading-[1.12] max-w-2xl">
          Understand Your Dreams{" "}
          <span
            className="relative inline-block"
            style={{
              background:
                "linear-gradient(135deg, var(--primary) 0%, var(--accent) 55%, var(--accent-light) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Like Never Before
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl leading-relaxed"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "150ms",
            transition: "opacity 600ms ease",
          }}
        >
          A unique blend of Islamic tradition and modern psychology — two lenses
          illuminating one dream.
        </p>

        {/* Typing animation */}
        <div
          className="h-8 flex items-center"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "250ms",
            transition: "opacity 600ms ease",
          }}
        >
          <TypingText />
        </div>

        {/* CTA row */}
        <div
          className="flex flex-col sm:flex-row items-center gap-3 mt-2"
          style={{
            opacity: visible ? 1 : 0,
            transitionDelay: "350ms",
            transition: "opacity 600ms ease",
          }}
        >
          <Link
            href="/analyze"
            id="hero-cta-primary"
            className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--primary)] text-white font-medium text-base hover:bg-[var(--primary-dark)] transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95"
          >
            Analyze Your Dream
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
          <p className="text-xs text-[var(--text-subtle)]">
            Free · No account required · 2 analyses/day
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40"
        aria-hidden="true"
      >
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-subtle)]">
          Scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-[var(--border)] to-transparent" />
      </div>
    </section>
  );
}
