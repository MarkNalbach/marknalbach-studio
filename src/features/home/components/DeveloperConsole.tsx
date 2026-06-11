import { motion } from "framer-motion";
import { Bot, TerminalSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import type { TerminalHistoryItem } from "../HomePage";

interface DeveloperConsoleProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  runCommand: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  runDirectCommand: (command: string) => void;
  activeCommand: string;
  terminalHistory: TerminalHistoryItem[];
}

const suggestedCommands = [
  "about",
  "skills",
  "projects",
  "brew-passport",
  "potty-pal",
  "phase-forge",
  "contact",
  "clear",
];

function DeveloperConsole({
  input,
  setInput,
  runCommand,
  runDirectCommand,
  activeCommand,
  terminalHistory,
}: DeveloperConsoleProps) {
  const historyContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = historyContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [terminalHistory]);

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative z-10 flex h-[760px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[.04] px-5 py-4">
        <div className="flex items-center gap-3">
          <TerminalSquare className="h-5 w-5 text-cyan-300" />

          <div>
            <p className="text-sm font-bold text-white">Developer Console</p>
            <p className="text-xs text-slate-400">Interactive project and engineering assistant</p>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-5 font-mono text-sm">
        <div className="mb-4 rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4 text-cyan-100">
          <div className="mb-2 flex items-center gap-2 font-sans text-sm font-bold">
            <Bot className="h-4 w-4" />
            AI-assisted portfolio exploration
          </div>
          Ask about projects, architecture decisions, frontend systems, testing workflows, or UX
          thinking.
        </div>

        <div
          ref={historyContainerRef}
          className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-black/25 p-4 text-slate-300"
        >
          {terminalHistory.length === 0 ? (
            <p className="text-slate-500">Terminal cleared. Try: help, projects, or phase-forge.</p>
          ) : (
            <div className="space-y-4">
              {terminalHistory.map((item, index) => (
                <div key={`${item.command}-${index}`} className="space-y-1">
                  <p>
                    <span className="text-emerald-300">visitor@portfolio</span>:
                    <span className="text-cyan-300">~</span>$ {item.command}
                  </p>

                  {item.lines.map((line) => {
                    const isCommand = line.startsWith("  ") && !line.includes("✓");

                    return (
                      <p
                        key={`${item.command}-${line}`}
                        className={
                          line.startsWith("✓")
                            ? "text-emerald-300"
                            : isCommand
                              ? "text-cyan-300"
                              : "text-slate-300"
                        }
                      >
                        {line}
                      </p>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="flex flex-wrap gap-2">
            {suggestedCommands.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => runDirectCommand(command)}
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  activeCommand === command
                    ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                    : "border-white/10 bg-white/[.05] text-slate-300 hover:border-cyan-300/30 hover:bg-cyan-300/10 hover:text-cyan-100"
                }`}
              >
                {command}
              </button>
            ))}
          </div>

          <form
            onSubmit={runCommand}
            className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3"
          >
            <span className="text-emerald-300">$</span>

            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
              placeholder="Try: phase-forge, brew-passport, contact"
            />

            <button className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/15">
              run
            </button>
          </form>
        </div>
      </div>
    </motion.aside>
  );
}

export default DeveloperConsole;
