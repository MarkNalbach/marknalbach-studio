function PhaseObjective() {
  return (
    <div className="rounded-[1.5rem] border border-cyan-300/20 bg-cyan-300/10 p-5">
      <p className="text-sm font-bold uppercase tracking-[.2em] text-cyan-300">Current Objective</p>

      <h2 className="mt-3 text-2xl font-black text-white">Phase 1</h2>

      <p className="mt-2 text-slate-300">
        Create two sets of four cards. Each set can be a matching set (3-3-3-3) or a run (1-2-3-4).
      </p>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        You can draw one new card at a time, but after drawing you must drag one card to the discard
        pile before drawing another.
      </p>
    </div>
  );
}

export default PhaseObjective;
