import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeatureCards from "@/components/landing/FeatureCards";
import HowItWorks from "@/components/landing/HowItWorks";
import CTASection from "@/components/landing/CTASection";

export const metadata: Metadata = {
  title: "Ruya – Dream Interpretation Landing Page",
  description:
    "Understand your dreams through the unique lens of Islamic scholarly tradition and modern psychology. AI-powered, free, and private.",
  keywords: [
    "dream interpretation",
    "Islamic dreams",
    "dream psychology",
    "ruya",
    "AI dream analysis",
  ],
};

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1 pt-16">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <HeroSection />

        {/* ── Divider ──────────────────────────────────────────────────────── */}
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-t border-[var(--border)]" />
        </div>

        {/* ── Feature Cards ─────────────────────────────────────────────────── */}
        <FeatureCards />

        {/* ── How It Works ──────────────────────────────────────────────────── */}
        <HowItWorks />

        {/* ── CTA Section ───────────────────────────────────────────────────── */}
        <CTASection />

        {/* ── Disclaimer ────────────────────────────────────────────────────── */}
        <section
          id="disclaimer"
          className="border-t border-[var(--border)] bg-[var(--surface-muted)]"
        >
          <div className="max-w-5xl mx-auto px-6 py-8 flex items-start sm:items-center gap-4">
            <div
              className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--border)] flex items-center justify-center text-[var(--text-muted)] text-xs font-semibold"
              aria-hidden="true"
            >
              ℹ
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-3xl">
              <span className="font-semibold text-[var(--foreground)]">
                Disclaimer:{" "}
              </span>
              This tool provides traditional Islamic interpretations and
              psychological insights for informational purposes only. It is{" "}
              <span className="font-medium">
                not a prediction, religious ruling (fatwa)
              </span>
              , or substitute for professional mental health advice. Dream
              interpretation is a nuanced field — use this as a reflective aid,
              not a definitive answer.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
