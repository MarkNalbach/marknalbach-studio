import { Layers3, Map, ShieldCheck, Sparkles, Gamepad2, MapPin } from "lucide-react";
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
    body: "I organize UI around features, reusable components, services, and documented decision points.",
  },
  {
    icon: Sparkles,
    title: "Creative interaction design",
    body: "I like interfaces that teach, guide, and surprise users without getting in their way.",
  },
  {
    icon: ShieldCheck,
    title: "Built like production",
    body: "Even creative projects should have checks, documentation, accessibility basics, and clean handoff paths.",
  },
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
    "  contact | clear",
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
    "Featured builds combine frontend engineering, UX thinking, and product-focused implementation:",
    "- Product goal",
    "- UX problem solved",
    "- Technical architecture",
    "- What shipped / what changed",
  ],
  ai: [
    "AI System Design:",
    "- Add a resume/project knowledge base in markdown or JSON",
    "- Use a constrained assistant to answer questions about experience",
    "- Keep the site useful even if AI is unavailable",
    "- Show the architecture in docs so reviewers can inspect the implementation",
  ],
  test: [
    "Running portfolio quality checks...",
    "✓ Hero renders",
    "✓ Project cards are reachable",
    "✓ Terminal accepts known commands",
    "✓ Contact CTA exists",
    "✓ Mobile navigation validated",
    "All systems operational.",
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
