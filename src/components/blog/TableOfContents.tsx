"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/blog";

/**
 * Scroll-spy table of contents. Highlights the heading nearest the top of
 * the viewport in brand green and smooth-scrolls on click. Used both in the
 * desktop sticky sidebar and (with `flush`) inside the mobile <details>.
 */
export function TableOfContents({
  items,
  flush,
}: {
  items: TocItem[];
  flush?: boolean;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const onScroll = () => {
      const cutoff = window.scrollY + window.innerHeight * 0.25;
      let active = "";
      for (const el of headings) {
        if (el.offsetTop <= cutoff) active = el.id;
        else break;
      }
      setActiveId(active);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      <ul className="m-0 list-none space-y-0.5 p-0">
        {items.map((item) => {
          const isActive = activeId === item.id;
          const indent = flush ? "pl-0" : "pl-[11px]";
          const border = flush
            ? "border-l-0"
            : isActive
            ? "border-l-2 border-primary"
            : "border-l-2 border-gray-200";
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById(item.id)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.replaceState(null, "", `#${item.id}`);
                }}
                className={`block py-1.5 text-[13px] leading-snug no-underline transition-colors duration-150 ${indent} ${border} ${
                  isActive
                    ? "font-semibold text-primary"
                    : "font-normal text-gray-500 hover:text-gray-900"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
