import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useBookings } from "../context/BookingsContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon, 
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon as ClockOutlineIcon,
  PhoneIcon,
  EnvelopeIcon
} from "@heroicons/react/24/solid";
import {
  CalendarIcon as CalendarOutlineIcon,
  TrashIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const { serviceBookings, consultationBookings, cancelServiceBooking, cancelConsultationBooking } = useBookings();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [loading, setLoading] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleCancelBooking = (bookingId, type) => {
    if (type === "service") {
      cancelServiceBooking(bookingId);
    } else {
      cancelConsultationBooking(bookingId);
    }
  };

  const handleViewServiceDetails = (serviceId) => {
    navigate(`/service/${serviceId}`);
  };

  const handleViewServiceModal = (booking) => {
    setSelectedService(booking);
    setShowServiceModal(true);
  };

  const handleViewConsultationDetails = (booking) => {
    setSelectedConsultation(booking);
    setShowConsultationModal(true);
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const closeConsultationModal = () => {
    setShowConsultationModal(false);
    setSelectedConsultation(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "pending":
        return <ClockOutlineIcon className="w-4 h-4" />;
      case "completed":
        return <CheckCircleIcon className="w-4 h-4" />;
      case "cancelled":
        return <XCircleIcon className="w-4 h-4" />;
      default:
        return <ClockOutlineIcon className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your service appointments and expert consultations in one place
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-1 bg-white rounded-2xl p-2 shadow-lg mb-8 max-w-md mx-auto"
        >
          <button
            onClick={() => setActiveTab("services")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "services"
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Service Bookings ({serviceBookings.length})
          </button>
          <button
            onClick={() => setActiveTab("consultations")}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
              activeTab === "consultations"
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-600 hover:text-purple-600"
            }`}
          >
            Consultations ({consultationBookings.length})
          </button>
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeTab === "services" ? (
            <>
              {serviceBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <CalendarOutlineIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Service Bookings
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't booked any services yet.
                  </p>
                  <a
                    href="/services"
                    className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Browse Services
                  </a>
                </div>
              ) : (
                serviceBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={booking.image}
                            alt={booking.serviceName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {booking.serviceName}
                              </h3>
                              <div className="flex items-center space-x-4 mb-3">
                                <div className="flex items-center text-sm text-gray-600">
                                  <UserIcon className="w-4 h-4 mr-1 text-blue-600" />
                                  {booking.providerName}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <ClockIcon className="w-4 h-4 mr-1 text-green-600" />
                                  {booking.duration || '30-60 minutes'}
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                  <MapPinIcon className="w-4 h-4 mr-1 text-red-600" />
                                  {booking.location || 'Main Clinic'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 mb-4 md:mb-0">
                              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                                {getStatusIcon(booking.status)}
                                <span className="text-sm font-medium capitalize">
                                  {booking.status}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">
                                  ${booking.price}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <div className="flex items-center">
                                <CalendarIcon className="w-4 h-4 mr-1 text-purple-600" />
                                <span>{new Date(booking.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1 text-green-600" />
                                <span>{booking.time || '10:00 AM'}</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleCancelBooking(booking.id, "service")}
                                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors duration-200"
                              >
                                <TrashIcon className="w-4 h-4" />
                                <span className="font-medium">Delete</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleViewServiceModal(booking)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                              >
                                View Details
                              </motion.button>
                            </div>
                          </div>

                          {booking.message && (
                            <div className="mt-4 bg-gray-50 rounded-lg p-4">
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Notes:</span> {booking.message}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </>
          ) : (
            <>
              {consultationBookings.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <UserIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Consultation Bookings
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven't booked any consultations yet.
                  </p>
                  <a
                    href="/experts"
                    className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Find Experts
                  </a>
                </div>
              ) : (
                consultationBookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Consultation with {booking.expertName}
                        </h3>
                        <p className="text-gray-600 mb-3">{booking.expertSpecialty}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center text-sm text-gray-600">
                            <CalendarIcon className="w-4 h-4 mr-2 text-purple-600" />
                            <span>{new Date(booking.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <ClockIcon className="w-4 h-4 mr-2 text-green-600" />
                            <span>{booking.time} ({booking.duration})</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-600">
                            <UserIcon className="w-4 h-4 mr-2 text-blue-600" />
                            <span>{booking.petType} - {booking.petName}</span>
                          </div>
                          <div className="flex items-center">
                            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="text-sm font-medium capitalize">
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        </div>

                        {booking.message && (
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <p className="text-sm text-gray-700">
                              <span className="font-semibold">Notes:</span> {booking.message}
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 mt-4 md:mt-0 md:flex-col md:items-end md:space-y-2 md:space-x-0">
                        <div className="text-2xl font-bold text-purple-600">
                          ${booking.price}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleCancelBooking(booking.id, "consultation")}
                          className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg border border-red-200 transition-colors duration-200"
                        >
                          <TrashIcon className="w-4 h-4" />
                          <span className="font-medium">Delete</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleViewConsultationDetails(booking)}
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
                        >
                          View Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {showServiceModal && selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 relative z-50"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white relative">
                <button
                  onClick={closeServiceModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🐾</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Service Details</h2>
                    <p className="text-blue-100">{selectedService.serviceName}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <UserIcon className="w-5 h-5 text-blue-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Provider</p>
                            <p className="font-medium text-gray-900">{selectedService.providerName}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Duration</p>
                            <p className="font-medium text-gray-900">{selectedService.duration || '30-60 minutes'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="w-5 h-5 text-red-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Location</p>
                            <p className="font-medium text-gray-900">{selectedService.location || 'Main Clinic'}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Appointment Details</h3>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <CalendarIcon className="w-5 h-5 text-purple-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Date</p>
                            <p className="font-medium text-gray-900">
                              {new Date(selectedService.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <ClockIcon className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Time</p>
                            <p className="font-medium text-gray-900">{selectedService.time || '10:00 AM'}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(selectedService.status)}`}>
                            {getStatusIcon(selectedService.status)}
                            <span className="text-sm font-medium capitalize">
                              {selectedService.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {selectedService.message && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Additional Notes</h3>
                      <p className="text-gray-700">{selectedService.message}</p>
                    </div>
                  )}

                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-blue-900">Total Amount</h3>
                      <div className="text-2xl font-bold text-blue-600">
                        ${selectedService.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button
                    onClick={closeServiceModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleCancelBooking(selectedService.id, "service");
                      closeServiceModal();
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showConsultationModal && selectedConsultation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-gray-200 relative z-50"
            >
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white relative">
                <button
                  onClick={closeConsultationModal}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-200"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
                
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Consultation Details</h2>
                    <p className="text-purple-100">with {selectedConsultation.expertName}</p>
                  </div>
                </div>
              </div>

              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-6">
                  <div className="bg-purple-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-purple-900 mb-3">Expert Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <p className="font-medium text-gray-900">{selectedConsultation.expertName}</p>
                          <p className="text-sm text-gray-600">{selectedConsultation.expertSpecialty}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">Appointment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Date</p>
                          <p className="font-medium text-gray-900">
                            {new Date(selectedConsultation.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Time</p>
                          <p className="font-medium text-gray-900">{selectedConsultation.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="w-5 h-5 text-purple-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Duration</p>
                          <p className="font-medium text-gray-900">{selectedConsultation.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border ${getStatusColor(selectedConsultation.status)}`}>
                          {getStatusIcon(selectedConsultation.status)}
                          <span className="text-sm font-medium capitalize">
                            {selectedConsultation.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-green-900 mb-3">Pet Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Pet Type</p>
                          <p className="font-medium text-gray-900">{selectedConsultation.petType}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <UserIcon className="w-5 h-5 text-green-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Pet Name</p>
                          <p className="font-medium text-gray-900">{selectedConsultation.petName}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <UserIcon className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-gray-700">{selectedConsultation.name}</span>
                      </div>
                      <div className="flex items-center">
                        <EnvelopeIcon className="w-4 h-4 text-gray-600 mr-3" />
                        <span className="text-gray-700">{selectedConsultation.email}</span>
                      </div>
                      {selectedConsultation.phone && (
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 text-gray-600 mr-3" />
                          <span className="text-gray-700">{selectedConsultation.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedConsultation.message && (
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <h3 className="text-lg font-semibold text-yellow-900 mb-3">Additional Notes</h3>
                      <p className="text-gray-700">{selectedConsultation.message}</p>
                    </div>
                  )}

                  <div className="bg-purple-50 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-purple-900">Total Amount</h3>
                      <div className="text-2xl font-bold text-purple-600">
                        ${selectedConsultation.price}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200">
                <div className="flex space-x-4">
                  <button
                    onClick={closeConsultationModal}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleCancelBooking(selectedConsultation.id, "consultation");
                      closeConsultationModal();
                    }}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyBookings;