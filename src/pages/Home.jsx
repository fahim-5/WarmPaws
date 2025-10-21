import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import ExpertCard from '../components/ExpertCard';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import servicesData from '../data/services.json';
import expertsData from '../data/experts.json';
import tipsData from '../data/tips.json';

const Home = () => {
  const [popularServices, setPopularServices] = useState([]);
  const [winterTips, setWinterTips] = useState([]);

  useEffect(() => {
    const popular = servicesData
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    setPopularServices(popular);

    const importantTips = tipsData
      .filter(tip => tip.important)
      .slice(0, 6);
    setWinterTips(importantTips);
  }, []);

  const heroSlides = [
    {
      id: 1,
      title: "Keep Your Pets Warm & Safe",
      subtitle: "Professional winter care services for your furry friends",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      buttonText: "Explore Services"
    },
    {
      id: 2,
      title: "Winter Coat Fitting",
      subtitle: "Keep your pets comfortable in the coldest weather",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Book Now"
    },
    {
      id: 3,
      title: "Expert Veterinary Care",
      subtitle: "24/7 emergency services for winter-related issues",
      image: "https://images.unsplash.com/photo-1559715541-5dae8a238899?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      buttonText: "Meet Our Experts"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen">
      <section className="relative h-[70vh] md:h-[80vh] rounded-b-3xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect="fade"
          autoplay={{ 
            delay: 5000,
            disableOnInteraction: false 
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          loop={true}
          className="h-full w-full"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                
                <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                  >
                    <motion.h1 
                      className="text-4xl md:text-6xl font-bold mb-4 md:mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      className="text-xl md:text-2xl mb-6 md:mb-8 text-gray-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <Link 
                        to="/services" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        {slide.buttonText}
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Popular Winter Care Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Keep your pets warm, safe, and healthy with our specialized winter care services
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {popularServices.map((service, index) => (
              <motion.div
                key={service.serviceId}
                variants={itemVariants}
                custom={index}
              >
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link 
              to="/services" 
              className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View All Services
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Winter Care Tips
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Essential tips to keep your pets safe and comfortable during winter
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {winterTips.map((tip, index) => (
              <motion.div
                key={tip.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <span className="text-3xl mr-4">{tip.icon}</span>
                  <h3 className="text-xl font-bold text-gray-800">{tip.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{tip.description}</p>
                <div className="space-y-2">
                  {tip.tips.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                    {tip.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Meet Our Experts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our team of experienced veterinarians and pet care specialists
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {expertsData.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <ExpertCard expert={expert} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              24/7 Winter Emergency Care
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Available round the clock for winter-related pet emergencies. Don't hesitate to call us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.a
                href="tel:+1555911PETS"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-red-600 font-bold px-8 py-4 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300"
              >
                📞 +1 (555) 911-PETS
              </motion.a>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-lg font-semibold"
              >
                Available 24/7
              </motion.p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;