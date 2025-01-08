'use client'

import React, { useState, useEffect } from 'react'
import { Filter, Plus, User, UserPlus, X, Calendar, Clock, MapPin, Upload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchExams, fetchInvigilators, fetchRooms, fetchCourses } from '../lib/actions'

export function InvigilationAssignment() {
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [exams, setExams] = useState([])
  const [invigilators, setInvigilators] = useState([])
  const [rooms, setRooms] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const loadData = async () => {
      const [examsData, invigilatorsData, roomsData, coursesData] = await Promise.all([
        fetchExams(),
        fetchInvigilators(),
        fetchRooms(),
        fetchCourses()
      ])
      setExams(examsData)
      setInvigilators(invigilatorsData)
      setRooms(roomsData)
      setCourses(coursesData)
    }
    loadData()
  }, [])

  const handleAssignInvigilator = (examId, roomId, invigilatorId) => {
    setExams(prevExams => 
      prevExams.map(exam => 
        exam.id === examId
          ? {
              ...exam,
              rooms: exam.rooms.map(room => 
                room === roomId
                  ? { ...room, invigilator: invigilators.find(i => i.id === invigilatorId) }
                  : room
              )
            }
          : exam
      )
    )

    setInvigilators(prevInvigilators => 
      prevInvigilators.map(invigilator => 
        invigilator.id === invigilatorId
          ? { ...invigilator, assignedExams: [...invigilator.assignedExams, { examId, roomId }] }
          : invigilator
      )
    )
  }

  const isInvigilatorAvailable = (invigilator, exam) => {
    if (!exam || !exam.date || !exam.time) return false
    const examTime = new Date(`${exam.date}T${exam.time}`).getTime()
    return !invigilator.assignedExams.some(assignedExam => {
      const assignedExamData = exams.find(e => e.id === assignedExam.examId)
      if (!assignedExamData || !assignedExamData.date || !assignedExamData.time) return false
      const assignedExamTime = new Date(`${assignedExamData.date}T${assignedExamData.time}`).getTime()
      return Math.abs(examTime - assignedExamTime) < 3600000 // 1 hour in milliseconds
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Invigilation Management</h2>
          <p className="text-gray-600">Assign and manage examination invigilators</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            onClick={() => setShowNewAssignmentModal(true)}
          >
            <Plus className="h-4 w-4" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exam.name}</CardTitle>
                  <CardDescription>{courses.find(c => c.code === exam.course)?.name}</CardDescription>
                </div>
                <button 
                  onClick={() => {
                    setSelectedExam(exam)
                    setShowAssignModal(true)
                  }}
                  className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition-colors"
                >
                  <UserPlus className="h-5 w-5" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{exam.rooms.join(', ')}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">Assigned Invigilators</h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.rooms.map(room => (
                      room.invigilator ? (
                        <div key={room} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                          <User className="h-3 w-3" />
                          {room.invigilator.name} ({room})
                        </div>
                      ) : null
                    ))}
                    {exam.rooms.some(room => !room.invigilator) && (
                      <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                        <Plus className="h-3 w-3" />
                        Assign Invigilators
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assignment Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Assign Invigilators</DialogTitle>
            <DialogDescription>
              {selectedExam && `Assign invigilators for ${selectedExam.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Available Invigilators */}
              <div>
                <h3 className="text-sm font-medium mb-3">Available Invigilators</h3>
                <div className="space-y-2">
                  {invigilators.filter(invigilator => isInvigilatorAvailable(invigilator, selectedExam)).map((invigilator) => (
                    <div 
                      key={invigilator.id}
                      className="p-3 border rounded-lg hover:border-blue-200 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">{invigilator.name}</h4>
                            <p className="text-sm text-gray-500">
                              Available: {invigilator.availability.join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Assignment */}
              <div>
                <h3 className="text-sm font-medium mb-3">Room Assignment</h3>
                <div className="space-y-2">
                  {selectedExam?.rooms.map((room) => (
                    <div key={room} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{room}</h4>
                        <span className="text-sm text-gray-500">
                          Capacity: {rooms.find(r => r.id === room)?.capacity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {room.invigilator ? (
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                            <User className="h-3 w-3" />
                            {room.invigilator.name}
                          </div>
                        ) : (
                          <Select onValueChange={(value) => handleAssignInvigilator(selectedExam.id, room, parseInt(value))}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Assign Invigilator" />
                            </SelectTrigger>
                            <SelectContent>
                              {invigilators
                                .filter(invigilator => isInvigilatorAvailable(invigilator, selectedExam))
                                .map((invigilator) => (
                                  <SelectItem key={invigilator.id} value={invigilator.id.toString()}>
                                    {invigilator.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAssignModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowAssignModal(false)}>
                Confirm Assignments
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Assignment Modal */}
      <Dialog open={showNewAssignmentModal} onOpenChange={setShowNewAssignmentModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Exam Assignment</DialogTitle>
            <DialogDescription>
              Fill in the details for the new exam assignment
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="examName">Exam Name</Label>
                  <Input id="examName" placeholder="Enter exam name" />
                </div>
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id.toString()}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="Enter duration (e.g., 2 hours)" />
                </div>
                <div>
                  <Label htmlFor="rooms">Rooms</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms.map((room) => (
                        <SelectItem key={room.id} value={room.id}>
                          {room.id} (Capacity: {room.capacity})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="examPaper">Upload Exam Paper</Label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowNewAssignmentModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowNewAssignmentModal(false)}>
                Create Assignment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

