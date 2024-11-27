"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Upload,
  Search,
  Users,
  BookOpen,
  GraduationCap,
  Filter,
  SunMoon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Enhanced Student Type with More Fields
interface StudentType {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  class: string;
  currentGrade: number;
  lastAssessment: {
    name: string;
    score: number;
    date: string;
  };
  attendance: number;
  status: 'active' | 'inactive' | 'probation';
  performance: {
    overallGPA: number;
    semesterCredits: number;
    extracurriculars: string[];
  };
  personalInfo: {
    age: number;
    major: string;
    graduationYear: number;
  };
}

// Mock data with enhanced fields
const mockStudents: StudentType[] = [
  {
    id: "ST001",
    name: "John Smith",
    email: "john.s@school.com",
    avatar: "/avatars/01.png",
    class: "Math 101",
    currentGrade: 92,
    lastAssessment: {
      name: "Quiz 3",
      score: 95,
      date: "Mar 15, 2024",
    },
    attendance: 98,
    status: "active",
    performance: {
      overallGPA: 3.7,
      semesterCredits: 15,
      extracurriculars: ["Chess Club", "Debate Team"]
    },
    personalInfo: {
      age: 20,
      major: "Mathematics",
      graduationYear: 2026
    }
  },
  {
    id: "ST002",
    name: "Jane Doe",
    email: "jane.d@school.com",
    avatar: "/avatars/02.png",
    class: "English 102",
    currentGrade: 88,
    lastAssessment: {
      name: "Midterm Exam",
      score: 90,
      date: "Apr 12, 2024",
    },
    attendance: 95,
    status: "active",
    performance: {
      overallGPA: 3.3,
      semesterCredits: 12,
      extracurriculars: ["Debate Team", "Writing Club"]
    },
    personalInfo: {
      age: 19,
      major: "English",
      graduationYear: 2027
    }
  },
  {
    id: "ST003",
    name: "Bob Johnson",
    email: "bob.j@school.com",
    avatar: "/avatars/03.png",
    class: "Computer Science 101",
    currentGrade: 95,
    lastAssessment: {
      name: "Project 1",
      score: 98,
      date: "Feb 28, 2024",
    },
    attendance: 99,
    status: "active",
    performance: {
      overallGPA: 3.9,
      semesterCredits: 18,
      extracurriculars: ["Hackathon Club", "Coding Club"]
    },
    personalInfo: {
      age: 21,
      major: "Computer Science",
      graduationYear: 2025
    }
  },
  
];

export default function TeacherDashboard() {
  const { theme, setTheme } = useTheme();
  const [selectedClass, setSelectedClass] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'probation'>('all');
  const [sortBy, setSortBy] = useState<keyof StudentType>('currentGrade');

  // Advanced Filtering and Sorting
  const filteredAndSortedStudents = useMemo(() => {
    return mockStudents
      .filter(student => {
        const matchesClass = selectedClass === "all" || student.class === selectedClass;
        const matchesSearch = !searchQuery || 
          Object.values(student).some(val => 
            String(val).toLowerCase().includes(searchQuery.toLowerCase())
          );
        const matchesStatus = filterStatus === 'all' || student.status === filterStatus;
        
        return matchesClass && matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortBy];
        const valB = b[sortBy];
        return typeof valA === 'number' && typeof valB === 'number' 
          ? valB - valA 
          : String(valA).localeCompare(String(valB));
      });
  }, [selectedClass, searchQuery, filterStatus, sortBy]);

  // Performance Tracking Memoized Calculations
  const performanceMetrics = useMemo(() => ({
    totalStudents: mockStudents.length,
    activeStudents: mockStudents.filter(s => s.status === 'active').length,
    averageGrade: mockStudents.reduce((sum, s) => sum + s.currentGrade, 0) / mockStudents.length,
  }), [mockStudents]);

  // Toggle Theme Handler
  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme]);

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Responsive Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Teacher Dashboard</h1>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" onClick={toggleTheme}>
                  <SunMoon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Toggle Theme</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" className="flex-grow sm:flex-grow-0">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button className="flex-grow sm:flex-grow-0">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      {/* Performance Cards - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { 
            title: "Total Students", 
            value: performanceMetrics.totalStudents, 
            icon: Users 
          },
          { 
            title: "Active Students", 
            value: performanceMetrics.activeStudents, 
            icon: BookOpen 
          },
          { 
            title: "Avg Grade", 
            value: `${performanceMetrics.averageGrade.toFixed(1)}%`, 
            icon: GraduationCap 
          }
        ].map(metric => (
          <Card key={metric.title} className="hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{metric.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Responsive Filtering Section */}
      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Advanced filtering and grade tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="Math 101">Math 101</SelectItem>
                  <SelectItem value="Math 201">Math 201</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" /> Status
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {['all', 'active', 'inactive', 'probation'].map(status => (
                    <DropdownMenuItem 
                      key={status} 
                      onSelect={() => setFilterStatus(status as any)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="relative w-full sm:w-[250px]">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  {[
                    'Student', 'Class', 'Grade', 
                    'Assessment', 'Status', 'Actions'
                  ].map(header => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedStudents.map(student => (
                  <TableRow key={student.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={student.avatar} />
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-xs text-muted-foreground">{student.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          student.currentGrade >= 90 ? 'default' : 
                          student.currentGrade >= 80 ? 'secondary' : 'destructive'
                        }
                      >
                        {student.currentGrade}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>{student.lastAssessment.name}</div>
                      <div className="text-xs text-muted-foreground">{student.lastAssessment.date}</div>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={
                          student.status === 'active' ? 'outline' : 
                          student.status === 'probation' ? 'warning' : 'destructive'
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost">
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}