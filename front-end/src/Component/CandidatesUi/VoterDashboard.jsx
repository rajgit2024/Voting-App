import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";

const VoterDashboard = () => {
  const { role, isAuthenticated, logout } = useContext(RoleContext);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [messages, setMessages] = useState({ success: "", error: "" });
  const navigate = useNavigate();

  // Initial data fetch and role verification
  useEffect(() => {
    if (!isAuthenticated || role !== "voter") {
      navigate("/unauthorized"); // Redirect unauthorized users
    } else {
      fetchCandidates(); // Fetch candidates if authorized
    }
  }, [isAuthenticated, role, navigate]);

  // Fetch candidates from the server
  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/candidates/voter", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidates(response.data.data || []);
    } catch (error) {
      setMessages({
        error: error.response?.data?.message || "Failed to load candidates.",
        success: "",
      });
    }
  };

  // Handle the voting process
  const handleVote = async (candidateId) => {
    if (!isAuthenticated) {
      setMessages({ error: "Please log in to vote.", success: "" });
      return;
    }

    if (role !== "voter") {
      setMessages({ error: "Only voters are allowed to vote.", success: "" });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/votes/vote",
        { candidateId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.id === candidateId
            ? { ...candidate, vote_count: candidate.vote_count + 1 }
            : candidate
        )
      );
      setMessages({ success: response.data.message, error: "" });
      setHasVoted(true);
    } catch (error) {
      setMessages({
        error: error.response?.data?.message || "An error occurred while voting.",
        success: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Voter Dashboard</h1>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Content */}
      <div className="container mx-auto p-6">
        {messages.error && <p className="text-red-500 mb-4">{messages.error}</p>}
        {messages.success && <p className="text-green-500 mb-4">{messages.success}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300"
            >
              <h3 className="text-lg font-bold mb-2">{candidate.name}</h3>
              <p className="text-gray-600 mb-2">Party: {candidate.party}</p>
              <p className="text-gray-600 mb-2">Age: {candidate.age}</p>
              <p className="text-gray-600 mb-4">Votes: {candidate.vote_count}</p>
              <button
                onClick={() => handleVote(candidate.id)}
                disabled={hasVoted}
                className={`w-full py-2 px-4 rounded text-white ${
                  hasVoted
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
              >
                {hasVoted ? "Voted" : "Vote"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VoterDashboard;
