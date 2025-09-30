
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, Briefcase, Plus, Search, X, MapPin, Building, Edit, Trash2, 
  LayoutGrid, List, User, DollarSign, Image as ImageIcon, Eye, AlertTriangle,
  Mail, Phone, Wallet
} from 'lucide-react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { useAppContext } from '@/app/context/AppContext';
import AddPropertyModal from '@/app/components/modals/AddPropertyModal';

// --- Mock Data and Types ---
interface Asset {
  id: number;
  type: 'Property' | 'Land';
  isVerified: boolean;
  forSale: boolean;
  imageCID?: string;
  name?: string; // For Property
  // Land specific
  numberOfPlots?: number;
  titleNumber?: number;
  state?: string;
  lga?: string;
  city?: string;
  pricePerPlot?: number;
  coFoCID?: string;
  // Property specific
  landIndex?: number;
  numberOfRooms?: number;
  numberOfBathrooms?: number;
  price?: number;
  owner?: string;
}

// --- Reusable Components ---
const SkeletonCard = () => (
  <div className="bg-gray-800/50 border border-blue-500/10 rounded-2xl p-6 animate-pulse">
    <div className="w-full h-40 bg-gray-700/50 rounded-lg mb-4"></div>
    <div className="h-6 w-3/4 bg-gray-700/50 rounded mb-2"></div>
    <div className="h-4 w-1/2 bg-gray-700/50 rounded"></div>
  </div>
);

const InfoCard = ({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }}
    className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-6"
  >
    <div className="flex items-center gap-4 mb-2">
      <div className="p-3 bg-gray-700/50 rounded-full text-blue-400">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-400">{title}</h3>
    </div>
    <p className="text-xl font-bold truncate">{value}</p>
  </motion.div>
);

