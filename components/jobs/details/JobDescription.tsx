import React from 'react';
import { motion } from 'framer-motion';
import type { Job } from '@/types/job';

interface JobDescriptionProps {
  job: Job;
}

export const JobDescription = ({ job }: JobDescriptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-6"
    >
      <h2 className="text-xl font-semibold mb-4">Job Description</h2>
      <div className="prose max-w-none">
        <p className="text-gray-700 mb-6">{job.description}</p>
        
        <h3 className="text-lg font-semibold mb-3">Key Responsibilities</h3>
        <ul className="list-disc pl-5 mb-6">
          {job.responsibilities.map((responsibility, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {responsibility}
            </li>
          ))}
        </ul>
        
        <h3 className="text-lg font-semibold mb-3">Requirements</h3>
        <ul className="list-disc pl-5 mb-6">
          {job.requirements.map((requirement, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {requirement}
            </li>
          ))}
        </ul>
        
        <h3 className="text-lg font-semibold mb-3">Benefits</h3>
        <ul className="list-disc pl-5">
          {job.benefits.map((benefit, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};