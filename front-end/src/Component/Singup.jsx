import React,{useState} from 'react'
import { MdAddIcCall } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa";
import { FaOrcid } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { GiAges } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Singup = () => {

const [action,setAction]=useState("Sing Up");
const [message,setMessage]=useState({text:"",type:""});
const  navigate=useNavigate();
const [formData,setFormData]=useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    address: "",
    adharcardnumber: "",
    password: "",
    role:"voter" //Default role
})
const API_BASE_URL = process.env.REACT_APP_API_URL;

const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Form Validation
  const { name, age, email, mobile, address, adharcardnumber, password } = formData;
  const phoneRegex = /^[0-9]{10}$/;
  const aadhaarRegex = /^[0-9]{12}$/;

  if (!name || !age || !email || !adharcardnumber || !mobile || !address || !password) {
    setMessage({text:"Fill all the give field!",type:"error"});
    return;
  }
  if (!email.includes("@")) {
    setMessage({text:"Enter a valid email!",type:"error"});
    return;
  }
  if (!phoneRegex.test(mobile)) {
    setMessage({text:"Enter a valid number!",type:"error"});
    return;
  }
  if (age > 115 || age < 18) {
    setMessage({text:"Enter a valid age!",type:"error"});
    return;
  }
  if (password.length < 6) {
    setMessage({text:"The password must be more than 6 charactor or digit!",type:"error"});
    return;
  }
  if (!aadhaarRegex.test(adharcardnumber)) {
    setMessage({ text: "Enter a valid Aadhaar number (12 digits)!", type: "error" });
    return;
  }
  // Send Data to Backend
  try {
   const response=await axios.post(`${API_BASE_URL}/api/user/register`,formData);
  if (response.status===201) {
      setMessage({text:"Successfully register!",type:"success"});
      //Clear formData after register a user
      setFormData({
        name: "",
        age: "",
        email: "",
        mobile: "",
        address: "",
        adharcardnumber: "",
        password: "",
        role: "voter",
      });

      setTimeout(() => {
        navigate("/verify-email");
     }, 1000);     
    } 
  } catch (error) {
    console.error("Error details:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
      setMessage({ text: error.response.data.message || "Server error!", type: "error" });
    } else if (error.request) {
      console.error("Request details:", error.request);
      setMessage({ text: "No response from server!", type: "error" });
    } else {
      console.error("Error message:", error.message);
      setMessage({ text: "Something went wrong!", type: "error" });
    }
  }
};



const handleInput=(e)=>{
  const {name,value}=e.target;
  setFormData({...formData,[name]:value});
}
  
  return (
    <div className='container flex justify-center items-center flex-col w-[470px] m-auto bg-zinc-50 pb-[20px] mt-8 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500' >

      {/* For header (sing up) */}
     <div className="header flex justify-center flex-col items-center mt-[30px] w-[100%]">
        <div className="text text-[30px] font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-blue-500">{action}</div>
        <div className="underline w-[60px] h-[6px] bg-gradient-to-r from-black to-blue-500 rounded-md mb-[25px]"></div>
     </div>

     {/* For taking inputs */}
     <form action='/register' method='POST' className="inputs flex flex-col mb-7 gap-6" onSubmit={handleSubmit}>
      
      {/* input for taking name */}
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
        <IoPerson className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none' 
          name='name'
          type='text'
          value={formData.name}
          onChange={handleInput}
          placeholder='Enter name' 
          required/>
        </div>
       {/* input for age */}
       <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
        <GiAges className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none' 
          name='age'
          value={formData.age}
          type='number'
          onChange={handleInput}
          placeholder='Enter age' 
          required/>
        </div>
        {/* input for email */}
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
          <MdEmail className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none' 
          name='email'
          type='email'
           value={formData.email}
          onChange={handleInput}
          placeholder='Enter email' 
          required/>
        </div>
       {/* input for phone */}
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
        <MdAddIcCall className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none' 
          name='mobile'
          type='text'
          value={formData.mobile}
          onChange={handleInput}
          placeholder='Enter phone' 
          required/>
        </div>
        {/* input for address */}
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
        <FaAddressCard className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none'
          name='address' 
          type='text'
          value={formData.address}
          onChange={handleInput}
          placeholder='Enter address' 
          required/>
        </div>
        {/* input for adhar number */}
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
        <FaOrcid className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none' 
          name='adharcardnumber'
          type='text'
          value={formData.adharcardnumber}
          onChange={handleInput}
          placeholder='Enter aadhar number' 
          required/>
        </div>
        {/* input for password */}
        <div className="input flex items-center justify-center h-[80px] bg-[#eaeaea] w-[430px] border-r-4 gap-4 rounded-xl">
        <MdPassword className='text-[25px]'/>
          <input className='border-none bg-transparent h-[42px] w-[350px] p-2 text-[18px] outline-none'
          name='password'
           type='password'
           value={formData.password} 
           placeholder='Enter password'
           onChange={handleInput}
           required/>
          </div>

    {/* Submit buttons for sing up and login */}
      <button type="submit" className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-2 rounded-full text-white font-semibold cursor-pointer w-[25%]">
       Submit
   </button>
        </form>
     <a href="/" className='font-[20px] text-[14px]' >Already have an account? <span className='text-blue-700'>Login</span></a>
       
    </div>
    
  )
    }

export default Singup;