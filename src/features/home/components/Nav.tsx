import { Cpu, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="relative z-20 mx-auto max-w-7xl px-6 py-5 lg:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15 backdrop-blur">
            <Cpu className="h-5 w-5 text-cyan-300" />
          </div>

          <Link to="/" onClick={closeMenu}>
            <p className="text-sm font-semibold tracking-wide text-white">
              Mark Nalbach
            </p>
            <p className="text-xs text-slate-400">Frontend Engineer</p>
          </Link>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <nav className="flex items-center gap-6 text-sm text-slate-300">
            <Link to="/about" className="hover:text-white">
              About
            </Link>
            <a href="/#builds" className="hover:text-white">
              Builds
            </a>
            <a href="/#systems" className="hover:text-white">
              Systems
            </a>
            <a href="/#quality" className="hover:text-white">
              Quality
            </a>
            <a href="/#mindset" className="hover:text-white">
              Mindset
            </a>
          </nav>

          <div className="flex flex-col items-end gap-2">
            <a
              href="mailto:marknalbach@gmail.com"
              className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur transition hover:bg-cyan-300/20"
            >
              marknalbach@gmail.com
            </a>

            <a
              href="https://github.com/MarkNalbach/marknalbach-studio"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 transition hover:text-white"
            >
              View portfolio repository →
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[.06] text-slate-100 backdrop-blur md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-4 rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-4 shadow-2xl backdrop-blur md:hidden">
          <nav className="grid gap-2 text-sm text-slate-300">
            <Link
              to="/about"
              onClick={closeMenu}
              className="rounded-xl px-3 py-2 hover:bg-white/[.06] hover:text-white"
            >
              About
            </Link>

            <a
              href="/#builds"
              onClick={closeMenu}
              className="rounded-xl px-3 py-2 hover:bg-white/[.06] hover:text-white"
            >
              Builds
            </a>

            <a
              href="/#systems"
              onClick={closeMenu}
              className="rounded-xl px-3 py-2 hover:bg-white/[.06] hover:text-white"
            >
              Systems
            </a>

            <a
              href="/#quality"
              onClick={closeMenu}
              className="rounded-xl px-3 py-2 hover:bg-white/[.06] hover:text-white"
            >
              Quality
            </a>

            <a
              href="/#mindset"
              onClick={closeMenu}
              className="rounded-xl px-3 py-2 hover:bg-white/[.06] hover:text-white"
            >
              Mindset
            </a>
          </nav>

          <div className="mt-4 border-t border-white/10 pt-4">
            <a
              href="mailto:marknalbach@gmail.com"
              className="block rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-center text-sm font-semibold text-cyan-100"
            >
              marknalbach@gmail.com
            </a>

            <a
              href="https://github.com/MarkNalbach/marknalbach-studio"
              target="_blank"
              rel="noreferrer"
              className="mt-3 block text-center text-xs text-slate-400"
            >
              View portfolio repository →
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Nav;