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
import { Edit2, MoreVertical, FileText, Mail, ChevronDown, ChevronUp } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Student } from '@/lib/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface StudentRowProps {
  student: Student;
  onEditStudent: (studentId: string, updatedFields: Partial<Student>) => void;
}

function StudentRow({ student, onEditStudent }: StudentRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Partial<Student>>({});

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return "text-green-600 dark:text-green-400";
    if (gpa >= 3.0) return "text-blue-600 dark:text-blue-400";
    if (gpa >= 2.5) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const handleEditSubmit = () => {
    onEditStudent(student.id, editedStudent);
    setIsEditDialogOpen(false);
    setEditedStudent({});
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
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback className="font-medium">
                {student.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-sm">{student.name}</p>
              <p className="text-muted-foreground text-smoverflow-ellipsis font-semibold">{student.email}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge variant="outline" className="font-semibold">
            Grade {student.grade}
          </Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          {student.stream}
        </TableCell>
        <TableCell>
          <span className={cn("font-medium", getGPAColor(student.performance?.overallGPA || 0))}>
            {student.performance?.overallGPA.toFixed(2)}
          </span>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
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
              <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                <Edit2 className="mr-2 h-4 w-4" />
                Edit Student
              </DropdownMenuItem>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
              <div>
                <h4 className="font-semibold">Subjects</h4>
                <ul className="list-disc list-inside">
                  {Object.keys(student.subjects).map((subject) => (
                    <li key={subject}>{subject}</li>
                  ))}
                </ul>
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
        <DialogContent className="sm:max-w-[425px] w-full h-full sm:h-auto overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Student Information</DialogTitle>
            <DialogDescription>
              Update the student&aquo;s details here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="name" className="sm:text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editedStudent.name || student.name}
                onChange={(e) => setEditedStudent({ ...editedStudent, name: e.target.value })}
                className="col-span-1 sm:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="email" className="sm:text-right">
                Email
              </Label>
              <Input
                id="email"
                value={editedStudent.email || student.email}
                onChange={(e) => setEditedStudent({ ...editedStudent, email: e.target.value })}
                className="col-span-1 sm:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="grade" className="sm:text-right">
                Grade
              </Label>
              <Select
                value={editedStudent.grade?.toString() || student.grade.toString()}
                onValueChange={(value) => setEditedStudent({ ...editedStudent, grade: parseInt(value) })}
              >
                <SelectTrigger className="col-span-1 sm:col-span-3">
                  <SelectValue placeholder="Select a grade" />
                </SelectTrigger>
                <SelectContent>
                  {[9, 10, 11, 12].map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="stream" className="sm:text-right">
                Stream
              </Label>
              <Input
                id="stream"
                value={editedStudent.stream || student.stream}
                onChange={(e) => setEditedStudent({ ...editedStudent, stream: e.target.value })}
                className="col-span-1 sm:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="status" className="sm:text-right">
                Status
              </Label>
              <Select
                value={editedStudent.status || student.status}
                onValueChange={(value) => setEditedStudent({ ...editedStudent, status: value as Student['status'] })}
              >
                <SelectTrigger className="col-span-1 sm:col-span-3">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="behavior" className="sm:text-right">
                Behavior
              </Label>
              <Textarea
                id="behavior"
                value={editedStudent.behavior || student.behavior}
                onChange={(e) => setEditedStudent({ ...editedStudent, behavior: e.target.value })}
                className="col-span-1 sm:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="parentContact" className="sm:text-right">
                Parent Contact
              </Label>
              <Input
                id="parentContact"
                value={editedStudent.parentContact || student.parentContact}
                onChange={(e) => setEditedStudent({ ...editedStudent, parentContact: e.target.value })}
                className="col-span-1 sm:col-span-3"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
              <Label htmlFor="specialNeeds" className="sm:text-right">
                Special Needs
              </Label>
              <Textarea
                id="specialNeeds"
                value={editedStudent.specialNeeds || student.specialNeeds || ''}
                onChange={(e) => setEditedStudent({ ...editedStudent, specialNeeds: e.target.value })}
                className="col-span-1 sm:col-span-3"
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

export default StudentRow;

