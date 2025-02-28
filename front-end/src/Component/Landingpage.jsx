import React, { useState } from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";
const LandingPage = () => {

  const [selectedImage,setSelectedImage]=useState(null);
  const images=[
    {
      src:'/images/narendramodi.jpg',
      name:"Narendra Modi",
      info:"Prime minister of india"
    },
    {
      src:'/images/rahul.jpg',
      name:"Rahul Gandhi",
      info:"Leader Candidate of Congress Party"
    },
    {
      src: '/images/kejriwal.jpg',
      name:"Arvind Kejriwal",
      info:"Leader Candidate of Aam Admi Party"
    },
    {
      src: '/images/mamta.jpg',
      name:"Mamta Banerjee",
      info:"Leader Candidate of TMC"
    }
  ]
 
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sticky Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">Voting App</h1>
          <div className="space-x-4">
            <Link to="/login">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Login
           </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center pt-24 px-4 md:px-0">
        <div className="  w-full mb-2 flex items-center flex-col py-5">
        <h2 className="text-4xl font-bold font-poppins text-gray-800 mb-4">Welcome to the Voting App</h2>
        <p className="text-black text-lg mb-6 max-w-2xl w-full leading-none font-poppins">
          A secure and easy-to-use online voting platform. Participate in elections and make your vote count from anywhere.
        </p>
        </div>
      <div className="container flex flex-col sm:flex-row w-[80%] gap-8 justify-center">
      {images.map((img, index) => (
        <motion.div 
          key={index} 
          className="sm:w-[45%] w-full relative"
          whileHover={{ scale: 1.10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          onClick={() => setSelectedImage(img)}
        >
          <img 
            src={img.src} 
            alt={img.name} 
            className="rounded-md w-full h-[300px] object-cover cursor-pointer"
          />

          {/* Pop-up on Hover */}
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center p-2 opacity-0 hover:opacity-100 transition-opacity rounded-b-md">
            <h3 className="text-lg font-semibold">{img.name}</h3>
            <p className="text-sm">{img.info}</p>
          </div>
        </motion.div>
      ))}
      {/* Pop-up on Click */}
      {selectedImage && (
        <div className="fixed top-10 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-[90%] text-center">
            <h2 className="text-2xl font-bold mb-4">{selectedImage.name}</h2>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.name} 
              className="rounded-md w-full h-[300px] object-cover mb-4"
            />
            <p className="text-gray-600 mb-4">{selectedImage.info}</p>
            <button 
              onClick={() => setSelectedImage(null)} 
              className="bg-blue-500 text-white px-4 py-1 rounded-[25%] hover:bg-blue-600 transition shadow-lg">
              Close
            </button>
          </div>
        </div>
      )}
        </div>
       
        <Link to="/register">
          <button className="bg-green-500 mt-5 text-white px-6 py-3 rounded-[35%] hover:bg-green-600">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="mt-12 bg-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
          <div className="p-6 shadow-lg rounded-lg border text-center hover:bg-blue-500 duration-200 hover:p-8 group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Secure Voting</h3>
            <p className="text-gray-600 group-hover:text-white">Your vote is encrypted and protected with advanced security protocols.</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg border text-center hover:bg-blue-500 duration-200 hover:p-8 group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Easy to Use</h3>
            <p className="text-gray-600 group-hover:text-white">User-friendly interface for hassle-free voting experience.</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg border text-center hover:bg-blue-500 duration-200 hover:p-8 group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Real-Time Results</h3>
            <p className="text-gray-600 group-hover:text-white">Get instant access to voting results as they are counted.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p>&copy; {new Date().getFullYear()} Voting App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
