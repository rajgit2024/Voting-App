import React, { useContext, useEffect, useState } from "react";
import { IoPerson, IoAddCircle } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import axios from "axios";
import { RoleContext } from "./CandidatesUi/RoleContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [selectedImage, setSelectedImage] = useState(null);
  const { logout } = useContext(RoleContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDetail(); // Fetch user details if token exists
    } else {
      setLoading(false); // No token, stop loading
      navigate("/landing"); // Redirect to landing page
    }
  }, []);

  // Fetch user details from the backend
  const fetchDetail = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data); // Ensure updated data is set
      } catch (error) {
        console.error("Error while fetching profile:", error);
        localStorage.removeItem("token");
        navigate("/");
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      navigate("/");
    }
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  // Handle Image Upload
  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profile_image", selectedImage); // Must match field name in multer

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/upload-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile image uploaded successfully!");
      setSelectedImage(null);
      fetchDetail(); // Refresh profile after upload
    } catch (error) {
      console.error("Error while uploading image:", error);
      alert("Failed to upload image");
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading spinner
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 min-h-screen flex justify-center items-center pt-2">
      <div className="bg-[#fffcc9] shadow-lg rounded-lg w-[90%] max-w-4xl">
        {/* Header */}
        <div className="w-full bg-gradient-to-r from-blue-300 to-blue-800 flex items-center justify-between px-4 h-12 rounded-t-xl">
          <IoPerson className="text-[25px] text-white" />
          <h1 className="text-[20px] font-bold text-white">Your Profile</h1>
          <TbArrowBackUp className="text-[25px] text-white" />
        </div>

        {/* Profile Header */}
        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <img
              src={
                user.profile_image
                  ? `http://localhost:5000${
                      user.profile_image
                    }?t=${new Date().getTime()}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="rounded-full border-4 border-blue-500 w-48 h-48"
            />
            <IoAddCircle
              className="absolute bottom-0 right-0 text-blue-500 text-4xl cursor-pointer hover:text-blue-700"
              onClick={() => document.getElementById("imageInput").click()}
            />
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-6 px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Your Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-medium">Name:</p>
              <p className="text-gray-800">{user.name}</p>
            </div>
            <div>
              <p className="font-medium">Age:</p>
              <p className="text-gray-800">{user.age}</p>
            </div>
            <div>
              <p className="font-medium">Email:</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            <div>
              <p className="font-medium">Phone:</p>
              <p className="text-gray-800">{user.mobile}</p>
            </div>
            <div>
              <p className="font-medium">Address:</p>
              <p className="text-gray-800">{user.address}</p>
            </div>
            <div>
              <p className="font-medium">Aadhar Number:</p>
              <p className="text-gray-800">{user.adharcardnumber}</p>
            </div>
          </div>
        </div>

        {/* Image Upload Button */}
        <div className="mt-6 px-8 pb-8 text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 font-semibold"
            onClick={handleImageUpload}
          >
            Upload Image
          </button>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4 px-8 pb-8 justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 shadow-md hover:bg-blue-600 rounded-full font-semibold"
            onClick={() => navigate("/profile/password")}
          >
            Update Password
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 font-semibold"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
