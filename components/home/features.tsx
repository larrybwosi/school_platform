import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Users, Globe, Award } from 'lucide-react';

const features = [
  {
    icon: GraduationCap,
    title: 'World-Class Education',
    description: 'Access to cutting-edge curriculum and renowned faculty members from around the globe.',
  },
  {
    icon: Users,
    title: 'Diverse Community',
    description: 'Join a vibrant community of learners from over 100 countries, sharing diverse perspectives.',
  },
  {
    icon: Globe,
    title: 'Global Opportunities',
    description: 'Connect with international partners and access global career opportunities.',
  },
  {
    icon: Award,
    title: 'Industry Recognition',
    description: 'Graduate with credentials recognized by leading employers worldwide.',
  },
];

export const Features = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose EduHub?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience excellence in education with our comprehensive approach to learning and development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-lg bg-gray-50"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};