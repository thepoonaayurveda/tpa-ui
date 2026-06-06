"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Thin fixed bar at the very top of the viewport that fills (in brand green)
 * as the reader scrolls the article. rAF-throttled for smooth, cheap updates.
 */
export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    function onScroll() {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        setProgress(
          docHeight > 0
            ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
            : 0
        );
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-gray-100">
      <div
        className="h-full bg-primary transition-[width] duration-75 ease-out will-change-[width]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
