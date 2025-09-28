'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Briefcase, Plus, Search, X, MapPin, Building, Edit, Trash2 } from 'lucide-react';

const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      setUserData(JSON.parse(savedData));
    } else {
      router.push('/');
    }
  }, [router]);

  const [properties, setProperties] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<any>(null);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  // Form state
  const [propertyName, setPropertyName] = useState('');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyImage, setPropertyImage] = useState<string | null>(null);
  const [errors, setErrors] = useState({ propertyName: false, location: false, propertyType: false });

  useEffect(() => {
    const savedProperties = localStorage.getItem('properties');
    if (savedProperties) {
      setProperties(JSON.parse(savedProperties));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  const { role, details } = userData;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPropertyImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openModalForEdit = (property: any) => {
    setEditingProperty(property);
    setPropertyName(property.propertyName);
    setLocation(property.location);
    setPropertyType(property.propertyType);
    setPropertyImage(property.propertyImage);
    setIsModalOpen(true);
  };

  const openModalForNew = () => {
    setEditingProperty(null);
    setPropertyName('');
    setLocation('');
    setPropertyType('');
    setPropertyImage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProperty(null);
    setErrors({ propertyName: false, location: false, propertyType: false });
  };

  const validateForm = () => {
    const newErrors = {
      propertyName: propertyName === '',
      location: location === '',
      propertyType: propertyType === '',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleFormSubmit = () => {
    if (!validateForm()) {
      return;
    }

    const newProperty = { id: editingProperty ? editingProperty.id : Date.now(), propertyName, location, propertyType, propertyImage };

    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? newProperty : p));
    } else {
      setProperties([...properties, newProperty]);
    }
    closeModal();
  };

  const openDeleteModal = (property: any) => {
    setPropertyToDelete(property);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setPropertyToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    setProperties(properties.filter(p => p.id !== propertyToDelete.id));
    closeDeleteModal();
  };

  const inputVariants = (hasError: boolean) => ({
    rest: {
      borderColor: 'rgba(59, 130, 246, 0.2)',
      boxShadow: '0 0 0px rgba(59, 130, 246, 0)',
    },
    hover: {
      borderColor: 'rgba(59, 130, 246, 0.5)',
      boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
    },
    error: {
      borderColor: 'rgba(239, 68, 68, 1)',
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.3 },
    },
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold">Welcome, {details.fullName}</h1>
            <p className="text-lg sm:text-xl text-gray-400">Your personalized {role} dashboard.</p>
          </div>
          {role === 'Landowner' && (
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={openModalForNew}
              className="hidden sm:flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg"
            >
              <Plus /> Add Property
            </motion.button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <InfoCard title="Your Role" icon={<Briefcase />} value={role} />
          <InfoCard title="Location" icon={<MapPin />} value={details.location} />
          <InfoCard title="Wallet Address" icon={<Home />} value={userData.walletAddress} truncate />
        </div>

        {role === 'Landowner' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Your Properties</h2>
            {properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((prop) => (
                  <motion.div
                    key={prop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
                    className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-6 flex flex-col justify-between"
                  >
                    <div>
                      {prop.propertyImage && (
                        <img src={prop.propertyImage} alt={prop.propertyName} className="w-full h-32 object-cover rounded-lg mb-4" />
                      )}
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2"><Building size={20} /> {prop.propertyName}</h3>
                      <p className="text-gray-400 mb-2 flex items-center gap-2"><MapPin size={16} /> {prop.location}</p>
                      <p className="text-gray-400 mb-4 flex items-center gap-2"><Home size={16} /> {prop.propertyType}</p>
                    </div>
                    <div className="flex justify-end gap-4 mt-4">
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openModalForEdit(prop)} className="text-blue-400 hover:text-blue-300"><Edit /></motion.button>
                      <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => openDeleteModal(prop)} className="text-red-500 hover:text-red-400"><Trash2 /></motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-800/50 border border-dashed border-gray-600 rounded-2xl">
                <p className="text-gray-400">You haven't added any properties yet.</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={openModalForNew}
                  className="mt-4 flex items-center mx-auto gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold"
                >
                  <Plus /> Add Your First Property
                </motion.button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="bg-gray-800/80 backdrop-blur-lg border border-blue-500/20 rounded-2xl shadow-2xl w-full max-w-md"
            >
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{editingProperty ? 'Edit Property' : 'Add New Property'}</h2>
                  <motion.button whileHover={{ scale: 1.2, rotate: 90 }} onClick={closeModal}><X /></motion.button>
                </div>
                <div className="space-y-6">
                  <motion.input
                    type="text"
                    placeholder="Property Name"
                    value={propertyName}
                    onChange={(e) => setPropertyName(e.target.value)}
                    variants={inputVariants(errors.propertyName)}
                    initial="rest"
                    whileHover="hover"
                    animate={errors.propertyName ? 'error' : 'rest'}
                    className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border-2 focus:outline-none focus:ring-2 ring-blue-500"
                  />
                  <motion.input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    variants={inputVariants(errors.location)}
                    initial="rest"
                    whileHover="hover"
                    animate={errors.location ? 'error' : 'rest'}
                    className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border-2 focus:outline-none focus:ring-2 ring-blue-500"
                  />
                  <motion.input
                    type="text"
                    placeholder="Property Type"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    variants={inputVariants(errors.propertyType)}
                    initial="rest"
                    whileHover="hover"
                    animate={errors.propertyType ? 'error' : 'rest'}
                    className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border-2 focus:outline-none focus:ring-2 ring-blue-500"
                  />
                  <div className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border-2 focus:outline-none focus:ring-2 ring-blue-500">
                    <motion.input
                      type="file"
                      onChange={(e) => handleImageUpload(e)}
                      className="w-full"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={closeModal} className="px-6 py-2 bg-gray-600 rounded-lg">Cancel</motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFormSubmit}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold"
                  >
                    {editingProperty ? 'Save Changes' : 'Add Property'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-sm text-center"
            >
              <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
              <p className="text-gray-400 mb-8">Do you really want to delete this property? This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={closeDeleteModal} className="px-6 py-2 bg-gray-600 rounded-lg">Cancel</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={confirmDelete} className="px-6 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold">Confirm Delete</motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoCard = ({ icon, title, value, truncate = false }: { icon: React.ReactNode, title: string, value: string, truncate?: boolean }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
    className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-6"
  >
    <div className="flex items-center gap-4 mb-2">
      <div className="p-2 bg-gray-700/50 rounded-full">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
    </div>
    <p className={`text-xl font-bold ${truncate ? 'truncate' : ''}`}>{value}</p>
  </motion.div>
);

export default Dashboard;