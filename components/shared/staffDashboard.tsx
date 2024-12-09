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
import StudentRow from "@/components/shared/student-row";
import { getViewableStudents, getViewableSubjects } from "@/lib/accessControl";
import { mockStudents, Student, Staff } from "@/lib/mockData";

type SortConfig = {
  key: keyof Student | 'averageGrade';
  direction: 'asc' | 'desc';
};

export default function StaffDashboard({ loggedInStaff }: { loggedInStaff: Staff }) {
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<'none' | 'grade' | 'group'>('none');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  const { data: subjectData, isLoading, error: subjectError } = useQuery({
    queryKey: ["subjectData"],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { subjects: Array.from(new Set(mockStudents.flatMap(student => Object.keys(student.subjects)))) };
    },
  });

  const handleEditGrade = (studentId: string, subject: string, newGrade: number) => {
    console.log("Edit grade for student:", studentId, "Subject:", subject, "New grade:", newGrade);
    // Here you would typically update the grade in your backend
  };

  const viewableStudents = useMemo(() => getViewableStudents(loggedInStaff, mockStudents), [loggedInStaff]);

  const filteredStudents = useMemo(() => {
    return viewableStudents.filter(student => {
      if (selectedSubject !== "all" && !(selectedSubject in student.subjects)) return false;
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
  }, [viewableStudents, selectedSubject, searchQuery]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents].sort((a, b) => {
      if (sortConfig.key === 'averageGrade') {
        const aAvg = Object.values(a.subjects).reduce((sum, subject) => sum + subject.currentGrade, 0) / Object.keys(a.subjects).length;
        const bAvg = Object.values(b.subjects).reduce((sum, subject) => sum + subject.currentGrade, 0) / Object.keys(b.subjects).length;
        return sortConfig.direction === 'asc' ? aAvg - bAvg : bAvg - aAvg;
      }
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredStudents, sortConfig]);

  const groupedStudents = useMemo(() => {
    if (groupBy === 'none') return { 'All Students': sortedStudents };
    return sortedStudents.reduce((groups, student) => {
      const key = groupBy === 'grade' ? `Grade ${student.grade}` : student.group || 'Ungrouped';
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

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (subjectError) {
    return <div className="flex justify-center items-center min-h-screen">Error: {subjectError.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">{loggedInStaff.role.charAt(0).toUpperCase() + loggedInStaff.role.slice(1)} Dashboard</h1>
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
            <div className="text-2xl font-bold">{viewableStudents.length}</div>
            <p className="text-xs text-muted-foreground">Across all subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjectData?.subjects.length}</div>
            <p className="text-xs text-muted-foreground">Active subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Grade</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                viewableStudents.flatMap(student => 
                  Object.values(student.subjects).map(subject => subject.currentGrade)
                ).reduce((a, b) => a + b, 0) / 
                viewableStudents.reduce((acc, student) => acc + Object.keys(student.subjects).length, 0)
              )}%
            </div>
            <p className="text-xs text-muted-foreground">All subjects</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Student Management</CardTitle>
          <CardDescription>Manage your students and their grades</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="grid grid-cols-2 sm:flex overflow-x-auto">
                <TabsTrigger value="all">All Subjects</TabsTrigger>
                {subjectData?.subjects.map((subject) => (
                  <TabsTrigger key={subject} value={subject}>{subject}</TabsTrigger>
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
                <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    {subjectData?.subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={groupBy} onValueChange={(value: 'none' | 'grade' | 'group') => setGroupBy(value)}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Group by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="grade">Group by Grade</SelectItem>
                    <SelectItem value="group">Group by Group</SelectItem>
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
                            Student {sortConfig.key === 'name' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="hidden md:table-cell cursor-pointer" onClick={() => handleSort('grade')}>
                            Grade {sortConfig.key === 'grade' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="cursor-pointer" onClick={() => handleSort('averageGrade')}>
                            Average Grade {sortConfig.key === 'averageGrade' && <ArrowUpDown className="inline ml-2 h-4 w-4" />}
                          </TableHead>
                          <TableHead className="hidden md:table-cell">Last Assessment</TableHead>
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
                            staff={loggedInStaff}
                            onEditGrade={handleEditGrade}
                            viewableSubjects={getViewableSubjects(loggedInStaff, student)}
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
