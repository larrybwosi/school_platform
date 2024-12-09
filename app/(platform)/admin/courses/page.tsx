"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Book, Clock, MoreHorizontal, Plus, Search, Users } from "lucide-react";

const courses = [
  {
    id: "C001",
    name: "Advanced Mathematics",
    code: "MATH301",
    department: "Mathematics",
    instructor: {
      name: "Dr. Michael Foster",
      avatar: "/avatars/03.png",
    },
    students: 32,
    duration: "1 Semester",
    status: "Active",
    description:
      "Advanced topics in calculus, linear algebra, and differential equations.",
  },
  {
    id: "C002",
    name: "Physics Fundamentals",
    code: "PHY101",
    department: "Science",
    instructor: {
      name: "Prof. Emma Wilson",
      avatar: "/avatars/04.png",
    },
    students: 28,
    duration: "1 Semester",
    status: "Active",
    description:
      "Introduction to basic physics concepts, mechanics, and thermodynamics.",
  },
  // Add more course data as needed
];

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex-1 space-y-4 px-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Course
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">Department Filter</Button>
        <Button variant="outline">Status Filter</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline">{course.code}</Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Edit Course</DropdownMenuItem>
                    <DropdownMenuItem>Manage Students</DropdownMenuItem>
                    <DropdownMenuItem>Course Materials</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardTitle className="line-clamp-1">{course.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                    />
                    <AvatarFallback>
                      {course.instructor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">Instructor</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{course.students} Students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}