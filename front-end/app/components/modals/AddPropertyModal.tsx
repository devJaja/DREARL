
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, MapPin, DollarSign, Hash, Image as ImageIcon, Building, Bath, Bed } from 'lucide-react';
import { useAppContext } from '@/app/context/AppContext';

const AddPropertyModal = () => {
  const { isAddPropertyModalOpen, setAddPropertyModalOpen } = useAppContext();
  const [assetType, setAssetType] = useState('Property');
  const [formData, setFormData] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validate = () => {
    const newErrors: any = {};
    const requiredFields = assetType === 'Land'
      ? ['numberOfPlots', 'titleNumber', 'state', 'lga', 'city', 'pricePerPlot', 'coFoCID']
      : ['name', 'landIndex', 'numberOfRooms', 'numberOfBathrooms', 'price'];

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
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      const { imageCID, ...rest } = formData;
      const newAsset = {
        id: Date.now(),
        type: assetType,
        isVerified: false,
        forSale: true,
        owner: userData.details.fullName,
        ...rest,
      };

      const existingAssets = JSON.parse(localStorage.getItem('assets') || '[]');
      localStorage.setItem('assets', JSON.stringify([...existingAssets, newAsset]));
      setAddPropertyModalOpen(false);
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageCID: reader.result as string });
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderInput = (name: string, placeholder: string, icon: React.ReactNode, type = 'text') => (
    <div className="mb-4">
      <div className="relative">
        <motion.input
          animate={errors[name] ? { x: [-3, 3, -3, 3, 0] } : {}}
          transition={{ duration: 0.3 }}
          type={type}
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

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <AnimatePresence>
      {isAddPropertyModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-center justify-center p-4"
          onClick={() => setAddPropertyModalOpen(false)}
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
                onClick={() => setAddPropertyModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </motion.button>
              <h3 className="text-3xl font-bold text-center mb-8">Add New {assetType}</h3>

              <div className="flex justify-center mb-8">
                <div className="flex items-center bg-gray-700/50 rounded-full p-1">
                  <button type="button" onClick={() => setAssetType('Property')} className={`px-6 py-2 rounded-full transition-colors ${assetType === 'Property' ? 'bg-blue-600' : ''}`}>Property</button>
                  <button type="button" onClick={() => setAssetType('Land')} className={`px-6 py-2 rounded-full transition-colors ${assetType === 'Land' ? 'bg-blue-600' : ''}`}>Land</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                {assetType === 'Land' ? (
                  <>
                    {renderInput('numberOfPlots', 'Number of Plots', <Hash />, 'number')}
                    {renderInput('titleNumber', 'Title Number', <Hash />, 'number')}
                    {renderInput('state', 'State', <MapPin />)}
                    {renderInput('lga', 'LGA', <MapPin />)}
                    {renderInput('city', 'City', <MapPin />)}
                    {renderInput('pricePerPlot', 'Price Per Plot', <DollarSign />, 'number')}
                    {renderInput('coFoCID', 'Certificate of Occupancy CID', <Home />)}
                  </>
                ) : (
                  <>
                    {renderInput('name', 'Property Name', <Home />)}
                    {renderInput('landIndex', 'Land Index', <Hash />, 'number')}
                    {renderInput('numberOfRooms', 'Number of Rooms', <Bed />, 'number')}
                    {renderInput('numberOfBathrooms', 'Number of Bathrooms', <Bath />, 'number')}
                    {renderInput('price', 'Price', <DollarSign />, 'number')}
                  </>
                )}
              </div>

              <div className="mb-4">
                <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500 transition-all">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={handleFileChange} />
                  <div className="flex flex-col items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-4" />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-500 mb-2" />
                    )}
                    <p className="text-gray-400">{imagePreview ? 'Change Image' : 'Click to upload an image'}</p>
                  </div>
                </div>
                {errors.imageCID && <p className="text-red-500 text-sm mt-1 ml-2">{errors.imageCID}</p>}
              </div>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold text-lg"
              >
                Add Asset
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddPropertyModal;
