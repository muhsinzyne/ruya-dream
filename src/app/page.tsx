import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Icon helpers (inline SVGs — no extra deps) ─────────────────────────────

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 3A6.75 6.75 0 0 0 3 9.75c0 2.18 1.04 4.12 2.66 5.36A4.5 4.5 0 0 0 9 19.5h6a4.5 4.5 0 0 0 3.34-1.14A6.75 6.75 0 0 0 21 9.75 6.75 6.75 0 0 0 14.25 3"
      />
    </svg>
  );
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
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.355a13.5 13.5 0 0 1-3 0M12 3c-4.97 0-9 4.03-9 9a9 9 0 0 0 4.547 7.901"
      />
    </svg>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function InsightCard({
  icon,
  title,
  description,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}) {
  return (
    <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col gap-4">
      <div className="w-12 h-12 rounded-xl bg-[var(--surface-muted)] border border-[var(--border)] flex items-center justify-center text-[var(--primary)]">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2">{title}</h3>
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-3">{description}</p>
        <p className="text-xs text-[var(--text-subtle)] leading-relaxed border-t border-[var(--border)] pt-3">
          {detail}
        </p>
      </div>
    </div>
  );
}

function StepItem({
  number,
  icon,
  title,
  description,
}: {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-5 items-start">
      {/* Step number + icon */}
      <div className="flex-shrink-0 flex flex-col items-center">
        <div className="w-10 h-10 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-semibold">
          {number}
        </div>
        {number < 3 && <div className="w-px h-12 bg-[var(--border)] mt-2" />}
      </div>

      {/* Content */}
      <div className="pb-8">
        <div className="flex items-center gap-2 text-[var(--primary)] mb-1">
          {icon}
          <h3 className="font-semibold text-[var(--foreground)] text-base">{title}</h3>
        </div>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-16">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          {/* Subtle background pattern */}
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 70% 30%, rgba(201,169,110,0.08) 0%, transparent 60%),
                                radial-gradient(circle at 20% 80%, rgba(107,91,71,0.06) 0%, transparent 50%)`,
            }}
          />

          <div className="max-w-5xl mx-auto px-6 py-28 sm:py-36 text-center relative">
            {/* Arabic subtitle tag */}
            <div className="inline-flex items-center gap-2 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-1.5 text-xs text-[var(--text-muted)] mb-8 shadow-sm">
              <span className="text-[var(--accent)] font-medium">رؤيا</span>
              <span>·</span>
              <span>Dream Interpretation</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[var(--foreground)] tracking-tight leading-tight mb-6">
              Understand Your{" "}
              <span
                className="relative inline-block"
                style={{
                  background: "linear-gradient(135deg, var(--primary), var(--accent))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Dreams
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-[var(--text-muted)] max-w-xl mx-auto leading-relaxed mb-10">
              Insights through Islamic scholarly tradition and modern psychology — two lenses, one
              dream.
            </p>

            <Link
              href="/analyze"
              id="hero-cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--primary)] text-white font-medium text-base hover:bg-[var(--primary-dark)] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Analyze Your Dream
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            <p className="mt-4 text-xs text-[var(--text-subtle)]">Free · No account required · 2 analyses per day</p>
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-[var(--border)]" />
        </div>

        {/* ── Two Perspectives ─────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] mb-3">
              Two Perspectives, One Dream
            </h2>
            <p className="text-[var(--text-muted)] text-base max-w-md mx-auto">
              We combine centuries of Islamic scholarship with evidence-based psychology to give you
              a meaningful, grounded reading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InsightCard
              icon={<MoonIcon />}
              title="Islamic Interpretation"
              description="Rooted in the classical tradition of scholars like Ibn Sirin and Al-Nabulsi, this perspective interprets dream symbols through Islamic understanding and spiritual meaning."
              detail="References classical rulings and symbolic traditions — not a fatwa or religious authority."
            />
            <InsightCard
              icon={<BrainIcon />}
              title="Scientific Explanation"
              description="Drawing from Freudian theory, Jungian archetypes, and modern neuroscience, this lens explores what your dream may reflect about your mental and emotional state."
              detail="Informational only — not a diagnosis or therapeutic advice."
            />
          </div>
        </section>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-[var(--border)]" />
        </div>

        {/* ── How It Works ─────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: heading */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] mb-4">
                How It Works
              </h2>
              <p className="text-[var(--text-muted)] text-base leading-relaxed">
                A simple, three-step process. No sign-up, no data stored beyond what&apos;s
                necessary — just your dream and its interpretation.
              </p>
            </div>

            {/* Right: steps */}
            <div>
              <StepItem
                number={1}
                icon={<PenIcon />}
                title="Enter your dream"
                description="Describe what you remember — symbols, feelings, and events — in plain language."
              />
              <StepItem
                number={2}
                icon={<SparkleIcon />}
                title="We analyze it"
                description="Our system cross-references scholarly sources and psychological frameworks to interpret your dream."
              />
              <StepItem
                number={3}
                icon={<InsightIcon />}
                title="Get dual insights"
                description="Receive a clear Islamic interpretation alongside a psychological explanation, side by side."
              />
            </div>
          </div>
        </section>

        {/* ── Disclaimer ───────────────────────────────────────────────────── */}
        <section className="bg-[var(--surface-muted)] border-y border-[var(--border)]">
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--border)] flex items-center justify-center text-[var(--text-muted)] text-sm font-semibold">
              ℹ
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              <span className="font-semibold text-[var(--foreground)]">Disclaimer: </span>
              This tool provides traditional Islamic interpretations and psychological insights for
              informational purposes only. It is{" "}
              <span className="font-medium">not a prediction, religious ruling (fatwa)</span>, or
              substitute for professional mental health advice. Dream interpretation is a nuanced
              field — use this as a reflective aid, not a definitive answer.
            </p>
          </div>
        </section>

        {/* ── Final CTA ────────────────────────────────────────────────────── */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--foreground)] mb-4">
            Ready to explore your dream?
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-sm mx-auto">
            It takes less than a minute. No account needed.
          </p>
          <Link
            href="/analyze"
            id="bottom-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--primary)] text-white font-medium text-base hover:bg-[var(--primary-dark)] transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            Analyze Your Dream
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
