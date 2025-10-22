import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const BookingsContext = createContext();

export const BookingsProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [serviceBookings, setServiceBookings] = useState([]);
  const [consultationBookings, setConsultationBookings] = useState([]);

  useEffect(() => {
    if (user) {
      const savedServiceBookings = localStorage.getItem(`serviceBookings_${user.uid}`);
      const savedConsultationBookings = localStorage.getItem(`consultationBookings_${user.uid}`);
      
      if (savedServiceBookings) {
        setServiceBookings(JSON.parse(savedServiceBookings));
      }
      if (savedConsultationBookings) {
        setConsultationBookings(JSON.parse(savedConsultationBookings));
      }
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`serviceBookings_${user.uid}`, JSON.stringify(serviceBookings));
    }
  }, [serviceBookings, user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`consultationBookings_${user.uid}`, JSON.stringify(consultationBookings));
    }
  }, [consultationBookings, user]);

  const addServiceBooking = (booking) => {
    const newBooking = {
      id: Date.now().toString(),
      ...booking,
      createdAt: new Date().toISOString(),
      userId: user?.uid
    };
    setServiceBookings(prev => [...prev, newBooking]);
  };

  const addConsultationBooking = (booking) => {
    const newBooking = {
      id: Date.now().toString(),
      ...booking,
      createdAt: new Date().toISOString(),
      userId: user?.uid
    };
    setConsultationBookings(prev => [...prev, newBooking]);
  };

  const cancelServiceBooking = (bookingId) => {
    setServiceBookings(prev => prev.filter(booking => booking.id !== bookingId));
  };

  const cancelConsultationBooking = (bookingId) => {
    setConsultationBookings(prev => prev.filter(booking => booking.id !== bookingId));
  };

  return (
    <BookingsContext.Provider value={{
      serviceBookings,
      consultationBookings,
      addServiceBooking,
      addConsultationBooking,
      cancelServiceBooking,
      cancelConsultationBooking
    }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};