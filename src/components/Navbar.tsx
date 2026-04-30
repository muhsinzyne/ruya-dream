import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/80 backdrop-blur-md border-b border-[var(--border)]">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="text-xl font-semibold tracking-wide text-[var(--primary)]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            رؤيا
          </span>
          <span className="text-sm font-medium text-[var(--text-muted)] group-hover:text-[var(--primary)] transition-colors duration-200">
            Ruya
          </span>
        </Link>

        {/* CTA */}
        <Link
          href="/analyze"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)] transition-colors duration-200"
        >
          Analyze a Dream
        </Link>
      </div>
    </header>
  );
}
