import { CheckCircle2, ChevronRight } from "lucide-react";
import type { FeaturedBuild } from "../../../types/home";

import brewShot1 from "../../../assets/projects/us-brew-passport/usbrewpassport-shot1.png";
import pottyPalShot1 from "../../../assets/projects/potty-pal/pottypal-screen-1.png";
import appStoreBadge from "../../../assets/projects/us-brew-passport/app-store-badge.png";
import googlePlayBadge from "../../../assets/projects/us-brew-passport/google-play-badge.png";

interface BuildCardProps {
  build: FeaturedBuild;
  isSelected: boolean;
  onClick: () => void;
}

function BuildCard({ build, isSelected, onClick }: BuildCardProps) {
  const Icon = build.icon;

  return (
    <article
      className={`group flex flex-col rounded-[1.75rem] border border-l-[3px] p-5 text-left shadow-xl transition-all duration-300 ${
        isSelected
          ? "scale-[1.01] border-cyan-300 border-l-cyan-300 bg-cyan-300/15 shadow-cyan-950/30 ring-2 ring-cyan-300/30"
          : "border-white/10 border-l-white/10 bg-white/[.055] hover:-translate-y-1 hover:border-cyan-300/30 hover:border-l-cyan-300/60 hover:bg-white/[.08]"
      }`}
    >
      <button type="button" onClick={onClick} aria-expanded={isSelected} className="text-left">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
            <Icon className="h-6 w-6 text-cyan-200" />
          </div>

          <span className="text-right text-xs font-medium uppercase tracking-wide text-slate-400">
            {build.type}
          </span>
        </div>

        <h3 className="text-xl font-black text-white">{build.title}</h3>

        <p className="mt-3 leading-7 text-slate-300">{build.summary}</p>

        <p className="mt-4 text-xs leading-6 text-slate-500">
          {build.highlights.join("  ·  ")}
        </p>

        <span
          className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${
            isSelected ? "text-cyan-200" : "text-cyan-300"
          }`}
        >
          {isSelected ? "Hide breakdown" : "View breakdown"}
          <ChevronRight
            className={`h-4 w-4 transition ${
              isSelected ? "rotate-90 translate-x-0.5" : "group-hover:translate-x-0.5"
            }`}
          />
        </span>
      </button>

      {isSelected && (
        <div className="mt-5 border-t border-cyan-300/20 pt-5 lg:hidden">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
            Mobile Breakdown
          </p>

          <div className="mt-4 space-y-3">
            {build.highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {build.title === "US Brew Passport" && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <img
                src={brewShot1}
                alt="US Brew Passport app screenshot"
                className="mx-auto max-h-[420px] rounded-2xl object-contain"
              />

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Location-aware brewery discovery, QR-based reward redemption, and a simple mobile
                flow designed for customers and brewery staff.
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <a href="https://apps.apple.com/us/app/us-brew-passport/id6756192953">
                  <img src={appStoreBadge} alt="Download on the App Store" className="h-10" />
                </a>

                <a href="https://play.google.com/store/apps/details?id=com.usbrewerypassport.app">
                  <img src={googlePlayBadge} alt="Get it on Google Play" className="h-10" />
                </a>
              </div>
            </div>
          )}

          {build.title === "Potty Pal" && (
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <img
                src={pottyPalShot1}
                alt="Potty Pal app screenshot"
                className="mx-auto max-h-[420px] rounded-2xl object-contain"
              />

              <p className="mt-4 text-sm leading-6 text-slate-400">
                A mobile-first map experience for finding, reviewing, and sharing public restroom
                locations.
              </p>
            </div>
          )}

          {build.title === "Phase Forge" && (
            <a
              href="/phase-forge"
              className="mt-5 inline-flex rounded-xl bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              Play Phase Forge
            </a>
          )}
        </div>
      )}
    </article>
  );
}

export default BuildCard;