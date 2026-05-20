import ArchitecturePanel from "../components/ArchitecturePanel";
import SectionHeader from "../components/SectionHeader";

function EngineeringSystemsSection() {
  return (
    <section id="systems" className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <SectionHeader
        eyebrow="Engineering Systems"
        title="Built with the same care behind the scenes."
        body="The portfolio is structured around reusable frontend systems, documented architecture, and maintainable feature organization."
      />

      <ArchitecturePanel />
    </section>
  );
}

export default EngineeringSystemsSection;