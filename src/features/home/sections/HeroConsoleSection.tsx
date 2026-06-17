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
  activeCommand: string;
  terminalHistory: TerminalHistoryItem[];
  consoleMode: ConsoleMode;
  setConsoleMode: React.Dispatch<React.SetStateAction<ConsoleMode>>;
  isThinking: boolean;
  thinkingDots: string;
}

function HeroConsoleSection({
  stack,
  input,
  setInput,
  runCommand,
  runDirectCommand,
  activeCommand,
  terminalHistory,
  consoleMode,
  setConsoleMode,
  isThinking,
  thinkingDots,
}: HeroConsoleSectionProps) {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-20">
      <Hero stack={stack} />

      <DeveloperConsole
        input={input}
        setInput={setInput}
        runCommand={runCommand}
        runDirectCommand={runDirectCommand}
        activeCommand={activeCommand}
        terminalHistory={terminalHistory}
        consoleMode={consoleMode}
        setConsoleMode={setConsoleMode}
        isThinking={isThinking}
        thinkingDots={thinkingDots}
      />
    </section>
  );
}

export default HeroConsoleSection;