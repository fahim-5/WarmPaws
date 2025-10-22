import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  UserIcon,
  EnvelopeIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  ShieldCheckIcon,
  CalendarIcon,
  PhoneIcon,
  ClockIcon,
  BookmarkIcon,
} from "@heroicons/react/24/outline";

const EmergencyContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const emergencyContacts = [
    {
      name: "24/7 Emergency Hotline",
      number: "+1 (555) 911-PETS",
      description: "Immediate assistance for pet emergencies",
      available: "24/7",
      icon: "🚨",
      gradient: "from-red-500 to-orange-500"
    },
    {
      name: "Veterinary Emergency",
      number: "+1 (555) 123-VETS",
      description: "Emergency veterinary services",
      available: "24/7",
      icon: "👨‍⚕️",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Poison Control",
      number: "+1 (555) 222-POIS",
      description: "Animal poison control center",
      available: "24/7",
      icon: "⚠️",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Pet Ambulance",
      number: "+1 (555) 789-HELP",
      description: "Emergency pet transportation",
      available: "24/7",
      icon: "🚑",
      gradient: "from-green-500 to-emerald-500"
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200"
          >
            <div className="bg-gradient-to-r from-red-500 to-orange-600 p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>

              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <span className="text-3xl">🚑</span>
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">Emergency Contacts</h2>
                  <p className="text-red-100 text-lg">24/7 Support for Your Pets</p>
                </div>
              </div>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <div className="mb-8">
                <p className="text-gray-600 text-center text-lg mb-2">
                  Immediate assistance for your pet emergencies
                </p>
                <p className="text-gray-500 text-center">
                  All services are available 24/7
                </p>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                {emergencyContacts.map((contact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white to-gray-50 rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
                    <div className="relative p-6 rounded-2xl border border-gray-100 bg-white/80 backdrop-blur-sm">
                      <div className="flex items-start space-x-6">
                        <div className={`w-16 h-16 bg-gradient-to-br ${contact.gradient} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl text-white">{contact.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                              {contact.name}
                            </h3>
                            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full">
                              {contact.available}
                            </span>
                          </div>
                          <p className="text-gray-600 text-lg mb-4">
                            {contact.description}
                          </p>
                          <div className="flex items-center space-x-3">
                            <PhoneIcon className="w-5 h-5 text-gray-600" />
                            <a
                              href={`tel:${contact.number}`}
                              className="text-gray-900 font-bold text-lg hover:text-blue-600 transition-colors duration-200"
                            >
                              {contact.number}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
                <h4 className="font-bold text-red-900 text-lg mb-4 flex items-center">
                  <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Emergency Instructions
                </h4>
                <ul className="text-red-700 space-y-2 text-lg">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Stay calm and keep your pet calm
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Have your pet's medical information ready
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Describe the emergency clearly
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    Follow the operator's instructions
                  </li>
                </ul>
              </div>
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 px-6 rounded-xl font-bold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg text-lg"
              >
                Close Emergency Contacts
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Profile = () => {
  const { user, updateUserProfile, loading } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    photoURL: user?.photoURL || "",
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    const result = await updateUserProfile({
      displayName: formData.displayName,
      photoURL: formData.photoURL,
    });
    if (result.success) {
      setIsEditing(false);
    }
    setUpdateLoading(false);
  };

  const handleCancel = () => {
    setFormData({
      displayName: user?.displayName || "",
      photoURL: user?.photoURL || "",
    });
    setIsEditing(false);
  };

  const handleEmergencyContact = () => {
    setIsEmergencyModalOpen(true);
  };

  const joinDate = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown";

  const lastLogin = user?.metadata?.lastSignInTime
    ? new Date(user.metadata.lastSignInTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Unknown";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <span className="text-3xl text-white">👤</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            My Profile
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Manage your account and access exclusive pet care features
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold mx-auto overflow-hidden border-4 border-white shadow-2xl">
                    {user?.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      user?.displayName?.charAt(0)?.toUpperCase() || "U"
                    )}
                  </div>
                  {isEditing && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="absolute bottom-2 right-2 bg-blue-600 text-white p-3 rounded-full shadow-2xl border-2 border-white"
                    >
                      <CameraIcon className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>

                <AnimatePresence>
                  {!isEditing ? (
                    <motion.div
                      key="view-mode"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        {user?.displayName || "Anonymous User"}
                      </h2>
                      <p className="text-gray-600 flex items-center justify-center text-lg">
                        <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-500" />
                        Verified Member
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="edit-mode"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <input
                        type="text"
                        name="displayName"
                        value={formData.displayName}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-bold bg-white/50 backdrop-blur-sm"
                      />
                      <input
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleChange}
                        placeholder="Profile photo URL"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white/50 backdrop-blur-sm"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {!isEditing ? (
                  <motion.button
                    key="edit-button"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-lg"
                  >
                    <PencilIcon className="w-5 h-5 mr-3" />
                    Edit Profile
                  </motion.button>
                ) : (
                  <motion.div
                    key="action-buttons"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex space-x-4"
                  >
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit}
                      disabled={updateLoading}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      {updateLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      ) : (
                        <CheckIcon className="w-5 h-5 mr-3" />
                      )}
                      {updateLoading ? "Saving..." : "Save"}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      className="flex-1 bg-gradient-to-r from-gray-600 to-slate-600 text-white py-4 px-6 rounded-xl font-bold hover:from-gray-700 hover:to-slate-700 transition-all duration-200 shadow-lg flex items-center justify-center"
                    >
                      <XMarkIcon className="w-5 h-5 mr-3" />
                      Cancel
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BookmarkIcon className="w-6 h-6 mr-3 text-blue-600" />
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <span className="text-gray-700 flex items-center">
                    <CalendarIcon className="w-5 h-5 mr-3" />
                    Member since
                  </span>
                  <span className="text-gray-900 font-semibold">{joinDate}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <span className="text-gray-700 flex items-center">
                    <ClockIcon className="w-5 h-5 mr-3" />
                    Last login
                  </span>
                  <span className="text-gray-900 font-semibold">{lastLogin}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <span className="text-gray-700">Status</span>
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    Active
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
                <UserIcon className="w-8 h-8 mr-4 text-blue-600" />
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Full Name
                  </label>
                  <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-900 text-lg">
                      {user?.displayName || "Not set"}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm flex items-center">
                    <EnvelopeIcon className="w-5 h-5 text-gray-500 mr-3" />
                    <p className="text-gray-900 text-lg">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    User ID
                  </label>
                  <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                    <p className="text-gray-900 text-sm font-mono truncate">
                      {user?.uid}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-lg font-semibold text-gray-700 mb-3">
                    Verification Status
                  </label>
                  <div className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                      user?.emailVerified
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-yellow-500 to-orange-500 text-white"
                    }`}>
                      {user?.emailVerified ? "✓ Verified" : "⚠ Not Verified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Quick Actions
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/")}
                  className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl text-blue-700 hover:from-blue-100 hover:to-blue-200 transition-all duration-200 text-left shadow-lg hover:shadow-xl"
                >
                  <div className="text-2xl mb-3">🏠</div>
                  <div className="font-bold text-lg mb-2">Back to Home</div>
                  <div className="text-blue-600">
                    Return to main dashboard
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/my-bookings")}
                  className="p-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-2xl text-green-700 hover:from-green-100 hover:to-green-200 transition-all duration-200 text-left shadow-lg hover:shadow-xl"
                >
                  <div className="text-2xl mb-3">📅</div>
                  <div className="font-bold text-lg mb-2">My Bookings</div>
                  <div className="text-green-600">
                    View all appointments
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/tips")}
                  className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl text-purple-700 hover:from-purple-100 hover:to-purple-200 transition-all duration-200 text-left shadow-lg hover:shadow-xl"
                >
                  <div className="text-2xl mb-3">💡</div>
                  <div className="font-bold text-lg mb-2">Winter Tips</div>
                  <div className="text-purple-600">
                    Care recommendations
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleEmergencyContact}
                  className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-2xl text-orange-700 hover:from-orange-100 hover:to-orange-200 transition-all duration-200 text-left shadow-lg hover:shadow-xl"
                >
                  <div className="text-2xl mb-3">🚨</div>
                  <div className="font-bold text-lg mb-2">Emergency</div>
                  <div className="text-orange-600">24/7 support line</div>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <EmergencyContactModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />
    </div>
  );
};

export default Profile;