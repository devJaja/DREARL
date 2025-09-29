// components/Footer.tsx
'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Globe as Globe2, Twitter, Linkedin, Send } from 'lucide-react';

import { useRouter } from 'next/navigation';

const Footer: React.FC = () => {
  const router = useRouter();

  const scrollToSection = (sectionId: string) => {
    router.push(`/#${sectionId}`);
  };
  return (
    <footer className="py-16 px-6 bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <img src="/DREARL-LOGO.png" alt="DREARL Logo" className="h-12 w-auto" />
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                DREARL
              </h3>
            </div>
            <p className="text-gray-300 leading-relaxed max-w-md">
              Revolutionizing real estate across Africa through blockchain technology, 
              creating transparent and secure property ownership solutions.
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { name: "About", id: "about" },
                { name: "Workflow", id: "workflow" },
                { name: "Contact", id: "contact" }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 DREARL. All rights reserved.
          </p>
          <div className="flex gap-4">
            {[
              { icon: Twitter, color: "hover:text-blue-400" },
              { icon: Linkedin, color: "hover:text-blue-500" },
              { icon: Send, color: "hover:text-cyan-400" }
            ].map((social, index) => (
              <motion.a
                key={index}
                whileHover={{ scale: 1.2, y: -2 }}
                href="#"
                className={`text-gray-400 ${social.color} transition-all duration-300`}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;