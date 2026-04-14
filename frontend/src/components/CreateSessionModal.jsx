import { Code2Icon, LoaderIcon, PlusIcon, ShareIcon, CheckCircleIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";
import { useState } from "react";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
  createdSessionId,
}) {
  const problems = Object.values(PROBLEMS);
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  const handleShareSession = async () => {
    if (!createdSessionId) return;
    
    const sessionUrl = `${window.location.origin}/session/${createdSessionId}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Join my coding session`,
          text: `Join me for a coding session on ${roomConfig.problem}`,
          url: sessionUrl,
        });
      } catch (error) {
        console.log('Share cancelled or failed:', error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(sessionUrl);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      } catch (error) {
        const textArea = document.createElement('textarea');
        textArea.value = sessionUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 3000);
      }
    }
  };

  if (!isOpen) return null;

  // Show share success screen after session creation
  if (createdSessionId) {
    return (
      <div className="modal modal-open">
        <div className="modal-box max-w-2xl">
          <div className="flex flex-col items-center justify-center text-center py-8">
            <div className="mb-4 p-4 bg-success/20 rounded-full">
              <CheckCircleIcon className="size-16 text-success" />
            </div>
            <h3 className="font-bold text-2xl mb-2">Session Created!</h3>
            <p className="text-base-content/70 mb-4">
              Your {roomConfig.problem} session is now live and ready for collaboration.
            </p>
            <p className="text-sm text-base-content/60 mb-6">
              Share the session link below with someone to invite them to code together!
            </p>

            <div className="alert alert-info mb-6 w-full">
              <div className="text-left">
                <p className="text-sm font-medium">Session ID:</p>
                <p className="font-mono text-xs mt-1 break-all">{createdSessionId}</p>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                className="btn btn-ghost flex-1"
                onClick={() => {
                  setShowShareSuccess(false);
                  onClose();
                }}
              >
                Close
              </button>
              <button
                className="btn btn-primary flex-1 gap-2"
                onClick={handleShareSession}
              >
                <ShareIcon className="size-5" />
                Share Session
              </button>
            </div>

            {showShareSuccess && (
              <div className="alert alert-success mt-4 w-full">
                <CheckCircleIcon className="size-5" />
                <span>Session link copied to clipboard!</span>
              </div>
            )}
          </div>
        </div>
        <div className="modal-backdrop" onClick={onClose}></div>
      </div>
    );
  }

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create New Session</h3>

        <div className="space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose} disabled={isCreating}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create & Share"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;
