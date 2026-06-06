import { ReactNode } from "react";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { BuyCard } from "@/components/blog/BuyCard";
import type { TocItem } from "@/lib/blog";

/**
 * Two-column article shell.
 *  - Desktop: article + a sticky right sidebar holding the TOC and a
 *    persistent BuyCard, both following the reader down the page.
 *  - Mobile: a collapsible TOC at the top, then the article, with the
 *    BuyCard rendered once inline near the top so the buy option is present
 *    without pinning anything to the screen.
 */
export function PostLayout({
  tocItems,
  buyCard,
  children,
}: {
  tocItems: TocItem[];
  buyCard: ReactNode;
  children: ReactNode;
}) {
  const hasToc = tocItems.length > 0;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_280px] lg:gap-12">
      <div className="min-w-0">
        {/* Mobile: collapsible TOC */}
        {hasToc && (
          <details className="group mb-8 overflow-hidden rounded-xl border border-gray-200 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900 select-none">
              <span>On this page</span>
              <span className="text-[10px] text-gray-400 transition-transform group-open:rotate-180">
                ▼
              </span>
            </summary>
            <div className="px-4 pb-4 pt-3">
              <TableOfContents items={tocItems} flush />
            </div>
          </details>
        )}

        {/* Mobile: inline buy card */}
        <div className="mb-8 lg:hidden">{buyCard}</div>

        {children}
      </div>

      {/* Desktop: sticky sidebar (TOC + persistent buy card) */}
      <aside className="hidden lg:block">
        <div className="sticky top-8 space-y-6">
          {hasToc && (
            <div>
              <p className="m-0 mb-3 text-[11px] font-bold uppercase tracking-[0.08em] text-gray-400">
                On this page
              </p>
              <div className="max-h-[40vh] overflow-y-auto pr-1">
                <TableOfContents items={tocItems} />
              </div>
            </div>
          )}
          {buyCard}
        </div>
      </aside>
    </div>
  );
}
