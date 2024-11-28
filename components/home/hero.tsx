'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon, GraduationCap, StarIcon } from 'lucide-react';

export default function HeroSection() {
  // Psychological engagement variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
    >
      {/* Gradient Background with Subtle Animation */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-blue-100 via-white to-blue-100 opacity-50 -z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 0.5, 
          backgroundPosition: ['0% 50%', '100% 50%'] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      />

      {/* Blurred Circles for Depth */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-30 -z-10"></div>

      <div className="container px-6 py-24">
        <motion.div variants={itemVariants}>
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 leading-tight"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Horizon Academy
          </motion.h1>
        </motion.div>

        <motion.p 
          variants={itemVariants}
          className="text-xl sm:text-2xl text-gray-700 max-w-4xl mx-auto mb-10 font-medium"
        >
          Empowering Future Innovators, Scholars, and Global Leaders. Where Exceptional Education Meets Unlimited Potential.
        </motion.p>

        <motion.div variants={itemVariants}>
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full text-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
          >
            Discover Our Journey
            <ChevronRightIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

        {/* Social Proof & Credibility Indicators */}
        <motion.div 
          variants={itemVariants}
          className="mt-16 flex justify-center items-center space-x-8 text-gray-600"
        >
          <div className="flex items-center">
            <StarIcon className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-lg font-semibold">4.9/5 Academic Rating</span>
          </div>
          <div className="flex items-center">
            <GraduationCap className="h-6 w-6 text-green-500 mr-2" />
            <span className="text-lg font-semibold">95% Graduate Success</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}