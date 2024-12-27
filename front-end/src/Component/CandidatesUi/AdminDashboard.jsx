import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RoleContext } from "./RoleContext";

const AdminDashboard = () => {
  const { role, isAuthenticated, logout } = useContext(RoleContext); // Access role and auth status
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({ name: "", party: "", age: "" });
  const [editingCandidate, setEditingCandidate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Role:", role, "isAuthenticated:", isAuthenticated);
    if (!isAuthenticated || role !== "admin") {
        navigate("/unauthorized"); // Redirect unauthorized users
    } else {
        fetchCandidates(); // Fetch candidates if authorized
    }
}, [isAuthenticated, role, navigate]); // Removed `candidates`



  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/candidates/admin", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Fetched candidates:", response.data.data);
      setCandidates(response.data.data || []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createCandidate = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/candidates/create",
        formData,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchCandidates();
      setFormData({ name: "", party: "", age: "" });
    } catch (error) {
      console.error("Error creating candidate:", error);
    }
  };

  
  const updateCandidate = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      if (!editingCandidate) {
        console.error("No candidate selected for editing!");
        return;
      }
  
      const { id } = editingCandidate; // Extract candidate ID
      const { name, party, age } = formData; // Extract updated data
  
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User is not authenticated");
  
      const response = await axios.put(
        `http://localhost:5000/api/candidates/${id}`,
        { name, party, age }, // Pass updated candidate data
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      if (response.status === 200) {
        alert("Candidate updated successfully!");
        fetchCandidates(); // Refresh the candidate list
        setEditingCandidate(null);
        setFormData({ name: "", party: "", age: "" });
      } else {
        alert("Failed to update candidate!");
      }
    } catch (error) {
      console.error("Error updating candidate:", error.response?.data || error.message);
      alert("Error updating candidate: " + (error.response?.data || error.message));
    }
  };
  


  const deleteCandidate = async (id) => {
    try {
      console.log("Deleting candidate with ID:", id);
      await axios.delete(`http://localhost:5000/api/candidates/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchCandidates();
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4 hover:bg-red-600"
      >
        Logout
      </button>

      <form onSubmit={editingCandidate ? updateCandidate : createCandidate} className="bg-gray-100 p-4 rounded shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">
          {editingCandidate ? "Edit Candidate" : "Add Candidate"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Party:</label>
          <input
            type="text"
            name="party"
            value={formData.party}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {editingCandidate ? "Update Candidate" : "Add Candidate"}
        </button>
        {editingCandidate && (
          <button
            type="button"
            onClick={() => {
              setEditingCandidate(null);
              setFormData({ name: "", party: "", age: "" });
            }}
            className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        )}
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Candidates</h2>
        {candidates.length > 0 ? (
          candidates.map((candidate) => (
            <div key={candidate.id} className="flex justify-between items-center bg-gray-100 p-4 rounded shadow-md mb-4">
              <div>
                <p className="font-bold">{candidate.name}</p>
                <p>Party: {candidate.party}</p>
                <p>Age: {candidate.age}</p>
              </div>
              <div>
                <button
                  onClick={() => {
                    setEditingCandidate(candidate);
                    setFormData({ name: candidate.name, party: candidate.party, age: candidate.age });
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteCandidate(candidate.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No candidates available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
