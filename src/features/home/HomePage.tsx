import { useState } from "react";
import SectionHeader from "./components/SectionHeader";
import BackgroundGrid from "./components/BackgroundGrid";
import Nav from "./components/Nav";
import QualityGrid from "./components/QualityGrid";
import FeaturedBuildsSection from "./sections/FeaturedBuildsSection";
import EngineeringSystemsSection from "./sections/EngineeringSystemsSection";
import DeveloperMindsetSection from "./sections/DeveloperMindsetSection";
import HeroConsoleSection from "./sections/HeroConsoleSection";
import {
  featuredBuilds,
  mindsetCards,
  profile,
  qualityChecks,
  terminalResponses,
} from "../../content/homeContent";

export interface TerminalHistoryItem {
  command: string;
  lines: string[];
}

function HomePage() {
  const [activeCommand, setActiveCommand] = useState<string>("help");
  const [input, setInput] = useState<string>("help");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>([
    {
      command: "help",
      lines: terminalResponses.help,
    },
  ]);

  function getCommandLines(command: string) {
    return (
      terminalResponses[command] ?? [
        `Command not found: ${command}`,
        "Try: help, about, skills, projects, brew-passport, potty-pal, phase-forge, contact, clear",
      ]
    );
  }

  function runTerminalCommand(command: string) {
    const normalized = command.trim().toLowerCase() || "help";

    setInput(normalized);
    setActiveCommand(normalized);

    if (normalized === "clear") {
      setTerminalHistory([]);
      return;
    }

    setTerminalHistory((current) => [
      ...current,
      {
        command: normalized,
        lines: getCommandLines(normalized),
      },
    ]);
  }

  function runCommand(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    runTerminalCommand(input);
  }

  function runDirectCommand(command: string) {
    runTerminalCommand(command);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#090b12] text-slate-100">
      <BackgroundGrid />
      <Nav />

      <HeroConsoleSection
        stack={profile.stack}
        input={input}
        setInput={setInput}
        runCommand={runCommand}
        runDirectCommand={runDirectCommand}
        activeCommand={activeCommand}
        terminalHistory={terminalHistory}
      />

      <FeaturedBuildsSection featuredBuilds={featuredBuilds} />
      <EngineeringSystemsSection />

      <section id="quality" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <SectionHeader
          eyebrow="Quality System"
          title="Cypress checks become part of the story."
          body="Automated checks can run on commits and pull requests, while the portfolio visually explains that this was built like a production product."
        />

        <QualityGrid qualityChecks={qualityChecks} />
      </section>

      <DeveloperMindsetSection mindsetCards={mindsetCards} />

      <footer className="relative border-t border-white/10 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-semibold text-white">Mark Nalbach Studio</p>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Interactive frontend engineering portfolio focused on React, thoughtful UX,
              AI-enhanced interfaces, and production-minded systems.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="mailto:marknalbach@gmail.com"
              className="text-sm font-medium text-cyan-200 transition hover:text-cyan-100"
            >
              marknalbach@gmail.com
            </a>

            <p className="text-xs text-slate-500">Designed and developed by Mark Nalbach</p>

            <a
              href="https://github.com/MarkNalbach/marknalbach-studio"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-500 transition hover:text-slate-300"
            >
              github.com/MarkNalbach/marknalbach-studio
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default HomePage;