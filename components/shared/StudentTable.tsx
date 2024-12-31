"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { StudentRow } from "./StudentRow";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Student, Teacher } from "@/lib/mockData";

interface StudentTableProps {
  initialStudents: Student[];
  teacher: Teacher;
  canEditGrades: boolean;
  editableSubjects: string[];
  colorScheme: "default" | "blue" | "green" | "red" | "purple";
  showSelectionCheckbox: boolean;
  initialSearchTerm: string;
}

export function StudentTable({
  initialStudents,
  teacher,
  canEditGrades,
  editableSubjects,
  colorScheme,
  showSelectionCheckbox,
  initialSearchTerm,
}: StudentTableProps) {
  const [students, setStudents] = useState(initialStudents);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const router = useRouter();
  const pathname = usePathname();

  const handleToggleSelection = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleEditStudent = (
    studentId: string,
    updatedFields: Partial<Student>
  ) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId ? { ...student, ...updatedFields } : student
      )
    );
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateSearchParams = (params: Record<string, string>) => {
    const searchParams = new URLSearchParams(window.location.search);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });
    router.push(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <Select
            value={colorScheme}
            onValueChange={(value: typeof colorScheme) =>
              updateSearchParams({ colorScheme: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Color Scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
            </SelectContent>
          </Select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showSelectionCheckbox}
              onChange={(e) =>
                updateSearchParams({
                  showSelection: e.target.checked.toString(),
                })
              }
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span>Show Selection Checkbox</span>
          </label>
        </div>
        <div className="flex items-center space-x-4">
          <Input
            type="text"
            placeholder="Search students..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              updateSearchParams({ search: e.target.value });
            }}
            className="w-64"
          />
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              updateSearchParams({ search: "" });
            }}
          >
            Clear
          </Button>
        </div>
      </div>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            {showSelectionCheckbox && (
              <TableHead className="w-[50px]">Select</TableHead>
            )}
            <TableHead>Student</TableHead>
            <TableHead className="hidden sm:table-cell">Grade</TableHead>
            <TableHead className="hidden md:table-cell">Average</TableHead>
            <TableHead className="hidden lg:table-cell">Stream</TableHead>
            <TableHead className="hidden xl:table-cell">Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialStudents.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              teacher={teacher}
              onEditStudent={handleEditStudent}
              onToggleSelection={handleToggleSelection}
              isSelected={selectedStudents.includes(student.id)}
              showSelectionCheckbox={showSelectionCheckbox}
              colorScheme={colorScheme}
              editableSubjects={editableSubjects}
              canEditGrades={canEditGrades}
            />
          ))}
        </TableBody>
      </Table>
    </>
  );
}
