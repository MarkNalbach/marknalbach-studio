import { useState, useEffect } from "react";
import SectionHeader from "./components/SectionHeader";
import BackgroundGrid from "./components/BackgroundGrid";
import Nav from "./components/Nav";
import QualityGrid from "./components/QualityGrid";
import FeaturedBuildsSection from "./sections/FeaturedBuildsSection";
import EngineeringSystemsSection from "./sections/EngineeringSystemsSection";
import DeveloperMindsetSection from "./sections/DeveloperMindsetSection";
import HeroConsoleSection from "./sections/HeroConsoleSection";
import { searchPortfolioKnowledge } from "../../utils/searchPortfolioKnowledge";
import AboutMarkSection from "./sections/AboutMarkSection";
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

type ConsoleMode = "commands" | "portfolio-ai" | "local-ai";

function HomePage() {
  const [consoleMode, setConsoleMode] = useState<ConsoleMode>("commands");
  const [activeCommand, setActiveCommand] = useState<string>("help");
  const [input, setInput] = useState<string>("help");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingDots, setThinkingDots] = useState("...");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>([
    {
      command: "help",
      lines: terminalResponses.help,
    },
  ]);

  function getCommandLines(command: string) {
    if (command in terminalResponses) {
      return terminalResponses[command as keyof typeof terminalResponses];
    }

    return [
      `Command not found: ${command}`,
      "Try: help, about, skills, projects, brew-passport, potty-pal, phase-forge, contact, clear",
    ];
  }

  function runTerminalCommand(command: string) {
    const normalized = command.trim().toLowerCase() || "help";

    setActiveCommand(normalized);

    if (normalized === "clear") {
      setInput("");
      setTerminalHistory([]);
      return;
    }

    if (consoleMode === "commands") {
      setInput(normalized);
    }

    if (consoleMode === "portfolio-ai") {
      setInput("");
    }

    if (consoleMode === "portfolio-ai") {
      setThinkingDots(".");
      setIsThinking(true);
      const thinkingInterval = window.setInterval(() => {
        setThinkingDots((current) => {
          if (current === "...") return ".";
          if (current === ".") return "..";
          return "...";
        });
      }, 300);

      setTerminalHistory((current) => [
        ...current,
        {
          command: normalized,
          lines: ["Portfolio AI is thinking..."],
        },
      ]);

      window.setTimeout(() => {
        setTerminalHistory((current) => [
          ...current.slice(0, -1),
          {
            command: normalized,
            lines: searchPortfolioKnowledge(normalized),
          },
        ]);

        window.clearInterval(thinkingInterval);
        setIsThinking(false);
        setThinkingDots("...");
      }, 1500);

      return;
    }

    if (consoleMode === "local-ai") {
      setTerminalHistory((current) => [
        ...current,
        {
          command: normalized,
          lines: [
            "Local AI mode is experimental.",
            "Planned implementation: browser-based model running on-device.",
            "For now, switch to Portfolio AI for curated portfolio answers.",
          ],
        },
      ]);
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

  useEffect(() => {
    if (consoleMode === "commands") {
      setActiveCommand("help");
      setInput("help");
      setTerminalHistory([
        {
          command: "help",
          lines: terminalResponses.help,
        },
      ]);
    }

    if (consoleMode === "portfolio-ai") {
      setActiveCommand("portfolio-ai");
      setInput("");
      setTerminalHistory([
        {
          command: "portfolio-ai",
          lines: [
            "Portfolio AI Assistant",
            "",
            "Ask a natural-language question about projects, skills, testing experience, architecture decisions, or product development.",
            "",
            "Try: What did you build with Firebase?",
          ],
        },
      ]);
    }

    if (consoleMode === "local-ai") {
      setActiveCommand("local-ai");
      setInput("");
      setTerminalHistory([
        {
          command: "local-ai",
          lines: [
            "Local AI Experimental Mode",
            "",
            "Planned implementation: browser-based AI running entirely on-device.",
            "",
            "For now, use Portfolio AI for curated project answers.",
          ],
        },
      ]);
    }
  }, [consoleMode]);

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
        terminalHistory={terminalHistory}
        consoleMode={consoleMode}
        setConsoleMode={setConsoleMode}
        isThinking={isThinking}
      />

      <AboutMarkSection />

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
              Interactive frontend engineering portfolio focused on React, intuitive product
              experiences, AI-enhanced interfaces, and production-minded systems.
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
