// components/Features.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, FileText, CreditCard, Shield, Server, Smartphone } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Comprehensive blockchain-powered real estate solutions for the modern world
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Layers,
              title: "Decentralized Registry",
              description: "Distributed property database with no single point of failure",
              color: "from-blue-500 to-cyan-500"
            },
            {
              icon: FileText,
              title: "Smart Contracts",
              description: "Automated contract execution with built-in escrow functionality",
              color: "from-cyan-500 to-green-500"
            },
            {
              icon: CreditCard,
              title: "Rental Management",
              description: "Streamlined rental payments and tenant management system",
              color: "from-green-500 to-yellow-500"
            },
            {
              icon: Shield,
              title: "Escrow Services",
              description: "Secure fund holding until all transaction conditions are met",
              color: "from-yellow-500 to-orange-500"
            },
            {
              icon: Server,
              title: "Document Storage",
              description: "IPFS-based secure storage for all property documentation",
              color: "from-orange-500 to-red-500"
            },
            {
              icon: Smartphone,
              title: "Mobile Access",
              description: "Full-featured mobile app for on-the-go property management",
              color: "from-red-500 to-purple-500"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group"
            >
              <div className="h-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 border border-gray-700 group-hover:border-cyan-400 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-400/20">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="mb-6"
                >
                  <div className={`inline-block p-4 bg-gradient-to-br ${feature.color} rounded-2xl group-hover:shadow-lg transition-all duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;