// components/Workflow.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Home, CheckCircle, Handshake, Database } from 'lucide-react';

const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="py-24 px-6 bg-gray-800/50 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience seamless property transactions through our revolutionary 4-step process
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Home,
              title: "List Property",
              description: "Upload property details with verified documentation and multimedia",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: CheckCircle,
              title: "Verify Ownership",
              description: "AI-powered verification system confirms legitimate ownership claims",
              color: "from-cyan-500 to-green-500"
            },
            {
              icon: Handshake,
              title: "Smart Contract",
              description: "Automated smart contracts facilitate secure peer-to-peer transactions",
              color: "from-green-500 to-purple-500"
            },
            {
              icon: Database,
              title: "Blockchain Record",
              description: "Immutable record stored permanently on the distributed blockchain network",
              color: "from-purple-500 to-blue-500"
            }
          ].map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 group-hover:border-purple-400 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-purple-400/20 h-full">
                <div className="text-center">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(139, 92, 246, 0.3)",
                        "0 0 40px rgba(139, 92, 246, 0.6)",
                        "0 0 20px rgba(139, 92, 246, 0.3)"
                      ]
                    }}
                    transition={{ 
                      boxShadow: { duration: 2, repeat: Infinity },
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.3 }
                    }}
                    className={`inline-block mb-6 p-6 bg-gradient-to-br ${step.color} rounded-2xl`}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="text-4xl font-bold text-purple-400 mb-3">0{index + 1}</div>
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
              
              {/* Connecting Line */}
              {index < 3 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.5 }}
                  viewport={{ once: true }}
                  className="hidden lg:block absolute top-1/2 -right-4 w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 transform -translate-y-1/2 z-10 rounded-full"
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;