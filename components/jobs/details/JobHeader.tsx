import React from 'react';
import { Building2, MapPin, Clock, Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Job } from '@/types/job';
import { formatDate } from '@/lib/utils';

interface JobHeaderProps {
  job: Job;
}

export const JobHeader = ({ job }: JobHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={job.company.logo}
          alt={`${job.company.name} logo`}
          className="w-16 h-16 rounded-lg object-contain"
        />
        
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {job.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 text-gray-600 mb-4">
            <div className="flex items-center gap-1">
              <Building2 className="w-4 h-4" />
              <span>{job.company.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>Posted {formatDate(new Date(job.postedDate))}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};