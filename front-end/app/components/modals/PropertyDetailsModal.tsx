
'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, DollarSign, Building, User, Calendar, Tag, CheckCircle, ShoppingCart } from 'lucide-react';

interface Property {
  id: number;
  name: string;
  location: string;
  type: string;
  price: number;
  image: string;
  owner: string;
}

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property | null;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ isOpen, onClose, property }) => {
  if (!isOpen || !property) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-lg z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-gray-800/80 border border-blue-500/20 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-white">{property.name}</h2>
                <motion.button type="button" whileHover={{ scale: 1.2, rotate: 90 }} onClick={onClose} className="text-gray-400 hover:text-white">
                  <X size={28} />
                </motion.button>
              </div>

              <img src={property.image} alt={property.name} className="w-full h-64 object-cover rounded-lg mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin size={20} className="text-blue-400" />
                  <span>Location: {property.location}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Building size={20} className="text-blue-400" />
                  <span>Type: {property.type}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <User size={20} className="text-blue-400" />
                  <span>Owner: {property.owner}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <DollarSign size={20} className="text-green-400" />
                  <span className="text-xl font-bold text-green-400">Price: ${property.price.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-gray-400 mb-8 leading-relaxed">
                This is a placeholder for a more detailed description of the property. 
                It would include features like number of bedrooms, bathrooms, square footage, 
                amenities, nearby facilities, and any unique selling points. 
                Blockchain integration ensures transparent ownership and transaction history.
              </p>

              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-8 py-3 bg-gray-600 hover:bg-gray-500 rounded-lg font-semibold"
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert(`Initiating purchase for ${property.name}`)}
                  className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold flex items-center gap-2 justify-center"
                >
                  <ShoppingCart size={20} /> Buy Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyDetailsModal;
