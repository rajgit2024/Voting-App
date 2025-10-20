"use client"

import { useContext, useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { RoleContext } from "./RoleContext"
import { LogOut, Plus, Edit2, Trash2, Users, AlertCircle, Save, X } from "lucide-react"
import API from "../../axios"

const AdminDashboard = () => {
  const { role, isAuthenticated, logout } = useContext(RoleContext)
  const [candidates, setCandidates] = useState([])
  const [formData, setFormData] = useState({ name: "", party: "", age: "" })
  const [editingCandidate, setEditingCandidate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    console.log("Role:", role, "isAuthenticated:", isAuthenticated)
    if (!isAuthenticated || role !== "admin") {
      navigate("/unauthorized")
    } else {
      fetchCandidates()
    }
  }, [isAuthenticated, role, navigate])

  const fetchCandidates = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get(`/candidates/admin`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      console.log("Fetched candidates:", response.data.data)
      setCandidates(response.data.data || [])
    } catch (error) {
      console.error("Error fetching candidates:", error)
      setError("Failed to load candidates. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const createCandidate = async (e) => {
    e.preventDefault()
    try {
      await API.post(`/candidates/create`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      fetchCandidates()
      setFormData({ name: "", party: "", age: "" })
    } catch (error) {
      console.error("Error creating candidate:", error)
    }
  }

  const updateCandidate = async (e) => {
    e.preventDefault()
    try {
      if (!editingCandidate) {
        console.error("No candidate selected for editing!")
        return
      }

      const { id } = editingCandidate
      const { name, party, age } = formData

      const token = localStorage.getItem("token")
      if (!token) throw new Error("User is not authenticated")

      const response = await axios.put(
        `/candidates/${id}`,
        { name, party, age },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      if (response.status === 200) {
        alert("Candidate updated successfully!")
        fetchCandidates()
        setEditingCandidate(null)
        setFormData({ name: "", party: "", age: "" })
      } else {
        alert("Failed to update candidate!")
      }
    } catch (error) {
      console.error("Error updating candidate:", error.response?.data || error.message)
      alert("Error updating candidate: " + (error.response?.data || error.message))
    }
  }

  const deleteCandidate = async (id) => {
    if (window.confirm("Are you sure you want to delete this candidate?")) {
      try {
        console.log("Deleting candidate with ID:", id)
        await API.delete(`/candidates/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        fetchCandidates()
      } catch (error) {
        console.error("Error deleting candidate:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Election Admin Dashboard</h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4">
                <h2 className="text-lg font-semibold flex items-center">
                  {editingCandidate ? (
                    <>
                      <Edit2 className="h-5 w-5 mr-2" />
                      Edit Candidate
                    </>
                  ) : (
                    <>
                      <Plus className="h-5 w-5 mr-2" />
                      Add New Candidate
                    </>
                  )}
                </h2>
              </div>
              <form onSubmit={editingCandidate ? updateCandidate : createCandidate} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter candidate name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Political Party</label>
                  <input
                    type="text"
                    name="party"
                    value={formData.party}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter party name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Enter age"
                    required
                  />
                </div>
                <div className="flex space-x-3 pt-2">
                  <button
                    type="submit"
                    className={`flex-1 flex justify-center items-center space-x-2 px-4 py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                      editingCandidate ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {editingCandidate ? (
                      <>
                        <Save className="h-4 w-4" />
                        <span>Update</span>
                      </>
                    ) : (
                      <>
                        <Plus className="h-4 w-4" />
                        <span>Add</span>
                      </>
                    )}
                  </button>
                  {editingCandidate && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCandidate(null)
                        setFormData({ name: "", party: "", age: "" })
                      }}
                      className="flex-1 flex justify-center items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200"
                    >
                      <X className="h-4 w-4" />
                      <span>Cancel</span>
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Candidates List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Registered Candidates
                </h2>
                <span className="bg-white text-blue-600 text-sm py-1 px-3 rounded-full font-medium">
                  {candidates.length} Total
                </span>
              </div>

              <div className="p-6">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-2 text-gray-600">Loading candidates...</p>
                  </div>
                ) : error ? (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <p className="text-red-700">{error}</p>
                  </div>
                ) : candidates.length > 0 ? (
                  <div className="grid gap-4">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{candidate.name}</h3>
                            <div className="mt-1 space-y-1">
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Party:</span>
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {candidate.party}
                                </span>
                              </p>
                              <p className="text-sm text-gray-600">
                                <span className="font-medium">Age:</span>
                                <span className="ml-2">{candidate.age} years</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex space-x-2 self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditingCandidate(candidate)
                                setFormData({
                                  name: candidate.name,
                                  party: candidate.party,
                                  age: candidate.age,
                                })
                              }}
                              className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                            >
                              <Edit2 className="h-4 w-4" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => deleteCandidate(candidate.id)}
                              className="flex items-center space-x-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md transition-colors duration-200"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <Users className="h-12 w-12 text-gray-400 mx-auto" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No candidates yet</h3>
                    <p className="mt-1 text-gray-500">Get started by adding a new candidate</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
