import { AnimatePresence, motion } from "framer-motion";
import { Bot, TerminalSquare } from "lucide-react";

interface DeveloperConsoleProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  runCommand: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  activeCommand: string;
  lines: string[];
}

function DeveloperConsole({
  input,
  setInput,
  runCommand,
  activeCommand,
  lines,
}: DeveloperConsoleProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative z-10 overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[.04] px-5 py-4">
        <div className="flex items-center gap-3">
          <TerminalSquare className="h-5 w-5 text-cyan-300" />

          <div>
            <p className="text-sm font-bold text-white">Developer Console</p>
            <p className="text-xs text-slate-400">
              Interactive project and engineering assistant
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="min-h-[430px] p-5 font-mono text-sm">
        <div className="mb-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-cyan-100">
          <div className="mb-2 flex items-center gap-2 font-sans text-sm font-bold">
            <Bot className="h-4 w-4" />
            AI-assisted portfolio exploration
          </div>

          Ask about projects, architecture decisions, frontend systems, testing workflows, or UX
          thinking.
        </div>

        <div className="space-y-2 text-slate-300">
          <p>
            <span className="text-emerald-300">visitor@portfolio</span>:
            <span className="text-cyan-300">~</span>$ {activeCommand}
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCommand}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="space-y-1 rounded-2xl border border-white/10 bg-black/25 p-4"
            >
              {lines.map((line) => (
                <p
                  key={line}
                  className={line.startsWith("✓") ? "text-emerald-300" : "text-slate-300"}
                >
                  {line}
                </p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <form
          onSubmit={runCommand}
          className="mt-5 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3"
        >
          <span className="text-emerald-300">$</span>

          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
            placeholder="Try: help, ai, test, docs"
          />

          <button className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/15">
            run
          </button>
        </form>
      </div>
    </motion.aside>
  );
}

export default DeveloperConsole;