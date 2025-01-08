'use client';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Search,
  Building2,
  Users,
  Mail,
  MapPin,
  DollarSign,
  BookOpen,
  GraduationCap,
  TrendingUp,
  ChevronRight,
  History,
  BadgeCheck,
} from "lucide-react";
import Link from "next/link";

// Mock data
const mockDepartments = [
  {
    id: 1,
    name: "Computer Science",
    description:
      "Leading department in software development, artificial intelligence, and computer systems engineering. Offering cutting-edge courses in programming, data structures, and machine learning.",
    createdAt: new Date("2020-01-15"),
    updatedAt: new Date("2024-01-10"),
    subjects: [
      { id: 1, name: "Programming Fundamentals" },
      { id: 2, name: "Data Structures" },
      { id: 3, name: "Artificial Intelligence" },
      { id: 4, name: "Web Development" },
    ],
    teachers: [
      {
        id: 1,
        name: "Dr. Alan Turing",
        specialization: "AI & Machine Learning",
      },
      {
        id: 2,
        name: "Prof. Ada Lovelace",
        specialization: "Programming Languages",
      },
      {
        id: 3,
        name: "Dr. John von Neumann",
        specialization: "Computer Architecture",
      },
    ],
    head: {
      id: 1,
      name: "Dr. Alan Turing",
      specialization: "AI & Machine Learning",
    },
    assistant: {
      id: 2,
      name: "Prof. Ada Lovelace",
      specialization: "Programming Languages",
    },
    budget: 500000,
    location: "Tech Building, Floor 3",
    contactEmail: "cs.department@university.edu",
    metrics: {
      studentCount: 450,
      researchProjects: 12,
      publications: 45,
    },
  },
  {
    id: 2,
    name: "Physics",
    description:
      "Exploring the fundamental laws of the universe through theoretical and experimental physics. Research areas include quantum mechanics, astrophysics, and particle physics.",
    createdAt: new Date("2019-09-01"),
    updatedAt: new Date("2024-01-05"),
    subjects: [
      { id: 5, name: "Quantum Mechanics" },
      { id: 6, name: "Astrophysics" },
      { id: 7, name: "Classical Mechanics" },
    ],
    teachers: [
      { id: 4, name: "Dr. Marie Curie", specialization: "Quantum Physics" },
      {
        id: 5,
        name: "Prof. Richard Feynman",
        specialization: "Theoretical Physics",
      },
    ],
    head: { id: 4, name: "Dr. Marie Curie", specialization: "Quantum Physics" },
    assistant: {
      id: 5,
      name: "Prof. Richard Feynman",
      specialization: "Theoretical Physics",
    },
    budget: 750000,
    location: "Science Complex, Wing A",
    contactEmail: "physics.department@university.edu",
    metrics: {
      studentCount: 300,
      researchProjects: 15,
      publications: 60,
    },
  },
  {
    id: 3,
    name: "Mathematics",
    description:
      "Advanced mathematical studies covering algebra, analysis, geometry, and applied mathematics. Strong focus on theoretical foundations and practical applications.",
    createdAt: new Date("2018-08-15"),
    updatedAt: new Date("2024-01-08"),
    subjects: [
      { id: 8, name: "Abstract Algebra" },
      { id: 9, name: "Real Analysis" },
      { id: 10, name: "Topology" },
    ],
    teachers: [
      { id: 6, name: "Dr. Euler Schmidt", specialization: "Abstract Algebra" },
      { id: 7, name: "Prof. Sophie Germain", specialization: "Number Theory" },
    ],
    head: {
      id: 6,
      name: "Dr. Euler Schmidt",
      specialization: "Abstract Algebra",
    },
    assistant: {
      id: 7,
      name: "Prof. Sophie Germain",
      specialization: "Number Theory",
    },
    budget: 400000,
    location: "Mathematics Building, Floor 2",
    contactEmail: "math.department@university.edu",
    metrics: {
      studentCount: 250,
      researchProjects: 8,
      publications: 35,
    },
  },
];

const DepartmentCard = ({ department }) => {
  const teacherCount = department.teachers.length;
  const subjectCount = department.subjects.length;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-2xl group-hover:text-primary transition-colors">
              {department.name}
            </CardTitle>
            <CardDescription>
              <div className="flex items-center gap-2">
                <BadgeCheck className="w-4 h-4 text-primary" />
                Led by {department.head.name}
              </div>
            </CardDescription>
          </div>
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            <Building2 className="w-6 h-6" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <p className="text-gray-600 line-clamp-2">{department.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Faculty Members</div>
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{teacherCount}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Subjects Offered</div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="text-lg font-semibold">{subjectCount}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            {department.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            {department.contactEmail}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4" />
            Budget: ${department.budget?.toLocaleString()}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Research Output</span>
            <span className="text-gray-700">
              {department.metrics.publications} publications
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <History className="w-4 h-4" />
          Established {department.createdAt.getFullYear()}
        </div>
        <Link href={`/departments/${department.id}`}>
          <Button
            variant="ghost"
            className="group-hover:translate-x-1 transition-transform"
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

const DepartmentsOverview = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Metrics for the overview section
  const totalTeachers = mockDepartments.reduce(
    (acc, dept) => acc + dept.teachers.length,
    0
  );
  const totalStudents = mockDepartments.reduce(
    (acc, dept) => acc + dept.metrics.studentCount,
    0
  );
  const totalBudget = mockDepartments.reduce(
    (acc, dept) => acc + (dept.budget || 0),
    0
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Academic Departments</h1>
        <p className="text-gray-500">
          Explore our diverse academic departments and their achievements
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Faculty</p>
                <p className="text-2xl font-bold">{totalTeachers}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <GraduationCap className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Students</p>
                <p className="text-2xl font-bold">{totalStudents}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-100 text-green-600">
                <Users className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Total Budget</p>
                <p className="text-2xl font-bold">
                  ${(totalBudget / 1000000).toFixed(1)}M
                </p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
        <Input
          placeholder="Search departments..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockDepartments
          .filter(
            (dept) =>
              dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              dept.description.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((department) => (
            <DepartmentCard key={department.id} department={department} />
          ))}
      </div>
    </div>
  );
};

export default DepartmentsOverview;
