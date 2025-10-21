import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarIcon, CalendarIcon } from '@heroicons/react/24/solid';

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={service.image} 
          alt={service.serviceName}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          ${service.price}
        </div>
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-800">{service.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(service.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            {service.rating} ({service.slotsAvailable} slots)
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {service.serviceName}
        </h3>

        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-blue-600 text-sm font-bold">
              {service.providerName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{service.providerName}</p>
            <p className="text-xs text-gray-500">{service.providerEmail}</p>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {service.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 mr-1 text-green-500" />
            <span>{service.slotsAvailable} slots available</span>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            service.slotsAvailable > 2 
              ? 'bg-green-100 text-green-800' 
              : service.slotsAvailable > 0 
              ? 'bg-yellow-100 text-yellow-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {service.slotsAvailable > 2 ? 'Available' : service.slotsAvailable > 0 ? 'Limited' : 'Full'}
          </div>
        </div>

        <Link 
          to={`/service/${service.serviceId}`}
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default ServiceCard;