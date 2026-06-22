import DeveloperConsole from "../components/DeveloperConsole";
import Hero from "../components/Hero";
import type { TerminalHistoryItem } from "../HomePage";

type ConsoleMode = "commands" | "portfolio-ai" | "local-ai";

interface HeroConsoleSectionProps {
  stack: string[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  runCommand: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  runDirectCommand: (command: string) => void;
  terminalHistory: TerminalHistoryItem[];
  consoleMode: ConsoleMode;
  setConsoleMode: React.Dispatch<React.SetStateAction<ConsoleMode>>;
  isThinking: boolean;
}

function HeroConsoleSection({
  stack,
  input,
  setInput,
  runCommand,
  runDirectCommand,
  terminalHistory,
  consoleMode,
  setConsoleMode,
  isThinking,
}: HeroConsoleSectionProps) {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-20">
      <Hero stack={stack} />

      <div>
        <div className="mb-4 text-center">
          <p className="animate-pulse text-sm font-semibold text-cyan-200">
            ↓ Try the Interactive AI Console ↓
          </p>
{/* 
          <p className="mt-1 text-xs text-slate-400">
            Ask about projects, mobile apps, testing, AI, or frontend engineering.
          </p> */}
        </div>

        <DeveloperConsole
          input={input}
          setInput={setInput}
          runCommand={runCommand}
          runDirectCommand={runDirectCommand}
          terminalHistory={terminalHistory}
          consoleMode={consoleMode}
          setConsoleMode={setConsoleMode}
          isThinking={isThinking}
        />
      </div>
    </section>
  );
}

export default HeroConsoleSection;