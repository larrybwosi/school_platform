'use client'
import { LayoutGrid, List, Search, Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
// import { JobCard } from '@/components/jobs/JobCard';
import { JobFilters } from '@/components/jobs/JobFilters';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/btn';
import { useState } from 'react';

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp Inc.",
    location: "San Francisco, CA",
    salary: "$120k - $180k",
    type: "Full-time",
    posted: "2 days ago",
    description: "We're looking for an experienced software engineer to join our team...",
    tags: ["React", "TypeScript", "Node.js"],
    logo: "https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff"
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
    location: "Remote",
    salary: "$90k - $130k",
    type: "Full-time",
    posted: "1 day ago",
    description: "Join our design team to create beautiful and functional interfaces...",
    tags: ["Figma", "UI/UX", "Design Systems"],
    logo: "https://ui-avatars.com/api/?name=DH&background=6366f1&color=fff"
  },
  // Add more sample jobs as needed
];

const JobsPage = () => {
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-5xl font-bold text-text-primary mb-4 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Find Your Next Career Opportunity
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Discover thousands of job opportunities from top companies worldwide. Your next career move starts here.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative mt-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jobs, companies, or keywords"
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 pl-12 shadow-sm transition-all duration-300 hover:shadow-md"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search Jobs'}
            </Button>
          </form>

          <div className="flex items-center justify-center gap-8 mt-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>10k+ Jobs Posted</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>Worldwide Opportunities</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <span>Daily Updates</span>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/4"
          >
            <JobFilters />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1"
          >
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-text-primary flex items-center gap-2">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Featured Jobs
                </h2>
                
                <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                  <button
                    onClick={() => setLayout('grid')}
                    className={cn(
                      'p-2 rounded-md transition-all duration-200',
                      layout === 'grid' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-500 hover:text-primary'
                    )}
                  >
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setLayout('list')}
                    className={cn(
                      'p-2 rounded-md transition-all duration-200',
                      layout === 'list' 
                        ? 'bg-white text-primary shadow-sm' 
                        : 'text-gray-500 hover:text-primary'
                    )}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={layout}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    'grid gap-6',
                    layout === 'grid' 
                      ? 'grid-cols-1 md:grid-cols-2' 
                      : 'grid-cols-1'
                  )}
                >
                  {sampleJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        'bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300',
                        layout === 'list' ? 'flex items-start gap-6' : ''
                      )}
                    >
                      <div className={cn(
                        'flex items-center gap-4',
                        layout === 'list' ? 'flex-1' : 'flex-col text-center mb-4'
                      )}>
                        <img 
                          src={job.logo} 
                          alt={job.company}
                          className="w-16 h-16 rounded-xl"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-text-primary">{job.title}</h3>
                          <p className="text-text-secondary">{job.company}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {job.location}
                            </span>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <DollarSign className="w-4 h-4" /> {job.salary}
                            </span>
                            <span className="text-sm text-gray-600 flex items-center gap-1">
                              <Clock className="w-4 h-4" /> {job.posted}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {job.tags.map((tag) => (
                              <span 
                                key={tag}
                                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button className="whitespace-nowrap">Apply Now</Button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default JobsPage