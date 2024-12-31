"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge, badgeVariants } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { Edit2, MoreVertical, FileText, Mail, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Teacher } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockDepartments = [
  "Mathematics",
  "Science",
  "English",
  "History",
  "Physical Education",
  "Art",
  "Music",
  "Computer Science",
];

interface TeacherRowProps {
  teacher: Teacher;
  onEditTeacher: (teacherId: string, updatedFields: Partial<Teacher>) => void;
}

function TeacherRow({ teacher, onEditTeacher }: TeacherRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState<Partial<Teacher>>({});

  const getPerformanceColor = (performance: string) => {
    const value = parseFloat(performance);
    if (value >= 10) return "text-green-600 dark:text-green-400";
    if (value >= 5) return "text-blue-600 dark:text-blue-400";
    if (value >= 0) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const handleEditSubmit = () => {
    onEditTeacher(teacher.id, editedTeacher);
    setIsEditDialogOpen(false);
    setEditedTeacher({});
  };

  return (
    <>
      <TableRow 
        className={cn(
          "group hover:bg-muted/50 transition-colors",
          isExpanded && "bg-muted/50"
        )}
      >
        <TableCell className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarFallback className="font-bold">
                {teacher.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{teacher.name}</p>
              <p className="text-sm text-muted-foreground font-semibold">{teacher.email}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge 
            variant="outline" 
            className={cn(
              "capitalize font-semibold",
              teacher.role === 'admin' && badgeVariants({ variant: "destructive" }),
              teacher.role === 'gradeTeacher' && badgeVariants({ variant: "default" })
            )}
          >
            {teacher.role}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex flex-wrap gap-1">
            {teacher.subjects.map((subject, index) => (
              <Badge key={index} variant="outline" className="font-semibold">
                {subject}
              </Badge>
            ))}
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {teacher.grades ? teacher.grades.join(", ") : "N/A"}
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <span className={cn("font-medium", getPerformanceColor(teacher.performanceIncrease || "0"))}>
            {teacher.performanceIncrease || "0"}%
          </span>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only font-bold">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem className="font-bold" onClick={() => setIsEditDialogOpen(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Teacher
              </DropdownMenuItem>
              <DropdownMenuItem className="font-bold">
                <FileText className="mr-2 h-4 w-4" />
                View Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="font-bold">
                <Mail className="mr-2 h-4 w-4" />
                Contact Teacher
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
              <div>
                <h4 className="font-semibold">Department</h4>
                <p>{teacher.department || "N/A"}</p>
              </div>
              <div>
                <h4 className="font-semibold">Subjects</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {teacher.subjects.map((subject, index) => (
                    <Badge key={index} variant="outline" className="font-medium">
                      {subject}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Grades</h4>
                <p className="font-bold">{teacher.grades ? teacher.grades.join(", ") : "N/A"}</p>
              </div>
              <div>
                <h4 className="font-semibold">Performance Increase</h4>
                <p>{teacher.performanceIncrease || "0"}%</p>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Make changes to the teacher&apos;s information here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedTeacher.name || teacher.name}
                onChange={(e) => setEditedTeacher({ ...editedTeacher, name: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={editedTeacher.role || teacher.role}
                onValueChange={(value) => setEditedTeacher({ ...editedTeacher, role: value as Teacher['role'] })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="gradeTeacher">Grade Teacher</SelectItem>
                  <SelectItem value="subjectTeacher">Subject Teacher</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="department" className="text-right">
                Department
              </Label>
              <Select
                value={editedTeacher.department || teacher.department || ''}
                onValueChange={(value) => setEditedTeacher({ ...editedTeacher, department: value })}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a department" />
                </SelectTrigger>
                <SelectContent>
                  {mockDepartments.map((dept) => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="subjects" className="text-right">
                Subjects
              </Label>
              <Input
                id="subjects"
                value={editedTeacher.subjects?.join(", ") || teacher.subjects.join(", ")}
                onChange={(e) => setEditedTeacher({ ...editedTeacher, subjects: e.target.value.split(", ") })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grades" className="text-right">
                Grades
              </Label>
              <Input
                id="grades"
                value={editedTeacher.grades?.join(", ") || teacher.grades?.join(", ") || ''}
                onChange={(e) => setEditedTeacher({ ...editedTeacher, grades: e.target.value.split(", ").map(Number) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditSubmit}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default TeacherRow;

