
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Home, Briefcase, MapPin, Wallet } from 'lucide-react';
import { useAppContext } from '@/app/context/AppContext';
import { useAccount } from 'wagmi';

const RegistrationModal = () => {
  const { isRegistrationModalOpen, setRegistrationModalOpen, role, handleRegistrationSuccess } = useAppContext();
  const { address } = useAccount();

  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (address) {
      setFormData((prev: any) => ({ ...prev, walletAddress: address }));
    }
  }, [address]);

  const validate = () => {
    const newErrors: any = {};
    const requiredFields = role === 'Landowner' 
      ? ['fullName', 'farmName', 'cropType', 'location']
      : ['fullName', 'companyName', 'location'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      handleRegistrationSuccess(formData);
    }
  };

  const renderInput = (name: string, placeholder: string, icon: React.ReactNode) => (
    <div className="mb-4">
      <div className="relative">
        <motion.input
          animate={errors[name] ? { x: [-3, 3, -3, 3, 0] } : {}}
          transition={{ duration: 0.3 }}
          type="text"
          name={name}
          placeholder={placeholder}
          value={formData[name] || ''}
          onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          className={`w-full p-4 pl-12 bg-gray-700/50 rounded-lg border transition-all duration-300 ${
            errors[name] ? 'border-red-500' : 'border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
          }`}
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
      </div>
      {errors[name] && <p className="text-red-500 text-sm mt-1 ml-2">{errors[name]}</p>}
    </div>
  );

  return (
    <AnimatePresence>
      {isRegistrationModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          onClick={() => setRegistrationModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800/80 border border-blue-500/20 rounded-2xl shadow-2xl w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit} className="p-8">
              <motion.button 
                type="button"
                whileHover={{ scale: 1.2, rotate: 90 }}
                onClick={() => setRegistrationModalOpen(false)} 
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>
              <h3 className="text-3xl font-bold text-center mb-8">Register as {role}</h3>
              
              {role === 'Landowner' ? (
                <>
                  {renderInput('fullName', 'Full Name', <User />)}
                  {renderInput('farmName', 'Farm / Land Name', <Home />)}
                  {renderInput('cropType', 'Crop Type / Property Type', <Briefcase />)}
                  {renderInput('location', 'Location', <MapPin />)}
                </>
              ) : (
                <>
                  {renderInput('fullName', 'Full Name', <User />)}
                  {renderInput('companyName', 'Company/Market Name', <Briefcase />)}
                  {renderInput('location', 'Location', <MapPin />)}
                </>
              )}

              <div className="relative mb-6">
                <input
                  type="text"
                  name="walletAddress"
                  placeholder="Wallet Address"
                  value={formData.walletAddress || ''}
                  readOnly
                  className="w-full p-4 pl-12 bg-gray-900 rounded-lg border border-transparent text-gray-400 cursor-not-allowed"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Wallet /></div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg"
              >
                Complete Registration
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RegistrationModal;
