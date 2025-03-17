import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { RoleContext } from "./RoleContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineMenuOpen } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

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
  
  // Sort and get top 3 candidates by vote count in descending order
   const topCandidates = [...candidates]
  .sort((a, b) => b.vote_count - a.vote_count)
  .slice(0, 3);

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
      const response = await axios.get(`https://voting-app-11.onrender.com/api/candidates/voter`, {
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
        `https://voting-app-11.onrender.com/api/votes/vote`,
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

  <div className="min-h-screen  overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
  {/* Navbar */}
  <nav className="fixed top-0 left-0 right-0 bg-opacity-30 backdrop-blur-md p-4 z-50 text-white shadow-lg">
    <div className="container mx-auto flex justify-between items-center p-4">
      <h1 className="text-4xl font-extrabold drop-shadow-lg">Voter Dashboard</h1>
      {/* Desktop Menu */}
      <ul className="hidden md:flex space-x-4">
       
        <li>
          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-200"
          >
            Profile
          </button>
        </li>
        <li>
          <button
            onClick={() => navigate("/disclaimer")}
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-200"
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
    className={`fixed top-0 right-0 h-full bg-white bg-opacity-30 backdrop-blur-md  text-white shadow-lg transform ${
      isSliderOpen ? "translate-x-0" : "translate-x-full"
    } transition-transform duration-300 z-50 w-64`}
  >
    <div className="p-4 ">
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
    <div className="container mx-auto pt-32 px-4 flex flex-col lg:flex-row gap-6">
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
        
          {/* Stylish Separation for Party, Age, and Votes */}
          <div className="flex justify-around items-center border border-gray-300 rounded-md p-3 mt-4 bg-gray-100">
            <div className="text-center px-4">
              <h3 className="text-gray-600 font-semibold">Party</h3>
              <p className="text-black">{candidate.party}</p>
            </div>
            <div className="border-l border-gray-400 h-full"></div>
            <div className="text-center px-4">
              <h3 className="text-gray-600 font-semibold">Age</h3>
              <p className="text-black">{candidate.age}</p>
            </div>
            <div className="border-l border-gray-400 h-full"></div>
            <div className="text-center px-4">
              <h3 className="text-gray-600 font-semibold">Votes</h3>
              <p className="text-black">{candidate.vote_count}</p>
            </div>
          </div>
        
          <button
            onClick={() => handleVote(candidate.id)}
            disabled={hasVoted}
            className={`w-full py-2 px-4 rounded text-white mt-4 ${
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
       {/* Vertical Line */}
    <div className="border-r-2 border-gray-300"></div>

     {/* Top Candidates - 25% Width  and 70% height*/}
    {/* Right-Side Section - Top Candidates & Pie Chart */}

<div className="w-full lg:w-1/4 flex flex-col h-[100%]">
  {/* Top Candidates - 65% Height */}
  <div className="h-[60%] bg-white rounded-lg shadow-md p-4 overflow-auto">
    <h2 className="text-2xl font-bold mb-4 text-center">Top Candidates</h2>
    <div className="space-y-4">
      {topCandidates.map((candidate) => (
        <div
          key={candidate.id}
          className="bg-gray-100 rounded-lg shadow p-4 transform hover:scale-105 transition duration-300"
        >
          <h2 className="text-xl font-bold text-center">{candidate.name}</h2>
          <h3 className="text-gray-600 text-center">
            <span className="font-semibold">Party:</span> {candidate.party}
          </h3>
          <h3 className="text-gray-600 text-center">
            <span className="font-semibold">Age:</span> {candidate.age}
          </h3>
        </div>
      ))}
    </div>
  </div>

  {/* Pie Chart - 35% Height */}
  <div className="min-h-[40%] flex flex-col items-center justify-center mt-4 bg-white rounded-lg shadow-md p-4">
    <h2 className="text-2xl font-bold mb-4 text-center">Vote Distribution</h2>
    <PieChart width={250} height={350}>
      <Pie
        data={candidates}
        dataKey="vote_count"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {candidates.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </div>
</div>

    </div>
    
    </div>
  );
};

export default VoterDashboard;
