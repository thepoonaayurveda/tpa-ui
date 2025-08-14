import {
  CheckIcon,
  StarIcon,
  HeartIcon,
  ShieldCheckIcon,
  ClockIcon,
  BeakerIcon,
  FireIcon,
  SparklesIcon,
  BoltIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

interface Benefit {
  name: string;
  icon: any;
}

interface ProductBenefits {
  [key: string]: Benefit[];
}

export const productBenefits: ProductBenefits = {
  "flexio-oil": [
    { name: "Joint Pain Relief", icon: ShieldCheckIcon },
    { name: "Anti-Inflammatory", icon: BeakerIcon },
    { name: "Muscle Relaxation", icon: HeartIcon },
    { name: "Natural Healing", icon: CheckIcon },
  ],

  "sports-edge-oil": [
    { name: "Enhanced Endurance", icon: BoltIcon },
    { name: "Muscle Recovery", icon: ShieldCheckIcon },
    { name: "Fatigue Reduction", icon: ClockIcon },
    { name: "Skin Nourishment", icon: HeartIcon },
  ],

  "sports-edge-oil-junior": [
    { name: "Growth & Development", icon: SparklesIcon },
    { name: "Muscle Strengthening", icon: BoltIcon },
    { name: "Bone Health", icon: ShieldCheckIcon },
    { name: "Natural Nourishment", icon: HeartIcon },
  ],

  "vario-oil": [
    { name: "Varicose Vein Relief", icon: HeartIcon },
    { name: "Improved Circulation", icon: CheckIcon },
    { name: "Swelling Reduction", icon: ShieldCheckIcon },
    { name: "Pain Management", icon: BeakerIcon },
  ],

  "vario": [
    { name: "Vascular Health Support", icon: HeartIcon },
    { name: "Circulation Improvement", icon: CheckIcon },
    { name: "Inflammation Reduction", icon: BeakerIcon },
    { name: "Edema Management", icon: ShieldCheckIcon },
  ],

  "allergenie": [
    { name: "Respiratory Allergy Relief", icon: ShieldCheckIcon },
    { name: "Nasal Congestion Relief", icon: CheckIcon },
    { name: "Skin Allergy Support", icon: BeakerIcon },
    { name: "Natural Antihistamine", icon: HeartIcon },
  ],

  "endurio-35": [
    { name: "Men's Vitality Support", icon: BoltIcon },
    { name: "Muscle Strength", icon: ShieldCheckIcon },
    { name: "Energy Enhancement", icon: FireIcon },
    { name: "Overall Wellness", icon: StarIcon },
  ],

  "uristo": [
    { name: "Kidney Stone Relief", icon: ShieldCheckIcon },
    { name: "Urinary Health Support", icon: HeartIcon },
    { name: "Natural Diuretic", icon: BeakerIcon },
    { name: "Anti-inflammatory", icon: CheckIcon },
  ],

  "uristo-choornam": [
    { name: "Stone Dissolution", icon: BeakerIcon },
    { name: "Urinary Alkalizer", icon: ShieldCheckIcon },
    { name: "Burning Relief", icon: CheckIcon },
    { name: "Kidney Detox", icon: HeartIcon },
  ],

  "glycemio-choornam": [
    { name: "Blood Sugar Support", icon: ShieldCheckIcon },
    { name: "Metabolic Health", icon: BeakerIcon },
    { name: "Energy Balance", icon: BoltIcon },
    { name: "Natural Wellness", icon: HeartIcon },
  ],
};

// Simple function to get benefits by product slug
export function getProductBenefits(productSlug: string): Benefit[] {
  return productBenefits[productSlug] || [
    { name: "Natural Wellness", icon: HeartIcon },
    { name: "Safe & Effective", icon: ShieldCheckIcon },
    { name: "Holistic Health", icon: CheckIcon },
    { name: "Quality Assured", icon: StarIcon },
  ];
}