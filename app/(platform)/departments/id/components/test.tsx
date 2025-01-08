'use client'
import { useState } from 'react';
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  Search,
  Filter,
  Plus,
  Book,
  GraduationCap,
  User,
  Mail,
  Phone,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ChevronRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  BookOpen,
  FileText,
  UserPlus,
  Settings,
  BarChart
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock Data
const mockData = {
  teachers: [
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Computer Science', expertise: 'Machine Learning', experience: '12 years', email: 'sarah.j@university.edu', phone: '+1234567890', image: '/api/placeholder/100/100' },
    { id: 2, name: 'Prof. Michael Chen', department: 'Computer Science', expertise: 'Database Systems', experience: '15 years', email: 'michael.c@university.edu', phone: '+1234567891', image: '/api/placeholder/100/100' },
    { id: 3, name: 'Dr. Emily Brown', department: 'Computer Science', expertise: 'Software Engineering', experience: '8 years', email: 'emily.b@university.edu', phone: '+1234567892', image: '/api/placeholder/100/100' },
  ],
  courses: [
    { id: 1, name: 'Advanced Database Systems', code: 'CS401', semester: 4, credits: 4, enrolled: 120, teacher: 'Prof. Michael Chen', progress: 75 },
    { id: 2, name: 'Machine Learning Fundamentals', code: 'CS402', semester: 4, credits: 4, enrolled: 95, teacher: 'Dr. Sarah Johnson', progress: 65 },
    { id: 3, name: 'Software Architecture', code: 'CS403', semester: 4, credits: 3, enrolled: 85, teacher: 'Dr. Emily Brown', progress: 80 },
  ],
  exams: [
    { id: 1, name: 'Database Systems Mid-Term', course: 'CS401', date: '2025-02-20', time: '09:00 AM', duration: '3 hours', rooms: ['Hall A', 'Hall B'] },
    { id: 2, name: 'Machine Learning Quiz', course: 'CS402', date: '2025-02-22', time: '02:00 PM', duration: '1 hour', rooms: ['Lab 1', 'Lab 2'] },
    { id: 3, name: 'Software Architecture Final', course: 'CS403', date: '2025-02-25', time: '10:00 AM', duration: '3 hours', rooms: ['Hall C'] },
  ],
  rooms: [
    { id: 'Hall A', capacity: 60, facilities: ['Projector', 'AC', 'CCTV'] },
    { id: 'Hall B', capacity: 60, facilities: ['Projector', 'AC', 'CCTV'] },
    { id: 'Lab 1', capacity: 30, facilities: ['Computers', 'AC', 'CCTV'] },
    { id: 'Lab 2', capacity: 30, facilities: ['Computers', 'AC', 'CCTV'] },
    { id: 'Hall C', capacity: 80, facilities: ['Projector', 'AC', 'CCTV'] },
  ],
  invigilators: [
    { id: 1, name: 'Dr. Sarah Johnson', availability: ['Morning', 'Afternoon'], assignedExams: 2 },
    { id: 2, name: 'Prof. Michael Chen', availability: ['Morning'], assignedExams: 1 },
    { id: 3, name: 'Dr. Emily Brown', availability: ['Afternoon'], assignedExams: 1 },
  ]
};

// Invigilation Assignment Component
const InvigilationAssignment = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

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
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Assignment
          </button>
        </div>
      </div>

      {/* Exam Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockData.exams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{exam.name}</CardTitle>
                  <CardDescription>{exam.course}</CardDescription>
                </div>
                <button 
                  onClick={() => {
                    setSelectedExam(exam);
                    setShowAssignModal(true);
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
                    {mockData.invigilators.slice(0, 2).map((invigilator) => (
                      <div key={invigilator.id} className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        <User className="h-3 w-3" />
                        {invigilator.name}
                      </div>
                    ))}
                    <button className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1">
                      <Plus className="h-3 w-3" />
                      Add More
                    </button>
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
                  {mockData.invigilators.map((invigilator) => (
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
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:bg-blue-50 p-2 rounded-lg">
                          <Plus className="h-4 w-4" />
                        </button>
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
                          Capacity: {mockData.rooms.find(r => r.id === room)?.capacity}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button className="flex items-center gap-1 text-sm text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-lg">
                          <Plus className="h-3 w-3" />
                          Assign Invigilator
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Confirm Assignments
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Courses Tab Component
const CoursesTab = () => {
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
        {mockData.courses.map((course) => (
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
  );
};

// Teachers Tab Component
const TeachersTab = () => {
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Faculty Management</h2>
          <p className="text-gray-600">View and manage department faculty members</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search faculty..."
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
        {mockData.teachers.map((teacher) => (
          <Card 
            key={teacher.id} 
            className="hover:shadow-lg transition-all duration-200 border-none bg-white/50 backdrop-blur-sm group"
            onClick={() => {
              setSelectedTeacher(teacher);
              setShowTeacherModal(true);
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
                    {mockData.courses.filter(c => c.teacher === teacher.name).length} Courses
                  </span>
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded text-sm">
                    {mockData.invigilators.find(i => i.name === teacher.name)?.assignedExams || 0} Exams
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
                      <CalendarDays className="h-4 w-4" />
                      Schedule Meeting
                    </button>
                  </div>
                </div>

                <div className="col-span-2 space-y-6">
                  <div>
                    <h4 className="font-medium mb-3">Current Courses</h4>
                    <div className="space-y-2">
                      {mockData.courses
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
                      {mockData.exams
                        .filter(exam => 
                          mockData.courses.some(c => 
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
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { InvigilationAssignment, CoursesTab, TeachersTab };