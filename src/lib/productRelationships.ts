// Manual product relationships for better related product suggestions
export interface ProductRelationship {
  [productSlug: string]: string[];
}

export const productRelationships: ProductRelationship = {
  // Urinary Health Products - Complementary products
  "uristo": ["uristo-choornam", "glycemio-choornam"],
  "uristo-choornam": ["uristo", "glycemio-choornam"],
  
  // Sports/Fitness Products - Product line relationships
  "sports-edge-oil": ["sports-edge-oil-junior", "flexio-oil"],
  "sports-edge-oil-junior": ["sports-edge-oil", "flexio-oil"],
  "flexio-oil": ["sports-edge-oil", "sports-edge-oil-junior"],
  
  // Vascular Health Products - Complementary internal/external treatments
  "vario": ["vario-oil", "uristo"],
  "vario-oil": ["vario", "uristo"],
  
  // Men's Health & Metabolic Support
  "endurio-35": ["glycemio-choornam", "sports-edge-oil"],
  "glycemio-choornam": ["endurio-35", "uristo", "uristo-choornam"],
  
  // Respiratory/Allergy Support - Can be used with other wellness products
  "allergenie": ["glycemio-choornam", "endurio-35"],
};

/**
 * Get manually defined related products for a given product slug
 */
export function getManualRelatedProducts(productSlug: string): string[] {
  return productRelationships[productSlug] || [];
}

/**
 * Check if two products are related according to manual relationships
 */
export function areProductsRelated(productSlug1: string, productSlug2: string): boolean {
  const relatedToFirst = productRelationships[productSlug1] || [];
  const relatedToSecond = productRelationships[productSlug2] || [];
  
  return relatedToFirst.includes(productSlug2) || relatedToSecond.includes(productSlug1);
}

/**
 * Get all products that have manual relationships defined
 */
export function getProductsWithRelationships(): string[] {
  return Object.keys(productRelationships);
}