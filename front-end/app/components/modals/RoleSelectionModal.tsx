
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Briefcase } from 'lucide-react';
import { useAppContext } from '@/app/context/AppContext';

const RoleSelectionModal = () => {
  const { isRoleModalOpen, setRoleModalOpen, handleRoleSelect } = useAppContext();

  return (
    <AnimatePresence>
      {isRoleModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={() => setRoleModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800/80 border border-blue-500/20 rounded-2xl shadow-2xl w-full max-w-2xl text-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 90 }}
              onClick={() => setRoleModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </motion.button>
            <h3 className="text-3xl font-bold text-center mb-8">Choose Your Role</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <RoleButton role="Landowner" icon={<Home size={48} />} onSelect={handleRoleSelect} color="blue" />
              <RoleButton role="Buyer / Investor" icon={<Briefcase size={48} />} onSelect={handleRoleSelect} color="purple" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RoleButton = ({ role, icon, onSelect, color }: { role: string, icon: React.ReactNode, onSelect: (role: string) => void, color: string }) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -5, boxShadow: `0 0 30px rgba(${color === 'blue' ? '59, 130, 246' : '139, 92, 246'}, 0.5)` }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onSelect(role.split(' ')[0])}
    className={`flex flex-col items-center justify-center p-8 bg-gray-700/50 rounded-xl border-2 border-transparent hover:border-${color}-500 transition-all duration-300`}
  >
    <div className={`text-${color}-400 mb-4`}>{icon}</div>
    <span className="text-xl font-semibold">{role}</span>
  </motion.button>
);

export default RoleSelectionModal;
