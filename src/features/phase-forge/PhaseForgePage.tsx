import {
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
  } from "@dnd-kit/core";
  import { useEffect, useMemo, useState } from "react";
  import { Link } from "react-router-dom";
  import DropZone from "./components/DropZone";
  import PhaseObjective from "./components/PhaseObjective";
  import PlayingCard from "./components/PlayingCard";
  import { createDeck, dealHand } from "./game/deck";
  import type { GameCard, ValidationStatus } from "./game/types";
  
  const setSlotIds = [
    "kind-slot1",
    "kind-slot2",
    "kind-slot3",
    "kind-slot4",
    "run-slot1",
    "run-slot2",
    "run-slot3",
    "run-slot4",
  ];
  
  const phaseGroups = [
    {
      id: "kind-zone",
      name: "kind",
      label: "4 of a Kind",
      slotIds: ["kind-slot1", "kind-slot2", "kind-slot3", "kind-slot4"],
    },
    {
      id: "run-zone",
      name: "run",
      label: "Run of 4",
      slotIds: ["run-slot1", "run-slot2", "run-slot3", "run-slot4"],
    },
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
  
  function isWild(card: GameCard) {
    return card.value === "wild";
  }
  
  function isValidFourOfAKind(cards: GameCard[]) {
    if (cards.length !== 4) return false;
  
    const nonWildCards = cards.filter((card) => !isWild(card));
    if (nonWildCards.length === 0) return false;
  
    const targetValue = nonWildCards[0].value;
  
    return nonWildCards.every((card) => card.value === targetValue);
  }
  
  function isValidRunOfFour(cards: GameCard[]) {
    if (cards.length !== 4) return false;
  
    const numericValues = cards
      .filter((card) => !isWild(card))
      .map((card) => Number(card.value))
      .sort((a, b) => a - b);
  
    if (new Set(numericValues).size !== numericValues.length) return false;
  
    return Array.from({ length: 9 }, (_, index) => index + 1).some((start) => {
      const runValues = [start, start + 1, start + 2, start + 3];
  
      return numericValues.every((value) => runValues.includes(value));
    });
  }
  
  function getCardsForSlots(slots: Record<string, GameCard | null>, slotIds: string[]) {
    return slotIds.map((slotId) => slots[slotId]).filter(Boolean) as GameCard[];
  }
  
  function getNextOpenSlot(slots: Record<string, GameCard | null>, slotIds: string[]) {
    return slotIds.find((slotId) => !slots[slotId]) ?? null;
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
    const [selectedId, setSelectedId] = useState<string | null>(null);
  
    const sensors = useSensors(
      useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
      useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } })
    );
  
    const kindCards = getCardsForSlots(setSlots, phaseGroups[0].slotIds);
    const runCards = getCardsForSlots(setSlots, phaseGroups[1].slotIds);
  
    const kindComplete = isValidFourOfAKind(kindCards);
    const runComplete = isValidRunOfFour(runCards);
  
    useEffect(() => {
      if (kindComplete && runComplete && status !== "success") {
        setStatus("success");
        setScore((current) => {
          const nextScore = current + 10;
          updateHighScore(nextScore);
          return nextScore;
        });
      }
    }, [kindComplete, runComplete, status]);
  
    function updateHighScore(nextScore: number) {
      if (nextScore <= highScore) return;
  
      setHighScore(nextScore);
      window.localStorage.setItem(highScoreStorageKey, String(nextScore));
    }
  
    function drawCard() {
      if (mustDiscard) return;
  
      const nextCard = drawPile[0];
      if (!nextCard) return;
  
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
  
    function resolveCard(cardId: string) {
      const cardFromHand = hand.find((card) => card.id === cardId);
      const sourceSlotId = setSlotIds.find((slotId) => setSlots[slotId]?.id === cardId) ?? null;
      const cardFromSlot = sourceSlotId ? setSlots[sourceSlotId] : null;
  
      return { card: cardFromHand || cardFromSlot, sourceSlotId };
    }
  
    function applyMove(cardId: string, overId: string) {
      const { card, sourceSlotId } = resolveCard(cardId);
      if (!card) return;
  
      const targetGroup = phaseGroups.find((group) => group.id === overId);
  
      if (targetGroup) {
        const targetSlotId = getNextOpenSlot(setSlots, targetGroup.slotIds);
        if (!targetSlotId) return;
  
        setSetSlots((current) => ({
          ...current,
          ...(sourceSlotId ? { [sourceSlotId]: null } : {}),
          [targetSlotId]: card,
        }));
  
        if (!sourceSlotId) {
          setHand((current) => current.filter((c) => c.id !== cardId));
        }
  
        setStatus("idle");
        return;
      }
  
      if (setSlotIds.includes(overId)) {
        const targetSlotCard = setSlots[overId];
        if (targetSlotCard && overId !== sourceSlotId) return;
  
        setSetSlots((current) => ({
          ...current,
          ...(sourceSlotId ? { [sourceSlotId]: null } : {}),
          [overId]: card,
        }));
  
        if (!sourceSlotId) {
          setHand((current) => current.filter((c) => c.id !== cardId));
        }
  
        setStatus("idle");
        return;
      }
  
      if (overId === "discard") {
        if (!mustDiscard) return;
  
        if (sourceSlotId) {
          setSetSlots((current) => ({ ...current, [sourceSlotId]: null }));
        } else {
          setHand((current) => current.filter((c) => c.id !== cardId));
        }
  
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
  
    function handleDragEnd(event: DragEndEvent) {
      const { active, over } = event;
      if (!over) return;
  
      applyMove(String(active.id), String(over.id));
      setSelectedId(null);
    }
  
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
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-cyan-300"
          >
            ← Back to Portfolio
          </Link>
  
          <h1 className="mt-6 text-4xl font-black sm:text-5xl">Phase Forge</h1>
  
          <p className="mt-4 max-w-2xl text-slate-300">
            Interactive card game prototype built to showcase state management, game rules, and
            frontend interaction design.
          </p>
  
          <div className="mt-10">
            <PhaseObjective />
          </div>
  
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[.045] p-4 shadow-2xl sm:p-6">
              <p className="mb-4 text-sm font-bold uppercase tracking-[.2em] text-slate-400">
                Game Table
              </p>
  
              <div className="flex flex-wrap items-end gap-6 lg:gap-10">
                <div className="order-first min-h-28 w-full rounded-[1.5rem] border border-white/10 bg-slate-950/55 p-5 lg:order-none lg:min-w-[520px] lg:w-auto">
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
              </div>
  
              <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-6">
                {phaseGroups.map((group) => {
                  const cards = getCardsForSlots(setSlots, group.slotIds);
                  const isComplete = group.name === "kind" ? kindComplete : runComplete;
                  const hasOpenSlot = group.slotIds.some((slotId) => !setSlots[slotId]);
                  const valid = !!selectedId && hasOpenSlot;
  
                  return (
                    <div key={group.id} className="flex flex-col gap-2">
                      <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">
                        {group.label} {isComplete && <span className="text-emerald-400">✓</span>}
                      </p>
  
                      <div
                        onClick={() => handleTargetTap(group.id)}
                        className={`rounded-2xl transition ${
                          valid ? "cursor-pointer ring-2 ring-cyan-400/70 animate-pulse" : ""
                        }`}
                      >
                        <DropZone id={group.id} label={group.label} variant="group" isComplete={isComplete}>
                        <div className="flex min-h-36 w-full items-center overflow-hidden px-2 py-4 sm:px-5">
                            {cards.length === 0 ? (
                              <p className="w-full text-center text-sm text-slate-500">
                                Drop cards here
                              </p>
                            ) : (
                              cards.map((card, index) => {
                                const isSel = selectedId === card.id;
  
                                return (
                                  <div
                                    key={card.id}
                                    style={{ zIndex: isSel ? 50 : index }}
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      handleCardTap(card.id);
                                    }}
                                    className={`relative cursor-pointer transition-transform duration-150 ${
                                      index === 0 ? "" : "-ml-10 sm:-ml-8"
                                    } ${isSel ? "-translate-y-3" : ""}`}
                                  >
                                    <PlayingCard
                                      card={card}
                                      isSelected={isSel}
                                      onClick={() => {}}
                                    />
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </DropZone>
                      </div>
                    </div>
                  );
                })}
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
                    <div className="flex items-end overflow-visible pl-1 pt-5">
                      {hand.map((card, index) => {
                        const isSel = selectedId === card.id;
                        const spacing = index === 0 ? "" : "-ml-14 sm:-ml-12 md:-ml-8 lg:-ml-3";
  
                        return (
                          <div
                            key={card.id}
                            style={{ zIndex: isSel ? 50 : index }}
                            onClick={(event) => {
                              event.stopPropagation();
                              handleCardTap(card.id);
                            }}
                            className={`group relative cursor-pointer transition-transform duration-150 hover:z-50 hover:-translate-y-4 ${spacing} ${
                              isSel ? "-translate-y-5" : ""
                            }`}
                          >
                            <PlayingCard card={card} isSelected={isSel} onClick={() => {}} />
  
                            
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