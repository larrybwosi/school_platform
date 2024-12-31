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
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Edit2,
  MoreVertical,
  FileText,
  Mail,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ViewReportComponent } from "./ViewReportComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Teacher, Student, Subject } from "@/lib/mockData";

interface StudentRowProps {
  student: Student;
  teacher: Teacher;
  onEditStudent: (studentId: string, updatedFields: Partial<Student>) => void;
  onToggleSelection: (studentId: string) => void;
  isSelected: boolean;
  showSelectionCheckbox?: boolean;
  colorScheme?: "default" | "blue" | "green" | "red" | "purple";
  editableSubjects: string[];
  canEditGrades: boolean;
}

export function StudentRow({
  student,
  teacher,
  onEditStudent,
  onToggleSelection,
  isSelected,
  showSelectionCheckbox = false,
  colorScheme = "default",
  editableSubjects,
  canEditGrades,
}: StudentRowProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Partial<Student>>({});
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);

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

  const getColorScheme = () => {
    switch (colorScheme) {
      case "blue":
        return "hover:bg-blue-50 dark:hover:bg-blue-900/20";
      case "green":
        return "hover:bg-green-50 dark:hover:bg-green-900/20";
      case "red":
        return "hover:bg-red-50 dark:hover:bg-red-900/20";
      case "purple":
        return "hover:bg-purple-50 dark:hover:bg-purple-900/20";
      default:
        return "hover:bg-muted/50";
    }
  };

  const handleEditSubmit = () => {
    onEditStudent(student.id, editedStudent);
    setIsEditDialogOpen(false);
    setEditedStudent({});
  };

  const handleSubjectEdit = (subject: Subject) => {
    setEditingSubject(subject);
  };

  const handleSubjectEditSubmit = () => {
    if (editingSubject) {
      const updatedSubjects = student?.subjects?.map((s) =>
        s.name === editingSubject.name ? editingSubject : s
      );
      onEditStudent(student.id, { subjects: updatedSubjects });
      setEditingSubject(null);
    }
  };

  // const averageGrade =
  //   student?.subjects?.reduce((sum, subject) => sum + subject.currentGrade, 0) /
  //   student?.subjects?.length;
  const averageGrade =80

  return (
    <>
      <TableRow className={cn("group transition-colors", getColorScheme())}>
        {showSelectionCheckbox && (
          <TableCell>
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelection(student.id)}
              aria-label={`Select ${student.name}`}
            />
          </TableCell>
        )}
        <TableCell className="pl-4 sm:pl-6 md:pl-0">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-primary/10">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="font-medium">
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm">{student.name}</p>
              <p className="text-muted-foreground text-sm overflow-ellipsis font-semibold">
                {student.email}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge variant="outline" className="font-semibold">
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
        <TableCell className="hidden sm:table-cell">{student.stream}</TableCell>
        <TableCell className="hidden lg:table-cell">
          <Badge className={cn("capitalize", getStatusColor(student.status))}>
            {student.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {canEditGrades && (
                <DropdownMenuItem
                  onClick={() => setIsEditDialogOpen(true)}
                  className="hover:bg-muted focus:bg-muted"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  {teacher.subjects ? "Edit Grade" : "Edit Student"}
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => setIsReportOpen(true)}
                className="hover:bg-muted focus:bg-muted"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Student Information</DialogTitle>
            <DialogDescription>
              Update the student&apos;s details here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedStudent.name || student.name}
                onChange={(e) =>
                  setEditedStudent({ ...editedStudent, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editedStudent.email || student.email}
                onChange={(e) =>
                  setEditedStudent({ ...editedStudent, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="grade" className="text-right">
                Grade
              </Label>
              <Select
                value={
                  editedStudent.grade?.toString() || student.grade.toString()
                }
                onValueChange={(value) =>
                  setEditedStudent({ ...editedStudent, grade: parseInt(value) })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a grade" />
                </SelectTrigger>
                <SelectContent>
                  {[9, 10, 11, 12].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stream" className="text-right">
                Stream
              </Label>
              <Input
                id="stream"
                value={editedStudent.stream || student.stream}
                onChange={(e) =>
                  setEditedStudent({ ...editedStudent, stream: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="text-right">
                Status
              </Label>
              <Select
                value={editedStudent.status || student.status}
                onValueChange={(value) =>
                  setEditedStudent({
                    ...editedStudent,
                    status: value as Student["status"],
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleEditSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog
        open={!!editingSubject}
        onOpenChange={() => setEditingSubject(null)}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Subject Grade</DialogTitle>
            <DialogDescription>
              Update the grade for {editingSubject?.name}. Click save when
              you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currentGrade" className="text-right">
                Current Grade
              </Label>
              <Input
                id="currentGrade"
                type="number"
                value={editingSubject?.currentGrade || ""}
                onChange={(e) =>
                  setEditingSubject((prev) =>
                    prev
                      ? { ...prev, currentGrade: Number(e.target.value) }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="previousGrade" className="text-right">
                Previous Grade
              </Label>
              <Input
                id="previousGrade"
                type="number"
                value={editingSubject?.previousGrade || ""}
                onChange={(e) =>
                  setEditingSubject((prev) =>
                    prev
                      ? { ...prev, previousGrade: Number(e.target.value) }
                      : null
                  )
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubjectEditSubmit}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ViewReportComponent
        student={student}
        currentUser={teacher}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />
    </>
  );
}
