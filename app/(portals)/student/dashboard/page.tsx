"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Download, GraduationCap, BookOpen, Clock } from 'lucide-react';
import { mockStudents, Student } from "@/lib/mockData";
import { Button } from "@/components/ui/button";

export default function StudentDashboard() {
  const { data: studentData, isLoading } = useQuery<Student>({
    queryKey: ["studentData"],
    queryFn: async () => {
      // Simulating API call with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      return mockStudents[0];
    },
  });

  if (isLoading || !studentData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  const subjects = Object.entries(studentData.subjects);
  const totalGrade = subjects.reduce((sum, [_, subject]) => sum + subject.currentGrade, 0);
  const averageGrade = totalGrade / subjects.length;
  const gpa = (averageGrade / 20).toFixed(2); // Assuming grades are out of 100, converting to 4.0 scale

  const performanceData = subjects.map(([subjectName, subject]) => ({
    subject: subjectName,
    currentGrade: subject.currentGrade,
    averagePastGrade: subject.pastGrades.reduce((a, b) => a + b, 0) / subject.pastGrades.length
  }));

  return (
    <div className="container mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current GPA</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{gpa}</div>
            <p className="text-xs text-muted-foreground">Based on current grades</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subjects.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled subjects</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Attendance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentData.attendance}%</div>
            <p className="text-xs text-muted-foreground">Overall attendance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
            <CardDescription>Your academic performance by subject</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="currentGrade" name="Current Grade" stroke="#2196F3" strokeWidth={2} />
                  <Line type="monotone" dataKey="averagePastGrade" name="Average Past Grade" stroke="#4CAF50" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Courses</CardTitle>
            <CardDescription>Your enrolled subjects and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {subjects.map(([subjectName, subject]) => (
                <div key={subjectName} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{subjectName}</span>
                    <span className="text-muted-foreground">{subject.currentGrade}%</span>
                  </div>
                  <Progress value={subject.currentGrade} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
          <CardDescription>Your latest assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map(([subjectName, subject]) => (
                  <TableRow key={subjectName}>
                    <TableCell>{subjectName}</TableCell>
                    <TableCell>{subject.lastAssessment.name}</TableCell>
                    <TableCell>{new Date(subject.lastAssessment.date).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">{subject.lastAssessment.score}%</TableCell>
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

