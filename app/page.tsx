'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Globe, 
  BookOpen, 
  Trophy, 
  Star, 
  Users, 
  ArrowRight 
} from 'lucide-react';

const HorizonAcademy = () => {
  const [activeSection, setActiveSection] = useState(null);

  const keyFeatures = [
    {
      icon: <GraduationCap size={48} className="text-blue-600" />,
      title: "Academic Mastery",
      description: "Pioneering transformative learning strategies that unlock each student's extraordinary potential through personalized educational experiences.",
      color: "blue"
    },
    {
      icon: <Globe size={48} className="text-green-600" />,
      title: "Global Citizenship",
      description: "Cultivating world-ready leaders with comprehensive international programs that develop cross-cultural understanding and global perspectives.",
      color: "green"
    },
    {
      icon: <BookOpen size={48} className="text-purple-600" />,
      title: "Holistic Growth",
      description: "Nurturing intellectual, emotional, and personal development through integrated learning approaches that prepare students for lifelong success.",
      color: "purple"
    }
  ];

  const AboutSections = [
    {
      title: "Our Vision",
      description: "At Horizon Academy, we believe education is more than academic achievement. We are committed to creating an environment where curiosity thrives, potential is limitless, and every child is empowered to shape their unique future.",
      image: "/api/placeholder/600/400",
      alignment: "left"
    },
    {
      title: "Innovative Learning",
      description: "Our cutting-edge curriculum integrates technology, critical thinking, and hands-on experiences. We don't just teach subjects; we inspire passion, creativity, and a lifelong love for learning that extends far beyond traditional classroom boundaries.",
      image: "/api/placeholder/600/400",
      alignment: "right"
    },
    {
      title: "Supportive Community",
      description: "We're more than a school—we're a family. Our dedicated educators, comprehensive support systems, and collaborative environment ensure that each student receives personalized attention, guidance, and the resources they need to excel.",
      image: "/api/placeholder/600/400",
      alignment: "left"
    }
  ];

  const renderAboutSection = (section, index) => {
    const isLeft = section.alignment === 'left';
    return (
      <motion.div 
        key={section.title}
        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className={`
          flex items-center my-16 
          ${isLeft ? 'flex-row' : 'flex-row-reverse'}
          gap-12 container mx-auto px-6
        `}
      >
        <div className="w-1/2">
          <img 
            src={section.image} 
            alt={section.title} 
            className="rounded-2xl shadow-xl object-cover w-full h-96"
          />
        </div>
        <div className={`w-1/2 ${isLeft ? 'pl-12' : 'pr-12'}`}>
          <h3 className="text-3xl font-bold mb-6 text-gray-900">
            {section.title}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed mb-6">
            {section.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Learn More <ArrowRight className="ml-2" />
          </motion.button>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 relative overflow-hidden">
      {/* Hero Section with Gradient and Illustrations */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 pt-24 pb-16 text-center relative z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-50 -z-10"></div>
        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 leading-tight">
          Horizon Academy
        </h1>
        <p className="text-2xl text-gray-700 max-w-4xl mx-auto mb-10 font-medium">
          Empowering Future Innovators, Scholars, and Global Leaders. Where Exceptional Education Meets Unlimited Potential.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
        >
          Discover Our Journey
        </motion.button>
      </motion.div>

      {/* Key Features Section */}
      <div className="container mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
        {keyFeatures.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 0.5 }}
            onHoverStart={() => setActiveSection(index)}
            onHoverEnd={() => setActiveSection(null)}
            className={`
              p-8 rounded-3xl shadow-2xl transition-all duration-500 
              ${activeSection === index 
                ? `bg-${feature.color}-100 scale-105 border-2 border-${feature.color}-300` 
                : 'bg-white hover:bg-gray-50'}
            `}
          >
            <div className="mb-6">{feature.icon}</div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* About Sections */}
      {AboutSections.map(renderAboutSection)}

      {/* Achievement Highlights */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="bg-gradient-to-br from-blue-100 to-white py-20"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Our Extraordinary Achievements
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Trophy size={64} className="mx-auto text-yellow-500" />, 
                number: "150+", 
                label: "Academic Awards" 
              },
              { icon: <Star size={64} className="mx-auto text-blue-500" />, 
                number: "95%", 
                label: "College Placement Rate" 
              },
              { icon: <Users size={64} className="mx-auto text-green-500" />, 
                number: "30+", 
                label: "Nationalities Represented" 
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.4, type: "spring" }}
                className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-xl transition-all"
              >
                {stat.icon}
                <h3 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mt-4">
                  {stat.number}
                </h3>
                <p className="text-gray-600 text-lg">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HorizonAcademy;