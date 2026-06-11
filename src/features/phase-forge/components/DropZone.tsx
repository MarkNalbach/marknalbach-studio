import { useDroppable } from "@dnd-kit/core";
import type { ReactNode } from "react";

interface DropZoneProps {
  id: string;
  label: string;
  children?: ReactNode;
  variant?: "slot" | "hand";
  isComplete?: boolean;
}

function DropZone({
  id,
  label,
  children,
  variant = "slot",
  isComplete = false,
}: DropZoneProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const sizeClasses =
    variant === "hand"
      ? "min-h-32 w-full p-4"
      : "flex h-28 w-20 items-center justify-center";

  return (
    <div
      ref={setNodeRef}
      className={`${sizeClasses} rounded-xl border-2 border-dashed transition ${
        isComplete
          ? "border-emerald-400 bg-emerald-500/10"
          : isOver
            ? "border-cyan-300 bg-cyan-300/10"
            : "border-white/20 bg-slate-950/40"
      }`}
    >
      {children || <span className="text-center text-xs text-slate-400">{label}</span>}
    </div>
  );
}

export default DropZone;