'use client'
import React, { useState } from 'react';
import { 
  AlertCircle, Calendar, ChevronDown, Clock, Filter, GraduationCap, 
  Search, Users, Check, X, Eye, Bell
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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ExamAdminDashboard = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedExam, setSelectedExam] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const departments = [
    {
      id: "cs",
      name: "Computer Science",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      id: "math",
      name: "Mathematics",
      color: "bg-emerald-500",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      id: "eng",
      name: "Engineering",
      color: "bg-violet-500",
      gradient: "from-violet-500 to-violet-600",
    },
    {
      id: "bio",
      name: "Biology",
      color: "bg-rose-500",
      gradient: "from-rose-500 to-rose-600",
    },
    {
      id: "phy",
      name: "Physics",
      color: "bg-amber-500",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  const examSubmissions = [
    {
      id: 1,
      department: "cs",
      subject: "Data Structures",
      examType: "CAT",
      scheduledDate: "2025-02-15",
      status: "pending",
      submittedBy: "Dr. Smith",
      duration: "2 hours",
      room: "LH-301",
      invigilators: ["Prof. Johnson", "Dr. Williams"],
      maxMarks: 30,
      studentCount: 45,
      requirements: "Scientific calculators allowed",
    },
    {
      id: 2,
      department: "math",
      subject: "Linear Algebra",
      examType: "Final",
      scheduledDate: "2025-02-20",
      status: "approved",
      submittedBy: "Prof. Johnson",
      duration: "3 hours",
      room: "LH-401",
      invigilators: ["Dr. Brown", "Prof. Davis"],
      maxMarks: 100,
      studentCount: 60,
      requirements: "No calculators allowed",
    },
  ];

  const pendingSubmissions = [
    {
      department: "Physics",
      subject: "Quantum Mechanics",
      dueDate: "2025-01-15",
    },
    { department: "Biology", subject: "Cell Biology", dueDate: "2025-01-20" },
  ];

  const handleStatusChange = (examId, newStatus) => {
    // In a real application, this would update the backend
    console.log(`Changing status of exam ${examId} to ${newStatus}`);
  };

  const filteredExams = examSubmissions.filter(
    (exam) =>
      (selectedDepartment === "all" ||
        exam.department === selectedDepartment) &&
      (exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          Exam Administration Portal
        </h1>
        <p className="text-gray-600 text-lg">
          Manage and track examination submissions across departments
        </p>
      </div>

      {/* Pending Submissions Alerts */}
      <div className="space-y-4 mb-8">
        {pendingSubmissions.map((submission, index) => (
          <Alert
            key={index}
            variant="destructive"
            className="bg-red-50 border-red-200"
          >
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertTitle className="text-red-600">Pending Submission</AlertTitle>
            <AlertDescription>
              {submission.department} department hasn't submitted the{" "}
              {submission.subject} exam due by {submission.dueDate}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            title: "Total Submissions",
            value: examSubmissions.length,
            icon: Users,
            color: "blue",
          },
          {
            title: "Pending Reviews",
            value: examSubmissions.filter((e) => e.status === "pending").length,
            icon: Clock,
            color: "amber",
          },
          {
            title: "Active Departments",
            value: departments.length,
            icon: GraduationCap,
            color: "emerald",
          },
          {
            title: "Upcoming Exams",
            value: examSubmissions.length,
            icon: Calendar,
            color: "violet",
          },
        ].map((stat, index) => (
          <Card
            key={index}
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 text-${stat.color}-500`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div
                className={`text-xs text-${stat.color}-500 font-medium mt-1`}
              >
                View details →
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by subject or examiner..."
            className="pl-10 pr-4 py-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <select
            className="border rounded-lg px-4 py-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="all">All Departments</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Exam Submissions Table */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Upcoming Examinations</CardTitle>
              <CardDescription>
                View and manage scheduled examinations
              </CardDescription>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left py-4 px-6 font-medium">
                    Department
                  </th>
                  <th className="text-left py-4 px-6 font-medium">Subject</th>
                  <th className="text-left py-4 px-6 font-medium">Type</th>
                  <th className="text-left py-4 px-6 font-medium">Date</th>
                  <th className="text-left py-4 px-6 font-medium">Room</th>
                  <th className="text-left py-4 px-6 font-medium">Status</th>
                  <th className="text-left py-4 px-6 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${departments.find((d) => d.id === exam.department)?.color}`}
                        />
                        <span className="font-medium">
                          {
                            departments.find((d) => d.id === exam.department)
                              ?.name
                          }
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{exam.subject}</td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-sm bg-gray-100">
                        {exam.examType}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        {new Date(exam.scheduledDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6">{exam.room}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          exam.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {exam.status.charAt(0).toUpperCase() +
                          exam.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedExam(exam);
                            setShowModal(true);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(exam.id, "approved")
                          }
                          className="p-2 hover:bg-green-100 rounded-full transition-colors"
                        >
                          <Check className="h-4 w-4 text-green-600" />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(exam.id, "rejected")
                          }
                          className="p-2 hover:bg-red-100 rounded-full transition-colors"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed View Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl">
          {selectedExam && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2">
                  <div
                    className={`w-3 h-3 rounded-full ${departments.find((d) => d.id === selectedExam.department)?.color}`}
                  />
                  {selectedExam.subject} Examination Details
                </DialogTitle>
                <DialogDescription>
                  Complete information about the scheduled examination
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6 mt-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Department
                    </h3>
                    <p className="text-lg">
                      {
                        departments.find(
                          (d) => d.id === selectedExam.department
                        )?.name
                      }
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Exam Type
                    </h3>
                    <p className="text-lg">{selectedExam.examType}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Date & Time
                    </h3>
                    <p className="text-lg">
                      {new Date(
                        selectedExam.scheduledDate
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Duration
                    </h3>
                    <p className="text-lg">{selectedExam.duration}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Room</h3>
                    <p className="text-lg">{selectedExam.room}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Invigilators
                    </h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedExam.invigilators.map((invigilator, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                          {invigilator}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Maximum Marks
                    </h3>
                    <p className="text-lg">{selectedExam.maxMarks}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Student Count
                    </h3>
                    <p className="text-lg">
                      {selectedExam.studentCount} students
                    </p>
                  </div>
                </div>

                <div className="col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">
                    Special Requirements
                  </h3>
                  <p className="text-lg mt-1 p-4 bg-gray-50 rounded-lg">
                    {selectedExam.requirements}
                  </p>
                </div>

                <div className="col-span-2 border-t pt-4">
                  <div className="flex justify-end gap-4">
                    {selectedExam.status === "pending" && (
                      <>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedExam.id, "rejected");
                            setShowModal(false);
                          }}
                          className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
                        >
                          <X className="h-4 w-4" />
                          Reject
                        </button>
                        <button
                          onClick={() => {
                            handleStatusChange(selectedExam.id, "approved");
                            setShowModal(false);
                          }}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                        >
                          <Check className="h-4 w-4" />
                          Approve
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Department Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {departments.map((dept) => (
          <Card key={dept.id} className="overflow-hidden">
            <div className={`h-2 bg-gradient-to-r ${dept.gradient}`} />
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                {dept.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Upcoming Exams</span>
                  <span className="font-medium">
                    {
                      examSubmissions.filter((e) => e.department === dept.id)
                        .length
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pending Reviews</span>
                  <span className="font-medium">
                    {
                      examSubmissions.filter(
                        (e) =>
                          e.department === dept.id && e.status === "pending"
                      ).length
                    }
                  </span>
                </div>
              </div>
              <button className="w-full mt-4 px-4 py-2 text-sm border rounded-lg hover:bg-gray-50 transition-colors">
                View Department Details
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ExamAdminDashboard;