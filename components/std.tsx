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
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StudentRowProps {
  student: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    class: string;
    currentGrade: number;
    lastAssessment: {
      name: string;
      score: number;
      date: string;
    };
    attendance: number;
    status: "active" | "inactive" | "suspended";
  };
  onEditGrade?: (studentId: string, newGrade: number) => void;
}

export function StudentRow({ student, onEditGrade }: StudentRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditingGrade, setIsEditingGrade] = useState(false);
  const [newGrade, setNewGrade] = useState(student.currentGrade.toString());
  const [showGradeError, setShowGradeError] = useState(false);

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return "text-green-600 dark:text-green-400 font-semibold";
    if (grade >= 80) return "text-blue-600 dark:text-blue-400 font-semibold";
    if (grade >= 70) return "text-yellow-600 dark:text-yellow-400 font-semibold";
    return "text-red-600 dark:text-red-400 font-semibold";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-500/20";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-500/20";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-500/20";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-500/20";
    }
  };

  const handleGradeSubmit = () => {
    const gradeNum = parseFloat(newGrade);
    if (isNaN(gradeNum) || gradeNum < 0 || gradeNum > 100) {
      setShowGradeError(true);
      return;
    }
    onEditGrade?.(student.id, gradeNum);
    setIsEditingGrade(false);
    setShowGradeError(false);
  };

  return (
    <>
      <TableRow 
        className={cn(
          "group hover:bg-muted/50 transition-colors duration-200",
          isExpanded && "bg-muted/50 shadow-sm",
          "relative overflow-hidden"
        )}
      >
        <TableCell className="py-4 md:py-6">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-10 w-10 border-2 border-primary/10 shrink-0 transition-transform duration-200 group-hover:scale-105">
              <AvatarImage src={student.avatar} alt={student.name} className="object-cover" />
              <AvatarFallback className="font-medium bg-gradient-to-br from-primary/20 to-primary/10">
                {student.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <p className="font-medium truncate">{student.name}</p>
              <p className="text-sm text-muted-foreground truncate">{student.email}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Badge variant="outline" className="font-medium border-primary/20 bg-primary/5">
            {student.class}
          </Badge>
        </TableCell>
        <TableCell>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-2 cursor-help">
                  <span className={cn("font-medium transition-colors", getGradeColor(student.currentGrade))}>
                    {student.currentGrade}%
                  </span>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current Grade</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <div className="space-y-1">
            <p className="font-medium truncate">{student.lastAssessment.name}</p>
            <p className="text-sm text-muted-foreground">
              Score: {student.lastAssessment.score}% • {student.lastAssessment.date}
            </p>
          </div>
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <Badge className={cn("capitalize border", getStatusColor(student.status))}>
            {student.status}
          </Badge>
        </TableCell>
        <TableCell className="text-right">
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => setIsEditingGrade(true)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Grade
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
          </div>
        </TableCell>
      </TableRow>

      {isExpanded && (
        <TableRow className="bg-muted/50 animate-in fade-in slide-in-from-top-1 duration-200">
          <TableCell colSpan={6} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Performance</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 rounded-lg bg-background">
                    <p className="text-muted-foreground">Current Grade</p>
                    <p className={cn("text-lg font-medium", getGradeColor(student.currentGrade))}>
                      {student.currentGrade}%
                    </p>
                  </div>
                  <div className="p-2 rounded-lg bg-background">
                    <p className="text-muted-foreground">Attendance</p>
                    <p className="text-lg font-medium">
                      {student.attendance}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Last Assessment</h4>
                <div className="p-2 rounded-lg bg-background">
                  <p className="font-medium">{student.lastAssessment.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Score: {student.lastAssessment.score}% • {student.lastAssessment.date}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">Quick Actions</h4>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setIsEditingGrade(true)}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Edit Grade
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </TableCell>
        </TableRow>
      )}

      <Dialog open={isEditingGrade} onOpenChange={setIsEditingGrade}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Grade</DialogTitle>
            <DialogDescription>
              Update the grade for {student.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="grade">Grade (0-100)</Label>
              <Input
                id="grade"
                type="number"
                min="0"
                max="100"
                value={newGrade}
                onChange={(e) => {
                  setNewGrade(e.target.value);
                  setShowGradeError(false);
                }}
                className={cn(showGradeError && "border-red-500")}
              />
              {showGradeError && (
                <p className="text-sm text-red-500">Please enter a valid grade between 0 and 100</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditingGrade(false)}>
              Cancel
            </Button>
            <Button onClick={handleGradeSubmit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}