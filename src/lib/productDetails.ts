export interface ProductIngredient {
  name: string;
  quantity: string;
  scientificName?: string;
}

export interface ProductDetails {
  slug: string;
  productType: string;
  size: string;
  ingredients: ProductIngredient[];
  whoShouldUse: string[];
  whenToUse: string[];
  howToUse: string[];
  therapeuticUsage: string;
}

export const productDetailsMap: { [key: string]: ProductDetails } = {
  "flexio-oil": {
    slug: "flexio-oil",
    productType: "Massage Oil for Muscle & Joint Pain",
    size: "100ml",
    ingredients: [
      { name: "Mahavishagarbha Tailam", quantity: "70ml" },
      { name: "Panchaguna Tailam", quantity: "30ml" }
    ],
    whoShouldUse: [
      "People with muscle spasms and pain",
      "Individuals suffering from joint pain",
      "Those experiencing joint stiffness",
      "Athletes or physically active individuals with muscle soreness"
    ],
    whenToUse: [
      "When experiencing muscle or joint discomfort",
      "After physical activity or exercise",
      "During flare-ups of joint stiffness",
      "As part of regular wellness routine for joint health"
    ],
    howToUse: [
      "Warm the oil to lukewarm temperature",
      "Gently massage at the affected area",
      "Apply with circular motions until absorbed",
      "For external application only"
    ],
    therapeuticUsage: "Sandhigat Vedana, Sandhigatvata"
  },

  "sports-edge-oil": {
    slug: "sports-edge-oil",
    productType: "Body Massage Oil",
    size: "100ml",
    ingredients: [
      { name: "Bala Root", quantity: "4.16gm + 33.33gm (Bhavana)", scientificName: "Sida Cordifolia" },
      { name: "Ashwagandha Root", quantity: "4.16gm + 33.33gm (Bhavana)", scientificName: "Withania Somnifera" },
      { name: "Masha Seed", quantity: "4.16gm + 33.33gm (Bhavana)", scientificName: "Phaseolus Mungo" },
      { name: "Shatavari Root", quantity: "4.16gm + 33.33gm (Bhavana)", scientificName: "Asparagus Racemosus" },
      { name: "Yashtimadhu Root", quantity: "4.16gm + 33.33gm (Bhavana)", scientificName: "Glycyrrhiza Glabra" },
      { name: "Nirgundi Leaves", quantity: "4.16gm + 33.33gm (Bhavana)", scientificName: "Vitex Nigundo" },
      { name: "Gandhapura Taila", quantity: "10ml", scientificName: "Gaultheria fragrantissima" },
      { name: "Tila Taila Seed", quantity: "90ml", scientificName: "Sesamum Indicum" }
    ],
    whoShouldUse: [
      "Athletes and sports persons",
      "Fitness enthusiasts",
      "People engaged in regular physical activities",
      "Individuals looking to improve physical endurance",
      "Those seeking faster muscle recovery"
    ],
    whenToUse: [
      "Before workouts (as preparation)",
      "After physical activity (for recovery)",
      "During training periods",
      "When experiencing muscle fatigue",
      "As part of regular fitness routine"
    ],
    howToUse: [
      "Use lukewarm oil for gentle body massage",
      "Apply to entire body or targeted muscle groups",
      "Massage in circular motions until well absorbed",
      "Best used before or after physical activities"
    ],
    therapeuticUsage: "Sandhigat Vedana, Sandhigatvata"
  },

  "sports-edge-oil-junior": {
    slug: "sports-edge-oil-junior",
    productType: "Body Massage Oil for Juniors",
    size: "100ml",
    ingredients: [
      { name: "Shatavari Root", quantity: "5gm + 33.33gm (Bhavana)", scientificName: "Asparagus Racemosus" },
      { name: "Ashwagandha Root", quantity: "5gm + 33.33gm (Bhavana)", scientificName: "Withania Somnifera" },
      { name: "Bala Root", quantity: "5gm + 33.33gm (Bhavana)", scientificName: "Sida Cordifolia" },
      { name: "Yashtimadhu Root", quantity: "5gm + 33.33gm (Bhavana)", scientificName: "Glycyrrhiza Glabra" },
      { name: "Masha Seed", quantity: "5gm + 33.33gm (Bhavana)", scientificName: "Phaseolus Mungo" },
      { name: "Laksha Resin", quantity: "33.33gm (Bhavana)", scientificName: "Laccifera Lacca" },
      { name: "Tila Taila Seed", quantity: "100ml", scientificName: "Sesamum Indicum" },
      { name: "Go Dugdha (Cow's Milk)", quantity: "100ml" }
    ],
    whoShouldUse: [
      "Children and teenagers involved in sports",
      "Young athletes",
      "Active children needing muscle support",
      "Juniors requiring growth and development support",
      "Children with muscle fatigue or weakness"
    ],
    whenToUse: [
      "After sports activities",
      "During growth periods",
      "When child shows signs of fatigue",
      "As part of regular health routine for active children",
      "Before bedtime for relaxation"
    ],
    howToUse: [
      "Use lukewarm oil for gentle body massage",
      "Apply with soft, gentle strokes suitable for young skin",
      "Massage until absorbed",
      "Ensure oil is comfortably warm, not hot"
    ],
    therapeuticUsage: "Mansbalya, Bruhan, Mansa-asthi Bruhan"
  },

  "vario-oil": {
    slug: "vario-oil",
    productType: "Massage Oil for Varicose Veins",
    size: "100ml",
    ingredients: [
      { name: "Prasarini Tailam", quantity: "50ml" },
      { name: "Chandabalalakshadi Tailam", quantity: "30ml" },
      { name: "Sahachar Tailam", quantity: "20ml" }
    ],
    whoShouldUse: [
      "People with varicose veins",
      "Individuals with spider veins",
      "Those experiencing leg pain and swelling",
      "People with poor circulation in legs",
      "Individuals with edema in lower extremities"
    ],
    whenToUse: [
      "Daily for chronic varicose veins",
      "When experiencing leg pain or swelling",
      "After long periods of standing or sitting",
      "Evening time for better circulation",
      "As preventive care for those at risk"
    ],
    howToUse: [
      "Massage with lukewarm oil from down to upwards direction",
      "Start from feet and move towards thighs",
      "Use gentle, upward strokes following blood flow",
      "Apply twice daily for best results",
      "Focus on affected areas"
    ],
    therapeuticUsage: "Shoola, Shotha, Management of Varicose Veins and Spider Veins"
  },

  "allergenie": {
    slug: "allergenie",
    productType: "Ayurveda Allergy Support",
    size: "120 Tablets",
    ingredients: [
      { name: "Mansapachak", quantity: "60mg" },
      { name: "Medopachak", quantity: "60mg" },
      { name: "Laghusoothshekhar", quantity: "60mg" },
      { name: "Mahavatvidhvansa Ras", quantity: "60mg" },
      { name: "Shitivar Whole Plant", quantity: "110mg", scientificName: "Celosia Argentea" }
    ],
    whoShouldUse: [
      "People with respiratory allergies",
      "Individuals with chronic running nose",
      "Those suffering from nasal blocks",
      "People with nasal polyps",
      "Individuals with skin allergies",
      "Those with seasonal allergies"
    ],
    whenToUse: [
      "Twice daily with meals",
      "During allergy seasons",
      "When symptoms appear",
      "As preventive measure during high pollen periods",
      "Continue as prescribed by physician"
    ],
    howToUse: [
      "Take 1 to 2 tablets with warm water twice a day",
      "Or as directed by physician",
      "Take consistently for best results",
      "Can be taken with or after meals"
    ],
    therapeuticUsage: "Pratishyaya, Kasa, Peenas"
  },

  "endurio-35": {
    slug: "endurio-35",
    productType: "Ayurveda Support for Men's Health (Fortified with Shilajit)",
    size: "60 Tablets",
    ingredients: [
      { name: "Kokilaksha Root", quantity: "30mg + 0.25ml (Bhavana)", scientificName: "Astercantha longifolia" },
      { name: "Ashwagandha Root", quantity: "80mg + 0.25ml (Bhavana)", scientificName: "Withania Somnifera" },
      { name: "Shatavari Root", quantity: "80mg + 0.25ml (Bhavana)", scientificName: "Asparagus Racemosus" },
      { name: "Safed Musali Root", quantity: "80mg + 0.25ml (Bhavana)", scientificName: "Chlorophytum borivilianum" },
      { name: "Gokshur Seed", quantity: "80mg + 0.25ml (Bhavana)", scientificName: "Tribulus Terrestris" },
      { name: "Kavachbeej Seed", quantity: "50mg + 0.25ml (Bhavana)", scientificName: "Mucuna Pruriens" },
      { name: "Shudha Shilajit Bhasma", quantity: "100mg", scientificName: "Asphaltum Punjabaianum" }
    ],
    whoShouldUse: [
      "Men above 35 years of age",
      "Men experiencing decreased energy levels",
      "Those with reduced physical strength",
      "Men with stress-related fatigue",
      "Individuals seeking natural vitality support",
      "Men with general weakness"
    ],
    whenToUse: [
      "Twice daily preferably with meals",
      "Morning and evening",
      "Consistently for 2-3 months for optimal results",
      "Can be taken long-term under supervision",
      "Best taken with warm water or milk"
    ],
    howToUse: [
      "Take 1 to 2 tablets with warm water twice a day",
      "Or as directed by physician",
      "Take consistently at same times daily",
      "Can be taken with warm milk for better absorption"
    ],
    therapeuticUsage: "Mansa Balya, Vajikar, Improve General Health"
  },

  "uristo": {
    slug: "uristo",
    productType: "Urinary Tract Wellness",
    size: "60 Tablets",
    ingredients: [
      { name: "Shitivar Whole Plant", quantity: "325mg", scientificName: "Celosia Argentea" },
      { name: "Hajraul Yahood", quantity: "100mg" },
      { name: "Shwetaparpati", quantity: "50mg" },
      { name: "Yavakshara", quantity: "25mg" }
    ],
    whoShouldUse: [
      "People with recurrent urinary stones",
      "Individuals with burning urination",
      "Those with urinary tract discomfort",
      "People needing urinary alkalizer",
      "Individuals with kidney stone history"
    ],
    whenToUse: [
      "Twice daily with plenty of water",
      "Before or after meals as comfortable",
      "During acute symptoms",
      "As preventive measure for stone formation",
      "Continue as advised by healthcare provider"
    ],
    howToUse: [
      "Take 1 to 2 tablets with warm water twice a day",
      "Or as directed by physician",
      "Drink plenty of water throughout the day",
      "For best results, use with Uristo Choornam"
    ],
    therapeuticUsage: "Mootra Daha, Mootra Kruchhra, Mutrashmari"
  },

  "vario": {
    slug: "vario",
    productType: "Varicose Veins Support",
    size: "60 Tablets",
    ingredients: [
      { name: "Guduchi Stem", quantity: "230mg + 0.75ml (Bhavana)", scientificName: "Tinospora Cardifolia" },
      { name: "Brahmi Leaf", quantity: "150mg + 0.75ml (Bhavana)", scientificName: "Bacopa Monnieri" },
      { name: "Tapyadi Lauha", quantity: "50mg" },
      { name: "Gokshuradi Guggul", quantity: "50mg" },
      { name: "Kokilaksha Root", quantity: "20mg", scientificName: "Hygrophila Auriculata" }
    ],
    whoShouldUse: [
      "People with varicose veins",
      "Individuals with poor circulation",
      "Those with leg swelling and pain",
      "People with spider veins",
      "Individuals with vascular health concerns",
      "Those in occupations requiring prolonged standing"
    ],
    whenToUse: [
      "Twice daily before meals",
      "Morning and evening",
      "With empty stomach for better absorption",
      "Consistently for several months",
      "As preventive measure for high-risk individuals"
    ],
    howToUse: [
      "Take 1 to 2 tablets with warm water twice a day before meals",
      "Or as directed by physician",
      "Take consistently for best results",
      "Can be combined with Vario Oil for comprehensive care"
    ],
    therapeuticUsage: "Shotha, Shoola, Varicose Veins, Spider Veins"
  },

  "uristo-choornam": {
    slug: "uristo-choornam",
    productType: "Urinary Tract Wellness Powder",
    size: "30 Sachets (5gm each)",
    ingredients: [
      { name: "Shitivar Whole Plant", quantity: "2gm + 2ml Kwath (Bhavana)", scientificName: "Celosia Argentea" },
      { name: "Gokshur Whole Plant", quantity: "1.5gm + 2ml Kwath (Bhavana)", scientificName: "Tribulus Terrestris" },
      { name: "Punarnava Root", quantity: "0.75gm + 2ml Kwath (Bhavana)", scientificName: "Boerhavia Diffusa" },
      { name: "Pashanbhed Rhizome", quantity: "0.25gm + qs Kwath (Bhavana)", scientificName: "Bergenia Ligulata" },
      { name: "Varuna Stem Bark", quantity: "0.25gm + 2ml Kwath (Bhavana)", scientificName: "Crataeva Nurvala" },
      { name: "Palashpushpa Flower", quantity: "0.25gm + 2ml Kwath (Bhavana)", scientificName: "Butea Monosperma" },
      { name: "Parnbeej Swaras Leaves", quantity: "2ml", scientificName: "Bryophyllum Pinnatum" }
    ],
    whoShouldUse: [
      "People with recurrent urinary stones",
      "Individuals with burning urination",
      "Those needing urinary alkalizer",
      "People with urinary tract infections",
      "Individuals with kidney stone problems"
    ],
    whenToUse: [
      "Twice daily with warm water",
      "Morning and evening",
      "During acute symptoms",
      "Empty stomach preferred",
      "Continue as prescribed"
    ],
    howToUse: [
      "Mix 5gm powder in a cup of warm water",
      "Stir well and drink immediately",
      "Or as directed by physician",
      "For best results, use with Uristo Tablets",
      "Drink plenty of water throughout the day"
    ],
    therapeuticUsage: "Mootra Daha, Mootra Krucha, Mootra Ashmari"
  },

  "glycemio-choornam": {
    slug: "glycemio-choornam",
    productType: "Metabolic Health Support Powder",
    size: "30 Sachets (3gm each)",
    ingredients: [
      { name: "Amruta Whole Plant", quantity: "0.75gm + 2ml Kwath (Bhavana)", scientificName: "Tinospora Cordifolia" },
      { name: "Ashwagandha Root", quantity: "0.75gm + 2ml Kwath (Bhavana)", scientificName: "Withania Somnifera" },
      { name: "Amalaki Fruit Pericarp", quantity: "0.75gm + 2ml Kwath (Bhavana)", scientificName: "Emblica Officinalis" },
      { name: "Daruharidra Stem", quantity: "0.75gm + 2ml Kwath (Bhavana)", scientificName: "Berberis Aristata" },
      { name: "Paneer Phool Kwath Flower", quantity: "2ml (Bhavana)", scientificName: "Withania Coagulans" }
    ],
    whoShouldUse: [
      "People with metabolic health concerns",
      "Individuals with blood sugar irregularities",
      "Those experiencing chronic fatigue",
      "People with high stress levels",
      "Individuals seeking immunity support",
      "Those with inflammation issues"
    ],
    whenToUse: [
      "Twice daily with warm water",
      "Morning and evening",
      "Before or after meals as comfortable",
      "Consistently for 2-3 months",
      "During periods of high stress"
    ],
    howToUse: [
      "Mix 3gm powder in a cup of warm water",
      "Stir well and drink immediately",
      "Or as directed by physician",
      "Take consistently at same times daily",
      "Maintain healthy diet alongside"
    ],
    therapeuticUsage: "Prameha, Keldahara, Mansabalya, Rasayan"
  }
};

export function getProductDetails(slug: string): ProductDetails | null {
  return productDetailsMap[slug] || null;
}

export function getWhoShouldTake(slug: string): string[] {
  const details = getProductDetails(slug);
  return details?.whoShouldUse || [];
}

export function getHowToUse(slug: string): string[] {
  const details = getProductDetails(slug);
  return details?.howToUse || [];
}

export function getIngredients(slug: string): ProductIngredient[] {
  const details = getProductDetails(slug);
  return details?.ingredients || [];
}

export function getTherapeuticUsage(slug: string): string {
  const details = getProductDetails(slug);
  return details?.therapeuticUsage || "";
}