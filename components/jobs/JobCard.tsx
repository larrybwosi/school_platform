import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building2, Clock, Briefcase } from 'lucide-react';
import type { Job } from '@/types/job';
import { formatCurrency, formatDate } from '@/lib/utils';

interface JobCardProps {
  job: Job;
  layout?: 'grid' | 'list';
}

export const JobCard = ({ job, layout = 'grid' }: JobCardProps) => {
  const isGrid = layout === 'grid';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6',
        isGrid ? 'flex flex-col gap-4' : 'flex gap-6'
      )}
    >
      <div className={cn('flex items-start gap-4', isGrid ? 'flex-col' : 'flex-row')}>
        <img
          src={job.company.logo}
          alt={`${job.company.name} logo`}
          className="w-12 h-12 rounded-md object-contain"
        />
        
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#2d2d2d] mb-2">{job.title}</h3>
          
          <div className="flex flex-wrap gap-3 text-sm text-[#666666]">
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
              <span>{formatDate(new Date(job.postedDate))}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={cn('flex flex-wrap gap-2', isGrid ? 'mt-2' : 'ml-16')}>
        {job.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs rounded-full bg-[#f5f6f8] text-[#2557a7]"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2 py-1 text-xs rounded-full bg-[#f5f6f8] text-[#666666]">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <div className={cn('flex justify-between items-center', isGrid ? 'mt-4' : 'ml-16')}>
        <div className="text-[#2557a7] font-semibold">
          {formatCurrency(job.salary.min)} - {formatCurrency(job.salary.max)}
        </div>
        
        <button className="text-sm font-medium text-[#2557a7] hover:underline">
          View Details
        </button>
      </div>
    </motion.div>
  );
};