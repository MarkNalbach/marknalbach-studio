import { Braces, MessageSquareText } from "lucide-react";

function ArchitecturePanel() {
  const folders = [
    ["/app", "routing, providers, layout shell"],
    ["/features", "hero, terminal, projects, quality sections"],
    ["/components", "cards, buttons, panels, device mockups"],
    ["/services", "AI API, analytics, content loading"],
    ["/content", "resume data, project docs, case studies"],
    ["/docs", "architecture and testing explanations"],
  ];

  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_.9fr]">
      <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur">
        <div className="mb-5 flex items-center gap-3">
          <Braces className="h-5 w-5 text-cyan-300" />

          <h3 className="text-xl font-black text-white">
            Frontend Architecture
          </h3>
        </div>

        <div className="space-y-3 font-mono text-sm">
          {folders.map(([folder, note]) => (
            <div
              key={folder}
              className="grid gap-2 rounded-2xl border border-white/10 bg-white/[.04] p-4 md:grid-cols-[150px_1fr]"
            >
              <span className="text-emerald-300">{folder}</span>
              <span className="text-slate-400">{note}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur">
        <div className="mb-5 flex items-center gap-3">
          <MessageSquareText className="h-5 w-5 text-cyan-300" />

          <h3 className="text-xl font-black text-white">
            AI Knowledge Flow
          </h3>
        </div>

        <div className="space-y-4">
          {[
            "Visitor asks a question in the console",
            "Question is matched against resume/project content",
            "AI answers using constrained portfolio knowledge",
            "Fallback responses keep the experience reliable",
          ].map((step, index) => (
            <div
              key={step}
              className="flex gap-4 rounded-2xl border border-white/10 bg-slate-950/45 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-black text-slate-950">
                {index + 1}
              </div>

              <p className="leading-7 text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArchitecturePanel;