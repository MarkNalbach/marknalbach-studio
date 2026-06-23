import { motion } from "framer-motion";
import { Bot, TerminalSquare } from "lucide-react";
import { useEffect, useRef } from "react";
import type { TerminalHistoryItem } from "../HomePage";

interface DeveloperConsoleProps {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  runCommand: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  runDirectCommand: (command: string) => void;
  terminalHistory: TerminalHistoryItem[];
  consoleMode: ConsoleMode;
  setConsoleMode: React.Dispatch<React.SetStateAction<ConsoleMode>>;
  isThinking: boolean;
}

type ConsoleMode = "commands" | "portfolio-ai" | "local-ai";

const suggestedCommands = [
  "about",
  "skills",
  "projects",
  "brew-passport",
  "potty-pal",
  "phase-forge",
  "contact",
  "clear",
  "help",
];

const suggestedAiPrompts = [
  "Why should someone hire Mark?",
  "Tell me about your testing philosophy",
  "What did you build with Firebase?",
  "Tell me about Phase Forge",
  "Describe your Cypress experience",
  "What mobile apps have you shipped?",
  "Describe your frontend experience",
  "How do you use AI in development?",
];

function DeveloperConsole({
  input,
  setInput,
  runCommand,
  runDirectCommand,
  terminalHistory,
  consoleMode,
  setConsoleMode,
  isThinking,
}: DeveloperConsoleProps) {
  const historyContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const container = historyContainerRef.current;

    if (!container) {
      return;
    }

    container.scrollTop = container.scrollHeight;
  }, [terminalHistory]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [consoleMode]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const nextValue = event.target.value;

    setInput(nextValue);

    if (consoleMode === "portfolio-ai" && suggestedAiPrompts.includes(nextValue)) {
      runDirectCommand(nextValue);
    }
  }

  return (
    <motion.aside
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
      className="relative z-10 flex h-[760px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/75 shadow-2xl shadow-cyan-950/20"
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
          {consoleMode === "commands" && (
            <>
              <div className="mb-2 flex items-center gap-2 font-sans text-sm font-bold">
                <Bot className="h-4 w-4" />
                Developer Command Console
              </div>
              Explore projects, engineering systems, and technical experience through commands.
            </>
          )}

          {consoleMode === "portfolio-ai" && (
            <>
              <div className="mb-2 flex items-center gap-2 font-sans text-sm font-bold">
                <Bot className="h-4 w-4" />
                Portfolio AI Assistant
              </div>
              Powered by curated portfolio knowledge. Ask about projects, testing, architecture
              decisions, mobile development, or product thinking.
            </>
          )}

          {consoleMode === "local-ai" && (
            <>
              <div className="mb-2 flex items-center gap-2 font-sans text-sm font-bold">
                <Bot className="h-4 w-4" />
                Local AI (Experimental)
              </div>
              Future browser-based AI model running entirely on-device without external APIs.
            </>
          )}
        </div>

        <div
          ref={historyContainerRef}
          className="min-h-0 flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-black/25 p-4 text-slate-300"
        >
          {terminalHistory.length === 0 ? (
            <p className="text-slate-500">Terminal cleared. Try: help, projects, or phase-forge.</p>
          ) : (
            <div className="space-y-4">
              {terminalHistory.map((item, index) => {
                const isPortfolioAiWelcome = item.command === "portfolio-ai";
                const isLocalAiWelcome = item.command === "local-ai";

                const isPortfolioAiResponse =
                  consoleMode === "portfolio-ai" && !isPortfolioAiWelcome && !isLocalAiWelcome;

                return (
                  <div key={`${item.command}-${index}`} className="space-y-2">
                    {isPortfolioAiWelcome ? (
                      <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">
                          Portfolio AI
                        </p>

                        {item.lines.map((line) => (
                          <p key={`${item.command}-${line}`} className="text-slate-300">
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : isLocalAiWelcome ? (
                      <div className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-4">
                        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-amber-300">
                          Local AI
                        </p>

                        {item.lines.map((line) => (
                          <p key={`${item.command}-${line}`} className="text-slate-300">
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : isPortfolioAiResponse ? (
                      <>
                        <div className="rounded-2xl border border-white/10 bg-white/[.03] p-3">
                          <p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">
                            You
                          </p>

                          <p className="mt-2 text-slate-200">{item.command}</p>
                        </div>

                        <div className="rounded-2xl border border-cyan-300/15 bg-cyan-300/10 p-4">
                          <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">
                            Portfolio AI
                          </p>

                          {item.lines.map((line) => {
                            const isThinkingLine = line
                              .toLowerCase()
                              .includes("portfolio ai is thinking");

                            return (
                              <p
                                key={`${item.command}-${line}`}
                                className={
                                  isThinkingLine
                                    ? "animate-pulse text-cyan-300"
                                    : line.startsWith("✓")
                                      ? "text-emerald-300"
                                      : "text-slate-300"
                                }
                              >
                                {line}
                              </p>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-auto pt-4">
          <div className="mb-3 flex rounded-2xl border border-white/10 bg-black/20 p-1 font-sans text-xs">
            {[
              { id: "commands", label: "Commands" },
              { id: "portfolio-ai", label: "Portfolio AI" },
              { id: "local-ai", label: "Local AI" },
            ].map((mode) => (
              <button
                key={mode.id}
                type="button"
                onClick={() => setConsoleMode(mode.id as ConsoleMode)}
                className={`cursor-pointer min-h-[44px] rounded-xl px-3 font-bold transition-all duration-300 ${
                  consoleMode === mode.id
                    ? "bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-300/25"
                    : "text-slate-400 hover:-translate-y-0.5 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-cyan-300/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  {mode.label}

                  {consoleMode !== mode.id && (
                    <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
                  )}
                </span>
              </button>
            ))}
          </div>

          {consoleMode === "commands" && (
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold uppercase tracking-[.2em] text-cyan-300">
                Commands
              </label>

              <select
                defaultValue=""
                onChange={(event) => {
                  const command = event.target.value;

                  if (!command) {
                    return;
                  }

                  runDirectCommand(command);
                  event.target.value = "";
                }}
                className="min-w-0 flex-1 rounded-xl border border-cyan-300/20 bg-slate-950 px-3 py-2 text-xs text-cyan-100 outline-none"
              >
                <option value="" disabled>
                  Select a command...
                </option>

                {suggestedCommands.map((command) => (
                  <option key={command} value={command}>
                    {command}
                  </option>
                ))}
              </select>
            </div>
          )}

          {consoleMode === "portfolio-ai" && (
            <div className="rounded-xl border border-cyan-300/15 bg-cyan-300/5 px-3 py-2 text-xs text-cyan-100">
              Type your own question or choose from the suggestions in the AI input below.
            </div>
          )}

          {consoleMode === "local-ai" && (
            <div className="rounded-2xl border border-amber-300/15 bg-amber-300/10 p-3 text-xs text-amber-100">
              Ask a question about Mark's experience, projects, skills, or technical decisions.
            </div>
          )}

          <form
            onSubmit={runCommand}
            className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[.04] px-4 py-3"
          >
            <span className="text-emerald-300">{consoleMode === "commands" ? "$" : "AI"}</span>

            <input
              ref={inputRef}
              list={consoleMode === "portfolio-ai" ? "ai-prompts" : undefined}
              value={input}
              onChange={handleInputChange}
              className="w-full bg-transparent text-slate-100 outline-none placeholder:text-slate-600"
              placeholder={
                consoleMode === "commands"
                  ? "Try: phase-forge, brew-passport, contact"
                  : consoleMode === "portfolio-ai"
                    ? "Type or select a suggested question..."
                    : "Local AI mode coming soon..."
              }
            />

            <button
              disabled={isThinking}
              className="rounded-xl bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-200 hover:bg-white/15"
            >
              {isThinking ? "thinking" : "run"}
            </button>
          </form>

          {consoleMode === "portfolio-ai" && (
            <datalist id="ai-prompts">
              {suggestedAiPrompts.map((prompt) => (
                <option key={prompt} value={prompt} />
              ))}
            </datalist>
          )}
        </div>
      </div>
    </motion.aside>
  );
}

export default DeveloperConsole;
