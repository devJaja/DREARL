// components/About.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            About DREARL
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We're building Africa's first comprehensive decentralized real estate platform, 
            combining blockchain technology with traditional property management to create 
            transparent, secure, and accessible real estate solutions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Mission & Vision */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Transparency",
                  description: "Every transaction recorded on immutable blockchain"
                },
                {
                  icon: Lock,
                  title: "Security",
                  description: "Advanced cryptographic protection for your assets"
                },
                {
                  icon: Users,
                  title: "Decentralization",
                  description: "Community-driven network with no single authority"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    className="mb-4 inline-block p-4 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl group-hover:shadow-lg group-hover:shadow-blue-400/30 transition-all duration-300"
                  >
                    <item.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Building Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern Real Estate"
                className="w-full h-96 object-cover rounded-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent rounded-3xl"></div>
              
              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-6 left-6 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4 border border-blue-400/30"
              >
                <div className="text-2xl font-bold text-blue-400">10K+</div>
                <div className="text-sm text-gray-300">Properties Listed</div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                className="absolute bottom-6 right-6 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-4 border border-purple-400/30"
              >
                <div className="text-2xl font-bold text-purple-400">$2B+</div>
                <div className="text-sm text-gray-300">Value Secured</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;