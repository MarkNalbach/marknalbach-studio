import { portfolioKnowledge } from "../content/portfolioKnowledge";

export function searchPortfolioKnowledge(query: string): string[] {
  const lower = query.toLowerCase();

  if (matches(lower, ["firebase", "firestore", "database", "auth"])) {
    return [
      "Firebase is used across multiple mobile projects in this portfolio.",
      "",
      "✓ US Brew Passport uses Firebase/Firestore for authentication, brewery data, redemptions, and app content.",
      "✓ Potty Pal uses Firebase/Firestore for user accounts, restroom pins, reviews, ratings, and community-contributed data.",
      "",
      "This shows experience building real app features around authentication, persistent data, and user-generated content.",
    ];
  }

  if (matches(lower, ["phase forge", "phase", "game", "card", "drag", "drop"])) {
    return [
      portfolioKnowledge.projects.phaseForge.title,
      portfolioKnowledge.projects.phaseForge.summary,
      "",
      "✓ Built with React, TypeScript, dnd-kit, and Tailwind.",
      "✓ Supports drag-and-drop card movement between hand, sets, and discard pile.",
      "✓ Includes custom rules for sets, runs, and wild cards.",
      "✓ Tracks score and high score with localStorage.",
    ];
  }

  if (matches(lower, ["brew", "passport", "brewery", "beer", "qr"])) {
    return [
      portfolioKnowledge.projects.brewPassport.title,
      portfolioKnowledge.projects.brewPassport.summary,
      "",
      "✓ Built with React Native and Expo.",
      "✓ Uses Firebase/Firestore for app data and authentication.",
      "✓ Includes QR-based reward redemption.",
      "✓ Published for iOS and Android.",
    ];
  }

  if (matches(lower, ["potty", "restroom", "bathroom", "toilet", "map", "reviews"])) {
    return [
      portfolioKnowledge.projects.pottyPal.title,
      portfolioKnowledge.projects.pottyPal.summary,
      "",
      "✓ Built with React Native, Expo, Firebase, Firestore, and maps.",
      "✓ Supports restroom pins, reviews, ratings, and account-based contributions.",
      "✓ Demonstrates mobile-first UX around location-aware discovery.",
    ];
  }

  if (matches(lower, ["testing philosophy", "test philosophy", "quality philosophy", "automation philosophy"])) {
    return [
      "Testing philosophy",
      "",
      "Mark approaches testing as a product quality system, not just a checklist.",
      "",
      "✓ Prefer stable selectors and explicit waits over brittle timing.",
      "✓ Focus on real user workflows and meaningful coverage.",
      "✓ Use automation to reduce release risk and diagnose failures faster.",
      "✓ Keep tests maintainable so they help the team instead of slowing it down.",
      "",
      "The goal is confidence: tests should make releases smoother, not just increase numbers.",
    ];
  }

  if (matches(lower, ["cypress", "test", "testing", "qa", "automation", "quality"])) {
    return [
      "Testing and QA automation experience",
      "",
      "✓ Cypress end-to-end testing for real product workflows.",
      "✓ Release support, failure diagnosis, and test reliability improvements.",
      "✓ Experience creating coverage around teacher, student, dashboard, and modal workflows.",
      "✓ Strong focus on explicit waits, stable selectors, and maintainable automation.",
    ];
  }

  if (matches(lower, ["react native", "mobile", "ios", "android", "app store", "google play"])) {
    return [
      "Mobile app experience",
      "",
      "✓ US Brew Passport is a React Native / Expo mobile app available on iOS and Android.",
      "✓ Potty Pal is a React Native / Expo map-based mobile app using Firebase.",
      "✓ Experience includes authentication, location-aware UX, maps, reviews, ratings, and app-store-ready product flows.",
    ];
  }

  if (
    matches(lower, [
      "frontend experience",
      "front-end experience",
      "describe your frontend experience",
    ])
  ) {
    return [
      "Frontend engineering experience",
      "",
      "✓ React and TypeScript application development.",
      "✓ React Native and Expo mobile applications.",
      "✓ Firebase-backed products with real users.",
      "✓ Interactive UI systems, animations, maps, and game mechanics.",
      "✓ Cypress automation and quality engineering experience.",
      "",
      "The focus is building maintainable products that feel polished and intuitive.",
    ];
  }

  if (matches(lower, ["ai", "artificial intelligence", "ai development"])) {
    return [
      "Using AI in development",
      "",
      "✓ Uses AI to accelerate development workflows.",
      "✓ Generates boilerplate and implementation ideas faster.",
      "✓ Assists with testing strategies and coverage planning.",
      "✓ Helps explore UX ideas and alternative implementations.",
      "",
      "The goal isn't replacing engineering judgment—it's increasing productivity while maintaining quality.",
    ];
  }

  if (matches(lower, ["react", "typescript", "frontend", "front end", "ui", "ux"])) {
    return [
      "Frontend engineering focus",
      "",
      "✓ React and TypeScript for structured, component-driven interfaces.",
      "✓ Tailwind and Framer Motion for polished visual systems.",
      "✓ React Native and Expo for mobile product development.",
      "✓ UX-focused engineering across maps, games, redemption flows, dashboards, and interactive portfolio features.",
    ];
  }

  if (matches(lower, ["skill", "skills", "stack", "technology", "tools"])) {
    return [
      "Core technical stack",
      "",
      ...portfolioKnowledge.skills.map((skill) => `✓ ${skill}`),
    ];
  }

  if (matches(lower, ["hire", "why", "why should", "why mark", "strength", "different", "value"])) {
    return [
      "Why someone should hire Mark",
      "",
      "Mark brings together frontend engineering, product thinking, QA automation, and UX judgment.",
      "",
      "✓ Ships real products, not just tutorial projects.",
      "✓ Built and published mobile apps for iOS and Android.",
      "✓ Strong React, TypeScript, React Native, Expo, Firebase, and Cypress experience.",
      "✓ Understands quality from both a developer and QA automation perspective.",
      "✓ Builds interactive experiences that show state management, polish, and usability.",
      "✓ Uses AI thoughtfully to improve developer workflows and product experiences.",
      "",
      "The portfolio shows someone who can build, test, ship, and explain product-quality frontend work.",
    ];
  }

  if (matches(lower, ["contact", "email", "reach", "repo", "github"])) {
    return [
      "Contact information",
      "",
      `Email: ${portfolioKnowledge.contact.email}`,
      `Repository: ${portfolioKnowledge.contact.repository}`,
    ];
  }

  return [
    "I couldn't find a direct match in the curated portfolio knowledge.",
    "",
    "Try asking about Firebase, Cypress, React Native, Phase Forge, Brew Passport, Potty Pal, skills, mobile apps, or contact info.",
  ];
}

function matches(input: string, keywords: string[]) {
  return keywords.some((keyword) => input.includes(keyword));
}