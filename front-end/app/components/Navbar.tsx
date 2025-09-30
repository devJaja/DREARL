// components/Navbar.tsx
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Globe as Globe2, Wallet, Menu, X, LayoutDashboard } from 'lucide-react';
import { useAccount } from "wagmi";


import { usePathname } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { isConnected } = useAccount();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    } else {
      router.push(`/#${sectionId}`);
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 
          ? 'bg-gray-900/95 backdrop-blur-lg border-b border-blue-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection('hero')}
          >
            <img src="/DREARL-LOGO.png" alt="DREARL Logo" className="h-8 w-auto sm:h-10" />
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              DREARL
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'About', id: 'about' },
              { name: 'Workflow', id: 'workflow' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <motion.button
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.button>
            ))}
            {isConnected && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/dashboard')}
                className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </motion.button>
            )}


          {/* Connect Wallet Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
            >
              <Wallet className="w-5 h-5" />
<w3m-button />            
</motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-800 border border-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-gray-700 mt-4">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'About', id: 'about' },
              { name: 'Workflow', id: 'workflow' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium py-2"
              >
                {item.name}
              </button>
            ))}
            {isConnected && (
              <button
                onClick={() => { router.push('/dashboard'); setIsMenuOpen(false); }}
                className="flex items-center gap-3 w-full text-left text-gray-300 hover:text-blue-400 transition-colors duration-300 font-medium py-2"
              >
                <LayoutDashboard size={20} />
                Dashboard
              </button>
            )}

               <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
            >
              <Wallet className="w-5 h-5" />
<w3m-button />            
</motion.button>
          </div>
        </motion.div>
      </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;