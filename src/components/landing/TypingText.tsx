"use client";

import { useState, useEffect } from "react";

const PHRASES = [
  "Dreaming about flying...",
  "Seeing water in your dream...",
  "Running but can't move?",
  "Recurring dreams?",
  "Dreaming of a loved one...",
  "Lost in an unknown place...",
];

export default function TypingText() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIndex];

    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 1800);
      return () => clearTimeout(pauseTimer);
    }

    if (!isDeleting && displayed.length < current.length) {
      const typingTimer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1));
      }, 55);
      return () => clearTimeout(typingTimer);
    }

    if (!isDeleting && displayed.length === current.length) {
      setIsPaused(true);
      return;
    }

    if (isDeleting && displayed.length > 0) {
      const deleteTimer = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length - 1));
      }, 28);
      return () => clearTimeout(deleteTimer);
    }

    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIndex((i) => (i + 1) % PHRASES.length);
    }
  }, [displayed, isDeleting, isPaused, phraseIndex]);

  return (
    <div
      id="typing-text"
      className="inline-flex items-center gap-2 font-mono text-sm sm:text-base text-[var(--accent)] tracking-wide"
      aria-live="polite"
      aria-label="Dream examples"
    >
      <span
        className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0 animate-pulse"
        aria-hidden="true"
      />
      <span>{displayed}</span>
      <span
        className="inline-block w-0.5 h-4 bg-[var(--accent)] animate-[blink_1s_step-end_infinite]"
        aria-hidden="true"
      />
    </div>
  );
}
