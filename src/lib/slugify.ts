/**
 * GitHub-style heading slugger, used in two places that MUST agree:
 *   1. building the table-of-contents anchors from the MDX headings
 *   2. the `id` we attach to each rendered <h2>/<h3>
 * Keeping one implementation guarantees the TOC links land on the headings.
 *
 * `Slugger` mirrors GitHub's dedupe behaviour (repeat text gets `-1`, `-2`)
 * so two identically-worded headings still get unique, matching ids.
 */
function baseSlug(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // drop punctuation/emoji
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/-+/g, "-") // collapse repeats
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

export class Slugger {
  private seen = new Map<string, number>();

  slug(text: string): string {
    const base = baseSlug(text);
    const count = this.seen.get(base) ?? 0;
    this.seen.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  }
}

/** Strip markdown link syntax so heading text matches what renders. */
export function stripMarkdown(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim();
}