const PropertyCard = ({ prop, onEdit, onDelete, role, userData, onViewDetails }: { prop: Asset, onEdit: (p: Asset) => void, onDelete: (p: Asset) => void, role: string, userData: any, onViewDetails: (p: Asset) => void }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    className="bg-gray-800/50 border border-blue-500/20 rounded-2xl overflow-hidden group"
  >
    <div className="relative">
      <img src={prop.imageCID || 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'} alt={prop.type} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-4 left-4">
        <h3 className="text-2xl font-bold text-white">{prop.type === 'Land' ? `${prop.state}, ${prop.city}` : prop.name}</h3>
        <p className="text-gray-300 flex items-center gap-2"><MapPin size={16} /> {prop.type === 'Land' ? prop.lga : `${prop.numberOfRooms} rooms, ${prop.numberOfBathrooms} baths`}</p>
      </div>
    </div>
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-semibold bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full">{prop.type}</span>
        <span className="text-2xl font-bold text-green-400">${prop.type === 'Land' ? prop.pricePerPlot?.toLocaleString() : prop.price?.toLocaleString()}</span>
      </div>
      <p className="text-gray-400 mb-4 flex items-center gap-2"><User size={16} /> Owned by {prop.owner || 'N/A'}</p>
      
      {role === 'Landowner' && prop.owner === userData?.details.fullName && (
        <div className="flex justify-end gap-4 mt-4 border-t border-gray-700 pt-4">
          <motion.button whileHover={{ scale: 1.1, color: '#38bdf8' }} whileTap={{ scale: 0.9 }} onClick={() => onEdit(prop)}><Edit /></motion.button>
          <motion.button whileHover={{ scale: 1.1, color: '#f87171' }} whileTap={{ scale: 0.9 }} onClick={() => onDelete(prop)}><Trash2 /></motion.button>
        </div>
      )}
      {role === 'Buyer' && (
        <motion.button
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
          onClick={() => onViewDetails(prop)}
          className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-semibold"
        >
          <Eye size={20}/> View Details
        </motion.button>
      )}
    </div>
  </motion.div>
);

// --- Main Dashboard Component ---
const Dashboard = () => {
  const { isAddPropertyModalOpen, setAddPropertyModalOpen } = useAppContext();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Dashboard state
  const [assets, setAssets] = useState<Asset[]>([]);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false); // For Property Details Modal
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null); // For Property Details Modal
  const [role, setRole] = useState('Buyer'); // Default role
  const [searchTerm, setSearchTerm] = useState('');

  // Form state
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    const handleStorageChange = () => {
      const savedAssets = localStorage.getItem('assets');
      setAssets(savedAssets ? JSON.parse(savedAssets) : []);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Simulate fetching user data and properties
      setTimeout(() => {
        const savedData = localStorage.getItem('userData');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setUserData(parsedData);
          setRole(parsedData.role || 'Buyer');
        } else {
          // Mock user data if not in local storage for demo
          const mockUser = {
            role: 'Landowner',
            details: { fullName: 'John Doe', location: 'Lagos, Nigeria' },
            walletAddress: '0x123...abc'
          };
          setUserData(mockUser);
          setRole(mockUser.role);
          localStorage.setItem('userData', JSON.stringify(mockUser));
        }

        const savedAssets = localStorage.getItem('assets');
        setAssets(savedAssets ? JSON.parse(savedAssets) : []);
        setIsLoading(false);
      }, 1500);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isLoading) {
      localStorage.setItem('assets', JSON.stringify(assets));
    }
  }, [assets, isLoading]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation logic can be added here if needed

    const newAsset: Asset = {
      id: editingAsset ? editingAsset.id : Date.now(),
      ...formState,
      owner: userData.details.fullName,
    } as Asset;

    if (editingAsset) {
      setAssets(assets.map(p => p.id === editingAsset.id ? newAsset : p));
    } else {
      setAssets([newAsset, ...assets]);
    }
    closeModal();
  };

  const openModal = (asset: Asset | null) => {
    setEditingAsset(asset);
    setFormState(asset ? asset : {});
    setErrors({});
    setAddPropertyModalOpen(true);
  };

  const closeModal = () => setAddPropertyModalOpen(false);

  const handleDelete = (assetToDelete: Asset) => {
    setAssets(assets.filter(p => p.id !== assetToDelete.id));
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);

  const openDeleteModal = (asset: Asset) => {
    setAssetToDelete(asset);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (assetToDelete) {
      handleDelete(assetToDelete);
      setShowDeleteModal(false);
      setAssetToDelete(null);
    }
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDetailsModalOpen(true);
  };

  const filteredAssets = assets.filter(p => {
    if (p.type === 'Land') {
      return (p.state && p.state.toLowerCase().includes(searchTerm.toLowerCase())) ||
             (p.city && p.city.toLowerCase().includes(searchTerm.toLowerCase()));
    } else {
      return p.name && p.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-10 w-1/3 bg-gray-700/50 rounded mb-4 animate-pulse"></div>
          <div className="h-6 w-1/4 bg-gray-700/50 rounded mb-12 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="h-28 bg-gray-800/50 rounded-2xl animate-pulse"></div>
            <div className="h-28 bg-gray-800/50 rounded-2xl animate-pulse"></div>
            <div className="h-28 bg-gray-800/50 rounded-2xl animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <Navbar />
      
      <main className="pt-28 px-4 py-8 sm:pt-36 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <div className="grid grid-cols-1 gap-6 mb-8 mt-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-blue-500/20 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between"
            >
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">Welcome, {userData?.details.fullName}</h1>
                <p className="text-lg sm:text-xl text-gray-400">Your personalized {role} dashboard.</p>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 border border-blue-500/20 p-1 rounded-full">
                <button onClick={() => setRole('Buyer')} className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors ${role === 'Buyer' ? 'bg-blue-600' : ''}`}>Buyer</button>
                <button onClick={() => setRole('Landowner')} className={`px-3 py-1 sm:px-4 sm:py-2 rounded-full transition-colors ${role === 'Landowner' ? 'bg-blue-600' : ''}`}>Landowner</button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-6 mb-8"
          >
            <h2 className="text-2xl font-bold mb-4">Your Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData?.details && Object.entries(userData.details).filter(([key]) => key !== 'fullName').map(([key, value]) => {
                let iconComponent;
                switch (key) {
                  case 'email':
                    iconComponent = <Mail />;
                    break;
                  case 'phone':
                    iconComponent = <Phone />;
                    break;
                  case 'location':
                    iconComponent = <MapPin />;
                    break;
                  case 'walletAddress':
                    iconComponent = <Wallet />;
                    break;
                  default:
                    iconComponent = <User />;
                }
                return (
                  <InfoCard key={key} icon={iconComponent} title={key.charAt(0).toUpperCase() + key.slice(1)} value={value as string} />
                );
              })}
              <InfoCard icon={<Briefcase />} title="Your Role" value={role} />
            </div>
          </motion.div>

          <div className="bg-gray-800/50 border border-blue-500/20 rounded-2xl p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="relative w-full sm:w-1/2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-700/50 border border-transparent focus:border-blue-500 rounded-full py-3 pl-12 pr-4 transition-all"
                />
              </div>
              {role === 'Landowner' && (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(null)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold shadow-lg"
                >
                  <Plus /> Add Property
                </motion.button>
              )}
            </div>
          </div>

          <AnimatePresence>
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssets.map((prop) => (
                <PropertyCard key={prop.id} prop={prop} onEdit={openModal} onDelete={openDeleteModal} role={role} userData={userData} onViewDetails={handleViewDetails} />
              ))}
            </motion.div>
          </AnimatePresence>
          
          {filteredAssets.length === 0 && (
            <div className="text-center py-16">
              <p className="text-2xl font-bold text-gray-500">No assets found.</p>
              <p className="text-gray-400">Try adjusting your search or add a new asset.</p>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />

      <AnimatePresence>
        {isAddPropertyModalOpen && <AddPropertyModal />}
      </AnimatePresence>

      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-gray-800 to-gray-900 border border-red-500/50 rounded-2xl w-full max-w-md text-center p-8"
            >
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, transition: { delay: 0.2, type: 'spring' } }}
                className="mx-auto w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center border-2 border-red-500"
              >
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </motion.div>
              <h2 className="text-2xl font-bold mt-6 mb-2">Are you sure?</h2>
              <p className="text-gray-400 mb-8">This action is irreversible and will permanently delete the {assetToDelete?.type} at "{assetToDelete?.type === 'Land' ? `${assetToDelete.state}, ${assetToDelete.city}` : `Property`}".</p>
              <div className="flex justify-center gap-4">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowDeleteModal(false)} className="px-8 py-3 bg-gray-600 rounded-lg font-semibold">Cancel</motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmDelete}
                  className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-semibold"
                >
                  Confirm Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FormInput = ({ name, placeholder, value, onChange, error, icon, type = 'text' }: any) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange((prev: any) => ({ ...prev, [name]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
  <div>
    <div className="relative">
      <motion.input
        type={type}
        placeholder={placeholder}
        onChange={type === 'file' ? handleFileChange : (e) => onChange((prev: any) => ({ ...prev, [name]: e.target.value }))}
        animate={error ? { x: [-3, 3, -3, 3, 0] } : {}}
        transition={{ duration: 0.3 }}
        className={`w-full p-4 pl-12 bg-gray-700/50 rounded-lg border transition-all duration-300 ${
          error ? 'border-red-500' : 'border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50'
        } ${type === 'file' ? 'file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100' : ''}`}
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
    </div>
    {error && <p className="text-red-500 text-sm mt-1 ml-2">{error}</p>}
  </div>
)};

export default Dashboard;
