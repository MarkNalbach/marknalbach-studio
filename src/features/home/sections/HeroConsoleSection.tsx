import Hero from "../components/Hero";
import DeveloperConsole from "../components/DeveloperConsole";

interface HeroConsoleSectionProps {
  stack: string[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  runCommand: (event: React.SyntheticEvent<HTMLFormElement>) => void;
  activeCommand: string;
  terminalLines: string[];
}

function HeroConsoleSection({
  stack,
  input,
  setInput,
  runCommand,
  activeCommand,
  terminalLines,
}: HeroConsoleSectionProps) {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pt-20">
      <Hero stack={stack} />

      <DeveloperConsole
        input={input}
        setInput={setInput}
        runCommand={runCommand}
        activeCommand={activeCommand}
        lines={terminalLines}
      />
    </section>
  );
}

export default HeroConsoleSection;