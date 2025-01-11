'use client'
import React, { useState, useMemo } from 'react';
import {
  Users,
  UserCircle,
  TrendingUp,
  Award,
  Calendar,
  School,
  AlertCircle,
  ArrowUpDown,
  ChevronDown,
  X,
  Filter,
  Search,
  UserPlus,
  BookOpen,
  Mail,
  Phone,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Student } from '@/lib/mockData';


const mockStudents: Student[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@school.edu",
    avatar: "/api/placeholder/100/100",
    grade: 11,
    stream: "Science",
    subjects: {
      "Mathematics": {
        currentGrade: 92,
        pastGrades: [88, 90, 91],
        lastAssessment: {
          name: "Calculus Quiz",
          score: 94,
          date: "2024-01-05"
        }
      },
      "Physics": {
        currentGrade: 88,
        pastGrades: [85, 87, 88],
        lastAssessment: {
          name: "Mechanics Test",
          score: 90,
          date: "2024-01-03"
        }
      }
    },
    attendance: 95,
    status: "active",
    behavior: "Excellent",
    parentContact: "+1-555-0123",
    gender: "Female",
    group: "Advanced Placement",
    club: "Science Club",
    performance: {
      overallGPA: 3.9,
      semesterCredits: 15,
      extracurriculars: ["Debate Team", "Math Olympics"]
    }
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "m.chen@school.edu",
    grade: 10,
    stream: "Arts",
    subjects: {
      "Literature": {
        currentGrade: 95,
        pastGrades: [93, 94, 95],
        lastAssessment: {
          name: "Poetry Analysis",
          score: 96,
          date: "2024-01-04"
        }
      }
    },
    attendance: 88,
    status: "active",
    behavior: "Good",
    parentContact: "+1-555-0124",
    specialNeeds: "None",
    gender: "Male",
    club: "Drama Club"
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "e.wilson@school.edu",
    grade: 11,
    stream: "Humanities",
    subjects: {
      "History": {
        currentGrade: 94,
        pastGrades: [92, 93, 94],
        lastAssessment: { name: "World War II Essay", score: 95, date: "2024-01-02" }
      }
    },
    attendance: 92,
    status: "active",
    behavior: "Excellent",
    parentContact: "+1-555-0125",
    gender: "Female",
    club: "History Club"
  },
  // Add more mock students here...
];

