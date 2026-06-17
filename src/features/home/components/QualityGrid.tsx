import { CheckCircle2, ExternalLink, TestTube2 } from "lucide-react";
import developerConsoleTest from "../../../cypress/e2e/developer-console.cy.ts?raw";

interface QualityGridProps {
  qualityChecks: string[];
}

function QualityGrid({ qualityChecks }: QualityGridProps) {
  return (
    <div className="mt-10 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
      <div className="rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur">
        <div className="mb-5 flex items-center gap-3">
          <TestTube2 className="h-5 w-5 text-cyan-300" />

          <h3 className="text-xl font-black text-white">Commit Checks</h3>
        </div>

        <p className="leading-8 text-slate-300">
          This portfolio includes Cypress end-to-end coverage for the Developer Console, Portfolio
          AI workflows, and key navigation paths. Quality checks are designed to validate real user
          interactions rather than static content alone.
        </p>

        <div className="mt-6 flex gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-300/10 px-4 py-2 text-sm text-emerald-200 ring-1 ring-emerald-300/20">
            <CheckCircle2 className="h-4 w-4" /> CI Ready
          </span>

          <span className="inline-flex items-center gap-2 rounded-full bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200 ring-1 ring-cyan-300/20">
            <ExternalLink className="h-4 w-4" /> GitHub Actions
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-950/55 p-4 shadow-lg backdrop-blur">
          <div className="mb-3 flex items-center gap-2">
            <TestTube2 className="h-4 w-4 text-cyan-300" />
            <span className="text-sm font-bold text-white">Portfolio Test Suite</span>
          </div>

          <div className="space-y-2">
            {qualityChecks.map((check) => (
              <div key={check} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-300" />
                <span className="text-sm text-slate-300">{check}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t border-white/10 pt-3">
            <span className="text-xs text-emerald-300">✓ Cypress coverage active</span>
          </div>
        </div>

        <div className="rounded-2xl border border-cyan-300/10 bg-slate-950/75 p-4 font-mono text-xs shadow-lg">
          <p className="mb-3 text-cyan-300">Portfolio Automation Example - cypress/e2e/developer-console.cy.ts</p>

          <pre className="max-h-72 overflow-auto whitespace-pre-wrap rounded-xl bg-black/20 p-3 text-slate-300">
            {developerConsoleTest}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default QualityGrid;
