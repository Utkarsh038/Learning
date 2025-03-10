import { useState, useEffect } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState({ weekly: [], monthly: [], allTime: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("weekly");

  useEffect(() => {
    axios
      .get("https://learning-ut03.onrender.com/api/leaderboard/leaderboard/")
      .then((res) => {
        if (res.data.weekly && res.data.monthly && res.data.allTime) {
          setLeaderboard(res.data);
        } else {
          setError("Invalid leaderboard data received.");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setError("Failed to load leaderboard.");
        setLoading(false);
      });
  }, []);

  const currentData = leaderboard[activeTab] || [];
  const top5 = currentData.slice(0, 5);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Leaderboard</h1>

      <div className="flex border-b mb-4">
        {["weekly", "monthly", "allTime"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium transition ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab === "weekly" ? "Weekly" : tab === "monthly" ? "Monthly" : "All Time"}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading leaderboard...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : currentData.length > 0 ? (
        <>
          <table className="w-full border-collapse border border-gray-200 mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 text-left border border-gray-200">Rank</th>
                <th className="py-2 px-4 text-left border border-gray-200">User</th>
                <th className="py-2 px-4 text-left border border-gray-200">Points</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((user, index) => (
                <tr key={user.id} className="border-b">
                  <td className="py-2 px-4 border border-gray-200">{index + 1}</td>
                  <td className="py-2 px-4 border border-gray-200">{user.username}</td>
                  <td className="py-2 px-4 border border-gray-200">{user.points}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Visual Statistics */}
          <div className="bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Top 5 Performers</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={top5} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="username" stroke="#4a5568" />
                <YAxis stroke="#4a5568" />
                <Tooltip />
                <Bar dataKey="points" fill="#3182ce" />
              </BarChart>
            </ResponsiveContainer>

            <h2 className="text-lg font-semibold text-gray-800 mt-6 mb-2">Performance Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={top5}>
                <XAxis dataKey="username" stroke="#4a5568" />
                <YAxis stroke="#4a5568" />
                <Tooltip />
                <Line type="monotone" dataKey="points" stroke="#2b6cb0" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p className="text-gray-500">No rankings available.</p>
      )}
    </div>
  );
};

export default Leaderboard;
