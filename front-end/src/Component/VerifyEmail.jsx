import React from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Please Verify Your Email</h2>
        <p className="text-gray-600 mb-6">
          We have sent a verification link to your email. Please check your inbox and verify your account.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;