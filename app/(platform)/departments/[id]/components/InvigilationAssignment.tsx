'use client'

import React, { useState, useEffect } from 'react'
import { Filter, Plus, User, UserPlus, X, Calendar, Clock, MapPin, Upload } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchExams, fetchInvigilators, fetchRooms, fetchCourses } from '@/lib/actions'

export function InvigilationAssignment() {
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState(null)
  const [exams, setExams] = useState([])
  const [invigilators, setInvigilators] = useState([])
  const [rooms, setRooms] = useState([])
  const [courses, setCourses] = useState([])
  const [filterDate, setFilterDate] = useState('')
  const [newAssignment, setNewAssignment] = useState({
    name: '',
    course: '',
    date: '',
    time: '',
    duration: '',
    rooms: []
  })

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
                room.id === roomId
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

  const filteredExams = filterDate
    ? exams.filter(exam => exam.date === filterDate)
    : exams

  const handleNewAssignmentSubmit = (e) => {
    e.preventDefault()
    // Add the new assignment to the exams list
    setExams(prevExams => [...prevExams, { ...newAssignment, id: prevExams.length + 1, rooms: newAssignment.rooms.map(roomId => ({ id: roomId })) }])
    setShowNewAssignmentModal(false)
    setNewAssignment({ name: '', course: '', date: '', time: '', duration: '', rooms: [] })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Invigilation Management</h2>
          <p className="text-gray-600 dark:text-gray-400">Assign and manage examination invigilators</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-40"
          />
          <Button 
            className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 flex items-center gap-2"
            onClick={() => setShowNewAssignmentModal(true)}
          >
            <Plus className="h-4 w-4" />
            New Assignment
          </Button>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100">{exam.name}</CardTitle>
                  <CardDescription>{courses.find(c => c.code === exam.course)?.name}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedExam(exam)
                    setShowAssignModal(true)
                  }}
                  className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50"
                >
                  <UserPlus className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Calendar className="h-4 w-4" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{exam.rooms.map(room => room.id).join(', ')}</span>
                  </div>
                </div>

                <div className="border-t pt-4 dark:border-gray-700">
                  <h4 className="text-sm font-medium mb-2 text-gray-900 dark:text-gray-100">Assigned Invigilators</h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.rooms.map(room => (
                      room.invigilator ? (
                        <div key={room.id} className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                          <User className="h-3 w-3" />
                          {room.invigilator.name} ({room.id})
                        </div>
                      ) : null
                    ))}
                    {exam.rooms.some(room => !room.invigilator) && (
                      <Button variant="link" size="sm" className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 p-0 h-auto">
                        <Plus className="h-3 w-3 mr-1" />
                        Assign Invigilators
                      </Button>
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
            <DialogTitle className="text-gray-900 dark:text-gray-100">Assign Invigilators</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {selectedExam && `Assign invigilators for ${selectedExam.name}`}
            </DialogDescription>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Available Invigilators */}
              <div>
                <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">Available Invigilators</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {invigilators.filter(invigilator => isInvigilatorAvailable(invigilator, selectedExam)).map((invigilator) => (
                    <div 
                      key={invigilator.id}
                      className="p-3 border rounded-lg hover:border-blue-200 dark:border-gray-700 dark:hover:border-blue-700 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">{invigilator.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
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
                <h3 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">Room Assignment</h3>
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {selectedExam?.rooms.map((room) => (
                    <div key={room.id} className="p-3 border rounded-lg dark:border-gray-700">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{room.id}</h4>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Capacity: {rooms.find(r => r.id === room.id)?.capacity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {room.invigilator ? (
                          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                            <User className="h-3 w-3" />
                            {room.invigilator.name}
                          </div>
                        ) : (
                          <Select onValueChange={(value) => handleAssignInvigilator(selectedExam.id, room.id, parseInt(value))}>
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

            <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
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
            <DialogTitle className="text-gray-900 dark:text-gray-100">Create New Exam Assignment</DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Fill in the details for the new exam assignment
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleNewAssignmentSubmit}>
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="examName">Exam Name</Label>
                    <Input 
                      id="examName" 
                      placeholder="Enter exam name" 
                      value={newAssignment.name}
                      onChange={(e) => setNewAssignment({...newAssignment, name: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="course">Course</Label>
                    <Select 
                      onValueChange={(value) => setNewAssignment({...newAssignment, course: value})}
                      required
                    >
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
                    <Input 
                      id="date" 
                      type="date" 
                      value={newAssignment.date}
                      onChange={(e) => setNewAssignment({...newAssignment, date: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input 
                      id="time" 
                      type="time" 
                      value={newAssignment.time}
                      onChange={(e) => setNewAssignment({...newAssignment, time: e.target.value})}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="duration">Duration</Label>
                    <Input 
                      id="duration" 
                      placeholder="Enter duration (e.g., 2 hours)" 
                      value={newAssignment.duration}
                      onChange={(e) => setNewAssignment({...newAssignment, duration: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="rooms">Rooms</Label>
                    <Select 
                      onValueChange={(value) => setNewAssignment({...newAssignment, rooms: [...newAssignment.rooms, value]})}
                      required
                    >
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
                    <div className="mt-2 flex flex-wrap gap-2">
                      {newAssignment.rooms.map((roomId) => (
                        <div key={roomId} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm flex items-center">
                          {roomId}
                          <button
                            type="button"
                            onClick={() => setNewAssignment({...newAssignment, rooms: newAssignment.rooms.filter(id => id !== roomId)})}
                            className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="examPaper">Upload Exam Paper</Label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 dark:border-gray-100/25 px-6 py-10">
                      <div className="text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md bg-white dark:bg-gray-800 font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                          >
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600 dark:text-gray-400">PDF up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t dark:border-gray-700">
                <Button variant="outline" onClick={() => setShowNewAssignmentModal(false)} type="button">
                  Cancel
                </Button>
                <Button type="submit">
                  Create Assignment
                </Button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

