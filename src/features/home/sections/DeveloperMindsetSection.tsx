import MindsetCard from "../components/MindsetCard";
import SectionHeader from "../components/SectionHeader";
import type { MindsetCardData } from "../../../types/home";

interface DeveloperMindsetSectionProps {
  mindsetCards: MindsetCardData[];
}

function DeveloperMindsetSection({
  mindsetCards,
}: DeveloperMindsetSectionProps) {
  return (
    <section id="mindset" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Developer Mindset"
        title="How I approach building products."
        body="The habits and principles I rely on when turning ideas into working software."
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {mindsetCards.map((card) => (
          <MindsetCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

export default DeveloperMindsetSection;