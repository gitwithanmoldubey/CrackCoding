import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { useMemo, useState } from "react";

import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { useTheme } from "../context/ThemeContext";

function ProblemsPage() {
  const { isDark } = useTheme();
  const problems = Object.values(PROBLEMS);
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const topics = useMemo(() => {
    const uniqueTopics = Array.from(new Set(problems.map((p) => p.category || "Other")));
    return ["All Topics", ...uniqueTopics.sort((a, b) => a.localeCompare(b))];
  }, [problems]);

  const topicFilteredProblems =
    selectedTopic === "All Topics"
      ? problems
      : problems.filter((p) => p.category === selectedTopic);

  const easyProblems = topicFilteredProblems.filter((p) => p.difficulty === "Easy");
  const mediumProblems = topicFilteredProblems.filter((p) => p.difficulty === "Medium");
  const hardProblems = topicFilteredProblems.filter((p) => p.difficulty === "Hard");

  const getFilteredProblems = () => {
    switch (selectedDifficulty) {
      case "Easy":
        return easyProblems;
      case "Medium":
        return mediumProblems;
      case "Hard":
        return hardProblems;
      default:
        return topicFilteredProblems;
    }
  };

  const filteredProblems = getFilteredProblems();

  const ProblemCard = ({ problem }) => (
    <Link
      key={problem.id}
      to={`/problem/${problem.id}`}
      className="card bg-base-100 hover:scale-[1.01] transition-transform shadow-sm"
    >
      <div className="card-body">
        <div className="flex items-center justify-between gap-4">
          {/* LEFT SIDE */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2Icon className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{problem.title}</h2>
                  <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
                    {problem.difficulty}
                  </span>
                </div>
                <p className="text-sm text-base-content/60">{problem.category}</p>
              </div>
            </div>
            <p className="text-base-content/80 mb-3">{problem.description.text}</p>
          </div>
          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 text-primary">
            <span className="font-medium">Solve</span>
            <ChevronRightIcon className="size-5" />
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-gradient-to-br from-sky-50 via-indigo-50 to-fuchsia-50"
      }`}
    >
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="badge badge-outline badge-info bg-base-100/80 border-base-300">
              Frontend
            </span>
            <span className="badge badge-outline badge-secondary bg-base-100/80 border-base-300">
              Backend
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2 flex-wrap">
            {["All", "Easy", "Medium", "Hard"].map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setSelectedDifficulty(difficulty)}
                className={`btn btn-sm ${
                  selectedDifficulty === difficulty
                    ? difficulty === "Easy"
                      ? "btn-success"
                      : difficulty === "Medium"
                      ? "btn-warning"
                      : difficulty === "Hard"
                      ? "btn-error"
                      : "btn-primary"
                    : "btn-ghost"
                }`}
              >
                {difficulty}
                {difficulty === "All" && ` (${topicFilteredProblems.length})`}
                {difficulty === "Easy" && ` (${easyProblems.length})`}
                {difficulty === "Medium" && ` (${mediumProblems.length})`}
                {difficulty === "Hard" && ` (${hardProblems.length})`}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <select
              className="select select-bordered w-full"
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
            >
              {topics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PROBLEMS LIST BY SECTION */}
        {selectedDifficulty === "All" ? (
          <div className="space-y-12">
            {/* EASY SECTION */}
            {easyProblems.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-success rounded-full"></div>
                  <h2 className="text-2xl font-bold">Easy ({easyProblems.length})</h2>
                </div>
                <div className="space-y-4">
                  {easyProblems.map((problem) => (
                    <ProblemCard key={problem.id} problem={problem} />
                  ))}
                </div>
              </div>
            )}

            {/* MEDIUM SECTION */}
            {mediumProblems.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-warning rounded-full"></div>
                  <h2 className="text-2xl font-bold">Medium ({mediumProblems.length})</h2>
                </div>
                <div className="space-y-4">
                  {mediumProblems.map((problem) => (
                    <ProblemCard key={problem.id} problem={problem} />
                  ))}
                </div>
              </div>
            )}

            {/* HARD SECTION */}
            {hardProblems.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-error rounded-full"></div>
                  <h2 className="text-2xl font-bold">Hard ({hardProblems.length})</h2>
                </div>
                <div className="space-y-4">
                  {hardProblems.map((problem) => (
                    <ProblemCard key={problem.id} problem={problem} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* SINGLE DIFFICULTY VIEW */
          <div className="space-y-4">
            {filteredProblems.length > 0 ? (
              filteredProblems.map((problem) => (
                <ProblemCard key={problem.id} problem={problem} />
              ))
            ) : (
              <div className="card bg-base-100">
                <div className="card-body text-center py-12">
                  <p className="text-base-content/60">No problems available for this difficulty</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STATS FOOTER */}
        <div className="mt-12 card bg-base-100 shadow-lg">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal">
              <div className="stat">
                <div className="stat-title">Total Problems</div>
                <div className="stat-value text-primary">{topicFilteredProblems.length}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Easy</div>
                <div className="stat-value text-success">{easyProblems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Medium</div>
                <div className="stat-value text-warning">{mediumProblems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Hard</div>
                <div className="stat-value text-error">{hardProblems.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProblemsPage;
