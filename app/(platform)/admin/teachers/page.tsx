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
import { mockTeachers, Teacher } from "@/lib/mockData";
import TeacherRow from "@/components/shared/teacher-row";
import { EntityRow } from "@/components/shared/unified";

type SortConfig = {
  key: keyof Teacher | 'subjectCount';
  direction: 'asc' | 'desc';
};


export default function AdminPanel() {
  const [selectedRole, setSelectedRole] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState<'none' | 'department' | 'role'>('none');
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', direction: 'asc' });

  const { data: roleData, isLoading, error: roleError } = useQuery({
    queryKey: ["roleData"],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { roles: ['gradeTeacher', 'subjectTeacher', 'admin'] };
    },
  });

  const { data: subjectData, isLoading: subjectLoading, error: subjectError } = useQuery({
    queryKey: ["subjectData"],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { subjects: Array.from(new Set(mockTeachers.flatMap(teacher => Object.keys(teacher.subjects)))) };
    },
  });

  const { data: teachers, isLoading: teachersLoading, error: teachersError } = useQuery({
    queryKey: ["teacherData"],
    queryFn: async () => {
      // Simulated API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockTeachers ;
    },
  });

  const handleEditTeacher = (teacherId: string, updatedFields: Partial<Teacher>) => {
    console.log("Edit teacher:", teacherId, "Updated fields:", updatedFields);
    // Here you would typically update the teacher in your backend
  };

  const filteredTeachers = useMemo(() => {
    return teachers?.filter(teacher => {
      if (selectedRole !== "all" && teacher.role !== selectedRole) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          teacher.name.toLowerCase().includes(query) ||
          teacher.email.toLowerCase().includes(query) ||
          teacher.id.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [selectedRole, searchQuery, teachers]);

  const sortedTeachers = useMemo(() => {
    if (!filteredTeachers) return [];
    const sorted = [...filteredTeachers].sort((a, b) => {
      if (sortConfig.key === 'subjectCount') {
        return sortConfig.direction === 'asc' 
          ? a.subjects.length - b.subjects.length
          : b.subjects.length - a.subjects.length;
      }
      const aValue = a[sortConfig.key]!;
      const bValue = b[sortConfig.key]!;
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredTeachers, sortConfig]);

  const groupedTeachers = useMemo(() => {
    if (groupBy === 'none') return { 'All Teachers': sortedTeachers };
    return sortedTeachers.reduce((groups, teacher) => {
      const key = groupBy === 'department' ? (teacher.department || 'No Department') : teacher.role;
      if (!groups[key]) groups[key] = [];
      groups[key].push(teacher);
      return groups;
    }, {} as Record<string, Teacher[]>);
  }, [sortedTeachers, groupBy]);

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  if (isLoading || teachersLoading || subjectLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (roleError || teachersError || subjectError) {
    return <div className="flex justify-center items-center min-h-screen">Error: {roleError?.message || teachersError?.message || subjectError?.message}</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6 dark:bg-zinc-900">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Teacher Management</h1>
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
        <Card className="dark:bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Total Teachers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockTeachers.length}</div>
            <p className="text-xs text-muted-foreground">Across all roles</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Subjects Covered
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {
                new Set(mockTeachers.flatMap((teacher) => teacher.subjects))
                  .size
              }
            </div>
            <p className="text-xs text-muted-foreground">Unique subjects</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-zinc-900">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold">
              Average Performance
            </CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockTeachers.reduce(
                  (sum, teacher) =>
                    sum + (parseFloat(teacher.performanceIncrease || "0") || 0),
                  0
                ) / mockTeachers.length
              )}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              Performance increase
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="dark:bg-zinc-900">
        <CardHeader>
          <CardTitle>Teacher Management</CardTitle>
          <CardDescription className="font-semibold">
            Manage your teaching staff
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="grid grid-cols-2 sm:flex overflow-x-auto">
                <TabsTrigger className="font-bold" value="all">
                  All Roles
                </TabsTrigger>
                {roleData?.roles.map((role) => (
                  <TabsTrigger className="font-bold" key={role} value={role}>
                    {role}
                  </TabsTrigger>
                ))}
              </TabsList>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-[200px]">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search teachers..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roleData?.roles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={groupBy}
                  onValueChange={(value: "none" | "department" | "role") =>
                    setGroupBy(value)
                  }
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Group by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Grouping</SelectItem>
                    <SelectItem value="department">
                      Group by Department
                    </SelectItem>
                    <SelectItem value="role">Group by Role</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {Object.entries(groupedTeachers).map(([group, teachers]) => (
                <div key={group}>
                  <h3 className="text-lg font-semibold mb-2">{group}</h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[50px] md:hidden"></TableHead>
                          <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("name")}
                          >
                            Name{" "}
                            {sortConfig.key === "name" && (
                              <ArrowUpDown className="inline ml-2 h-4 w-4" />
                            )}
                          </TableHead>
                          <TableHead
                            className="hidden md:table-cell cursor-pointer"
                            onClick={() => handleSort("role")}
                          >
                            Role{" "}
                            {sortConfig.key === "role" && (
                              <ArrowUpDown className="inline ml-2 h-4 w-4" />
                            )}
                          </TableHead>
                          <TableHead
                            className="cursor-pointer"
                            onClick={() => handleSort("subjectCount")}
                          >
                            Subjects{" "}
                            {sortConfig.key === "subjectCount" && (
                              <ArrowUpDown className="inline ml-2 h-4 w-4" />
                            )}
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Grades
                          </TableHead>
                          <TableHead
                            className="hidden md:table-cell cursor-pointer"
                            onClick={() => handleSort("performanceIncrease")}
                          >
                            Performance{" "}
                            {sortConfig.key === "performanceIncrease" && (
                              <ArrowUpDown className="inline ml-2 h-4 w-4" />
                            )}
                          </TableHead>
                          <TableHead className="w-[50px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {teachers?.map((teacher) => (
                          <EntityRow
                            key={teacher.id}
                            data={teacher}
                            type="teacher"
                            onEdit={handleEditTeacher}
                            colorScheme={"default"}
                            showCheckbox={false}
                            editableFields={[
                              "name",
                              "email",
                              "role",
                              "department",
                              "subjects",
                            ]}
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

