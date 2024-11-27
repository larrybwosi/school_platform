"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { 
  Edit2, 
  MoreVertical, 
  FileText, 
  Mail, 
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Student, Teacher } from '@/lib/mockData';
import { canEditGrade, getEditableSubjects } from '@/lib/accessControl';

interface StudentRowProps {
  student: Student;
  teacher: Teacher;
  onEditGrade: (studentId: string, subject: string, newGrade: number) => void;
  viewableSubjects: string[];
}

export function StudentRow({ student, teacher, onEditGrade, viewableSubjects }: StudentRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [newGrade, setNewGrade] = useState<number | null>(null);

  const editableSubjects = getEditableSubjects(teacher, student);

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600 dark:text-green-400";
    if (grade >= 80) return "text-blue-600 dark:text-blue-400";
    if (grade >= 70) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handleEditSubmit = () => {
    if (selectedSubject && newGrade !== null) {
      onEditGrade(student.id, selectedSubject, newGrade);
      setIsEditDialogOpen(false);
      setSelectedSubject(null);
      setNewGrade(null);
    }
  };

  const averageGrade = viewableSubjects.reduce((sum, subject) => sum + student.subjects[subject].currentGrade, 0) / viewableSubjects.length;

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
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="font-medium">
                {student.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-muted-foreground">{student.email}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge variant="outline" className="font-medium">
            Grade {student.grade}
          </Badge>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            <span className={cn("font-medium", getGradeColor(averageGrade))}>
              {averageGrade.toFixed(1)}%
            </span>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <div className="space-y-1">
            {viewableSubjects.map(subject => (
              <p key={subject} className="text-sm">
                <span className="font-medium">{subject}:</span> {student.subjects[subject].currentGrade}%
              </p>
            ))}
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge className={cn("capitalize", getStatusColor(student.status))}>
            {student.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              {editableSubjects.map(subject => (
                <DropdownMenuItem key={subject} onClick={() => {
                  setSelectedSubject(subject);
                  setNewGrade(student.subjects[subject].currentGrade);
                  setIsEditDialogOpen(true);
                }}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit {subject} Grade
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                View Report
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Mail className="mr-2 h-4 w-4" />
                Contact Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6}>
            <div className="grid grid-cols-2 gap-4 p-4">
              <div>
                <h4 className="font-semibold">Attendance</h4>
                <p>{student.attendance}%</p>
              </div>
              <div>
                <h4 className="font-semibold">Behavior</h4>
                <p>{student.behavior}</p>
              </div>
              <div>
                <h4 className="font-semibold">Parent Contact</h4>
                <p>{student.parentContact}</p>
              </div>
              {student.specialNeeds && (
                <div>
                  <h4 className="font-semibold">Special Needs</h4>
                  <p>{student.specialNeeds}</p>
                </div>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Grade for {student.name}</DialogTitle>
            <DialogDescription>
              Update the current grade for {selectedSubject}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">
                Grade
              </Label>
              <Input
                id="grade"
                type="number"
                value={newGrade ?? ''}
                onChange={(e) => setNewGrade(Number(e.target.value))}
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

