'use client'

import { useState } from 'react'
import { SearchBar } from './searchbar'
import { OrderBySelect } from './orderby'
import { Pagination } from './pagination'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { borrowBook, returnBook, getBookById, getStudentBorrowRecords } from '@/app/library/mock-data'
import { getStudentById } from "@/app/library/mock-students";
import { Book, StudentRecord } from '@/lib/types/library'
import { MotionDiv } from './motion'

interface BookCatalogProps {
  books: Book[]
  searchTerm: string
  orderBy: string
  pagination: {
    currentPage: number
    totalPages: number
  }
}
export function BookCatalog({ books, searchTerm, orderBy, pagination }: BookCatalogProps) {
  const [selectedBook, setSelectedBook] = useState<Book>(null)
  const [studentId, setStudentId] = useState('')
  const [message, setMessage] = useState('')
  const [studentRecords, setStudentRecords] = useState < StudentRecord[] >();


  const handleBorrow = () => {
    if (borrowBook(selectedBook._id, studentId)) {
      setMessage(`Book successfully borrowed by student ${studentId}`)
      setSelectedBook(getBookById(selectedBook._id))
    } else {
      setMessage('Failed to borrow book. Please check student ID and book availability.')
    }
  }

  const handleReturn = () => {
    if (returnBook(selectedBook._id, studentId)) {
      setMessage(`Book successfully returned by student ${studentId}`)
      setSelectedBook(getBookById(selectedBook._id))
    } else {
      setMessage('Failed to return book. Please check student ID and borrowed status.')
    }
  }

  const handleViewStudentRecords = () => {
    const records = getStudentBorrowRecords(studentId)
    setStudentRecords(records)
  }

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-8">Book Catalog</h2>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <SearchBar defaultValue={searchTerm} />
        <OrderBySelect defaultValue={orderBy} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <MotionDiv
            key={book._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-lg hover:scale-105">
              <Image
                src={
                  book.coverImage ||
                  "https://cdn.sanity.io/images/kecd6xb4/production/1710c9a8cdbcfe3dbd10b130d9bae608ec6acb57-1449x815.png?w=400&h=400&fit=crop&fm=webp"
                }
                alt={book.title}
                width={800}
                height={600}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-lg line-clamp-1">
                  {book.title}
                </CardTitle>
                <CardDescription className="line-clamp-1">
                  {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-semibold">Category:</span>{" "}
                  {book.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">ISBN:</span> {book.isbn}
                </p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                      onClick={() => setSelectedBook(book)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{selectedBook?.title}</DialogTitle>
                      <DialogDescription>Book Details</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Image
                          src={
                            selectedBook?.coverImage ||
                            "https://source.unsplash.com/random/800x600?book"
                          }
                          alt={selectedBook?.title}
                          width={800}
                          height={600}
                          className="col-span-4 w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Author:</span>
                        <span className="col-span-3">
                          {selectedBook?.author}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Category:</span>
                        <span className="col-span-3">
                          {selectedBook?.category}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">ISBN:</span>
                        <span className="col-span-3">{selectedBook?.isbn}</span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Total Borrowed:</span>
                        <span className="col-span-3">
                          {selectedBook?.borrowedCount}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Currently Borrowed:</span>
                        <span className="col-span-3">
                          {selectedBook?.currentlyBorrowed}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Available Copies:</span>
                        <span className="col-span-3">
                          {selectedBook?.availableCopies}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <span className="font-bold">Borrowed By:</span>
                        <span className="col-span-3">
                          {selectedBook?.borrowedBy
                            .map((id) => {
                              const student = getStudentById(id);
                              return student
                                ? `${student.firstName} ${student.lastName} (ID: ${student.id})`
                                : id;
                            })
                            .join(", ")}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="studentId" className="text-right">
                          Student ID:
                        </Label>
                        <Input
                          id="studentId"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="flex justify-between">
                        <Button
                          onClick={handleBorrow}
                          disabled={!selectedBook?.availableCopies}
                          className="transition-all duration-300 hover:bg-green-600"
                        >
                          Borrow
                        </Button>
                        <Button
                          onClick={handleReturn}
                          disabled={
                            !selectedBook?.borrowedBy.includes(studentId)
                          }
                          className="transition-all duration-300 hover:bg-blue-600"
                        >
                          Return
                        </Button>
                        <Button
                          onClick={handleViewStudentRecords}
                          className="transition-all duration-300 hover:bg-purple-600"
                        >
                          View Records
                        </Button>
                      </div>
                      {message && (
                        <p className="text-sm text-blue-500">{message}</p>
                      )}
                      {studentRecords && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">
                            Student Library Records
                          </h3>
                          <ul className="space-y-2">
                            {studentRecords.map((record) => (
                              <li key={record.id}>
                                Book: {getBookById(record.bookId)?.title},
                                Borrowed:{" "}
                                {new Date(
                                  record.borrowDate
                                ).toLocaleDateString()}
                                , Returned:{" "}
                                {record.returnDate
                                  ? new Date(
                                      record.returnDate
                                    ).toLocaleDateString()
                                  : "Not returned"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </MotionDiv>
        ))}
      </div>
      {pagination && (
        <div className="mt-8">
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </section>
  );
}

