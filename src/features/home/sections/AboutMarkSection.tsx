import { Link } from "react-router-dom";
import markPhoto from "../../../images/mark.png";

function AboutMarkSection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-0 lg:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-white/[.055] p-6 shadow-2xl lg:grid-cols-[1fr_.8fr] lg:p-8">
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

            <p className="italic text-slate-400">
              Many of my projects start with a real problem. Others start because I convinced
              myself, "That can't be too difficult," and then spent the next few weekends proving
              myself wrong.
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

        <div className="space-y-4">
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] border border-white/10 shadow-xl">
            <img src={markPhoto} alt="Mark Nalbach" className="w-full object-cover contrast-125" />
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-5 shadow-xl">
            <h3 className="text-xl font-black text-white">Mark Nalbach</h3>

            <p className="mt-1 text-cyan-300">Frontend Engineer</p>

            <div className="mt-4 space-y-2 text-sm text-slate-400">
              <p>📍 Stevens Point, Wisconsin</p>
              <p>💻 15+ Years Building Digital Experiences</p>
              <p>⚛️ React • Mobile • Cypress • AI</p>
            </div>
          </div>

          <div className="rounded-[2rem] border border-cyan-300/10 bg-slate-950/80 p-5">
            <p className="text-4xl font-black text-white">10</p>
            <p className="mt-2 text-sm text-slate-300">Years as a Frontend Engineer at EverFi</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMarkSection;
