import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const VoterDashboard = () => {
  const { role, isAuthenticated, logout } = useContext(RoleContext);
  const [candidates, setCandidates] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [messages, setMessages] = useState({ success: "", error: "" });
  const [isSliderOpen, setIsSliderOpen] = useState(false);
  const navigate = useNavigate();

  const images = [
    {
      src: "/images/narendramodi.jpg",
      name: "Narendra Modi",
    },
    {
      src: "/images/rahul.jpg",
      name: "Rahul Gandhi",
    },
    {
      src: "/images/kejriwal.jpg",
      name: "Arvind Kejriwal",
    },
    {
      src: "/images/mamta.jpg",
      name: "Mamta Banerjee",
    },
  ];

  useEffect(() => {
    if (!isAuthenticated || role !== "voter") {
      navigate("/unauthorized");
    } else {
      fetchCandidates();
    }
  }, [isAuthenticated, role, navigate]);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/candidates/voter", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Merge image data with candidates based on the name or a common identifier
      const mergedCandidates = response.data.data.map((candidate) => {
        const image = images.find((img) => img.name.toLowerCase()=== candidate.name.toLowerCase());
        return { ...candidate, src: image ? image.src : "/images/default.jpg" };
      });

      setCandidates(mergedCandidates);
    } catch (error) {
      setMessages({
        error: error.response?.data?.message || "Failed to load candidates.",
        success: "",
      });
    }
  };

  const handleVote = async (candidateId) => {
    const token = localStorage.getItem("token");

    if (!isAuthenticated || !token) {
      setMessages({ error: "Please log in to vote.", success: "" });
      return;
    }

    if (role !== "voter") {
      setMessages({ error: "Only voters are allowed to vote.", success: "" });
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      const response = await axios.post(
        "http://localhost:5000/api/votes/vote",
        { userId, candidateId },
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
  <nav className=" bg-gradient-to-r from-blue-700 to-blue-900 text-white">
    <div className="container mx-auto flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">Voter Dashboard</h1>
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
       
        <li>
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/disclaimer")}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Disclaimer
          </button>
        </li>
        <li>
          <button
            onClick={logout}
            className="bg-gradient-to-r from-red-500 to-red-800  px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </li>
      </ul>
      {/* Mobile Menu Toggle */}
      <button
        className="text-white md:hidden"
        onClick={() => setIsSliderOpen(true)} // Open slider
      >
        <MdOutlineMenuOpen className="text-[30px]"/>
      </button>
    </div>
  </nav>

  {/* Right-Side Slider for Mobile */}
  <div
    className={`fixed top-0 right-0 h-full bg-white shadow-lg transform ${
      isSliderOpen ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-300 z-50 w-64`}
  >
    <div className="p-4">
      <button
        className="text-red-500 font-bold text-lg"
        onClick={() => setIsSliderOpen(false)} // Close slider
      >
        <IoMdClose className="text-[25px] text-black"/>
      </button>
      <ul className="mt-8 space-y-4">
        <li>
          <button
            onClick={logout}
            className="w-full text-left bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setIsSliderOpen(false);
              navigate("/profile");
            }}
            className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => {
              setIsSliderOpen(false);
              navigate("/disclaimer");
            }}
            className="w-full text-left px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Disclaimer
          </button>
        </li>
      </ul>
    </div>
  </div>
  {/* Content */}
    <div className="container mx-auto p-6">
      <div className="lg:w-3/4 md:w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition duration-300 items-center"
          >
            <div className="flex justify-center items-center flex-col">
              <img
                src={candidate.src}
                alt={candidate.name}
                className="w-[200px] h-[200px] object-cover rounded-full mb-4"
              />
              <h2 className="text-lg font-bold mb-2">{candidate.name}</h2>
            </div>
            <h3 className="text-gray-600 mb-2 text-center">
              <span className="font-semibold">Party:</span> {candidate.party}
            </h3>
            <h3 className="text-gray-600 mb-2 text-center">
              <span className="font-semibold">Age:</span> {candidate.age}
            </h3>
            <h3 className="text-gray-600 mb-2 text-center">
              <span className="font-semibold">Votes:</span> {candidate.vote_count}
            </h3>
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
