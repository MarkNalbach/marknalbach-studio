import type { MindsetCardData } from "../../../types/home";

interface MindsetCardProps {
  card: MindsetCardData;
}

function MindsetCard({ card }: MindsetCardProps) {
  const Icon = card.icon;

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[.055] p-6 shadow-xl">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/10">
        <Icon className="h-6 w-6 text-cyan-200" />
      </div>

      <h3 className="text-xl font-black text-white">{card.title}</h3>
      <p className="mt-3 leading-7 text-slate-300">{card.body}</p>
    </div>
  );
}

export default MindsetCard;