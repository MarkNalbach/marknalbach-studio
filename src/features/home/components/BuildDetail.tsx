import ProjectShowcase from "./ProjectShowcase";
import brewShot1 from "../../../assets/projects/us-brew-passport/usbrewpassport-shot1.png";
import pottyPalShot1 from "../../../assets/projects/potty-pal/pottypal-screen-1.png";
import appStoreBadge from "../../../assets/projects/us-brew-passport/app-store-badge.png";
import googlePlayBadge from "../../../assets/projects/us-brew-passport/google-play-badge.png";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import type { FeaturedBuild } from "../../../types/home";

interface BuildDetailProps {
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

function BuildDetail({ build }: BuildDetailProps) {
  let projectDetails = defaultDetails;

  if (build.title === "US Brew Passport") {
    projectDetails = brewPassportDetails;
  }

  if (build.title === "Potty Pal") {
    projectDetails = pottyPalDetails;
  }

  return (
    <motion.div
      key={build.title}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-6 rounded-[2rem] border border-cyan-300/40 bg-white/[.055] p-6 shadow-2xl backdrop-blur"
    >
      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.2em] text-emerald-300">
            Project Breakdown
          </p>

          <h3 className="mt-3 text-3xl font-black text-white">{build.title}</h3>

          <p className="mt-4 leading-8 text-slate-300">{build.summary}</p>
          {build.title === "Phase Forge" && (
            <a
              href="/phase-forge"
              className="mt-5 inline-flex rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Play Phase Forge
            </a>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {projectDetails.map((detail) => (
            <div
              key={detail.label}
              className="rounded-3xl border border-white/10 bg-slate-950/50 p-5"
            >
              <CheckCircle2 className="mb-4 h-5 w-5 text-emerald-300" />

              <h4 className="font-bold text-white">{detail.label}</h4>

              <p className="mt-2 text-sm leading-6 text-slate-400">{detail.body}</p>
            </div>
          ))}
        </div>
      </div>

      {build.title === "US Brew Passport" && (
        <ProjectShowcase
          image={brewShot1}
          title="Live Mobile Product"
          description="US Brew Passport turns brewery visits into an interactive mobile experience with location-aware discovery, QR-based reward redemption, and a product flow designed to stay simple for both customers and brewery staff."
          appStoreUrl="https://apps.apple.com/us/app/us-brew-passport/id6756192953"
          googlePlayUrl="https://play.google.com/store/apps/details?id=com.usbrewerypassport.app"
          appStoreBadge={appStoreBadge}
          googlePlayBadge={googlePlayBadge}
        />
      )}
      {build.title === "Potty Pal" && (
        <ProjectShowcase
          image={pottyPalShot1}
          title="Community Map Experience"
          description="Potty Pal combines geolocation, reviews, ratings, and map-based interaction into a mobile-first utility app focused on helping users quickly discover and share public restroom information."
        />
      )}
    </motion.div>
  );
}

export default BuildDetail;
