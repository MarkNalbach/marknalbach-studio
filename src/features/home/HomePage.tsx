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
import { askLocalAi, loadLocalAi, supportsLocalAi } from "../../utils/localAi";
import { localAiKnowledge } from "../../content/localAiKnowledge";
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

// const portfolioContext =
//   "Mark Nalbach is a frontend engineer with 10 years at EverFi, 5 years at Workplace Answers, and prior experience in video, animation, and effects. His projects include US Brew Passport, Potty Pal, Phase Forge, Cypress automation, React, React Native, Expo, Firebase, TypeScript, and AI UX.";

function HomePage() {
  const [consoleMode, setConsoleMode] = useState<ConsoleMode>("commands");
  const [isThinking, setIsThinking] = useState(false);
  const [isLocalAiLoaded, setIsLocalAiLoaded] = useState(false);
  const [input, setInput] = useState<string>("");
  const [terminalHistory, setTerminalHistory] = useState<TerminalHistoryItem[]>([]);

  function getCommandLines(command: string) {
    if (command in terminalResponses) {
      return terminalResponses[command as keyof typeof terminalResponses];
    }

    return [
      `Command not found: ${command}`,
      "Try: help, about, skills, projects, brew-passport, potty-pal, phase-forge, contact, clear",
    ];
  }

  async function runTerminalCommand(command: string) {
    const normalized = command.trim().toLowerCase() || "help";

    if (normalized === "clear") {
      setInput("");
      setTerminalHistory([]);
      return;
    }

    if (consoleMode === "commands") {
      setInput("");
      setTerminalHistory((current) => [
        ...current,
        {
          command: normalized,
          lines: getCommandLines(normalized),
        },
      ]);
      return;
    }

    if (consoleMode === "portfolio-ai") {
      setInput("");
      setIsThinking(true);

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

        setIsThinking(false);
      }, 1500);

      return;
    }

    if (consoleMode === "local-ai") {
      setInput("");
      setIsThinking(true);

      try {
        const hasWebGpu = await supportsLocalAi();

        if (!hasWebGpu) {
          setTerminalHistory((current) => [
            ...current,
            {
              command: normalized,
              lines: [
                "Local AI is not available in this browser.",
                "This feature requires WebGPU support.",
                "Try Chrome or Edge on a device with WebGPU enabled.",
              ],
            },
          ]);
          return;
        }

        if (!isLocalAiLoaded) {
          setTerminalHistory((current) => [
            ...current,
            {
              command: normalized,
              lines: ["Loading Local AI model...", "First load may take a little while."],
            },
          ]);

          await loadLocalAi((message) => {
            setTerminalHistory((current) => [
              ...current.slice(0, -1),
              {
                command: normalized,
                lines: ["Loading Local AI model...", message],
              },
            ]);
          });

          setIsLocalAiLoaded(true);
        }

        const searchContext = searchPortfolioKnowledge(normalized).join("\n");

        const relevantContext = searchContext.trim().length > 80 ? searchContext : localAiKnowledge;

        const answer = await askLocalAi(normalized, relevantContext);

        setTerminalHistory((current) => [
          ...current.filter((item) => !item.lines.includes("Loading Local AI model...")),
          {
            command: normalized,
            lines: answer.split("\n"),
          },
        ]);
      } catch {
        setTerminalHistory((current) => [
          ...current.filter((item) => !item.lines.includes("Loading Local AI model...")),
          {
            command: normalized,
            lines: [
              "Local AI could not finish loading or responding.",
              "This can happen if the browser, GPU, or model download is not supported.",
              "Portfolio AI is still available as the reliable fallback.",
            ],
          },
        ]);
      } finally {
        setIsThinking(false);
      }

      return;
    }
  }

  function runCommand(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    runTerminalCommand(input);
  }

  function runDirectCommand(command: string) {
    runTerminalCommand(command);
  }

  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (consoleMode === "commands") {
      setInput("");
      setTerminalHistory([
        {
          command: "welcome",
          lines: [
            "Welcome to the Developer Console.",
            "Select a command below or try one of the AI modes.",
          ],
        },
      ]);
    }

    if (consoleMode === "portfolio-ai") {
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
      setInput("");
      setTerminalHistory([
        {
          command: "local-ai",
          lines: [
            "Local AI Mode",
            "",
            "This runs an AI model directly in your browser using WebGPU.",
            "No API key. No server request. No token cost.",
            "",
            "First load may take a little while.",
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
