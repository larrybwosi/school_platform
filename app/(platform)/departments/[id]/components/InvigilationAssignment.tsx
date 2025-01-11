'use client'

import React, { useState, useEffect } from 'react'
import { Filter, Plus, User, UserPlus, X, Calendar, Clock, MapPin, Upload, GraduationCap, Loader2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from '@/hooks/use-toast'
import { fetchCourses, fetchExams, fetchInvigilators, fetchRooms } from '../lib/actions'

// Types
interface Room {
  id: string
  capacity: number
  invigilator?: Invigilator
}

interface Invigilator {
  id: number
  name: string
  availability: string[]
  assignedExams: { examId: number; roomId: string }[]
}

interface Course {
  id: string
  code: string
  name: string
}

interface Exam {
  id: number
  name: string
  course: string
  date: string
  time: string
  duration: string
  rooms: Room[]
}

interface NewAssignment {
  name: string
  course: string
  date: string
  time: string
  duration: string
  rooms: string[]
}

export function InvigilationAssignment() {
  const [loading, setLoading] = useState(true);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [exams, setExams] = useState<Exam[]>([]);
  const [invigilators, setInvigilators] = useState<Invigilator[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filterDate, setFilterDate] = useState("");
  const [newAssignment, setNewAssignment] = useState<NewAssignment>({
    name: "",
    course: "",
    date: "",
    time: "",
    duration: "",
    rooms: [],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [examsData, invigilatorsData, roomsData, coursesData] =
          await Promise.all([
            fetchExams(),
            fetchInvigilators(),
            fetchRooms(),
            fetchCourses(),
          ]);
        setExams(examsData);
        setInvigilators(invigilatorsData);
        setRooms(roomsData);
        setCourses(coursesData);
      } catch (error) {
        toast({
          title: "Error loading data",
          description: "Please try again later",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAssignInvigilator = (
    examId: number,
    roomId: string,
    invigilatorId: number
  ) => {
    const selectedInvigilator = invigilators.find(
      (i) => i.id === invigilatorId
    );
    if (!selectedInvigilator) return;

    setExams((prevExams) =>
      prevExams.map((exam) =>
        exam.id === examId
          ? {
              ...exam,
              rooms: exam.rooms.map((room) =>
                room.id === roomId
                  ? { ...room, invigilator: selectedInvigilator }
                  : room
              ),
            }
          : exam
      )
    );

    setInvigilators((prevInvigilators) =>
      prevInvigilators.map((invigilator) =>
        invigilator.id === invigilatorId
          ? {
              ...invigilator,
              assignedExams: [...invigilator.assignedExams, { examId, roomId }],
            }
          : invigilator
      )
    );

    toast({
      title: "Invigilator assigned",
      description: `${selectedInvigilator.name} has been assigned to room ${roomId}`,
    });
  };

  const isInvigilatorAvailable = (
    invigilator: Invigilator,
    exam: Exam | null
  ): boolean => {
    if (!exam || !exam.date || !exam.time) return false;
    const examTime = new Date(`${exam.date}T${exam.time}`).getTime();
    return !invigilator.assignedExams.some((assignedExam) => {
      const assignedExamData = exams.find((e) => e.id === assignedExam.examId);
      if (!assignedExamData || !assignedExamData.date || !assignedExamData.time)
        return false;
      const assignedExamTime = new Date(
        `${assignedExamData.date}T${assignedExamData.time}`
      ).getTime();
      return Math.abs(examTime - assignedExamTime) < 3600000;
    });
  };

  const filteredExams = filterDate
    ? exams.filter((exam) => exam.date === filterDate)
    : exams;

  const handleNewAssignmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAssignment.rooms.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one room",
        variant: "destructive",
      });
      return;
    }

    setExams((prevExams) => [
      ...prevExams,
      {
        ...newAssignment,
        id: prevExams.length + 1,
        rooms: newAssignment.rooms.map((roomId) => ({
          id: roomId,
          capacity: rooms.find((r) => r.id === roomId)?.capacity || 0,
        })),
      },
    ]);

    setShowNewAssignmentModal(false);
    setNewAssignment({
      name: "",
      course: "",
      date: "",
      time: "",
      duration: "",
      rooms: [],
    });

    toast({
      title: "Assignment created",
      description: "New exam assignment has been created successfully",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 p-6 rounded-lg">
        <div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Invigilation Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Streamline your exam supervision assignments
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-40 border-blue-200 dark:border-blue-800 focus:ring-blue-500"
          />
          <Button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 dark:from-blue-500 dark:to-indigo-500"
            onClick={() => setShowNewAssignmentModal(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Assignment
          </Button>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <Card
            key={exam.id}
            className="group hover:shadow-xl transition-all duration-300 border-none bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transform hover:-translate-y-1"
          >
            <CardHeader className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <Badge variant="outline" className="mb-2">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {courses.find((c) => c.code === exam.course)?.name}
                  </Badge>
                  <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                    {exam.name}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSelectedExam(exam);
                    setShowAssignModal(true);
                  }}
                  className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/50 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <UserPlus className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(exam.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50 px-3 py-1.5 rounded-full">
                    <Clock className="h-4 w-4" />
                    <span>{exam.time}</span>
                  </div>
                </div>

                <div className="border-t pt-4 dark:border-gray-700">
                  <h4 className="text-sm font-medium mb-3 text-gray-900 dark:text-gray-100">
                    Room Assignments
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exam.rooms.map((room) => (
                      <div
                        key={room.id}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm ${
                          room.invigilator
                            ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {room.invigilator ? (
                          <>
                            <User className="h-3 w-3" />
                            {room.invigilator.name} ({room.id})
                          </>
                        ) : (
                          <>
                            <MapPin className="h-3 w-3" />
                            {room.id} - Unassigned
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assignment Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Assign Invigilators
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {selectedExam && `Managing assignments for ${selectedExam.name}`}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Available Invigilators
                </h3>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {invigilators
                      .filter((invigilator) =>
                        isInvigilatorAvailable(invigilator, selectedExam)
                      )
                      .map((invigilator) => (
                        <div
                          key={invigilator.id}
                          className="p-4 border rounded-lg hover:border-blue-300 dark:border-gray-700 dark:hover:border-blue-700 transition-all cursor-pointer group bg-white/50 dark:bg-gray-800/50 hover:shadow-md"
                        >
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 flex items-center justify-center">
                              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {invigilator.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                Available: {invigilator.availability.join(", ")}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Room Assignments
                </h3>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-3">
                    {selectedExam?.rooms.map((room) => (
                      <div
                        key={room.id}
                        className="p-4 border rounded-lg dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 hover:shadow-md transition-all"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                  Room {room.id}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  Capacity:{" "}
                                  {
                                    rooms.find((r) => r.id === room.id)
                                      ?.capacity
                                  }{" "}
                                  students
                                </p>
                              </div>
                            </div>
                          </div>

                          {room.invigilator ? (
                            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-4 py-2 rounded-lg">
                              <User className="h-4 w-4" />
                              <span className="font-medium">
                                {room.invigilator.name}
                              </span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="ml-auto hover:bg-green-200 dark:hover:bg-green-800"
                                onClick={() => {
                                  if (!selectedExam) return;
                                  handleAssignInvigilator(
                                    selectedExam.id,
                                    room.id,
                                    -1
                                  ); // -1 to unassign
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Select
                              onValueChange={(value) =>
                                selectedExam &&
                                handleAssignInvigilator(
                                  selectedExam.id,
                                  room.id,
                                  parseInt(value)
                                )
                              }
                            >
                              <SelectTrigger className="w-full bg-white dark:bg-gray-800">
                                <SelectValue placeholder="Select invigilator" />
                              </SelectTrigger>
                              <SelectContent>
                                {invigilators
                                  .filter((invigilator) =>
                                    isInvigilatorAvailable(
                                      invigilator,
                                      selectedExam
                                    )
                                  )
                                  .map((invigilator) => (
                                    <SelectItem
                                      key={invigilator.id}
                                      value={invigilator.id.toString()}
                                      className="cursor-pointer"
                                    >
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
                </ScrollArea>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setShowAssignModal(false)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowAssignModal(false);
                  toast({
                    title: "Assignments saved",
                    description: "Your changes have been saved successfully",
                  });
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Assignment Modal */}
      <Dialog
        open={showNewAssignmentModal}
        onOpenChange={setShowNewAssignmentModal}
      >
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
              Create New Exam Assignment
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              Configure the details for your new exam assignment
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleNewAssignmentSubmit} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="examName"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Exam Name
                  </Label>
                  <Input
                    id="examName"
                    placeholder="Enter the exam name"
                    value={newAssignment.name}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        name: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="course"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Course
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewAssignment({ ...newAssignment, course: value })
                    }
                    required
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Select the course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses.map((course) => (
                        <SelectItem
                          key={course.id}
                          value={course.code}
                          className="cursor-pointer"
                        >
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="date"
                    className="text-gray-700 dark:text-gray-300"
                  >
                    Exam Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={newAssignment.date}
                    onChange={(e) =>
                      setNewAssignment({
                        ...newAssignment,
                        date: e.target.value,
                      })
                    }
                    className="bg-white dark:bg-gray-800"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="time"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Start Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newAssignment.time}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          time: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="text-gray-700 dark:text-gray-300"
                    >
                      Duration
                    </Label>
                    <Input
                      id="duration"
                      placeholder="e.g., 2 hours"
                      value={newAssignment.duration}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          duration: e.target.value,
                        })
                      }
                      className="bg-white dark:bg-gray-800"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Selected Rooms
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setNewAssignment({
                        ...newAssignment,
                        rooms: [...new Set([...newAssignment.rooms, value])],
                      })
                    }
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-800">
                      <SelectValue placeholder="Add exam rooms" />
                    </SelectTrigger>
                    <SelectContent>
                      {rooms
                        .filter(
                          (room) => !newAssignment.rooms.includes(room.id)
                        )
                        .map((room) => (
                          <SelectItem
                            key={room.id}
                            value={room.id}
                            className="cursor-pointer"
                          >
                            Room {room.id} (Capacity: {room.capacity})
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {newAssignment.rooms.map((roomId) => (
                      <div
                        key={roomId}
                        className="group flex items-center gap-2 bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full text-sm"
                      >
                        <MapPin className="h-3 w-3" />
                        Room {roomId}
                        <button
                          type="button"
                          onClick={() =>
                            setNewAssignment({
                              ...newAssignment,
                              rooms: newAssignment.rooms.filter(
                                (id) => id !== roomId
                              ),
                            })
                          }
                          className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300">
                    Exam Paper
                  </Label>
                  <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 px-6 py-10 transition-colors hover:border-blue-400 dark:hover:border-blue-600">
                    <div className="text-center">
                      <Upload
                        className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600"
                        aria-hidden="true"
                      />
                      <div className="mt-4 flex text-sm leading-6 text-gray-600 dark:text-gray-400">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        PDF up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowNewAssignmentModal(false)}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Create Assignment
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InvigilationAssignment;