export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-muted)]">
      <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--text-subtle)]">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[var(--primary)] font-medium">Ruya</span>. All rights reserved.
        </p>
        <p className="text-xs text-center sm:text-right max-w-sm leading-relaxed">
          Interpretations are traditional and informational only — not religious rulings or
          predictions.
        </p>
      </div>
    </footer>
  );
}
