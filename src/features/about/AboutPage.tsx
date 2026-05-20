import BackgroundGrid from "../home/components/BackgroundGrid";
import Nav from "../home/components/Nav";
import SectionHeader from "../home/components/SectionHeader";
import { aboutCards, aboutIntro, beyondCodeItems } from "../../content/aboutContent";

function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090b12] text-slate-100">
      <BackgroundGrid />
      <Nav />

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <SectionHeader
          eyebrow={aboutIntro.eyebrow}
          title={aboutIntro.title}
          body={aboutIntro.body}
        />

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {aboutCards.map((card) => (
            <article
              key={card.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/[.055] p-6 shadow-xl backdrop-blur"
            >
              <h2 className="text-xl font-black text-white">{card.title}</h2>
              <p className="mt-3 leading-7 text-slate-300">{card.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur md:p-8">
          <p className="text-sm font-bold uppercase tracking-[.25em] text-cyan-300">
            Beyond the Code
          </p>

          <h2 className="mt-3 text-3xl font-black tracking-tight text-white">
            I’m at my best when a project needs both structure and creativity.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {beyondCodeItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-slate-950/45 p-5 text-slate-300"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="/#builds"
            className="rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-950/30 transition hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            View featured builds
          </a>

          <a
            href="/"
            className="rounded-2xl border border-white/15 bg-white/[.06] px-5 py-3 text-sm font-bold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10"
          >
            Back to studio
          </a>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
