"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Upload, Search, Users, BookOpen, GraduationCap, ArrowUpDown } from 'lucide-react';
import StudentRow from "@/components/shared/admin.student";
import { mockStudents, Student } from "@/lib/mockData";

type SortConfig = {
  key: keyof Student | 'overallGPA';
  direction: 'asc' | 'desc';
};


export default function StudentAdminPanel() {
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedStream, setSelectedStream] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<'none' | 'grade' | 'stream' | 'status'>('none');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  const { data: gradeData, isLoading: gradeLoading, error: gradeError } = useQuery({
    queryKey: ["gradeData"],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { grades: [9, 10, 11, 12] };
    },
  });

  const { data: streamData, isLoading: streamLoading, error: streamError } = useQuery({
    queryKey: ["streamData"],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { streams: ['Science', 'Commerce', 'Arts'] };
    },
  });

  const handleEditStudent = (studentId: string, updatedFields: Partial<Student>) => {
    console.log("Edit student:", studentId, "Updated fields:", updatedFields);
    // Here you would typically update the student in your backend
  };

  const filteredStudents = useMemo(() => {
    return mockStudents.filter(student => {
      if (selectedGrade !== "all" && student.grade !== parseInt(selectedGrade)) return false;
      if (selectedStream !== "all" && student.stream !== selectedStream) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          student.name.toLowerCase().includes(query) ||
          student.email.toLowerCase().includes(query) ||
          student.id.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedGrade, selectedStream, searchQuery]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      if (sortConfig.key === 'overallGPA') {
        return sortConfig.direction === 'asc' 
          ? (a.performance?.overallGPA || 0) - (b.performance?.overallGPA || 0)
          : (b.performance?.overallGPA || 0) - (a.performance?.overallGPA || 0);
      }
      const aValue = a[sortConfig.key]!;
      const bValue = b[sortConfig.key]!;
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredStudents, sortConfig]);

  const groupedStudents = useMemo(() => {
    if (groupBy === 'none') return { 'All Students': sortedStudents };
    return sortedStudents.reduce((groups, student) => {
      let key;
      switch (groupBy) {
        case 'grade':
          key = `Grade ${student.grade}`;
          break;
        case 'stream':
          key = student.stream;
          break;
        case 'status':
          key = student.status;
          break;
        default:
          key = 'All Students';
      }
      if (!groups[key]) groups[key] = [];
      groups[key].push(student);
      return groups;
    }, {} as Record<string, Student[]>);
  }, [sortedStudents, groupBy]);

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (gradeLoading || streamLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (gradeError || streamError) {
    return <div className="flex justify-center items-center min-h-screen">Error loading data</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Student Management</h1>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStudents.length}</div>
            <p className="text-xs text-muted-foreground">Across all grades and streams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(mockStudents.reduce((sum, student) => sum + (student.performance?.overallGPA || 0), 0) / mockStudents.length).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Overall GPA</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockStudents.filter(student => student.status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">Currently active students</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Records</CardTitle>
          <CardDescription>Manage and view student information</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="grid grid-cols-2 sm:flex overflow-x-auto">
                <TabsTrigger value="all">All Grades</TabsTrigger>
                {gradeData?.grades.map((grade) => (
                  <TabsTrigger key={grade} value={grade.toString()}>{`Grade ${grade}`}</TabsTrigger>
                ))}
              </TabsList>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    {gradeData?.grades.map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>{`Grade ${grade}`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedStream} onValueChange={setSelectedStream}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select stream" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Streams</SelectItem>
                    {streamData?.streams.map((stream) => (
                      <SelectItem key={stream} value={stream}>{stream}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={groupBy} onValueChange={(value: 'none' | 'grade' | 'stream' | 'status') => setGroupBy(value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Group by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="grade">Group by Grade</SelectItem>
                    <SelectItem value="stream">Group by Stream</SelectItem>
                    <SelectItem value="status">Group by Status</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {Object.entries(groupedStudents).map(([group, students]) => (
                <div key={group}>
                  <h3 className="text-lg font-semibold mb-2">{group}</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px] md:hidden"></TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortConfig.key === 'name' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('grade')}>
                            Grade {sortConfig.key === 'grade' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('stream')}>
                            Stream {sortConfig.key === 'stream' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('overallGPA')}>
                            GPA {sortConfig.key === 'overallGPA' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('status')}>
                            Status {sortConfig.key === 'status' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students?.map((student) => (
                          <StudentRow
                            key={student.id}
                            student={student}
                            onEditStudent={handleEditStudent}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
