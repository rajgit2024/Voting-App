import axios from "axios";
import React, { useState } from "react";
import jwtDecode from "jwt-decode";
const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password don't match!");
      setSuccessMessage("");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const decodedToken = jwtDecode(token); // Decode JWT to get userId
      const userId = decodedToken.id;

      // Send the request to the backend
      const response = await axios.put(
        "http://localhost:5000/api/user/profile/password",
        {
          userId,
          currentPass: currentPassword,
          newPass: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle success and error responses
      if (response.status === 200) {
        setSuccessMessage(response.data.message || "Password updated successfully!");
        setErrorMessage("");
      } else {
        setErrorMessage(response.data.message || "An error occurred.");
        setSuccessMessage("");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while updating the password."
      );
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">Update Password</h1>
        {errorMessage && <p className="text-red-600 text-sm mb-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 text-sm mb-4">{successMessage}</p>}
        <form onSubmit={handlePasswordUpdate}>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              id="currentPassword"
              type="password"
              className="w-full p-3 border rounded-md shadow-inner outline-none"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              className="w-full p-3 border rounded-md shadow-inner"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white mb-2" htmlFor="confirmPassword">
              Confirm New Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full p-3 border rounded-md shadow-inner"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md shadow hover:bg-blue-600"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
