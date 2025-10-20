import axios from "axios";
import React, { useState, useContext } from "react";
import { MdPassword, MdEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import JwtDecode from "jwt-decode";
import API from "../axios";

const Login = () => {
  const [action] = useState("Login");
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await API.post("/user/login", formData);

      if (response.status === 200) {
        const { token } = response.data;

        if (!token) {
          setMessage({ text: "No token received. Please try again.", type: "error" });
          return;
        }

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Dispatch a custom event to notify RoleProvider
        window.dispatchEvent(new Event("tokenChanged"));

        // Decode token and redirect based on role
        const decodedToken = JwtDecode(token);
        const userRole = decodedToken.role;

        if (userRole === "voter") {
          navigate("/voter");
        } else if (userRole === "admin") {
          navigate("/admin");
        } else {
          setMessage({ text: "Unknown role. Contact support.", type: "error" });
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage({ text: error.response.data.message || "Login failed.", type: "error" });
      } else {
        setMessage({ text: "Network error. Please try again.", type: "error" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container flex justify-center items-center flex-col w-[470px] m-auto bg-zinc-50 pb-[20px] mt-8 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="header flex justify-center flex-col items-center mt-[30px] w-[100%]">
        <div className="text text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-blue-500">
          {action}
        </div>
        <div className="underline w-[60px] h-[6px] bg-gradient-to-r from-black to-blue-500 rounded-md mb-[25px]"></div>
      </div>
      {message.text && (
        <div
          className={`px-2 ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}
      <form
        action="/login"
        method="POST"
        className="inputs flex flex-col mb-7 gap-6"
        onSubmit={handleSubmit}
      >
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
          <MdEmail className="text-[25px] text-gray-700" />
          <input
            className="border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInput}
            placeholder="Enter email"
            autoComplete="email"
            required
          />
        </div>
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
          <MdPassword className="text-[25px] text-gray-700" />
          <input
            className="border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none"
            name="password"
            value={formData.password}
            type="password"
            placeholder="Enter password"
            onChange={handleInput}
            autoComplete="current-password"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-2 rounded-full text-white font-semibold cursor-pointer hover:scale-105 transition-transform"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <div className="flex justify-between">
        <h2 className="flex gap-1">
          <h3 className="font-[70px]">Don't have account?</h3>
          <a className="text-blue-800" href="/register">Click here</a>
        </h2>
        </div>
        </form>
    </div>
  );
};

export default Login;
