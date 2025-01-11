"use client";
import React, { useEffect, useState } from "react";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  GraduationCap,
  Search,
  Users,
  Check,
  X,
  Eye,
  Bell,
  Settings,
  ChevronRight,
  Loader2,
} from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Define TypeScript interfaces
interface Department {
  id: string;
  name: string;
  color: string;
  gradient: string;
}

interface ExamSubmission {
  id: number;
  department: string;
  subject: string;
  examType: string;
  scheduledDate: string;
  status: "pending" | "approved" | "rejected";
  submittedBy: string;
  duration: string;
  room: string;
  invigilators: string[];
  maxMarks: number;
  studentCount: number;
  requirements: string;
}

interface PendingSubmission {
  department: string;
  subject: string;
  dueDate: string;
}

interface StatCard {
  title: string;
  value: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

const ExamAdminDashboard: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<ExamSubmission | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notificationCount, setNotificationCount] = useState<number>(3);
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const departments: Department[] = [
    {
      id: "cs",
      name: "Computer Science",
      color: "bg-blue-500/90",
      gradient: "from-blue-500/90 to-blue-600/90",
    },
    {
      id: "math",
      name: "Mathematics",
      color: "bg-emerald-500/90",
      gradient: "from-emerald-500/90 to-emerald-600/90",
    },
    {
      id: "eng",
      name: "Engineering",
      color: "bg-violet-500/90",
      gradient: "from-violet-500/90 to-violet-600/90",
    },
    {
      id: "bio",
      name: "Biology",
      color: "bg-rose-500/90",
      gradient: "from-rose-500/90 to-rose-600/90",
    },
    {
      id: "phy",
      name: "Physics",
      color: "bg-amber-500/90",
      gradient: "from-amber-500/90 to-amber-600/90",
    },
  ];

  const examSubmissions: ExamSubmission[] = [
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

  const pendingSubmissions: PendingSubmission[] = [
    {
      department: "Physics",
      subject: "Quantum Mechanics",
      dueDate: "2025-01-15",
    },
    {
      department: "Biology",
      subject: "Cell Biology",
      dueDate: "2025-01-20",
    },
  ];

  const stats: StatCard[] = [
    {
      title: "Total Submissions",
      value: examSubmissions.length,
      icon: Users,
      color: "blue",
      gradient: "from-blue-500/20 to-blue-600/20",
    },
    {
      title: "Pending Reviews",
      value: examSubmissions.filter((e) => e.status === "pending").length,
      icon: Clock,
      color: "amber",
      gradient: "from-amber-500/20 to-amber-600/20",
    },
    {
      title: "Active Departments",
      value: departments.length,
      icon: GraduationCap,
      color: "emerald",
      gradient: "from-emerald-500/20 to-emerald-600/20",
    },
    {
      title: "Upcoming Exams",
      value: examSubmissions.length,
      icon: Calendar,
      color: "violet",
      gradient: "from-violet-500/20 to-violet-600/20",
    },
  ];

  const handleStatusChange = (
    examId: number,
    newStatus: ExamSubmission["status"]
  ): void => {
    console.log(`Changing status of exam ${examId} to ${newStatus}`);
  };

  const filteredExams = examSubmissions.filter(
    (exam) =>
      (selectedDepartment === "all" ||
        exam.department === selectedDepartment) &&
      (exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.submittedBy.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const fadeIn = "animate-in fade-in duration-300";
  const slideIn = "animate-in slide-in-from-bottom-5 duration-500";

  // Simulate loading state
  const simulateLoading = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  useEffect(() => {
    simulateLoading();
  }, [selectedDepartment, searchQuery]);

  // Enhanced Filters Section
  const FilterSection = () => (
    <div className={`space-y-4 mb-6 ${showFilters ? fadeIn : ""}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Search by subject or examiner..."
            className="pl-10 pr-4 py-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="p-3 rounded-lg border dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
              </TooltipTrigger>
              <TooltipContent>Toggle filters</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <select
            className="border rounded-lg px-4 py-3 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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

      {showFilters && (
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${slideIn}`}>
          <select
            className="border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            defaultValue=""
          >
            <option value="">Filter by Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            defaultValue=""
          >
            <option value="">Filter by Exam Type</option>
            <option value="CAT">CAT</option>
            <option value="Final">Final</option>
          </select>

          <select
            className="border rounded-lg px-4 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            defaultValue=""
          >
            <option value="">Sort By</option>
            <option value="date">Date</option>
            <option value="department">Department</option>
            <option value="status">Status</option>
          </select>
        </div>
      )}
    </div>
  );

  // Enhanced Table Section
  const TableSection = () => (
    <Card className="shadow-lg dark:bg-gray-800/50 dark:border-gray-700 overflow-hidden">
      <CardHeader>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl dark:text-white">
              Examinations
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              View and manage scheduled examinations
            </CardDescription>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "upcoming"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === "past"
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Past
              </button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger className="relative">
                <button className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifications
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                      {notificationCount}
                    </Badge>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  New exam submission
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-500" />
                  Reminder: Review pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700/50">
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Department
                  </th>
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Subject
                  </th>
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Type
                  </th>
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Date
                  </th>
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Room
                  </th>
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 font-medium dark:text-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam) => (
                  <tr
                    key={exam.id}
                    className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            departments.find((d) => d.id === exam.department)
                              ?.color
                          }`}
                        />
                        <span className="font-medium dark:text-gray-200">
                          {
                            departments.find((d) => d.id === exam.department)
                              ?.name
                          }
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6 dark:text-gray-200">
                      {exam.subject}
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant="secondary" className="dark:bg-gray-700">
                        {exam.examType}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 dark:text-gray-200">
                        <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        {new Date(exam.scheduledDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-4 px-6 dark:text-gray-200">
                      {exam.room}
                    </td>
                    <td className="py-4 px-6">
                      <Badge
                        className={`${
                          exam.status === "approved"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        }`}
                      >
                        {exam.status.charAt(0).toUpperCase() +
                          exam.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button
                                onClick={() => {
                                  setSelectedExam(exam);
                                  setShowModal(true);
                                }}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-full transition-colors"
                              >
                                <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>View details</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {exam.status === "pending" && (
                          <>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() =>
                                      handleStatusChange(exam.id, "approved")
                                    }
                                    className="p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-full transition-colors"
                                  >
                                    <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Approve</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <button
                                    onClick={() =>
                                      handleStatusChange(exam.id, "rejected")
                                    }
                                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full transition-colors"
                                  >
                                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  </button>
                                </TooltipTrigger>
                                <TooltipContent>Reject</TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors duration-200 lg:p-8 p-4">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          Exam Administration Portal
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Manage and track examination submissions across departments
        </p>
      </div>
      <FilterSection/>
      <TableSection/>

      {/* Pending Submissions Alerts */}
      <div className="space-y-4 mb-8">
        {pendingSubmissions.map((submission, index) => (
          <Alert
            key={index}
            variant="destructive"
            className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertTitle className="text-red-600 dark:text-red-400">
              Pending Submission
            </AlertTitle>
            <AlertDescription className="dark:text-red-300">
              {submission.department} department hasn't submitted the{" "}
              {submission.subject} exam due by {submission.dueDate}
            </AlertDescription>
          </Alert>
        ))}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="transform transition-all duration-200 hover:scale-105 hover:shadow-lg dark:bg-gray-800/50 dark:border-gray-700"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon
                className={`h-5 w-5 text-${stat.color}-500 dark:text-${stat.color}-400`}
              />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div
                className={`text-xs text-${stat.color}-500 dark:text-${stat.color}-400 font-medium mt-1`}
              >
                View details →
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Enhanced Modal Section */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-3xl dark:bg-gray-800">
          {selectedExam && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl flex items-center gap-2 dark:text-white">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      departments.find((d) => d.id === selectedExam.department)
                        ?.color
                    }`}
                  />
                  {selectedExam.subject} Examination Details
                </DialogTitle>
                <DialogDescription className="dark:text-gray-400">
                  Complete information about the scheduled examination
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <Card className="dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-gray-200">
                      General Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Department
                      </h3>
                      <p className="text-lg dark:text-gray-200">
                        {
                          departments.find(
                            (d) => d.id === selectedExam.department
                          )?.name
                        }
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Exam Type
                      </h3>
                      <Badge className="mt-1 dark:bg-gray-700">
                        {selectedExam.examType}
                      </Badge>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Date & Time
                      </h3>
                      <div className="flex items-center gap-2 mt-1 dark:text-gray-200">
                        <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        {new Date(
                          selectedExam.scheduledDate
                        ).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Duration
                      </h3>
                      <div className="flex items-center gap-2 mt-1 dark:text-gray-200">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        {selectedExam.duration}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-gray-200">
                      Venue & Attendance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Room
                      </h3>
                      <p className="text-lg dark:text-gray-200">
                        {selectedExam.room}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Invigilators
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {selectedExam.invigilators.map((invigilator, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="dark:bg-gray-700"
                          >
                            {invigilator}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Student Count
                      </h3>
                      <div className="flex items-center gap-2 mt-1 dark:text-gray-200">
                        <Users className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        {selectedExam.studentCount} students
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2 dark:bg-gray-800/50 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg dark:text-gray-200">
                      Additional Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Special Requirements
                      </h3>
                      <p className="mt-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg dark:text-gray-200">
                        {selectedExam.requirements}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Maximum Marks
                      </h3>
                      <p className="text-lg dark:text-gray-200">
                        {selectedExam.maxMarks} points
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {selectedExam.status === "pending" && (
                  <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
                    <button
                      onClick={() => {
                        handleStatusChange(selectedExam.id, "rejected");
                        setShowModal(false);
                      }}
                      className="px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors flex items-center gap-2"
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
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Enhanced Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {departments.map((dept) => (
          <Card
            key={dept.id}
            className="overflow-hidden dark:bg-gray-800/50 dark:border-gray-700 transform transition-all duration-200 hover:scale-105 hover:shadow-lg group"
          >
            <div className={`h-2 bg-gradient-to-r ${dept.gradient}`} />
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                  <span className="dark:text-white">{dept.name}</span>
                </div>
                <Settings className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    Upcoming Exams
                  </span>
                  <Badge variant="secondary" className="dark:bg-gray-700">
                    {
                      examSubmissions.filter((e) => e.department === dept.id)
                        .length
                    }
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-gray-400">
                    Pending Reviews
                  </span>
                  <Badge
                    variant="secondary"
                    className={`${
                      examSubmissions.filter(
                        (e) =>
                          e.department === dept.id && e.status === "pending"
                      ).length > 0
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "dark:bg-gray-700"
                    }`}
                  >
                    {
                      examSubmissions.filter(
                        (e) =>
                          e.department === dept.id && e.status === "pending"
                      ).length
                    }
                  </Badge>
                </div>
                <div className="pt-4 border-t dark:border-gray-700">
                  <button className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                    View Department Details
                    <ChevronRight className="h-4 w-4" />
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

export default ExamAdminDashboard;
