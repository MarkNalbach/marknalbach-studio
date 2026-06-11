import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { useEffect, useMemo, useState } from "react";
import DropZone from "./components/DropZone";
import PhaseObjective from "./components/PhaseObjective";
import PlayingCard from "./components/PlayingCard";
import { createDeck, dealHand } from "./game/deck";
import { isValidSet } from "./game/phaseRules";
import type { GameCard, ValidationStatus } from "./game/types";
import { Link } from "react-router-dom";

const setSlotIds = [
  "set1-slot1",
  "set1-slot2",
  "set1-slot3",
  "set2-slot1",
  "set2-slot2",
  "set2-slot3",
  "set3-slot1",
  "set3-slot2",
  "set3-slot3",
];

function createEmptySetSlots() {
  return Object.fromEntries(setSlotIds.map((id) => [id, null])) as Record<string, GameCard | null>;
}

function PhaseForgePage() {
  const initialGame = useMemo(() => {
    const deck = createDeck();
    return dealHand(deck);
  }, []);

  const [hand, setHand] = useState(initialGame.hand);
  const [drawPile, setDrawPile] = useState(initialGame.drawPile);
  const [status, setStatus] = useState<ValidationStatus>("idle");
  const [mustDiscard, setMustDiscard] = useState(false);
  const [discardPile, setDiscardPile] = useState<GameCard[]>([]);
  const [score, setScore] = useState(20);
  const [setSlots, setSetSlots] = useState<Record<string, GameCard | null>>(createEmptySetSlots());

  const set1Cards = [setSlots["set1-slot1"], setSlots["set1-slot2"], setSlots["set1-slot3"]].filter(
    Boolean
  ) as GameCard[];

  const set2Cards = [setSlots["set2-slot1"], setSlots["set2-slot2"], setSlots["set2-slot3"]].filter(
    Boolean
  ) as GameCard[];

  const set3Cards = [setSlots["set3-slot1"], setSlots["set3-slot2"], setSlots["set3-slot3"]].filter(
    Boolean
  ) as GameCard[];

  const set1Complete = isValidSet(set1Cards);
  const set2Complete = isValidSet(set2Cards);
  const set3Complete = isValidSet(set3Cards);

  useEffect(() => {
    if (set1Complete && set2Complete && set3Complete && status !== "success") {
      setStatus("success");
      setScore((current) => current + 10);
    }
  }, [set1Complete, set2Complete, set3Complete, status]);

  function getSlotCompleteStatus(slotId: string) {
    if (slotId.startsWith("set1")) {
      return set1Complete;
    }

    if (slotId.startsWith("set2")) {
      return set2Complete;
    }

    if (slotId.startsWith("set3")) {
      return set3Complete;
    }

    return false;
  }

  function drawCard() {
    if (mustDiscard) {
      return;
    }

    const nextCard = drawPile[0];

    if (!nextCard) {
      return;
    }

    setHand((current) => [...current, nextCard]);
    setDrawPile((current) => current.slice(1));
    setScore((current) => Math.max(0, current - 1));
    setMustDiscard(true);
    setStatus("idle");
  }

  function newGame() {
    const deck = createDeck();
    const dealt = dealHand(deck);

    setHand(dealt.hand);
    setDrawPile(dealt.drawPile);
    setDiscardPile([]);
    setMustDiscard(false);
    setStatus("idle");
    setScore(20);
    setSetSlots(createEmptySetSlots());
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = String(active.id);
    const overId = String(over.id);

    const cardFromHand = hand.find((card) => card.id === activeId);

    const sourceSlotId = setSlotIds.find((slotId) => setSlots[slotId]?.id === activeId);
    const cardFromSlot = sourceSlotId ? setSlots[sourceSlotId] : null;

    const draggedCard = cardFromHand || cardFromSlot;

    if (!draggedCard) {
      return;
    }

    if (setSlotIds.includes(overId)) {
      const targetSlotCard = setSlots[overId];

      if (targetSlotCard && overId !== sourceSlotId) {
        return;
      }

      setSetSlots((current) => ({
        ...current,
        ...(sourceSlotId ? { [sourceSlotId]: null } : {}),
        [overId]: draggedCard,
      }));

      if (cardFromHand) {
        setHand((current) => current.filter((card) => card.id !== activeId));
      }

      setStatus("idle");
      return;
    }

    if (overId === "discard") {
      if (!mustDiscard) {
        return;
      }

      if (sourceSlotId) {
        setSetSlots((current) => ({
          ...current,
          [sourceSlotId]: null,
        }));
      }

      if (cardFromHand) {
        setHand((current) => current.filter((card) => card.id !== activeId));
      }

      setDiscardPile((current) => [draggedCard, ...current]);
      setMustDiscard(false);
      setStatus("idle");
      return;
    }

    if (overId === "hand" && cardFromSlot && sourceSlotId) {
      setSetSlots((current) => ({
        ...current,
        [sourceSlotId]: null,
      }));

      setHand((current) => [...current, draggedCard]);
      setStatus("idle");
    }
  }

  return (
    <main className="min-h-screen bg-[#090b12] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
        >
          ← Back to Portfolio
        </Link>

        <h1 className="mt-6 text-5xl font-black">Phase Forge</h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Interactive card game prototype built to showcase state management, game rules, and
          frontend interaction design.
        </p>

        <div className="mt-10">
          <PhaseObjective />
        </div>

        <DndContext onDragEnd={handleDragEnd}>
          <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[.045] p-6 shadow-2xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-slate-400">
              Game Table
            </p>

            <div className="flex flex-wrap items-end gap-10">
              <button
                onClick={drawCard}
                disabled={mustDiscard || drawPile.length === 0}
                className={`group relative ${
                  mustDiscard || drawPile.length === 0
                    ? "cursor-not-allowed opacity-50"
                    : "animate-pulse"
                }`}
              >
                <div className="relative">
                  <div className="absolute left-2 top-2 h-28 w-20 rounded-xl border border-white/10 bg-slate-800" />
                  <div className="absolute left-1 top-1 h-28 w-20 rounded-xl border border-white/10 bg-slate-700" />

                  <div className="relative flex h-28 w-20 flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-cyan-400 bg-slate-950 shadow-lg transition-all group-hover:-translate-y-1">
                    <div className="absolute inset-2 rounded-lg border border-cyan-400/40" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-15">
                      <span className="text-6xl font-black text-cyan-300">PF</span>
                    </div>

                    <div className="relative flex flex-col items-center">
                      <span className="text-xs font-bold uppercase text-cyan-300">Deck</span>
                      <span className="text-xl font-black text-cyan-300">Deal</span>
                      <span className="mt-2 text-xs text-slate-400">{drawPile.length}</span>
                    </div>

                    <div className="absolute left-2 top-2 text-xs font-bold text-cyan-300">PF</div>
                    <div className="absolute bottom-2 right-2 rotate-180 text-xs font-bold text-cyan-300">
                      PF
                    </div>
                  </div>
                </div>
              </button>

              <div className={`transition-all ${mustDiscard ? "scale-105 animate-pulse" : ""}`}>
                {mustDiscard && (
                  <p className="mb-2 text-center text-xs font-bold uppercase tracking-[.2em] text-amber-300">
                    Discard Required
                  </p>
                )}

                <DropZone id="discard" label="Discard">
                  {discardPile[0] ? (
                    <PlayingCard card={discardPile[0]} isSelected={false} onClick={() => {}} />
                  ) : (
                    <div className="flex h-28 w-20 flex-col items-center justify-center rounded-xl border-2 border-white/10 bg-slate-950 p-3 shadow-lg">
                      <span className="text-xs uppercase text-slate-500">Discard</span>
                      <span className="mt-2 text-lg font-black text-slate-300">—</span>
                      <span className="mt-3 text-sm text-slate-500">0</span>
                    </div>
                  )}
                </DropZone>
              </div>

              {status === "success" && (
                <div className="flex h-28 min-w-[220px] items-center justify-center rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-6 text-center shadow-lg shadow-emerald-950/20">
                  <div>
                    <p className="text-xl font-black text-emerald-300">Congrats!</p>

                    <p className="text-sm font-semibold text-white">You did it!</p>

                    <p className="mt-1 text-xs text-emerald-200">+10 Points</p>
                  </div>
                </div>
              )}

              <div className="min-h-28 min-w-[520px] rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5">
                <p className="text-sm font-bold uppercase tracking-[.2em] text-slate-400">
                  Turn Status
                </p>

                <div className="mt-4 grid gap-x-8 gap-y-2 text-sm text-slate-300 sm:grid-cols-4">
                  <span className="font-bold text-cyan-300">Score: {score}</span>
                  <span>Hand: {hand.length}</span>
                  <span>Deck: {drawPile.length}</span>
                  <span>Discarded: {discardPile.length}</span>
                </div>

                {mustDiscard && (
                  <p className="mt-4 text-sm font-medium text-amber-300">
                    Discard a card before drawing again.
                  </p>
                )}

                <div className="mt-4">
                  <button
                    onClick={newGame}
                    className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-2 font-bold text-emerald-300 transition hover:bg-emerald-500/20"
                  >
                    New Game
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-start gap-14">
              {[
                { name: "set1", label: "Set 1", complete: set1Complete },
                { name: "set2", label: "Set 2", complete: set2Complete },
                { name: "set3", label: "Set 3", complete: set3Complete },
              ].map((setGroup) => (
                <div key={setGroup.name} className="flex flex-shrink-0 flex-col gap-2">
                  <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">
                    {setGroup.label}{" "}
                    {setGroup.complete && <span className="text-emerald-400">✓</span>}
                  </p>

                  <div className="flex gap-3">
                    {[1, 2, 3].map((slotNumber) => {
                      const slotId = `${setGroup.name}-slot${slotNumber}`;

                      return (
                        <DropZone
                          key={slotId}
                          id={slotId}
                          label={setGroup.label}
                          isComplete={getSlotCompleteStatus(slotId)}
                        >
                          {setSlots[slotId] && (
                            <PlayingCard
                              card={setSlots[slotId]}
                              isSelected={false}
                              onClick={() => {}}
                            />
                          )}
                        </DropZone>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-slate-400">
                Your Hand
              </p>

              <DropZone id="hand" label="Drop cards back to hand" variant="hand">
                <div className="flex flex-wrap gap-3">
                  {hand.map((card) => (
                    <PlayingCard key={card.id} card={card} isSelected={false} onClick={() => {}} />
                  ))}
                </div>
              </DropZone>
            </div>
          </section>
        </DndContext>
      </div>
    </main>
  );
}

export default PhaseForgePage;