const StudentDashboard: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "asc",
  });
  const [filterConfig, setFilterConfig] = useState({
    status: "all",
    stream: "all",
    grade: "all",
  });
  const [groupBy, setGroupBy] = useState<string | null>(null);

  // Calculate dashboard statistics
  const stats = useMemo(() => {
    return {
      totalStudents: mockStudents.length,
      activeStudents: mockStudents.filter((s) => s.status === "active").length,
      averageAttendance: Math.round(
        mockStudents.reduce((acc, s) => acc + s.attendance, 0) /
          mockStudents.length
      ),
      averageGPA: (
        mockStudents.reduce(
          (acc, s) => acc + (s.performance?.overallGPA || 0),
          0
        ) / mockStudents.length
      ).toFixed(2),
    };
  }, []);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return mockStudents
      .filter((student) => {
        const matchesSearch =
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          filterConfig.status === "all" ||
          student.status === filterConfig.status;
        const matchesStream =
          filterConfig.stream === "all" ||
          student.stream === filterConfig.stream;
        const matchesGrade =
          filterConfig.grade === "all" ||
          student.grade.toString() === filterConfig.grade;
        return matchesSearch && matchesStatus && matchesStream && matchesGrade;
      })
      .sort((a, b) => {
        const direction = sortConfig.direction === "asc" ? 1 : -1;
        if (sortConfig.key === "name")
          return direction * a.name.localeCompare(b.name);
        if (sortConfig.key === "grade") return direction * (a.grade - b.grade);
        if (sortConfig.key === "attendance")
          return direction * (a.attendance - b.attendance);
        return 0;
      });
  }, [mockStudents, searchTerm, sortConfig, filterConfig]);

  // Group students if grouping is enabled
  const groupedStudents = useMemo(() => {
    if (!groupBy) return { "All Students": filteredStudents };
    return filteredStudents.reduce(
      (groups: { [key: string]: Student[] }, student) => {
        const key =
          groupBy === "grade"
            ? `Grade ${student.grade}`
            : groupBy === "stream"
            ? student.stream
            : groupBy === "status"
            ? student.status
            : "Other";
        if (!groups[key]) groups[key] = [];
        groups[key].push(student);
        return groups;
      },
      {}
    );
  }, [filteredStudents, groupBy]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Stats */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Student Management Dashboard
        </h1>
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Users size={24} />
                <div>
                  <p className="text-sm opacity-90">Total Students</p>
                  <h3 className="text-2xl font-bold">{stats.totalStudents}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Activity size={24} />
                <div>
                  <p className="text-sm opacity-90">Active Students</p>
                  <h3 className="text-2xl font-bold">{stats.activeStudents}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Calendar size={24} />
                <div>
                  <p className="text-sm opacity-90">Avg. Attendance</p>
                  <h3 className="text-2xl font-bold">
                    {stats.averageAttendance}%
                  </h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Award size={24} />
                <div>
                  <p className="text-sm opacity-90">Avg. GPA</p>
                  <h3 className="text-2xl font-bold">{stats.averageGPA}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 dark:text-gray-400 text-gray-500`}
              size={20}
            />
            <input
              type="text"
              placeholder="Search students by name or email..."
              className={`w-full pl-10 pr-4 py-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-white bg-white border-gray-200 focus:ring-2 focus:ring-blue-500 transition-colors`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className={`px-4 py-3 rounded-lg border dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 text-gray-500 bg-white border-gray-200 
             focus:ring-2 focus:ring-blue-500 transition-colors`}
            onChange={(e) => setGroupBy(e.target.value || null)}
          >
            <option value="">No Grouping</option>
            <option value="grade">Group by Grade</option>
            <option value="stream">Group by Stream</option>
            <option value="status">Group by Status</option>
          </select>

          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            <UserPlus size={20} />
            Add New Student
          </button>
        </div>
      </div>

      {/* Student Table */}
      <Card
        className={`overflow-hidden transition-colors dark:bg-gray-800 bg-white `}
      >
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={`dark:bg-gray-700 bg-gray-50`}>
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button className="flex items-center gap-1 font-medium">
                      Name
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <button
                      className="flex items-center gap-1"
                      onClick={() =>
                        setSortConfig({
                          key: "grade",
                          direction:
                            sortConfig.key === "grade" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      Grade
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Stream
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    <button
                      className="flex items-center gap-1"
                      onClick={() =>
                        setSortConfig({
                          key: "attendance",
                          direction:
                            sortConfig.key === "attendance" &&
                            sortConfig.direction === "asc"
                              ? "desc"
                              : "asc",
                        })
                      }
                    >
                      Attendance
                      <ArrowUpDown size={16} />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {Object.entries(groupedStudents).map(([group, students]) => (
                  <React.Fragment key={group}>
                    {groupBy && (
                      <tr className="bg-gray-50">
                        <td
                          colSpan={6}
                          className="px-6 py-3 text-sm font-medium text-gray-500"
                        >
                          {group}
                        </td>
                      </tr>
                    )}
                    {students.map((student) => (
                      <tr
                        key={student.id}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedStudent(student)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {student.avatar ? (
                              <img
                                src={student.avatar}
                                alt=""
                                className="w-8 h-8 rounded-full"
                              />
                            ) : (
                              <UserCircle size={32} className="text-gray-400" />
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {student.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          Grade {student.grade}
                        </td>
                        <td className="px-6 py-4 text-gray-500">
                          {student.stream}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 rounded-full bg-gray-200">
                              <div
                                className="h-2 rounded-full bg-blue-600"
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500">
                              {student.attendance}%
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            student.status === "active"
                              ? "bg-green-100 text-green-800"
                              : student.status === "inactive"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-red-100 text-red-800"
                          }`}
                          >
                            {student.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedStudent(student);
                            }}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Student Details Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-200">
          <div
            className={`bg-white dark:bg-gray-800 rounded-xl w-4/5 max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
              selectedStudent ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          >
            <div className="p-6 relative">
              {/* Modal Header */}
              <button
                onClick={() => setSelectedStudent(null)}
                className="absolute right-6 top-6 p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={24} className="text-gray-500" />
              </button>

              <div className="mb-8 border-b pb-6">
                <div className="flex items-center gap-6">
                  {selectedStudent.avatar ? (
                    <img
                      src={selectedStudent.avatar}
                      alt={selectedStudent.name}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center">
                      <UserCircle size={64} className="text-blue-600" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedStudent.name}
                    </h2>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span className="flex items-center gap-1">
                        <Mail size={16} />
                        {selectedStudent.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <School size={16} />
                        Grade {selectedStudent.grade}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {selectedStudent.stream}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content Grid */}
              <div className="grid grid-cols-3 gap-6 mb-6">
                {/* Performance Card */}
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp size={20} />
                      Academic Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(selectedStudent.subjects).map(
                        ([subject, data]) => (
                          <div
                            key={subject}
                            className="border-b last:border-0 pb-4"
                          >
                            <div className="flex justify-between items-center mb-4">
                              <h4 className="font-semibold text-gray-900">
                                {subject}
                              </h4>
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-2xl font-bold ${
                                    data.currentGrade >= 90
                                      ? "text-green-600"
                                      : data.currentGrade >= 80
                                      ? "text-blue-600"
                                      : data.currentGrade >= 70
                                      ? "text-yellow-600"
                                      : "text-red-600"
                                  }`}
                                >
                                  {data.currentGrade}%
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="text-sm font-medium text-gray-600 mb-2">
                                  Grade History
                                </h5>
                                <div className="flex items-end gap-2 h-24">
                                  {data.pastGrades.map((grade, index) => (
                                    <div
                                      key={index}
                                      className="flex-1 bg-blue-600 rounded-t"
                                      style={{
                                        height: `${grade}%`,
                                        opacity: 0.5 + index * 0.15,
                                      }}
                                    />
                                  ))}
                                  <div
                                    className="flex-1 bg-blue-600 rounded-t"
                                    style={{ height: `${data.currentGrade}%` }}
                                  />
                                </div>
                              </div>
                              <div className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="text-sm font-medium text-gray-600 mb-2">
                                  Latest Assessment
                                </h5>
                                <div>
                                  <p className="font-medium text-gray-900">
                                    {data.lastAssessment.name}
                                  </p>
                                  <p className="text-sm text-gray-500">
                                    {data.lastAssessment.date}
                                  </p>
                                  <p
                                    className={`text-lg font-bold mt-2 ${
                                      data.lastAssessment.score >= 90
                                        ? "text-green-600"
                                        : data.lastAssessment.score >= 80
                                        ? "text-blue-600"
                                        : data.lastAssessment.score >= 70
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {data.lastAssessment.score}%
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Info Cards */}
                <div className="space-y-6">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Attendance Overview
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full border-4 border-white/20 flex items-center justify-center">
                          <span className="text-2xl font-bold">
                            {selectedStudent.attendance}%
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-white/20 rounded-full">
                            <div
                              className="h-2 bg-white rounded-full"
                              style={{
                                width: `${selectedStudent.attendance}%`,
                              }}
                            />
                          </div>
                          <p className="text-sm mt-2 text-white/80">
                            Overall Attendance Rate
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone size={16} />
                          {selectedStudent.parentContact}
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail size={16} />
                          {selectedStudent.email}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {selectedStudent.performance && (
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-4">
                          Extracurricular Activities
                        </h3>
                        <div className="space-y-2">
                          {selectedStudent.performance.extracurriculars.map(
                            (activity, index) => (
                              <div
                                key={index}
                                className="bg-gray-50 px-3 py-2 rounded-lg text-gray-700"
                              >
                                {activity}
                              </div>
                            )
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {selectedStudent.specialNeeds && (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Special Needs: {selectedStudent.specialNeeds}
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;