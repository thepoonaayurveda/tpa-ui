interface FAQ {
  question: string;
  answer: string;
}

interface ProductFAQs {
  [key: string]: FAQ[];
}

export const productFAQs: ProductFAQs = {
  "flexio-oil": [
    {
      question: "What conditions does Flexio Oil help with?",
      answer: "Flexio Oil helps manage muscle spasms and pain, joint pain, and joint stiffness through external application."
    },
    {
      question: "How should I use Flexio Oil?",
      answer: "Warm the oil to lukewarm temperature, then gently massage at the affected area with circular motions until absorbed. For external application only. Use when experiencing muscle or joint discomfort, after physical activity, or as part of your regular wellness routine."
    },
    {
      question: "What are the main ingredients in Flexio Oil?",
      answer: "Each 100ml contains Mahavishagarbha Tailam (70ml) and Panchaguna Tailam (30ml)."
    },
    {
      question: "What is the therapeutic usage according to Ayurveda?",
      answer: "It's used for Sandhigat Vedana and Sandhigatvata conditions."
    },
    {
      question: "How much oil comes in one bottle?",
      answer: "Each bottle contains 100ml of oil."
    },
    {
      question: "Is this oil safe for external use only?",
      answer: "Yes, this is meant for external application only through gentle massage."
    }
  ],

  "sports-edge-oil": [
    {
      question: "Who can use Sports Edge Oil?",
      answer: "It's designed as a body massage oil for athletes and active individuals looking to improve physical performance and recovery."
    },
    {
      question: "What are the key benefits of Sports Edge Oil?",
      answer: "It helps improve physical endurance, muscle recovery after physical activity, promotes overall growth and development, reduces fatigue and tiredness, and hydrates and softens skin."
    },
    {
      question: "What makes Sports Edge Oil special?",
      answer: "It's enriched with Nirgundi for muscle pain relief, Ashwagandha for strength and recovery, Bala for muscle tone, Masha for flexibility, Yashtimadhu for inflammation, and Shatavari for muscle repair."
    },
    {
      question: "How do I use Sports Edge Oil?",
      answer: "Use lukewarm oil for gentle body massage. Apply to entire body or targeted muscle groups with circular motions until well absorbed. Best used before workouts for preparation or after physical activity for recovery. Can be used during training periods and as part of your regular fitness routine."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Sandhigat Vedana and Sandhigatvata conditions."
    },
    {
      question: "Can I use this oil daily?",
      answer: "Yes, it can be used regularly as part of your fitness routine for best results."
    }
  ],

  "sports-edge-oil-junior": [
    {
      question: "Is Sports Edge Oil Junior different from regular Sports Edge Oil?",
      answer: "Yes, it's specially formulated for juniors with ingredients like Desi cow milk and a gentler formulation suitable for younger users."
    },
    {
      question: "What age group is this suitable for?",
      answer: "This is designed for juniors, though specific age ranges should be confirmed with a healthcare provider."
    },
    {
      question: "What are the unique ingredients in the Junior version?",
      answer: "It contains Desi cow milk for nourishment, along with Ashwagandha, Bala, Masha, Yashtimadhu, and Shatavari in junior-appropriate concentrations."
    },
    {
      question: "What is the Ayurvedic therapeutic usage for the Junior version?",
      answer: "It's used for Mansbalya, Bruhan, and Mansa-asthi bruhan (muscle and bone strengthening)."
    },
    {
      question: "How should it be applied?",
      answer: "Use lukewarm oil for gentle body massage with soft, gentle strokes suitable for young skin. Massage until absorbed, ensuring oil is comfortably warm, not hot. Best used after sports activities, during growth periods, when child shows signs of fatigue, or before bedtime for relaxation."
    },
    {
      question: "What benefits can juniors expect?",
      answer: "Improved physical endurance, muscle recovery, overall growth and development, reduced fatigue, and skin hydration."
    }
  ],

  "vario-oil": [
    {
      question: "What is Vario Oil used for?",
      answer: "Vario Oil is specifically designed for managing varicose veins and spider veins."
    },
    {
      question: "How does Vario Oil help with varicose veins?",
      answer: "It helps reduce pain and edema, improves circulation, and manages varicose veins and spider veins."
    },
    {
      question: "What's the correct way to apply Vario Oil?",
      answer: "Massage with lukewarm oil from down to upwards direction, starting from feet and moving towards thighs. Use gentle, upward strokes following blood flow. Apply twice daily for best results, focusing on affected areas. Use daily for chronic varicose veins or after long periods of standing/sitting."
    },
    {
      question: "What are the main ingredients?",
      answer: "Each 100ml contains Prasarini Tailam (50ml), Chandabalalakshadi Tailam (30ml), and Sahachar Tailam (20ml)."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Shoola (pain), Shotha (swelling), and helps in management of varicose veins and spider veins."
    },
    {
      question: "How often should I use Vario Oil?",
      answer: "Use as needed, typically daily for chronic conditions, or as directed by your healthcare provider."
    }
  ],

  "allergenie": [
    {
      question: "What types of allergies does AllerGenie help with?",
      answer: "AllerGenie helps manage respiratory allergies, running nose, nasal blocks, nasal polyps, and skin allergies."
    },
    {
      question: "How do I take AllerGenie tablets?",
      answer: "Take 1 to 2 tablets with warm water twice a day, or as directed by your physician. Take with meals for best results. Use twice daily during allergy seasons, when symptoms appear, or as preventive measure during high pollen periods. Take consistently for optimal benefits."
    },
    {
      question: "How many tablets come in one pack?",
      answer: "Each pack contains 120 tablets."
    },
    {
      question: "What are the main ingredients?",
      answer: "Each 350mg tablet contains Mansapachak (60mg), Medopachak (60mg), Laghusoothshekhar (60mg), Mahavatvidhvansa Ras (60mg), and Shitivar whole plant (110mg)."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Pratishyaya, Kasa, and Peenas conditions."
    },
    {
      question: "Can I take this with other medications?",
      answer: "Consult your healthcare provider before combining with other medications."
    }
  ],

  "endurio-35": [
    {
      question: "Who should use Endurio 35+?",
      answer: "It's designed as Ayurvedic support for men's health, particularly those 35 years and above."
    },
    {
      question: "What makes Endurio 35+ special?",
      answer: "It's fortified with Shudha Shilajit and contains powerful herbs like Ashwagandha, Safed Musali, and Gokshur."
    },
    {
      question: "How should I take Endurio 35+?",
      answer: "Take 1 to 2 tablets with warm water twice a day, preferably with meals in the morning and evening. Can be taken with warm milk for better absorption. Take consistently at same times daily for 2-3 months for optimal results. Can be taken long-term under supervision."
    },
    {
      question: "What are the key ingredients?",
      answer: "Contains Kokilaksha, Ashwagandha, Shatavari, Safed Musali, Gokshur, Kavachbeej, and Shudha Shilajit in a 500mg tablet."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Mansa balya (muscle strength), Vajikar (vitality), and improving general health."
    },
    {
      question: "How many tablets are in one pack?",
      answer: "Each pack contains 60 tablets."
    }
  ],

  "uristo": [
    {
      question: "What urinary issues does Uristo help with?",
      answer: "Uristo helps manage recurrent urinary stones, expulsion of urinary calculi, burning urination, and acts as a urinary alkalizer."
    },
    {
      question: "How do I take Uristo tablets?",
      answer: "Take 1 to 2 tablets with warm water twice a day, before or after meals as comfortable. Drink plenty of water throughout the day. Take during acute symptoms or as preventive measure for stone formation. For best results, use with Uristo Choornam as recommended by your healthcare provider."
    },
    {
      question: "What are the main ingredients?",
      answer: "Each 500mg tablet contains Shitivar whole plant (325mg), Hajraul yahood (100mg), Shwetaparpati (50mg), and Yavakshara (25mg)."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Mootra daha, Mootra kruchhra, and Mutrashmari conditions."
    },
    {
      question: "Can I use Uristo with Uristo Choornam?",
      answer: "Yes, for best results, Uristo tablets can be used together with Uristo Choornam as recommended."
    },
    {
      question: "How many tablets come in one pack?",
      answer: "Each pack contains 60 tablets."
    }
  ],

  "vario": [
    {
      question: "How do Vario tablets help with varicose veins?",
      answer: "Vario tablets help support vascular health, improve circulation, reduce inflammation, reduce swelling/edema, and reduce pain."
    },
    {
      question: "When should I take Vario tablets?",
      answer: "Take 1 to 2 tablets with warm water twice a day before meals (morning and evening) with empty stomach for better absorption. Take consistently for several months for best results. Can be used as preventive measure for high-risk individuals or those in occupations requiring prolonged standing."
    },
    {
      question: "What are the key ingredients?",
      answer: "Each 550mg tablet contains Guduchi stem, Brahmi leaf, Tapyadi Lauha, Gokshuradi Guggul, and Kokilaksha root."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Shotha (swelling), Shoola (pain), varicose veins, and spider veins."
    },
    {
      question: "Can I use Vario tablets with Vario Oil?",
      answer: "Yes, using both products together may provide comprehensive support for varicose vein management."
    },
    {
      question: "How many tablets are in one pack?",
      answer: "Each pack contains 60 tablets."
    }
  ],

  "uristo-choornam": [
    {
      question: "How is Uristo Choornam different from Uristo tablets?",
      answer: "Uristo Choornam is a powder form that can be mixed with water, offering an alternative delivery method for the same therapeutic benefits."
    },
    {
      question: "How do I prepare and take Uristo Choornam?",
      answer: "Mix 5gm powder in a cup of warm water, stir well and drink immediately. Take twice daily (morning and evening), preferably on empty stomach. Use during acute symptoms or continue as prescribed. Drink plenty of water throughout the day. For best results, use with Uristo Tablets."
    },
    {
      question: "Can I use Uristo Choornam with Uristo tablets?",
      answer: "Yes, for best results, use together with Uristo tablets as recommended."
    },
    {
      question: "What does one pack contain?",
      answer: "Each pack contains 30 sachets of 5gm each."
    },
    {
      question: "What are the main ingredients?",
      answer: "Contains Shitivar, Gokshur, Punarnava, Pashanbhed, Varuna, Palashpushpa, and Parnbeej swaras with various kwaths (decoctions)."
    },
    {
      question: "What conditions does it help with?",
      answer: "Helps with recurrent urinary stones, burning urination, and acts as a urinary alkalizer."
    }
  ],

  "glycemio-choornam": [
    {
      question: "What is Glycemio Choornam used for?",
      answer: "It provides metabolic health support, helping to regulate normal sugar levels, reduce fatigue, stress, and inflammation while maintaining overall well-being and immunity."
    },
    {
      question: "How should I take Glycemio Choornam?",
      answer: "Mix 3gm powder in a cup of warm water, stir well and drink immediately. Take twice daily (morning and evening), before or after meals as comfortable. Take consistently at same times daily for 2-3 months for optimal benefits. Use during periods of high stress and maintain healthy diet alongside."
    },
    {
      question: "What does one pack contain?",
      answer: "Each pack contains 30 sachets of 3gm each."
    },
    {
      question: "What are the key ingredients?",
      answer: "Each 3gm contains Amruta, Ashwagandha, Amalaki, and Daruharidra with their respective kwaths."
    },
    {
      question: "What is the Ayurvedic therapeutic usage?",
      answer: "It's used for Prameha, Keldahara, Mansabalya, and as a Rasayan (rejuvenative)."
    },
    {
      question: "Can diabetics use this product?",
      answer: "While it helps regulate normal sugar levels, diabetics should consult their healthcare provider before use."
    }
  ]
};

