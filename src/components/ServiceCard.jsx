import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StarIcon = ({ filled, className = "w-4 h-4" }) => (
  <svg className={`${className} ${filled ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
       viewBox="0 0 20 20" fill="currentColor">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

const CalendarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
  </svg>
);

const ServiceCard = ({ service, viewMode = 'grid' }) => {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ 
          backgroundColor: '#f9fafb',
          transition: { duration: 0.2 }
        }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
            <img 
              src={service.image} 
              alt={service.serviceName}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded mr-3">
                    {service.category}
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        filled={i < Math.floor(service.rating)}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({service.rating})</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {service.serviceName}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
              </div>
              
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600 mb-1">${service.price}</div>
                <div className="text-sm text-gray-500 mb-2">per session</div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.slotsAvailable > 2 
                    ? 'bg-green-100 text-green-800' 
                    : service.slotsAvailable > 0 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.slotsAvailable} slots
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
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
                
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="w-4 h-4 mr-1 text-green-500" />
                  <span>{service.slotsAvailable} available</span>
                </div>
              </div>
              
              <Link 
                to={`/service/${service.serviceId}`}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

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
                filled={i < Math.floor(service.rating)}
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