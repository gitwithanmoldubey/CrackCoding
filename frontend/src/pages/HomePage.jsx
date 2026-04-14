import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  MoonIcon,
  SparklesIcon,
  SunIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";

function HomePage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`min-h-screen overflow-hidden ${theme === 'light' ? 'bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50 text-slate-900' : 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100'} transition-colors duration-500`}>
      {/* NAVBAR */}
      <nav className="bg-base-100/90 backdrop-blur-2xl border-b border-base-200/70 sticky top-0 z-50 shadow-xl">
        <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to={"/"}
            className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
          >
            <div className="size-10 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
              <SparklesIcon className="size-6 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="font-black text-xl bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent font-mono tracking-wider">
                CrackCoding
              </span>
              <span className="text-xs text-base-content/60 font-medium -mt-1">Code Together</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm gap-2 border border-base-300 bg-base-100 text-base-content hover:bg-base-200 transition-all duration-200"
            >
              {theme === "light" ? <MoonIcon className="size-4" /> : <SunIcon className="size-4" />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>

            <SignInButton mode="modal">
              <button className="group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-semibold text-sm shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105 flex items-center gap-2">
                <span>Get Started</span>
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-40 lg:py-44">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-8 transition-opacity duration-700 ease-out">
            <div className="badge badge-primary badge-lg animate-pulse">
              <ZapIcon className="size-4" />
              Real-time Collaboration
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-sky-500 via-fuchsia-500 to-rose-500 bg-clip-text text-transparent">
                CrackCoding
              </span>
              <br />
              <span className="text-base-content">Build, Share, and Win Together</span>
            </h1>

            <p className="text-2xl md:text-3xl text-base-content/70 leading-relaxed max-w-2xl">
              An immersive coding platform for interviews, pair-programming, and technical practice with colorful collaboration and fast feedback.
              Join live rooms, solve problems together, and shine on every challenge.
            </p>

            <div className="grid gap-4 pt-6">
              <div className="relative rounded-3xl border border-base-200/70 bg-base-100/90 p-6 shadow-2xl backdrop-blur-xl animate-fade-in">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">
                    Live Code Preview
                  </span>
                  <span className="badge badge-outline badge-sm">JS</span>
                </div>
                <div className="space-y-3">
                  <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400/80 via-sky-400/70 to-indigo-400/80 w-4/5 animate-code-line"></div>
                  <div className="h-3 rounded-full bg-gradient-to-r from-fuchsia-400/80 via-violet-400/70 to-sky-400/80 w-3/4 animate-code-line animation-delay-200"></div>
                  <div className="h-3 rounded-full bg-gradient-to-r from-emerald-400/80 via-cyan-400/70 to-sky-400/80 w-2/3 animate-code-line animation-delay-400"></div>
                </div>
                <pre className="relative mt-4 overflow-x-auto rounded-3xl bg-slate-950/95 px-4 py-4 text-sm text-slate-100 shadow-inner">
                  <code>{`function solve(nums) {
  return nums.reduce((sum, x) => sum + x, 0);
}

console.log(solve([1, 2, 3]));`}</code>
                  <span className="absolute right-4 bottom-4 h-5 w-1 rounded-full bg-slate-100 animate-blink-cursor"></span>
                </pre>
              </div>
            </div>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
              <div className="badge badge-lg badge-outline badge-info text-base-content bg-base-100/80 border-base-200/70 shadow-lg transition-transform hover:-translate-y-1">
                <CheckIcon className="size-4 text-sky-600" />
                Live Video Chat
              </div>
              <div className="badge badge-lg badge-outline badge-secondary text-base-content bg-base-100/80 border-base-200/70 shadow-lg transition-transform hover:-translate-y-1">
                <CheckIcon className="size-4 text-secondary" />
                Real-time Editor
              </div>
              <div className="badge badge-lg badge-outline badge-accent text-base-content bg-base-100/80 border-base-200/70 shadow-lg transition-transform hover:-translate-y-1">
                <CheckIcon className="size-4 text-fuchsia-600" />
                Topic Practice
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg px-8 py-4 shadow-xl transition-all duration-200 hover:scale-105">
                  Start Coding Now
                  <ArrowRightIcon className="size-5 ml-2" />
                </button>
              </SignInButton>

              <button className="btn btn-outline btn-lg px-8 py-4 border-base-300 text-base-content hover:bg-base-200 transition-all duration-200 hover:scale-105">
                <VideoIcon className="size-5 mr-2" />
                Watch Demo
              </button>
            </div>

            {/* STATS */}
            <div className="stats stats-vertical lg:stats-horizontal bg-base-100/90 shadow-2xl ring-1 ring-base-300/40 text-base-content">
              <div className="stat">
                <div className="stat-value text-primary">10K+</div>
                <div className="stat-title">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-value text-secondary">50K+</div>
                <div className="stat-title">Sessions</div>
              </div>
              <div className="stat">
                <div className="stat-value text-accent">99.9%</div>
                <div className="stat-title">Uptime</div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary/20 blur-2xl animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-secondary/20 blur-2xl animate-blob animation-delay-2000"></div>

            <div className="absolute -left-8 top-12 w-56 rounded-[28px] border border-base-300/75 bg-base-100/95 p-5 shadow-2xl backdrop-blur-xl animate-float">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-600">Code Snippet</span>
                <span className="badge badge-sm badge-outline">HTML</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-rose-400/80 w-5/6"></div>
                <div className="h-2 rounded-full bg-sky-400/80 w-4/6"></div>
                <div className="h-2 rounded-full bg-emerald-400/80 w-3/6"></div>
              </div>
            </div>

            <div className="absolute right-0 bottom-0 w-48 rounded-[32px] border border-base-300/70 bg-base-100/95 p-5 shadow-2xl backdrop-blur-xl animate-float animation-delay-500">
              <div className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500 mb-3">
                Coding Flow
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-primary/90 w-4/5"></div>
                <div className="h-2 rounded-full bg-secondary/90 w-3/5"></div>
                <div className="h-2 rounded-full bg-accent/90 w-2/5"></div>
              </div>
            </div>

            <img
              src="/hero.png"
              alt="CodeCollab Platform"
              className="w-full h-auto rounded-[40px] shadow-2xl border-4 border-base-200 transform transition-transform duration-700 hover:-translate-y-2 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* CONTACT SECTION */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="card bg-gradient-to-br from-cyan-500 to-fuchsia-500 text-white shadow-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold mb-4">LetsCode</h3>
            <p className="text-base-content/90 leading-relaxed">
              Your collaborative coding space made beautiful and easy. Connect live, practice interview problems, and grow together.
            </p>
          </div>
          <div className="card bg-base-100/90 shadow-2xl p-8 border border-base-300/30 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-3">Connect on LinkedIn</h3>
            <p className="text-base-content/70 mb-3">
              Follow me for updates, coding tips, and collaboration opportunities.
            </p>
            <a
              href="https://www.linkedin.com/in/anmol23"
              target="_blank"
              rel="noreferrer"
              className="text-primary font-semibold hover:underline"
            >
              linkedin.com/in/anmol23
            </a>
          </div>
          <div className="card bg-base-100/90 shadow-2xl p-8 border border-base-300/30 backdrop-blur-xl">
            <h3 className="text-xl font-bold mb-3">Send an Email</h3>
            <p className="text-base-content/70 mb-3">
              Want to chat about the platform or collaborate on a new project? Reach out anytime.
            </p>
            <a href="mailto:anmoldubey2310@gmail.com" className="text-primary font-semibold hover:underline">
              anmoldubey2310@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Everything You Need to <span className="text-primary font-mono">Succeed</span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="card bg-base-100/90 shadow-2xl ring-1 ring-base-300/30 backdrop-blur-xl">
            <div className="card-body items-center text-center py-10 px-8 text-base-content">
              <div className="size-16 bg-base-200 rounded-3xl flex items-center justify-center mb-4 shadow-lg">
                <VideoIcon className="size-8 text-cyan-300" />
              </div>
              <h3 className="card-title">HD Video Call</h3>
              <p className="text-base-content/70">
                Crystal clear video and audio for seamless communication during interviews.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="card bg-slate-900/85 shadow-2xl ring-1 ring-white/10">
            <div className="card-body items-center text-center text-white">
              <div className="size-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                <Code2Icon className="size-8 text-fuchsia-300" />
              </div>
              <h3 className="card-title">Live Code Editor</h3>
              <p className="text-base-content/70">
                Collaborate in real-time with syntax highlighting and multiple language support
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="card bg-slate-900/85 shadow-2xl ring-1 ring-white/10">
            <div className="card-body items-center text-center text-white">
              <div className="size-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-4">
                <UsersIcon className="size-8 text-cyan-300" />
              </div>
              <h3 className="card-title">Easy Collaboration</h3>
              <p className="text-base-content/70">
                Share your screen, discuss solutions, and learn from each other in real-time
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