export const generalFAQs: FAQ[] = [
  {
    question: "Can pregnant or breastfeeding women use these products?",
    answer: "Pregnant and breastfeeding women should consult their healthcare provider before using any of these products."
  },
  {
    question: "Can children use these products?",
    answer: "For all products except Sports Edge Oil Junior, please consult with a pediatrician or qualified Ayurvedic practitioner before giving them to children under 18 years of age."
  },
  {
    question: "Are these products safe to use?",
    answer: "All products are manufactured following Ayurvedic principles at licensed facilities. However, consult your healthcare provider before starting any new supplement regimen."
  },
  {
    question: "How should I store these products?",
    answer: "Store in a cool, dry place away from direct sunlight. Keep oils and tablets in their original containers."
  },
  {
    question: "Can I use multiple products together?",
    answer: "Many products can be used together (like Uristo tablets with Uristo Choornam, or Vario tablets with Vario Oil), but consult your healthcare provider for personalized advice."
  },
  {
    question: "How long does it take to see results?",
    answer: "Results may vary depending on individual conditions and consistency of use. Ayurvedic treatments typically show gradual improvement over time."
  },
  {
    question: "Are there any side effects?",
    answer: "These are natural Ayurvedic formulations, but individual reactions may vary. Discontinue use and consult a healthcare provider if you experience any adverse reactions."
  },
  {
    question: "Where can I buy these products?",
    answer: "Products are available through our website thepoonaayurveda.com and authorized retailers."
  }
];

// Simple function to get FAQs for a product slug
export function getFAQsForProduct(productSlug: string): FAQ[] {
  // Direct lookup using the product slug
  const productFAQsForSlug = productFAQs[productSlug] || [];
  
  // Add some general FAQs if we have product-specific ones
  if (productFAQsForSlug.length > 0) {
    // Add 3 relevant general FAQs
    const relevantGeneralFAQs = generalFAQs.slice(0, 3);
    return [...productFAQsForSlug, ...relevantGeneralFAQs];
  }
  
  // If no product-specific FAQs found, return all general FAQs
  return generalFAQs;
}