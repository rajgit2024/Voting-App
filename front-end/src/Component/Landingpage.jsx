"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const LandingPage = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const images = [
    { src: "/images/narendramodi.jpg", name: "Narendra Modi", info: "Prime Minister of India" },
    { src: "/images/rahul.jpg", name: "Rahul Gandhi", info: "Leader of Congress Party" },
    { src: "/images/kejriwal.jpg", name: "Arvind Kejriwal", info: "Leader of AAP" },
    { src: "/images/mamta.jpg", name: "Mamta Banerjee", info: "Leader of TMC" },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2 + 0.5,
        duration: 0.6,
      },
    }),
    hover: {
      scale: 1.05,
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-white bg-opacity-10"
              initial={{
                x: Math.random() * 100 - 50 + "%",
                y: Math.random() * 100 - 50 + "%",
                scale: Math.random() * 0.5 + 0.5,
              }}
              animate={{
                x: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
                y: [Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%", Math.random() * 100 - 50 + "%"],
              }}
              transition={{
                duration: Math.random() * 20 + 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                opacity: Math.random() * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 bg-opacity-30 backdrop-blur-md p-4 z-50 text-white shadow-lg"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1
            className="text-2xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Voting App
          </motion.h1>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 shadow-md">
                Login
              </button>
            </Link>
          </motion.div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="text-center text-white mt-24 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <motion.h2 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg" variants={itemVariants}>
          <span className="inline-block">Welcome to the</span>{" "}
          <motion.span
            className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-300"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Voting App
          </motion.span>
        </motion.h2>
        <motion.p className="mt-6 text-xl max-w-xl mx-auto leading-relaxed" variants={itemVariants}>
          Secure, transparent, and efficient online voting for everyone.
        </motion.p>
        <motion.div variants={itemVariants} className="mt-8">
          <motion.div
            className="inline-block relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/register">
              <button className="relative bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 py-4 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 z-10 overflow-hidden group">
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-400 z-0"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ type: "tween", duration: 0.4 }}
                />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Candidate Cards */}
      <motion.div
        className="container mt-16 flex flex-wrap justify-center gap-8 z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="relative w-72 h-96 p-4 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-xl cursor-pointer overflow-hidden"
            variants={cardVariants}
            custom={index}
            whileHover="hover"
            onClick={() => setSelectedImage(img)}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-70 transition-opacity duration-300"
              whileHover={{ opacity: 0.3 }}
            />
            <motion.img
              src={img.src}
              alt={img.name}
              className="w-full h-full object-cover rounded-lg"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "tween", duration: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-black bg-opacity-60 text-white text-center p-3"
              initial={{ y: "100%" }}
              whileHover={{ y: 0 }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold">{img.name}</h3>
              <p className="text-sm">{img.info}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      {/* Pop-up on Click */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="bg-white p-6 rounded-lg max-w-md w-[90%] text-center"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold mb-4">{selectedImage.name}</h2>
              <motion.img
                src={selectedImage.src}
                alt={selectedImage.name}
                className="rounded-md w-full h-[300px] object-cover mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <motion.p
                className="text-gray-600 mb-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {selectedImage.info}
              </motion.p>
              <motion.button
                onClick={() => setSelectedImage(null)}
                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <motion.section
        className="mt-20 py-12 px-3 bg-white bg-opacity-20 backdrop-blur-md rounded-xl text-center z-10 w-full max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-8 text-white"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Why Choose Our Voting App?
        </motion.h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
          {[
            {
              title: "Secure Voting",
              description: "Your vote is encrypted and protected with advanced security protocols.",
              icon: "🔒",
            },
            {
              title: "Easy to Use",
              description: "User-friendly interface for hassle-free voting experience.",
              icon: "👍",
            },
            {
              title: "Real-Time Results",
              description: "Get instant access to voting results as they are counted.",
              icon: "📊",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 shadow-lg bg-white bg-opacity-40 rounded-lg text-center"
              variants={featureVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              custom={index}
              viewport={{ once: true, amount: 0.6 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 + 0.3 }}
                viewport={{ once: true }}
                className="text-4xl mb-4"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="my-16 text-center z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.h3
          className="text-2xl font-bold text-white mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Ready to make your voice heard?
        </motion.h3>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/register">
            <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
              <span className="relative z-10">Register Now</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.4 }}
              />
            </button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 text-white text-center py-6 w-full mt-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Voting App. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            {["Facebook", "Twitter", "Instagram"].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

export default LandingPage
