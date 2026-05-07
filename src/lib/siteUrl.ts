const FALLBACK = "https://thepoonaayurveda.com";

function normalize(raw: string): string {
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return FALLBACK;
  if (trimmed.includes("localhost") || trimmed.startsWith("http://127.")) return FALLBACK;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export const SITE_URL = normalize(process.env.NEXT_PUBLIC_SITE_URL ?? "");
