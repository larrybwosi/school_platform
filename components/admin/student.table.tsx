import { useState } from "react"
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Student } from "@/lib/mockData"

interface StudentTableProps {
  students: Student[]
  sortConfig: { key: keyof Student; direction: 'asc' | 'desc' } | null
  setSortConfig: (config: { key: keyof Student; direction: 'asc' | 'desc' } | null) => void
  currentPage: number
  setCurrentPage: (page: number) => void
  totalPages: number
}

export default function StudentTable({ 
  students, sortConfig, setSortConfig, currentPage, setCurrentPage, totalPages 
}: StudentTableProps) {
  const [expandedStudent, setExpandedStudent] = useState<string | null>(null)

  const handleSort = (key: keyof Student) => {
    setSortConfig(
      sortConfig && sortConfig.key === key
        ? { key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' }
        : { key, direction: 'asc' }
    )
  }

  const renderSortIcon = (key: keyof Student) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? '↑' : '↓'
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md  border-none ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">
                <Button variant="ghost" onClick={() => handleSort('name')}>
                  Student {renderSortIcon('name')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('grade')}>
                  Grade {renderSortIcon('grade')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('stream')}>
                  Stream {renderSortIcon('stream')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('attendance')}>
                  Attendance {renderSortIcon('attendance')}
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('status')}>
                  Status {renderSortIcon('status')}
                </Button>
              </TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <>
                <TableRow key={student.id} className="group">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={student.avatar} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.stream}</TableCell>
                  <TableCell>{student.attendance}%</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        student.status === 'active' ? 'default' : 
                        student.status === 'inactive' ? 'secondary' : 
                        'destructive'
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => setExpandedStudent(student.id)}>
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>View Grades</DropdownMenuItem>
                        <DropdownMenuItem>Attendance Record</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
                {expandedStudent === student.id && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <div className="p-4 bg-muted rounded-md">
                        <h4 className="font-semibold mb-2">Additional Information</h4>
                        <p>Parent Contact: {student.parentContact}</p>
                        <p>Behavior: {student.behavior}</p>
                        <p>Special Needs: {student.specialNeeds || 'None'}</p>
                        <p>Club: {student.club || 'None'}</p>
                        <p>Overall GPA: {student?.performance?.overallGPA}</p>
                        <p>Semester Credits: {student?.performance?.semesterCredits}</p>
                        <p>Extracurriculars: {student?.performance?.extracurriculars.join(', ')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

