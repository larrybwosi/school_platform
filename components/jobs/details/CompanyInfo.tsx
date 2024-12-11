import React from 'react';
import { motion } from 'framer-motion';
import { Globe, MapPin } from 'lucide-react';
import type { Job } from '@/types/job';

interface CompanyInfoProps {
  job: Job;
}

export const CompanyInfo = ({ job }: CompanyInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-lg shadow-sm p-6"
    >
      <h2 className="text-xl font-semibold mb-4">About the Company</h2>
      
      <div className="flex items-start gap-4 mb-6">
        <img
          src={job.company.logo}
          alt={`${job.company.name} logo`}
          className="w-16 h-16 rounded-lg object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold">{job.company.name}</h3>
          {job.company.website && (
            <a
              href={job.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <Globe className="w-4 h-4" />
              <span>Visit website</span>
            </a>
          )}
        </div>
      </div>
      
      <div className="space-y-4">
        <p className="text-gray-700">{job.company.description}</p>
        
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{job.company.location}</span>
        </div>
      </div>
    </motion.div>
  );
};