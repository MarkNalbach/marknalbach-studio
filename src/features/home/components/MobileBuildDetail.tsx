import { CheckCircle2 } from "lucide-react";
import type { FeaturedBuild } from "../../../types/home";

interface MobileBuildDetailProps {
  build: FeaturedBuild;
}

const defaultDetails = [
  {
    label: "Product Goal",
    body: "Create an interactive browser-based card game that demonstrates complex frontend state management, drag-and-drop interactions, game rule validation, and polished user experience design within a single-page React application.",
  },
  {
    label: "Technical Story",
    body: "Built with React, TypeScript, and dnd-kit. The game uses a custom rules engine to validate sets, runs, and wild cards while maintaining turn state, scoring, drag-and-drop interactions, and phase completion logic.",
  },
  {
    label: "UX Decision",
    body: "Designed around intuitive gameplay with visual cues, animated deck and discard interactions, real-time validation, completion feedback, and a layout that teaches the rules through interaction rather than lengthy instructions.",
  },
];

const brewPassportDetails = [
  {
    label: "Product Goal",
    body: "Create a brewery rewards experience that feels simple, social, and engaging while keeping redemption fast for both customers and brewery staff.",
  },
  {
    label: "Technical Story",
    body: "Built with React Native and Expo using Firebase services for authentication, reviews, ratings, and real-time content updates across the mobile experience.",
  },
  {
    label: "UX Decision",
    body: "Focused heavily on mobile-first interaction patterns, reducing friction during QR redemption flows, and making brewery exploration visually intuitive.",
  },
];

const pottyPalDetails = [
  {
    label: "Product Goal",
    body: "Design a restroom discovery experience that feels fast, useful, and community-driven while reducing friction during real-world mobile usage.",
  },
  {
    label: "Technical Story",
    body: "Built with React Native, Expo, Firebase, and map integrations to support geolocation, reviews, ratings, authentication, and real-time restroom updates.",
  },
  {
    label: "UX Decision",
    body: "Focused on mobile-first map interactions, quick-access location details, and simplifying the review flow so users could contribute with minimal effort.",
  },
];

function getProjectDetails(build: FeaturedBuild) {
  if (build.title === "US Brew Passport") return brewPassportDetails;
  if (build.title === "Potty Pal") return pottyPalDetails;
  return defaultDetails;
}

function MobileBuildDetail({ build }: MobileBuildDetailProps) {
  const projectDetails = getProjectDetails(build);

  return (
    <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-slate-950/90 p-4 shadow-xl">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
        Project Breakdown
      </p>

      <h3 className="mt-2 text-2xl font-black text-white">{build.title}</h3>

      <p className="mt-3 text-sm leading-7 text-slate-300">{build.summary}</p>

      <div className="mt-5 space-y-4">
        {projectDetails.map((detail) => (
          <div key={detail.label} className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
            <CheckCircle2 className="mb-3 h-5 w-5 text-emerald-300" />
            <h4 className="font-bold text-white">{detail.label}</h4>
            <p className="mt-2 text-sm leading-6 text-slate-400">{detail.body}</p>
          </div>
        ))}
      </div>

      {build.title === "Phase Forge" && (
        <a
          href="/phase-forge"
          className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950"
        >
          Play Phase Forge
        </a>
      )}
    </div>
  );
}

export default MobileBuildDetail;