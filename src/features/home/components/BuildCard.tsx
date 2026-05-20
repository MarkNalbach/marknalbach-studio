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
      className={`group rounded-[1.75rem] border p-5 text-left shadow-xl backdrop-blur transition ${
        isSelected
          ? "border-cyan-300/35 bg-cyan-300/10 shadow-cyan-950/20"
          : "border-white/10 bg-white/[.055] hover:-translate-y-1 hover:bg-white/[.08]"
      }`}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10">
          <Icon className="h-6 w-6 text-cyan-200" />
        </div>

        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">
          {build.type}
        </span>
      </div>

      <h3 className="text-xl font-black text-white">{build.title}</h3>

      <p className="mt-3 leading-7 text-slate-300">{build.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {build.highlights.map((highlight) => (
          <span
            key={highlight}
            className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300"
          >
            {highlight}
          </span>
        ))}
      </div>
    </button>
  );
}

export default BuildCard;