import { ChevronRight } from "lucide-react";
import type { FeaturedBuild } from "../../../types/home";

interface BuildCardProps {
  build: FeaturedBuild;
  isSelected: boolean;
  onClick: () => void;
}

function BuildCard({ build, isSelected, onClick }: BuildCardProps) {
  const Icon = build.icon;

  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={`group flex cursor-pointer flex-col rounded-[1.75rem] border border-l-[3px] p-5 text-left shadow-xl transition lg:h-full ${
        isSelected
          ? "border-cyan-300 border-l-cyan-300 bg-cyan-300/15 shadow-cyan-950/30 ring-2 ring-cyan-300/30"
          : "border-white/10 border-l-white/10 bg-white/[.055] hover:-translate-y-1 hover:border-cyan-300/30 hover:border-l-cyan-300/60 hover:bg-white/[.08]"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
          <Icon className="h-6 w-6 text-cyan-200" />
        </div>

        {/* CHANGED: type pill → quiet category label */}
        <span className="text-right text-xs font-medium uppercase tracking-wide text-slate-400">
          {build.type}
        </span>
      </div>

      <h3 className="text-xl font-black text-white">{build.title}</h3>

      <p className="mt-3 leading-7 text-slate-300">{build.summary}</p>

      {/* CHANGED: highlight pills → quiet metadata (no longer look tappable) */}
      <p className="mt-4 text-xs leading-6 text-slate-500">{build.highlights.join("  ·  ")}</p>

      {/* NEW: persistent click affordance — shows on touch, animates on hover/select */}
      <span
        className={`mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold ${
          isSelected ? "text-cyan-200" : "text-cyan-300"
        }`}
      >
        {isSelected ? "Viewing breakdown" : "View breakdown"}
        <ChevronRight
          className={`h-4 w-4 transition group-hover:translate-x-0.5 ${
            isSelected ? "translate-x-0.5" : ""
          }`}
        />
      </span>
    </button>
  );
}

export default BuildCard;