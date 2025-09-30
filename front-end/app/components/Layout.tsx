
'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import { usePathname } from 'next/navigation';
import { useAppContext } from '@/app/context/AppContext';
import AddPropertyModal from '@/app/components/modals/AddPropertyModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAddPropertyModalOpen } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
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
      // Navigate to the landing page and then scroll
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
        scrollY={scrollY} 
        scrollToSection={scrollToSection} 
      />
      {children}
      {isAddPropertyModalOpen && <AddPropertyModal />}
    </div>
  );
};

export default Layout;
