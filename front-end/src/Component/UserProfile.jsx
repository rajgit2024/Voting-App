import React, { useContext, useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import { TbArrowBackUp } from "react-icons/tb";
import axios from "axios";
import { RoleContext } from "./CandidatesUi/RoleContext";

const UserProfile = () => {
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);
  const {logout}=useContext(RoleContext)

  useEffect(()=>{
    featchDetail();
  },[]);
  //Featch detail form backend
  const featchDetail=async()=>{
   const token=localStorage.getItem("token");
   if(token){
    try {
      const response=await axios.get("http://localhost:5000/api/user/profile",{
        headers:{
          Authorization:`Bearer ${token}`
        }
       })
       setUser(response.data);
       setLoading(false);
    } catch (error) {
      console.error("Error while sending response",error);
      setLoading(false);
    }
   } else{
    setLoading(false);
   }
   
  }
  
  if(!user){
    return <div>Please log in to view your profile.</div>
  }
  
  if(loading){
    return <div>loading...</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center pt-2">
      {/* Yellow Background Section */}
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
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="rounded-full border-4 border-blue-500 w-48 h-48"
            />
            <div className="absolute bottom-2 right-5 w-6 h-6 bg-green-700 border-2 border-white rounded-full"></div>
          </div>

          <div className="text-center mt-4">
            <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* User Details */}
        <div className="mt-6 px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Your Detail's
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Name */}
        <div className="flex justify-between items-center gap-2">
        <div className="w-[40%] flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-900 rounded-full">
          <p className="p-2 font-medium w-1/3">Name</p>
          </div>
          <div className="w-2/3 ">
          <p className="text-gray-800 bg-white p-2  shadow-[inset_4px_2px_8px_rgba(0,0,0,0.2)] rounded-full">
          {user.name}
          </p>
        </div>
       </div>

    {/* Age */}
    <div className="flex justify-between items-center gap-2">
    <div className="w-[40%] flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-900 rounded-full">
      <p className="p-2 font-medium w-1/3">Age</p>
      </div>
      <div className="w-2/3">
      <p className="text-gray-800 bg-white p-2  shadow-[inset_4px_2px_8px_rgba(0,0,0,0.2)] rounded-full">
          {user.age}
        </p>
      </div>
    </div>

    {/* Email */}
    <div className="flex justify-between items-center gap-2">
    <div className="w-[40%] flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-900 rounded-full">
      <p className="p-2 font-medium w-1/3">Email</p>
      </div>
      <div className="w-2/3">
      <p className="text-gray-800 bg-white p-2  shadow-[inset_4px_2px_8px_rgba(0,0,0,0.2)] rounded-full">
          {user.email}
        </p>
      </div>
    </div>

    {/* Phone */}
    <div className="flex justify-between items-center gap-2">
    <div className="w-[40%] flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-900 rounded-full">
      <p className="p-2 font-medium w-1/3">Phone</p>
      </div>
      <div className="w-2/3">
        <p className="text-gray-800 bg-white p-2  shadow-[inset_4px_2px_8px_rgba(0,0,0,0.2)] rounded-full">
          {user.mobile}
        </p>
      </div>
    </div>

    {/* Address */}
    <div className="flex justify-between items-center gap-2">
    <div className="w-[40%] flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-900 rounded-full">
      <p className=" p-2 font-medium w-1/3">Address</p>
      </div>
      <div className="w-2/3">
      <p className="text-gray-800 bg-white p-2  shadow-[inset_4px_2px_8px_rgba(0,0,0,0.2)] rounded-full">
         {user.address}
        </p>
      </div>
    </div>

    {/* Aadhar Number */}
    <div className="flex justify-between items-center gap-2">
      <div className="w-[40%] flex items-center justify-center text-white bg-gradient-to-r from-blue-500 to-blue-900 rounded-full">
      <p className=" font-medium p-2 flex-">Aadhar Number</p>
      </div>
      <div className="w-2/3">
      <p className="text-gray-800 bg-white p-2  shadow-[inset_4px_2px_8px_rgba(0,0,0,0.2)] rounded-full">
         {user.adharcardnumber}
        </p>
      </div>
    </div>
  </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex space-x-4 px-8 pb-8 justify-center">
          <button className="bg-blue-500 text-white px-6 py-2 shadow-md hover:bg-blue-600 rounded-full font-semibold"  >
            Update password
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-red-600 font-semibold" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
