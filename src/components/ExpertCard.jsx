import { motion } from 'framer-motion';
import { UserIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

const ExpertCard = ({ expert }) => {
  return (
    <motion.div
      whileHover={{ 
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
    >
      <div className="relative h-64 overflow-hidden">
        <img 
          src={expert.image} 
          alt={expert.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center text-sm font-medium text-gray-800">
            <ClockIcon className="w-4 h-4 mr-1 text-blue-600" />
            {expert.experience}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-1">{expert.name}</h3>
          <div className="flex items-center text-blue-600 font-semibold">
            <AcademicCapIcon className="w-4 h-4 mr-2" />
            <span className="text-sm">{expert.specialization}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-6 line-clamp-3">
          {expert.bio}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">500+</div>
            <div className="text-xs text-gray-500">Pets Treated</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {expert.specialties?.map((specialty, index) => (
            <span 
              key={index}
              className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200"
            >
              {specialty}
            </span>
          ))}
          {!expert.specialties && (
            <>
              <span className="bg-blue-50 text-blue-700 text-xs px-3 py-1 rounded-full border border-blue-200">
                Winter Care
              </span>
              <span className="bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full border border-green-200">
                Emergency
              </span>
            </>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
        >
          <UserIcon className="w-4 h-4 mr-2" />
          Book Consultation
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ExpertCard;