
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet } from 'lucide-react';
import { useAppContext } from '@/app/context/AppContext';

const ConnectWalletModal = () => {
  const { isConnectModalOpen, setConnectModalOpen } = useAppContext();

  return (
    <AnimatePresence>
      {isConnectModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={() => setConnectModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800/80 border border-blue-500/20 rounded-2xl shadow-2xl w-full max-w-md text-center p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button 
              whileHover={{ scale: 1.2, rotate: 90 }}
              onClick={() => setConnectModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </motion.button>
            <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
                className="mx-auto w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-blue-500"
              >
                <Wallet className="w-10 h-10 text-blue-400" />
              </motion.div>
            <h3 className="text-2xl font-bold text-center mt-6 mb-2">Connect Wallet</h3>
            <p className="text-center text-gray-400 mb-8">Please connect your wallet to access the dashboard and all features.</p>
            <div className="flex justify-center">
              <w3m-button />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConnectWalletModal;
