import { Link } from "react-router-dom";

function AboutMarkSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-0 lg:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl backdrop-blur lg:grid-cols-[1fr_.8fr] lg:p-8">
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-cyan-300">
            About Mark
          </p>

          <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">
            My path into software was built through curiosity.
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-slate-300 md:text-lg">
            <p>
              I started my career running a video production business, creating animation, motion
              graphics, and visual effects projects. Curiosity about the technology behind those
              experiences eventually pulled me into software development.
            </p>

            <p>
              After five years building interactive digital learning experiences at Workplace
              Answers, I joined EverFi, where I’ve spent the last decade as a Frontend Engineer
              building React interfaces, reusable components, product interactions, and automation
              testing workflows.
            </p>

            <p>
              What has stayed consistent is that I like building things. Whether it’s educational
              software, mobile apps, interactive games, automation systems, or AI-powered
              experiences, I enjoy turning ideas into products people can actually use.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/about"
              className="inline-flex rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-5 py-3 text-sm font-bold text-cyan-100 transition hover:-translate-y-0.5 hover:bg-cyan-300/20"
            >
              Read more about my path →
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5">
            <p className="text-4xl font-black text-white">15+</p>
            <p className="mt-2 text-sm text-cyan-100">Years building digital experiences</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
            <p className="text-4xl font-black text-white">10</p>
            <p className="mt-2 text-sm text-slate-300">Years as a Frontend Engineer at EverFi</p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-950/55 p-5">
            <p className="text-sm font-bold uppercase tracking-[.2em] text-emerald-300">
              Focus areas
            </p>
            <p className="mt-3 leading-7 text-slate-300">
              React, components, product interactions, Cypress automation, mobile apps, and AI
              experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMarkSection;
