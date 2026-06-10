import {
    Layers3,
    Map,
    ShieldCheck,
    // Smartphone,
    Sparkles,
    Zap,
  } from "lucide-react";
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
        highlights: [
          "React Native",
          "Expo",
          "Firebase",
          "QR Rewards",
          "Mobile UX",
          "Product Design",
        ],
      },
      {
        title: "Potty Pal",
        type: "Location-Based Mobile Product • React Native",
        icon: Map,
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
      title: "Creative Game Experiments",
      type: "Interactive UX Lab",
      icon: Zap,
      summary:
        "Playful React Native experiments using motion, scoring systems, mobile-first controls, and animated feedback.",
      highlights: ["Game loops", "Animation", "Touch interaction", "State design"],
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
      "Available commands:",
      "  about        Learn the positioning",
      "  skills       Show core technical stack",
      "  projects     Summarize featured builds",
      "  ai           Explore the AI system design",
      "  test         Show quality checks",
      "  docs         Show repo documentation plan",
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
  };

  export {
    featuredBuilds,
    mindsetCards,
    profile,
    qualityChecks,
    terminalResponses,
  };