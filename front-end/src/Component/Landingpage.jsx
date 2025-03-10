import React,{ useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    { src: '/images/narendramodi.jpg', name: "Narendra Modi", info: "Prime Minister of India" },
    { src: '/images/rahul.jpg', name: "Rahul Gandhi", info: "Leader of Congress Party" },
    { src: '/images/kejriwal.jpg', name: "Arvind Kejriwal", info: "Leader of AAP" },
    { src: '/images/mamta.jpg', name: "Mamta Banerjee", info: "Leader of TMC" }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-opacity-30 backdrop-blur-md p-4 z-50 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Voting App</h1>
          <Link to="/login">
            <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-200">
              Login
            </button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center text-white mt-24">
        <h2 className="text-5xl font-extrabold drop-shadow-lg">Welcome to the Voting App</h2>
        <p className="mt-4 text-lg max-w-xl mx-auto">Secure, transparent, and efficient online voting for everyone.</p>
      </section>

      {/* Candidate Cards */}
      <div className="container mt-10 flex flex-wrap justify-center gap-8">
        {images.map((img, index) => (
          <div 
            key={index} 
            className="relative w-72 h-96 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-xl cursor-pointer overflow-hidden transform hover:scale-105 transition duration-300"
            onClick={() => setSelectedImage(img)}
          >
            <img src={img.src} alt={img.name} className="w-full h-full object-cover rounded-lg" />
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-3 opacity-0 hover:opacity-100 transition-opacity">
              <h3 className="text-lg font-semibold">{img.name}</h3>
              <p className="text-sm">{img.info}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pop-up on Click */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-[90%] text-center">
            <h2 className="text-2xl font-bold mb-4">{selectedImage.name}</h2>
            <img src={selectedImage.src} alt={selectedImage.name} className="rounded-md w-full h-[300px] object-cover mb-4" />
            <p className="text-gray-600 mb-4">{selectedImage.info}</p>
            <button 
              onClick={() => setSelectedImage(null)}
              className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-600 transition shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Link to="/register">
        <button className="bg-green-500 mt-10 text-white px-6 py-3 rounded-lg hover:bg-green-600 font-bold transform hover:scale-105 duration-200">
          Get Started
        </button>
      </Link>

      <section className="mt-12 py-12 px-3 bg-white bg-opacity-20 backdrop-blur-md rounded-xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">Why Choose Our Voting App?</h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
          <div className="p-6 shadow-lg bg-white bg-opacity-40 rounded-lg text-center hover:bg-blue-500 hover:scale-105 transition duration-300 group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Secure Voting</h3>
            <p className="text-gray-600 group-hover:text-white">Your vote is encrypted and protected with advanced security protocols.</p>
          </div>
          <div className="p-6 shadow-lg bg-white bg-opacity-40 rounded-lg text-center hover:bg-blue-500 hover:scale-105 transition duration-300 group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Easy to Use</h3>
            <p className="text-gray-600 group-hover:text-white">User-friendly interface for hassle-free voting experience.</p>
          </div>
          <div className="p-6 shadow-lg bg-white bg-opacity-40 rounded-lg text-center hover:bg-blue-500 hover:scale-105 transition duration-300 group">
            <h3 className="text-xl font-semibold mb-2 group-hover:text-white">Real-Time Results</h3>
            <p className="text-gray-600 group-hover:text-white">Get instant access to voting results as they are counted.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-10 w-full">
        <p>&copy; {new Date().getFullYear()} Voting App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
