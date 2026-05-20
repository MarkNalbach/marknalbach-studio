import { Cpu } from "lucide-react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 shadow-lg ring-1 ring-white/15 backdrop-blur">
          <Cpu className="h-5 w-5 text-cyan-300" />
        </div>

        <div>
          <Link to="/">
            <p className="text-sm font-semibold tracking-wide">Mark Nalbach</p>
            <p className="text-xs text-slate-400">Frontend Engineer</p>
          </Link>
        </div>
      </div>

      <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
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
    </header>
  );
}

export default Nav;
