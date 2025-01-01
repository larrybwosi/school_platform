"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Book,
  GraduationCap,
  Users,
  Activity,
  AlertTriangle,
  Award,
  Briefcase,
} from "lucide-react";
import { Student, Teacher } from "@/lib/mockData";

interface ViewReportComponentProps {
  student: Student;
  currentUser: Teacher;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewReportComponent({
  student,
  currentUser,
  isOpen,
  onClose,
}: ViewReportComponentProps) {
  const [activeTab, setActiveTab] = useState("academic");

  const canViewPersonalInfo =
    currentUser?.role === "admin" ||
    (currentUser?.role === "subjectTeacher" &&
      currentUser?.subject === "Counseling");
  const canViewMedicalInfo =
    currentUser?.role === "admin" ||
    (currentUser?.role === "subjectTeacher" &&
      currentUser?.subject === "School Nurse");

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600 dark:text-green-400";
    if (grade >= 80) return "text-blue-600 dark:text-blue-400";
    if (grade >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Student Report: {student.name}</DialogTitle>
          <DialogDescription>
            Comprehensive student information and performance report
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              {canViewPersonalInfo && (
                <TabsTrigger value="personal">Personal</TabsTrigger>
              )}
              {canViewMedicalInfo && (
                <TabsTrigger value="medical">Medical</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="details" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Student Details</CardTitle>
                  <CardDescription>
                    Overview of {student.name}&apos;s information
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">Subjects</h4>
                      <ul className="list-disc list-inside">
                        {Object.values(student.subjects).map((subject, i) => (
                          <li
                            key={subject.name}
                            className={getGradeColor(subject.currentGrade)}
                          >
                            {subject.name}: {subject.currentGrade}%
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Additional Information
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          <span className="font-semibold">Behavior:</span>{" "}
                          {student.behavior}
                        </li>
                        <li>
                          <span className="font-semibold">Parent Contact:</span>{" "}
                          {student.parentContact}
                        </li>
                        {student.specialNeeds && (
                          <li>
                            <span className="font-semibold">
                              Special Needs:
                            </span>{" "}
                            {student.specialNeeds}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="academic" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Performance</CardTitle>
                  <CardDescription>
                    Overview of {student.name}&apos;s academic achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Grade Distribution
                      </h4>
                      {Object.values(student.subjects)?.map((subject) => (
                        <div key={subject.name} className="mb-2">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">
                              {subject.name}
                            </span>
                            <span
                              className={`text-sm font-semibold ${getGradeColor(subject.currentGrade)}`}
                            >
                              {subject.currentGrade}%
                            </span>
                          </div>
                          <Progress
                            value={subject.currentGrade}
                            className="h-2"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Academic Highlights
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <GraduationCap className="mr-2 h-4 w-4" />
                          <span>Current Grade: {student.grade}</span>
                        </li>
                        <li className="flex items-center">
                          <Book className="mr-2 h-4 w-4" />
                          <span>Stream: {student.stream}</span>
                        </li>
                        <li className="flex items-center">
                          <Award className="mr-2 h-4 w-4" />
                          <span>Behavior: {student.behavior}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="attendance" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Record</CardTitle>
                  <CardDescription>
                    Overview of {student.name}&apos;s attendance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Attendance Rate
                      </h4>
                      <div className="flex items-center">
                        <Progress value={95} className="h-2 w-1/2 mr-4" />
                        <span className="text-lg font-semibold">95%</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="mb-2 text-sm font-medium">
                        Attendance Summary
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between">
                          <span>Present Days</span>
                          <Badge>180</Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Absent Days</span>
                          <Badge variant="destructive">10</Badge>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Late Arrivals</span>
                          <Badge variant="secondary">5</Badge>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            {canViewPersonalInfo && (
              <TabsContent value="personal" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Confidential personal details of {student.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Contact Information
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            <span>Parent Contact: {student.parentContact}</span>
                          </li>
                          <li className="flex items-center">
                            <Activity className="mr-2 h-4 w-4" />
                            <span>
                              Emergency Contact: {student.parentContact}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Additional Information
                        </h4>
                        <ul className="space-y-2">
                          {student.specialNeeds && (
                            <li className="flex items-center">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              <span>Special Needs: {student.specialNeeds}</span>
                            </li>
                          )}
                          <li className="flex items-center">
                            <Briefcase className="mr-2 h-4 w-4" />
                            <span>
                              Extracurricular Activities: Drama Club, Chess Team
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
            {canViewMedicalInfo && (
              <TabsContent value="medical" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Medical Information</CardTitle>
                    <CardDescription>
                      Confidential medical details of {student.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Medical History
                        </h4>
                        <ul className="space-y-2">
                          <li>Allergies: None reported</li>
                          <li>Medications: None</li>
                          <li>Last Physical Exam: 05/15/2023</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium">
                          Emergency Contacts
                        </h4>
                        <ul className="space-y-2">
                          <li>Primary: {student.parentContact}</li>
                          <li>Secondary: School Nurse (Ext. 235)</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
