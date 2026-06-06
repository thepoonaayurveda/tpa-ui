/**
 * Renders a JSON-LD structured-data block.
 *
 * Pass any schema.org object (or array of objects) as `data`.
 * Use this everywhere we emit structured data so the serialization
 * (and XSS-safe escaping) lives in one place.
 *
 * Example:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", ... }} />
 */
type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  // Escape "<" to prevent breaking out of the <script> tag.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      // JSON-LD is static, generated server-side from our own data.
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
