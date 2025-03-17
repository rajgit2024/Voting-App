import React, { useContext, useEffect, useState } from "react";
import { IoPerson, IoAddCircle } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import axios from "axios";
import { RoleContext } from "./CandidatesUi/RoleContext";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const { logout } = useContext(RoleContext);
  const navigate = useNavigate();
  const API_BASE_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchDetail();
    } else {
      setLoading(false);
      navigate("/landing");
    }
  }, []);

  const fetchDetail = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(`https://voting-app-11.onrender.com/api/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
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

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profile_image", selectedImage);

    try {
      const response = await axios.post(
        `https://voting-app-11.onrender.com/api/user/upload-profile-image`,
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
      fetchDetail();
    } catch (error) {
      console.error("Error while uploading image:", error);
      alert("Failed to upload image");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-[90%] max-w-3xl p-6 backdrop-blur-lg bg-opacity-80">
        <div className="w-full bg-gradient-to-r from-blue-400 to-blue-700 flex items-center justify-between px-6 h-14 rounded-t-2xl shadow-md">
          <IoPerson className="text-2xl text-white" />
          <h1 className="text-lg font-semibold text-white">User Profile</h1>
          <TbArrowBackUp className="text-2xl text-white cursor-pointer hover:scale-110 transition" />
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="relative">
            <img
              src={
                user.profile_image
                  ? `${API_BASE_URL}${
                      user.profile_image
                    }?t=${new Date().getTime()}`
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="rounded-full border-4 border-blue-500 w-44 h-44 shadow-lg transition-transform hover:scale-105"
            />
            <IoAddCircle
              className="absolute bottom-0 right-0 text-blue-500 text-4xl cursor-pointer hover:text-blue-700 transition"
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
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-gray-600 text-sm">{user.email}</p>
          </div>
        </div>

        <div className="mt-6 px-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center underline decoration-blue-400">
            Your Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { label: "Name", value: user.name },
              { label: "Age", value: user.age },
              { label: "Email", value: user.email },
              { label: "Phone", value: user.mobile },
              { label: "Address", value: user.address },
              { label: "Aadhar Number", value: user.adharcardnumber },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <p className="font-medium text-gray-700">{label}:</p>
                <p className="text-gray-900 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 px-6 text-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 hover:scale-105 transition font-semibold"
            onClick={handleImageUpload}
          >
            Upload Image
          </button>
        </div>

        <div className="mt-6 flex space-x-4 px-6 pb-6 justify-center">
          <button
            className="bg-blue-500 text-white px-6 py-2 shadow-md hover:bg-blue-600 hover:scale-105 rounded-full font-semibold transition"
            onClick={() => navigate("/profile/password")}
          >
            Update Password
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 hover:scale-105 font-semibold transition"
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
