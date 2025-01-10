'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, FileText, Plus, Search, Settings, User, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchCourses } from '@/lib/actions'
import { AddCourseModal } from './AddCourseModal'

interface Course {
  id: number;
  name: string;
  code: string;
  semester: number;
  credits: number;
  enrolled: number;
  teacher: string;
  progress: number;
}
[];
export function CoursesTab() {
  const [courses, setCourses] = useState<Course[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddCourseModal, setShowAddCourseModal] = useState(false)

  useEffect(() => {
    const loadCourses = async () => {
      const coursesData = await fetchCourses()
      setCourses(coursesData)
      setFilteredCourses(coursesData)
    }
    loadCourses()
  }, [])

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacher.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredCourses(filtered)
  }, [searchQuery, courses])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-gray-600 dark:text-gray-400">View and manage department courses</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 w-full sm:w-auto"
            onClick={() => setShowAddCourseModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {course.name}
                    <span className="text-sm text-gray-500 dark:text-gray-400">({course.code})</span>
                  </CardTitle>
                  <CardDescription>Semester {course.semester} • {course.credits} Credits</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">{course.enrolled} Students</span>
                  <Button variant="ghost" size="icon">
                    <Settings className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">{course.teacher}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Course Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Syllabus
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <BarChart className="h-4 w-4" />
                    Analytics
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Students
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddCourseModal
        isOpen={showAddCourseModal}
        onClose={() => setShowAddCourseModal(false)}
        teachers={[]} // You'll need to fetch and pass the teachers data here
      />
    </div>
  )
}

