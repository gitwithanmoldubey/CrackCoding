import { getDifficultyBadgeClass } from "../lib/utils";
function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      {/* HEADER SECTION */}
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-start justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">{problem.title}</h1>
          <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        <p className="text-base-content/60">{problem.category}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="badge badge-outline badge-info bg-base-100/80 border-base-300">
            Frontend
          </span>
          <span className="badge badge-outline badge-secondary bg-base-100/80 border-base-300">
            Backend
          </span>
        </div>

        {/* Problem selector - grouped by difficulty */}
        <div className="mt-4">
          <select
            className="select select-sm w-full"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            <option disabled>Select a problem...</option>
            
            {/* Easy Problems */}
            {allProblems.filter(p => p.difficulty === "Easy").length > 0 && (
              <optgroup label="🟢 Easy">
                {allProblems
                  .filter(p => p.difficulty === "Easy")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
              </optgroup>
            )}
            
            {/* Medium Problems */}
            {allProblems.filter(p => p.difficulty === "Medium").length > 0 && (
              <optgroup label="🟡 Medium">
                {allProblems
                  .filter(p => p.difficulty === "Medium")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
              </optgroup>
            )}
            
            {/* Hard Problems */}
            {allProblems.filter(p => p.difficulty === "Hard").length > 0 && (
              <optgroup label="🔴 Hard">
                {allProblems
                  .filter(p => p.difficulty === "Hard")
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
              </optgroup>
            )}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* PROBLEM DESC */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content">Description</h2>

          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-base-content/90">{problem.description?.text || "No description available."}</p>
            {(problem.description?.notes || []).map((note, idx) => (
              <p key={idx} className="text-base-content/90">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* TEST CASES SECTION - New format with public/private */}
        {problem.testCases && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Test Cases</h2>
            
            {/* PUBLIC TEST CASES */}
            {problem.testCases.public && problem.testCases.public.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-success">PUBLIC</span>
                  <p className="text-sm font-semibold text-base-content">Test Cases ({problem.testCases.public.length})</p>
                </div>
                <div className="space-y-4">
                  {problem.testCases.public.map((testCase, idx) => (
                    <div key={`public-${idx}`} className="bg-base-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="badge badge-sm badge-outline">{idx + 1}</span>
                        <span className="badge badge-xs badge-success">Public</span>
                      </div>
                      <div className="font-mono text-sm space-y-1.5">
                        <div className="flex gap-2">
                          <span className="text-primary font-bold min-w-[70px]">Input:</span>
                          <span className="text-base-content">{testCase.input}</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                          <span className="text-base-content">{testCase.output}</span>
                        </div>
                        {testCase.explanation && (
                          <div className="pt-2 border-t border-base-300 mt-2">
                            <span className="text-base-content/60 font-sans text-xs">
                              <span className="font-semibold">Explanation:</span> {testCase.explanation}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRIVATE TEST CASES */}
            {problem.testCases.private && problem.testCases.private.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="badge badge-error">PRIVATE</span>
                  <p className="text-sm font-semibold text-base-content">Hidden Test Cases ({problem.testCases.private.length})</p>
                  <span className="text-xs text-base-content/60">(Run to test)</span>
                </div>
                <div className="alert alert-warning">
                  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4v2m0 0a9 9 0 110-18 9 9 0 010 18z"></path>
                  </svg>
                  <span>Hidden test cases will be run when you execute your code. Try to solve the problem based on the public examples!</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* EXAMPLES SECTION - Fallback for old format */}
        {!problem.testCases && problem.examples && (
          <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
            <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
            <div className="space-y-4">
              {problem.examples.map((example, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="badge badge-sm">{idx + 1}</span>
                    <p className="font-semibold text-base-content">Example {idx + 1}</p>
                  </div>
                  <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                    <div className="flex gap-2">
                      <span className="text-primary font-bold min-w-[70px]">Input:</span>
                      <span>{example.input}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                      <span>{example.output}</span>
                    </div>
                    {example.explanation && (
                      <div className="pt-2 border-t border-base-300 mt-2">
                        <span className="text-base-content/60 font-sans text-xs">
                          <span className="font-semibold">Explanation:</span> {example.explanation}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONSTRAINTS */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
          <ul className="space-y-2 text-base-content/90">
            {(problem.constraints || []).map((constraint, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;
