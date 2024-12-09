'use client';

import { useState, useEffect } from 'react';
import { List, Grid, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Department, mockDepartments } from '@/lib/mockData';
import { DepartmentSkeleton } from '@/components/shared/department.skeleton';
import Link from 'next/link';
import { AddDepartmentModal } from '@/components/shared/department.add';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'list' | 'grid'>('grid');

  useEffect(() => {
    setTimeout(() => {
      setDepartments(mockDepartments);
      setIsLoading(false);
    }, 1500);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="container mx-auto py-8 space-y-8 px-4 sm:px-6 lg:px-8 min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row justify-between items-center gap-4"
      >
        <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-200">Departments Overview</h1>
        <AddDepartmentModal />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Department Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-600 dark:to-blue-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="font-semibold text-lg text-white">Total Departments</h3>
                <p className="text-3xl font-bold text-white">{departments.length}</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-green-400 to-green-600 dark:from-green-600 dark:to-green-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="font-semibold text-lg text-white">Newest Department</h3>
                <p className="text-xl text-white">
                  {departments.length > 0 ? departments[departments.length - 1].name : 'N/A'}
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-600 dark:to-purple-800 p-6 rounded-xl shadow-md"
              >
                <h3 className="font-semibold text-lg text-white">Oldest Department</h3>
                <p className="text-xl text-white">{departments.length > 0 ? departments[0].name : 'N/A'}</p>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Departments List</CardTitle>
            <div className="flex space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setView('list')}
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>List View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={view === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setView('grid')}
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Grid View</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <DepartmentSkeleton key={index} />
                ))}
              </div>
            ) : (
              <AnimatePresence>
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                      : 'space-y-6'
                  }
                >
                  {departments.map((dept) => (
                    <Link key={dept.id} href={`/departments/${dept.id}`}>
                      <motion.div variants={itemVariants}>
                        <Card className="hover:shadow-lg transition-shadow duration-300 bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900">
                          <CardHeader>
                            <CardTitle className="text-xl text-blue-700 dark:text-blue-300">{dept.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-600 dark:text-gray-300 mb-3">
                              {dept.description}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                              Created: {dept.createdAt.toLocaleDateString()}
                            </p>
                            <div className="space-y-3">
                              <div className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="font-semibold">Head:</span>
                                <span className="ml-2">{dept.head}</span>
                              </div>
                              <div className="flex items-center">
                                <Info className="h-4 w-4 mr-2 text-green-500" />
                                <span className="font-semibold">Assistant:</span>
                                <span className="ml-2">{dept.assistant}</span>
                              </div>
                              <div>
                                <span className="font-semibold">Subjects:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {dept.subjects.map((subject) => (
                                    <Badge key={subject} variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                                      {subject}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="font-semibold">Teachers:</span>
                                <ul className="list-disc list-inside mt-2">
                                  {dept.teachers.map((teacher) => (
                                    <li key={teacher} className="text-gray-600 dark:text-gray-300">{teacher}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    </Link>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
