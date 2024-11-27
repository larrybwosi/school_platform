"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export function SubjectsTable({ subjects, userRole }: any) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Teachers</TableHead>
          {userRole === "admin" && <TableHead>Actions</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {subjects.map((subject: any) => (
          <TableRow key={subject.id}>
            <TableCell className="font-medium">{subject.code}</TableCell>
            <TableCell>{subject.name}</TableCell>
            <TableCell>{subject.description}</TableCell>
            <TableCell>
              {subject.teacherSubjects
                .map((ts: any) => ts.teacher.name)
                .join(", ")}
            </TableCell>
            {userRole === "admin" && (
              <TableCell>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}