"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Helper to generate UUID v4
function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function AnalyzePage() {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [dreamText, setDreamText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);

  // Initialize device ID on mount
  useEffect(() => {
    let id = localStorage.getItem("ruya_device_id");
    if (!id) {
      id = generateUUID();
      localStorage.setItem("ruya_device_id", id);
    }
    setDeviceId(id);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!dreamText.trim()) {
      setError("Please describe your dream.");
      return;
    }

    if (dreamText.length > 1000) {
      setError("Your dream description is too long (maximum 1000 characters).");
      return;
    }

    if (!deviceId) {
      setError("Unable to verify device ID. Please try refreshing.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/dreams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          device_id: deviceId,
          dream_text: dreamText,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "An error occurred while submitting your dream.");
      }

      setResult({ ...data.result, original_dream: dreamText, id: data.request_id });
      setDreamText("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!result?.id) return;
    // Open the PDF in a new tab which triggers download
    window.location.href = `/api/dreams/pdf?requestId=${result.id}`;
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 pt-24 pb-16 px-6 flex items-center justify-center min-h-[calc(100vh-64px)] print-container">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-10 no-print">
            <h1 className="text-3xl font-semibold text-[var(--foreground)] mb-3">
              {result ? "Dream Analysis Report" : "Analyze Your Dream"}
            </h1>
            <p className="text-[var(--text-muted)] text-base">
              {result 
                ? "Your dual-perspective insights are ready. Your PDF report is being generated using wkhtmltopdf."
                : "Write down what you remember. The more details, the better the insight."}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm no-print">
              {error}
            </div>
          )}

          {/* Form Section */}
          {!result && (
            <div className="max-w-2xl mx-auto bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-sm p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label htmlFor="dream" className="sr-only">
                    Dream Description
                  </label>
                  <textarea
                    id="dream"
                    name="dream"
                    rows={8}
                    className="w-full bg-[var(--surface-muted)] border border-[var(--border)] rounded-xl p-4 text-[var(--foreground)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none transition-all duration-200"
                    placeholder="Describe your dream... e.g., 'I was walking through a dense forest and saw a bright light...'"
                    value={dreamText}
                    onChange={(e) => setDreamText(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <div className="flex justify-between items-center mt-2 text-xs text-[var(--text-subtle)] px-2">
                    <span>Try to include feelings, colors, and key events.</span>
                    <span className={dreamText.length > 1000 ? "text-red-500" : ""}>
                      {dreamText.length} / 1000
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !dreamText.trim()}
                  className="w-full py-3.5 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-sm flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Dream"
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Detailed Report View */}
          {result && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Original Dream Card */}
              <div className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 mb-8 shadow-sm report-card">
                <div className="flex items-center gap-2 mb-4 text-[var(--primary)] font-medium text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Your Dream
                </div>
                <blockquote className="dream-quote text-[var(--foreground)] italic leading-relaxed text-lg">
                  "{result.original_dream}"
                </blockquote>
              </div>

              {/* Analysis Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Islamic Perspective Section */}
                <div className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm report-card">
                  <div className="bg-[var(--primary)] p-4 text-white flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                      🌙 Islamic Tradition
                    </h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Scholarly Lens</span>
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="mb-6 flex-1">
                      <p className="text-[var(--foreground)] leading-relaxed mb-6 whitespace-pre-wrap">
                        {result.islamic_interpretation.summary}
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">Key Symbols Identified</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.islamic_interpretation.symbols?.map((s: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-[var(--surface-muted)] border border-[var(--border)] rounded-full text-xs text-[var(--primary)] font-medium">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-[var(--border)] mt-auto">
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed italic">
                        {result.islamic_interpretation.notes}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Scientific Perspective Section */}
                <div className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-sm report-card">
                  <div className="bg-[var(--accent)] p-4 text-white flex items-center justify-between">
                    <h3 className="font-semibold flex items-center gap-2 text-lg">
                      🧠 Scientific Analysis
                    </h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">Psychological Lens</span>
                  </div>
                  <div className="p-6 sm:p-8 flex-1 flex flex-col">
                    <div className="mb-6 flex-1">
                      <p className="text-[var(--foreground)] leading-relaxed mb-6 whitespace-pre-wrap">
                        {result.scientific_explanation.summary}
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-subtle)]">Psychological Factors</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.scientific_explanation.psychological_factors?.map((f: string, i: number) => (
                            <span key={i} className="px-3 py-1 bg-[var(--surface-muted)] border border-[var(--border)] rounded-full text-xs text-[var(--accent)] font-medium">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-[var(--border)] mt-auto">
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed italic">
                        {result.scientific_explanation.notes}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
                <button
                  onClick={handleDownloadPdf}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[var(--primary)] text-white font-medium hover:bg-[var(--primary-dark)] transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                  </svg>
                  Download Report (PDF)
                </button>
                
                <button
                  onClick={() => setResult(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--surface-muted)] transition-all duration-200 font-medium active:scale-95"
                >
                  Analyze New Dream
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
