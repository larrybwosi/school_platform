'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from 'next/image'
import { Pagination } from './pagination'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  getBooks,
  getLibraryRoles,
  getStudentBorrowRecords,
  getBookById,
} from "@/app/library/mock-data";
import { getStudents } from "@/app/library/mock-students";
import { Student } from '@/lib/mockData'
import { MotionDiv } from './motion'

export function LibraryInfo() {
  const [selectedStudent, setSelectedStudent] = useState<Student>()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('lastName')
  const [sortOrder, setSortOrder] = useState('asc')
    const { roles } = getLibraryRoles();
    const students = getStudents();

  const pageSize = 20
  const filteredStudents = students.filter(student => 
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1
    if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1
    return 0
  })

  const paginatedStudents = sortedStudents.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Library Team</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {roles.map((role) => (
              <li key={role._id}>
                <span className="font-semibold">{role.role}:</span> {role.person.firstName} {role.person.lastName}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Library Services</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>Book borrowing and returns</li>
            <li>Study spaces and quiet zones</li>
            <li>Computer and internet access</li>
            <li>Research assistance</li>
            <li>Interlibrary loan services</li>
          </ul>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <div className="flex items-center space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lastName">Last Name</SelectItem>
                  <SelectItem value="firstName">First Name</SelectItem>
                  <SelectItem value="grade">Grade</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Borrowed Books</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedStudents.map((student, index) => (
                <TableRow key={student.id}>
                  <TableCell>{`${student.firstName} ${student.lastName}`}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>
                    <div className="flex -space-x-4">
                      {student.borrowedBooks.map((bookId, bookIndex) => (
                        <Image
                          key={bookId}
                          src={getBookById(bookId)?.coverImage || "/placeholder.svg"}
                          alt={`Book ${bookId}`}
                          width={40}
                          height={60}
                          className="rounded-md border-2 border-white dark:border-gray-800"
                          style={{ zIndex: bookIndex }}
                        />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          onClick={() => setSelectedStudent(student)}
                          className="transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        >
                          View Records
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{`${selectedStudent?.name}'s Library Records`}</DialogTitle>
                          <DialogDescription>Student ID: {selectedStudent?.id}</DialogDescription>
                        </DialogHeader>
                        <div className="mt-4">
                          {selectedStudent && getStudentBorrowRecords(selectedStudent.id).map((record, index) => (
                            <MotionDiv
                              key={record.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.3, delay: index * 0.1 }}
                              className="mb-4 p-4 bg-muted rounded-lg"
                            >
                              <p><strong>Book:</strong> {getBookById(record.bookId)?.title}</p>
                              <p><strong>Borrowed:</strong> {new Date(record.borrowDate).toLocaleDateString()}</p>
                              <p><strong>Returned:</strong> {record.returnDate ? new Date(record.returnDate).toLocaleDateString() : 'Not returned'}</p>
                            </MotionDiv>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredStudents.length / pageSize)}
              onPageChange={setCurrentPage}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

