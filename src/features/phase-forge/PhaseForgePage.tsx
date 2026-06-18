import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
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

const CORNER_COLOR: Record<string, string> = {
    red: "text-[#ff7d7d]",
    blue: "text-[#7cb3ff]",
    green: "text-[#5ee08a]",
    yellow: "text-[#ffd23f]",
    wild: "text-[#cf9bff]",
  };

const highScoreStorageKey = "phase-forge-high-score";

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
  const [highScore, setHighScore] = useState(() => {
    const savedScore = window.localStorage.getItem(highScoreStorageKey);
    return savedScore ? Number(savedScore) : 0;
  });
  const [setSlots, setSetSlots] = useState<Record<string, GameCard | null>>(createEmptySetSlots());

  // Tap-to-place: which card is currently "picked up"
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Activation thresholds let tap (click) and drag coexist without conflict
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } })
  );

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
      setScore((current) => {
        const nextScore = current + 10;
        updateHighScore(nextScore);
        return nextScore;
      });
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

  function updateHighScore(nextScore: number) {
    if (nextScore <= highScore) {
      return;
    }

    setHighScore(nextScore);
    window.localStorage.setItem(highScoreStorageKey, String(nextScore));
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
    setSelectedId(null);
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
    setSelectedId(null);
  }

  // Find a card (in hand or in a set slot) and where it came from
  function resolveCard(cardId: string) {
    const cardFromHand = hand.find((card) => card.id === cardId);
    const sourceSlotId = setSlotIds.find((slotId) => setSlots[slotId]?.id === cardId) ?? null;
    const cardFromSlot = sourceSlotId ? setSlots[sourceSlotId] : null;
    return { card: cardFromHand || cardFromSlot, sourceSlotId };
  }

  // Single source of truth for moving a card — used by BOTH drag and tap
  function applyMove(cardId: string, overId: string) {
    const { card, sourceSlotId } = resolveCard(cardId);
    if (!card) return;

    if (setSlotIds.includes(overId)) {
      const targetSlotCard = setSlots[overId];
      if (targetSlotCard && overId !== sourceSlotId) return;

      setSetSlots((current) => ({
        ...current,
        ...(sourceSlotId ? { [sourceSlotId]: null } : {}),
        [overId]: card,
      }));
      if (!sourceSlotId) setHand((current) => current.filter((c) => c.id !== cardId));
      setStatus("idle");
      return;
    }

    if (overId === "discard") {
      if (!mustDiscard) return;
      if (sourceSlotId) setSetSlots((current) => ({ ...current, [sourceSlotId]: null }));
      else setHand((current) => current.filter((c) => c.id !== cardId));
      setDiscardPile((current) => [card, ...current]);
      setMustDiscard(false);
      setStatus("idle");
      return;
    }

    if (overId === "hand" && sourceSlotId) {
      setSetSlots((current) => ({ ...current, [sourceSlotId]: null }));
      setHand((current) => [...current, card]);
      setStatus("idle");
    }
  }

  // DRAG path
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    applyMove(String(active.id), String(over.id));
    setSelectedId(null);
  }

  // TAP path
  function handleCardTap(cardId: string) {
    setSelectedId((current) => (current === cardId ? null : cardId));
  }

  function handleTargetTap(overId: string) {
    if (!selectedId) return;
    applyMove(selectedId, overId);
    setSelectedId(null);
  }

  const selectedInfo = selectedId ? resolveCard(selectedId) : null;
  const handZoneValid = !!selectedInfo?.sourceSlotId;
  const discardValid = !!selectedId && mustDiscard;

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

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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

              <div
                onClick={() => handleTargetTap("discard")}
                className={`rounded-2xl transition-all ${
                  mustDiscard ? "scale-105 animate-pulse" : ""
                } ${discardValid ? "cursor-pointer ring-2 ring-amber-300/70" : ""}`}
              >
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
                  <span className="font-bold text-emerald-300">High Score: {highScore}</span>
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
                      const placed = setSlots[slotId];
                      const valid = !!selectedId && !placed;

                      return (
                        <div
                          key={slotId}
                          onClick={() => handleTargetTap(slotId)}
                          className={`rounded-2xl transition ${
                            valid ? "cursor-pointer ring-2 ring-cyan-400/70 animate-pulse" : ""
                          }`}
                        >
                          <DropZone
                            id={slotId}
                            label={setGroup.label}
                            isComplete={getSlotCompleteStatus(slotId)}
                          >
                            {placed && (
                              <div
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCardTap(placed.id);
                                }}
                              >
                                <PlayingCard
                                  card={placed}
                                  isSelected={selectedId === placed.id}
                                  onClick={() => {}}
                                />
                              </div>
                            )}
                          </DropZone>
                        </div>
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

              <div
                onClick={() => handleTargetTap("hand")}
                className={`rounded-2xl transition ${
                  handZoneValid ? "ring-2 ring-cyan-400/50" : ""
                }`}
              >
                <DropZone id="hand" label="Drop cards back to hand" variant="hand">
                  {/* overlapping fan — consistent on desktop + mobile */}
                  <div className="flex items-end overflow-visible pl-1 pt-5">
                    {hand.map((card, index) => {
                      const isSel = selectedId === card.id;
                      // ramps from heavy overlap on phones → no overlap (a gap) on desktop
                      const spacing = index === 0 ? "" : "-ml-14 sm:-ml-12 md:-ml-8 lg:ml-3";

                      return (
                        <div
                          key={card.id}
                          style={{ zIndex: isSel ? 50 : index }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardTap(card.id);
                          }}
                          className={`group relative cursor-pointer transition-transform duration-150 hover:z-50 hover:-translate-y-4 ${spacing} ${
                            isSel ? "-translate-y-5" : ""
                          }`}
                        >
                          <PlayingCard card={card} isSelected={isSel} onClick={() => {}} />

                          {/* corner index — readable while cards are fanned/overlapping */}
                          <span
                            className={`pointer-events-none absolute left-1.5 top-1.5 z-10 font-mono text-sm font-bold leading-none ${
                              CORNER_COLOR[card.color] ?? "text-white"
                            }`}
                          >
                            {card.value === "wild" ? "★" : card.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </DropZone>
              </div>
            </div>
          </section>
        </DndContext>
      </div>
    </main>
  );
}

export default PhaseForgePage;
