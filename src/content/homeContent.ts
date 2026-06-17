import { Layers3, Map, ShieldCheck, Sparkles, Gamepad2, MapPin, Bot } from "lucide-react";
import type { FeaturedBuild, MindsetCardData } from "../types/home";

const profile = {
  name: "Mark Nalbach",
  title: "Creative Product Engineer",
  tagline: "I build interactive products that feel polished, useful, and memorable.",
  stack: ["React", "React Native", "Expo", "TypeScript", "Firebase", "Cypress", "AI UX"],
};

const featuredBuilds: FeaturedBuild[] = [
  {
    title: "US Brew Passport",
    type: "Mobile Product • React Native",
    icon: Map,
    summary:
      "A mobile brewery discovery and rewards platform designed to help users explore participating breweries, unlock rewards, and engage with local brewery experiences through QR-based interactions and location-aware features.",
    highlights: ["React Native", "Expo", "Firebase", "QR Rewards", "Mobile UX", "Product Design"],
  },
  {
    title: "Potty Pal",
    type: "Location-Based Mobile Product • React Native",
    icon: MapPin,
    summary:
      "A community-driven restroom discovery app that allows users to locate, review, rate, and share public restrooms through an interactive map experience designed for mobile-first usability.",
    highlights: [
      "React Native",
      "Expo",
      "Firebase",
      "Maps Integration",
      "Community Reviews",
      "Mobile UX",
    ],
  },
  {
    title: "Phase Forge",
    type: "Interactive Web Game • React",
    icon: Gamepad2,
    summary:
      "A browser-based card game prototype built directly into this portfolio to showcase drag-and-drop interaction design, game-state logic, scoring, and frontend polish.",
    highlights: [
      "React",
      "TypeScript",
      "Drag & Drop",
      "Game Logic",
      "State Management",
      "UX Polish",
    ],
  },
];

const qualityChecks = [
  "TypeScript compile check",
  "Cypress navigation smoke test",
  "Terminal command coverage",
  "Project card interaction test",
  "Mobile layout regression check",
  "Contact CTA validation",
];

const mindsetCards: MindsetCardData[] = [
  {
    icon: Layers3,
    title: "Product-minded architecture",
    body: "I prefer organizing projects around features, reusable components, and clear boundaries that make future changes easier.",
  },
  {
    icon: Sparkles,
    title: "Creative interaction design",
    body: "I like interfaces that teach, guide, and surprise users without getting in their way.",
  },
  {
    icon: ShieldCheck,
    title: "Built like production",
    body: "Even side projects benefit from testing, documentation, accessibility basics, and maintainable code.",
  },
  {
    icon: Bot,
    title: "AI-assisted product thinking",
    body: "I enjoy exploring how AI can improve products, workflows, and user experiences without sacrificing usability.",  },
];

const terminalResponses = {
  help: [
    "Developer Console v1.0",
    "",
    "Projects",
    "  brew-passport | potty-pal | phase-forge",
    "",
    "Engineering",
    "  about | skills | ai | test | docs",
    "",
    "Other",
    "  contact | clear | help",
  ],
  about: [
    "Mark is positioned as a creative product engineer:",
    "- Builds polished React and React Native experiences",
    "- Thinks through UX, product flow, and implementation details",
    "- Ships real projects and documents the engineering decisions",
  ],
  skills: [
    "Core stack:",
    "React • TypeScript • React Native • Expo • Firebase • Cypress • AI-assisted UX",
  ],
  projects: [
    "Featured builds:",
    "✓ US Brew Passport - shipped mobile rewards product",
    "✓ Potty Pal - map-based community utility app",
    "✓ Phase Forge - interactive React card game",
    "",
    "Each project highlights product goals, technical decisions, and UX tradeoffs.",
    ],
  ai: [
    "Portfolio AI Architecture:",
    "- Curated portfolio knowledge base",
    "- Keyword-based knowledge retrieval",
    "- Natural-language project exploration",
    "- Fallback responses for unknown topics",
    "- Designed to be replaced with a real LLM in the future",
  ],
  test: [
    "Portfolio quality checks:",
    "✓ TypeScript build validation",
    "✓ Cypress coverage for Developer Console workflows",
    "✓ Portfolio AI mode switching",
    "✓ Firebase question response validation",
    "✓ Real source test displayed in the Quality section",
    ],
  docs: [
    "Engineering Documentation:",
    "/docs/architecture.md",
    "/docs/ai-system.md",
    "/docs/testing-strategy.md",
    "/docs/project-structure.md",
    "/docs/design-system.md",
  ],
  "brew-passport": [
    "US Brew Passport",
    "A production mobile app for brewery discovery and QR-based rewards.",
    "✓ React Native + Expo",
    "✓ Firebase authentication and Firestore",
    "✓ QR redemption flow",
    "✓ App Store and Google Play release",
  ],

  "potty-pal": [
    "Potty Pal",
    "A community-driven restroom discovery app built around maps, reviews, ratings, and mobile-first UX.",
    "✓ React Native + Expo",
    "✓ Firebase authentication and reviews",
    "✓ Location-aware map experience",
    "✓ User-generated public restroom data",
  ],

  "phase-forge": [
    "Phase Forge",
    "A playable card game prototype built directly into this portfolio.",
    "✓ React + TypeScript",
    "✓ Drag-and-drop interactions",
    "✓ Custom rules engine for sets, runs, and wild cards",
    "✓ Scoring and turn-state management",
    "Try the Play Phase Forge button in Featured Builds.",
  ],

  contact: [
    "Contact",
    "Email: marknalbach@gmail.com",
    "Portfolio repo: github.com/MarkNalbach/marknalbach-studio",
  ],
};

export { featuredBuilds, mindsetCards, profile, qualityChecks, terminalResponses };
