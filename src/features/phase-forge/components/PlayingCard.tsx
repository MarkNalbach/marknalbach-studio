import { useDraggable } from "@dnd-kit/core";
import type { GameCard } from "../game/types";

interface PlayingCardProps {
  card: GameCard;
  isSelected: boolean;
  onClick: () => void;
}

const colorMap = {
  red: "border-red-400 text-red-300",
  blue: "border-blue-400 text-blue-300",
  green: "border-green-400 text-green-300",
  yellow: "border-yellow-400 text-yellow-300",
  wild: "border-purple-400 text-purple-300",
};

function PlayingCard({ card, isSelected, onClick }: PlayingCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: card.id,
  });

  const style = transform
  ? {
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      willChange: "transform",
    }
  : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={onClick}
      className={`flex h-28 w-20 cursor-grab touch-none flex-col justify-between rounded-xl border-2 bg-slate-950 p-3 shadow-lg active:cursor-grabbing ${
        colorMap[card.color]
      } ${isSelected ? "-translate-y-4 ring-2 ring-cyan-300" : "hover:-translate-y-1"}`}
    >
      <span className="mt-2 text-center text-xs font-bold uppercase">{card.color}</span>
      <span className="text-center text-3xl font-black">{card.value}</span>
      <span className="text-right text-xs font-bold">{card.value}</span>
    </div>
  );
}

export default PlayingCard;