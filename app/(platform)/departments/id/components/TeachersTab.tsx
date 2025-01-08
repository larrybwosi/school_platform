'use client'

import React, { useState, useEffect } from 'react'
import { Award, Calendar, ChevronRight, Clock, Mail, MapPin, Phone, Plus, Search, User, UserPlus } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { fetchTeachers, fetchCourses, fetchExams, searchFaculty } from '../lib/actions'

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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Faculty Management</h2>
          <p className="text-gray-600">View and manage department faculty members</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Faculty
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <Card 
            key={teacher.id} 
            className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 backdrop-blur-sm group"
            onClick={() => {
              setSelectedTeacher(teacher)
              setShowTeacherModal(true)
            }}
          >
            <CardContent className="pt-6">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden relative group-hover:ring-2 ring-blue-500 transition-all">
                    <img 
                      src={teacher.image} 
                      alt={teacher.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                </div>
                <h3 className="font-medium text-lg group-hover:text-blue-600 transition-colors">{teacher.name}</h3>
                <p className="text-gray-600 text-sm">{teacher.expertise}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{teacher.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="h-4 w-4" />
                  <span>{teacher.experience}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm">
                    {courses.filter(c => c.teacher === teacher.name).length} Courses
                  </span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-sm">
                    {exams.filter(e => courses.some(c => c.code === e.course && c.teacher === teacher.name)).length} Exams
                  </span>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>
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
                <DialogTitle>Faculty Profile</DialogTitle>
              </DialogHeader>
              
              <div className="mt-6 grid grid-cols-3 gap-6">
                <div className="col-span-1">
                  <div className="text-center">
                    <div className="w-32 h-32 rounded-full bg-gray-100 mx-auto mb-4 overflow-hidden">
                      <img 
                        src={selectedTeacher.image} 
                        alt={selectedTeacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-xl">{selectedTeacher.name}</h3>
                    <p className="text-gray-600">{selectedTeacher.expertise}</p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </button>
                  </div>
                </div>

                <div className="col-span-2 space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Current Courses</h4>
                    <div className="space-y-2">
                      {courses
                        .filter(c => c.teacher === selectedTeacher.name)
                        .map(course => (
                          <div key={course.id} className="p-3 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">{course.name}</h5>
                                <p className="text-sm text-gray-600">
                                  {course.code} • Semester {course.semester}
                                </p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-medium">{course.enrolled} Students</span>
                                <div className="text-xs text-gray-500">Progress: {course.progress}%</div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Upcoming Examinations</h4>
                    <div className="space-y-2">
                      {exams
                        .filter(exam => 
                          courses.some(c => 
                            c.code === exam.course && c.teacher === selectedTeacher.name
                          )
                        )
                        .map(exam => (
                          <div key={exam.id} className="p-3 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">{exam.name}</h5>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>{exam.date}</span>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  <span>{exam.time}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded">
                                  {exam.rooms.join(', ')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Exam Invigilation</h4>
                    <div className="space-y-2">
                      {exams
                        .filter(exam => 
                          exam.rooms.some(room => room.invigilator && room.invigilator.id === selectedTeacher.id)
                        )
                        .map(exam => (
                          <div key={exam.id} className="p-3 border rounded-lg bg-gray-50">
                            <div className="flex justify-between items-center">
                              <div>
                                <h5 className="font-medium">{exam.name}</h5>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Calendar className="h-4 w-4" />
                                  <span>{exam.date}</span>
                                  <span>•</span>
                                  <Clock className="h-4 w-4" />
                                  <span>{exam.time}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-600" />
                                <span className="text-sm bg-green-50 text-green-600 px-2 py-1 rounded">
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

