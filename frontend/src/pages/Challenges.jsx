import { useState, useEffect } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";
import { Play, RefreshCw } from "lucide-react";

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState("// Start coding here...");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch challenges from backend
  useEffect(() => {
    axios
      .get("https://learning-ut03.onrender.com/api/challenges/")
      .then((res) => {
        setChallenges(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching challenges:", err);
        setLoading(false);
      });
  }, []);

  // Handle challenge selection
  const selectChallenge = (challenge) => {
    setSelectedChallenge(challenge);
    setCode("// Write your solution here...");
  };

  // Handle code submission
  const submitCode = async () => {
    if (!selectedChallenge) {
      alert("Please select a challenge first.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post("https://learning-ut03.onrender.com/api/submit/", {
        challenge_id: selectedChallenge.id,
        code,
      });
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit code. Please try again.");
    }
    setSubmitting(false);
  };

  // Handle code reset
  const handleReset = () => {
    setCode("// Write your solution here...");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Challenges</h1>

        <div className="flex gap-6">
          {/* Challenge List */}
          <div className="w-1/3">
            {loading ? (
              <p className="text-gray-600">Loading challenges...</p>
            ) : challenges.length > 0 ? (
              challenges.map((challenge) => (
                <div
                  key={challenge.id}
                  className="p-4 bg-white shadow-sm rounded-lg cursor-pointer mb-3 hover:shadow-md transition-shadow"
                  onClick={() => selectChallenge(challenge)}
                >
                  <h2 className="font-bold text-gray-800">{challenge.title}</h2>
                  <p className="text-sm text-gray-600">{challenge.difficulty}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No challenges available.</p>
            )}
          </div>

          {/* Code Editor */}
          <div className="w-2/3">
            {selectedChallenge ? (
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {selectedChallenge.title}
                  </h2>
                  <p className="text-gray-600 whitespace-pre-wrap font-mono text-sm">
                    {selectedChallenge.description}
                  </p>
                </div>

                <div className="border-b border-gray-100 px-4 py-2 flex justify-between items-center bg-gray-50">
                  <span className="text-sm font-medium text-gray-600">JavaScript</span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleReset}
                      className="p-2 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100 transition-colors"
                      title="Reset Code"
                    >
                      <RefreshCw size={18} />
                    </button>
                    <button
                      onClick={submitCode}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                      disabled={submitting}
                    >
                      <Play size={18} />
                      <span>{submitting ? "Submitting..." : "Submit"}</span>
                    </button>
                  </div>
                </div>

                <MonacoEditor
                  height="500px"
                  defaultLanguage="javascript"
                  theme="vs-dark"
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    padding: { top: 16 },
                  }}
                />
              </div>
            ) : (
              <div className="p-6 text-gray-600 text-center bg-white rounded-lg shadow-sm">
                <p>Select a challenge to start coding.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
