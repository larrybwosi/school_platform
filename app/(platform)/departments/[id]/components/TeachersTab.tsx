'use client'

import React, { useState, useEffect } from 'react'
import { Award, Calendar, ChevronRight, Clock, Mail, MapPin, Phone, Plus, Search, User, UserPlus } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { fetchTeachers, fetchCourses, fetchExams, searchFaculty } from '@/lib/actions'

export const TeachersTab: React.FC = () => {
  const [showTeacherModal, setShowTeacherModal] = useState(false)
  const [selectedTeacher, setSelectedTeacher] = useState(null)
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])
  
  const [courses, setCourses] = useState([])
  const [exams, setExams] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadData = async () => {
      const [teachersData, coursesData, examsData] = await Promise.all([
        fetchTeachers(),
        fetchCourses(),
        fetchExams()
      ])
      setTeachers(teachersData)
      setFilteredTeachers(teachersData)
      setCourses(coursesData)
      setExams(examsData)
    }
    loadData()
  }, [])

  useEffect(() => {
    const search = async () => {
      if (searchQuery.trim() === '') {
        setFilteredTeachers(teachers)
      } else {
        const results = await searchFaculty(searchQuery)
        setFilteredTeachers(results)
      }
    }
    search()
  }, [searchQuery, teachers])

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Faculty Management</h2>
          <p className="text-gray-600 dark:text-gray-400">View and manage department faculty members</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => {}}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add Faculty
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card 
            key={teacher.id} 
            className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm group cursor-pointer"
            onClick={() => {
              setSelectedTeacher(teacher)
              setShowTeacherModal(true)
            }}
          >
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto mb-4 overflow-hidden relative group-hover:ring-2 ring-blue-500 transition-all">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800"></div>
                </div>
                <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{teacher.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{teacher.expertise}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Award className="h-4 w-4" />
                  <span>{teacher.experience}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t dark:border-gray-700 flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded text-sm">
                    {courses.filter(c => c.teacher === teacher.name).length} Courses
                  </span>
                  <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 rounded text-sm">
                    {exams.filter(e => courses.some(c => c.code === e.course && c.teacher === teacher.name)).length} Exams
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Teacher Details Modal */}
      <Dialog open={showTeacherModal} onOpenChange={setShowTeacherModal}>
        <DialogContent className="max-w-3xl">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">Faculty Profile</DialogTitle>
              </DialogHeader>
              
              <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-700 mx-auto mb-4 overflow-hidden">
                      <img 
                        src={selectedTeacher.image} 
                        alt={selectedTeacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-xl text-gray-900 dark:text-gray-100">{selectedTeacher.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedTeacher.expertise}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <Button variant="outline" className="w-full">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Meeting
                    </Button>
                  </div>
                </div>

                <div className="col-span-2 space-y-6">
                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Current Courses</h4>
                    <div className="space-y-2">
                      {courses
                        .filter(c => c.teacher === selectedTeacher.name)
                        .map(course => (
                          <div key={course.id} className="p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">{course.name}</h5>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {course.code} • Semester {course.semester}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{course.enrolled} Students</span>
                                <div className="text-xs text-gray-500 dark:text-gray-400">Progress: {course.progress}%</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Upcoming Examinations</h4>
                    <div className="space-y-2">
                      {exams
                        .filter(exam => 
                          courses.some(c => 
                            c.code === exam.course && c.teacher === selectedTeacher.name
                          )
                        )
                        .map(exam => (
                          <div key={exam.id} className="p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">{exam.name}</h5>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Calendar className="h-4 w-4" />
                                  <span>{exam.date}</span>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  <span>{exam.time}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 py-1 rounded">
                                  {exam.rooms.join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3 text-gray-900 dark:text-gray-100">Exam Invigilation</h4>
                    <div className="space-y-2">
                      {exams
                        .filter(exam => 
                          exam.rooms.some(room => room.invigilator && room.invigilator.id === selectedTeacher.id)
                        )
                        .map(exam => (
                          <div key={exam.id} className="p-3 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium text-gray-900 dark:text-gray-100">{exam.name}</h5>
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Calendar className="h-4 w-4" />
                                  <span>{exam.date}</span>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  <span>{exam.time}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                                <span className="text-sm bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 px-2 py-1 rounded">
                                  {exam.rooms.find(room => room.invigilator && room.invigilator.id === selectedTeacher.id).id}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default TeachersTab;

