'use client'

import React, { useState, useEffect } from 'react'
import { BarChart, FileText, Plus, Search, Settings, User, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchCourses } from '../lib/actions'

export function CoursesTab() {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const loadCourses = async () => {
      const coursesData = await fetchCourses()
      setCourses(coursesData)
    }
    loadCourses()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Course Management</h2>
          <p className="text-gray-600">View and manage department courses</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search courses..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {course.name}
                    <span className="text-sm text-gray-500">({course.code})</span>
                  </CardTitle>
                  <CardDescription>Semester {course.semester} • {course.credits} Credits</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{course.enrolled} Students</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Settings className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-600">{course.teacher}</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Course Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    <FileText className="h-4 w-4" />
                    Syllabus
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                    <BarChart className="h-4 w-4" />
                    Analytics
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                    <Users className="h-4 w-4" />
                    Students
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

