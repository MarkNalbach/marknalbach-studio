import { useMemo, useState, } from "react";
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

type TerminalCommand = keyof typeof terminalResponses;

function HomePage() {
  const [activeCommand, setActiveCommand] = useState<TerminalCommand>("help");
  const [input, setInput] = useState("help");

  const terminalLines = useMemo(() => {
    return (
      terminalResponses[activeCommand] ?? [
        `Command not found: ${activeCommand}`,
        "Try: help, about, skills, projects, ai, test, docs",
      ]
    );
  }, [activeCommand]);

  function runCommand(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = input.trim().toLowerCase() || "help";
    setActiveCommand(normalized as TerminalCommand);
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
        activeCommand={activeCommand}
        terminalLines={terminalLines}
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

      <footer className="relative border-t border-white/10 px-6 py-10 text-center text-sm text-slate-400">
        <p>Mark Nalbach Studio — an interactive frontend engineering portfolio built with React, thoughtful UX, and production-minded systems.</p>
      </footer>
    </main>
  );
}

export default HomePage;
