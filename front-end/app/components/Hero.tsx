// components/Hero.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Globe as Globe2, Shield, Lock, Users, Home, Database, ArrowRight, Play } from 'lucide-react';

import { useAppContext } from '@/app/context/AppContext';

const Hero: React.FC = () => {
  const { handleGetStarted } = useAppContext();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 80%, #3B82F6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8B5CF6 0%, transparent 50%)",
              "radial-gradient(circle at 40% 40%, #06B6D4 0%, transparent 50%), radial-gradient(circle at 60% 80%, #3B82F6 0%, transparent 50%)",
              "radial-gradient(circle at 80% 80%, #8B5CF6 0%, transparent 50%), radial-gradient(circle at 20% 20%, #06B6D4 0%, transparent 50%)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-8"
          >
            <Globe2 className="w-20 h-20 text-blue-400" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            DREARL
          </h1>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
            Revolutionizing Real Estate with Blockchain
          </h2>
          
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mb-8 text-lg sm:text-xl text-gray-300">
            <span className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-blue-400" />
              Transparent
            </span>
            <span className="text-blue-400 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-purple-400" />
              Secure
            </span>
            <span className="text-purple-400 hidden sm:inline">•</span>
            <span className="flex items-center gap-2">
              <Users className="w-6 h-6 text-cyan-400" />
              Decentralized
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 mb-12"
          >
            <motion.button
              onClick={handleGetStarted}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 sm:px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-6 sm:px-8 py-4 border-2 border-cyan-400 rounded-full text-lg sm:text-xl font-semibold flex items-center justify-center gap-3 hover:bg-cyan-400 hover:text-gray-900 transition-all duration-300"
            >
              <Play className="w-5 h-5" />
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content - Property Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-blue-400/30 shadow-2xl shadow-blue-400/20"
            >
              <img
                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Futuristic Property"
                className="w-full h-80 object-cover rounded-2xl mb-6"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">Modern Villa</span>
                  <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full text-sm font-semibold">
                    Verified
                  </span>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <span className="flex items-center gap-2">
                    <Home className="w-5 h-5" />
                    4 Beds
                  </span>
                  <span className="flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    On-Chain
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* Floating elements around the image */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;