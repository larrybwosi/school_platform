"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface Student {
  id: string;
  name: string;
  grade: number;
  clubsJoined: number;
  eventsAttended: number;
  activityScore: number;
  lastActive: string;
}

const students: Student[] = [
  {
    id: "1",
    name: "Alice Johnson",
    grade: 11,
    clubsJoined: 3,
    eventsAttended: 15,
    activityScore: 95,
    lastActive: "2024-03-15",
  },
  {
    id: "2",
    name: "Bob Smith",
    grade: 10,
    clubsJoined: 2,
    eventsAttended: 8,
    activityScore: 78,
    lastActive: "2024-03-14",
  },
  // Add more student data as needed
];

export function StudentActivity() {
  const [sortField, setSortField] = useState<keyof Student>("activityScore");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedStudents = [...students].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    return sortDirection === "asc" 
      ? (aValue < bValue ? -1 : 1)
      : (aValue > bValue ? -1 : 1);
  });

  const toggleSort = (field: keyof Student) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Student Activity Rankings</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("grade")}>
                Grade
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("clubsJoined")}>
                Clubs
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("eventsAttended")}>
                Events
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => toggleSort("activityScore")}>
                Activity Score
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.clubsJoined}</TableCell>
              <TableCell>{student.eventsAttended}</TableCell>
              <TableCell>
                <Badge variant={student.activityScore >= 90 ? "default" : "secondary"}>
                  {student.activityScore}%
                </Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>View Attendance</DropdownMenuItem>
                    <DropdownMenuItem>Contact Student</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}