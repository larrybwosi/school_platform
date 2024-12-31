import { Book, BorrowRecord } from '@/lib/types/library';
import { getStudentById, updateStudent } from './mock-students';


export const mockBooks: Book[] = [
  {
    _id: "1",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    isbn: "9780446310789",
    coverImage: "https://source.unsplash.com/random/800x600?book=1",
    borrowedCount: 120,
    currentlyBorrowed: 1,
    availableCopies: 9,
    borrowedBy: ["1"],
  },
  {
    _id: "2",
    title: "1984",
    author: "George Orwell",
    category: "Science Fiction",
    isbn: "9780451524935",
    coverImage:
      "https://cdn.sanity.io/images/kecd6xb4/production/1710c9a8cdbcfe3dbd10b130d9bae608ec6acb57-1449x815.png?w=400&h=400&fit=crop&fm=webp",
    borrowedCount: 95,
    currentlyBorrowed: 1,
    availableCopies: 6,
    borrowedBy: ["2"],
  },
  {
    _id: "3",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    category: "Classic",
    isbn: "9780141439518",
    coverImage:
      "https://cdn.sanity.io/images/kecd6xb4/production/1710c9a8cdbcfe3dbd10b130d9bae608ec6acb57-1449x815.png?w=400&h=400&fit=crop&fm=webp",
    borrowedCount: 80,
    currentlyBorrowed: 1,
    availableCopies: 4,
    borrowedBy: ["1"],
  },
  {
    _id: "4",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    isbn: "9780743273565",
    coverImage:
      "https://cdn.sanity.io/images/kecd6xb4/production/1710c9a8cdbcfe3dbd10b130d9bae608ec6acb57-1449x815.png?w=400&h=400&fit=crop&fm=webp",
    borrowedCount: 110,
    currentlyBorrowed: 1,
    availableCopies: 5,
    borrowedBy: ["4"],
  },
  {
    _id: "5",
    title: "To the Lighthouse",
    author: "Virginia Woolf",
    category: "Modernist",
    isbn: "9780156907392",
    coverImage:
      "https://cdn.sanity.io/images/kecd6xb4/production/1710c9a8cdbcfe3dbd10b130d9bae608ec6acb57-1449x815.png?w=400&h=400&fit=crop&fm=webp",
    borrowedCount: 70,
    currentlyBorrowed: 1,
    availableCopies: 3,
    borrowedBy: ["4"],
  },
];

export const mockBorrowRecords: BorrowRecord[] = [
  {
    id: '1',
    bookId: '1',
    studentId: '1',
    borrowDate: new Date('2023-05-01'),
    returnDate: null,
  },
  {
    id: '2',
    bookId: '2',
    studentId: '2',
    borrowDate: new Date('2023-05-02'),
    returnDate: null,
  },
  {
    id: '3',
    bookId: '3',
    studentId: '1',
    borrowDate: new Date('2023-05-03'),
    returnDate: null,
  },
  {
    id: '4',
    bookId: '4',
    studentId: '4',
    borrowDate: new Date('2023-05-04'),
    returnDate: null,
  },
  {
    id: '5',
    bookId: '5',
    studentId: '4',
    borrowDate: new Date('2023-05-05'),
    returnDate: null,
  },
];

export const mockLibraryRoles = [
  {
    _id: '1',
    role: 'Head Librarian',
    person: { firstName: 'John', lastName: 'Doe' }
  },
  {
    _id: '2',
    role: 'Assistant Librarian',
    person: { firstName: 'Jane', lastName: 'Smith' }
  },
  {
    _id: '3',
    role: 'Library Technician',
    person: { firstName: 'Mike', lastName: 'Johnson' }
  }
];

export function getBooks(currentPage: number, pageSize: number, orderBy: string) {
  const sortedBooks = [...mockBooks].sort((a, b) => {
    if (a[orderBy] < b[orderBy]) return -1;
    if (a[orderBy] > b[orderBy]) return 1;
    return 0;
  });

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBooks = sortedBooks.slice(startIndex, endIndex);

  return {
    books: paginatedBooks,
    pagination: {
      currentPage,
      totalPages: Math.ceil(mockBooks.length / pageSize),
      totalItems: mockBooks.length
    }
  };
}

export function getLibraryRoles() {
  return { roles: mockLibraryRoles };
}

export function borrowBook(bookId: string, studentId: string) {
  const book = mockBooks.find(b => b._id === bookId);
  const student = getStudentById(studentId);

  if (book && student && book.availableCopies > 0) {
    book.availableCopies--;
    book.currentlyBorrowed++;
    book.borrowedCount++;
    book.borrowedBy.push(studentId);

    student.borrowedBooks.push(bookId);
    updateStudent(student);

    const newBorrowRecord: BorrowRecord = {
      id: (mockBorrowRecords.length + 1).toString(),
      bookId,
      studentId,
      borrowDate: new Date(),
      returnDate: null,
    };
    mockBorrowRecords.push(newBorrowRecord);

    return true;
  }

  return false;
}

export function returnBook(bookId: string, studentId: string) {
  const book = mockBooks.find(b => b._id === bookId);
  const student = getStudentById(studentId);
  const borrowRecord = mockBorrowRecords.find(r => r.bookId === bookId && r.studentId === studentId && r.returnDate === null);

  if (book && student && borrowRecord) {
    book.availableCopies++;
    book.currentlyBorrowed--;
    book.borrowedBy = book.borrowedBy.filter(id => id !== studentId);

    student.borrowedBooks = student.borrowedBooks.filter(id => id !== bookId);
    updateStudent(student);

    borrowRecord.returnDate = new Date();

    return true;
  }

  return false;
}

export async function getBookById(id: string): Promise<Book> {
  return mockBooks.find((book) => book._id === id);
}

export function getStudentBorrowRecords(studentId: string) {
  return mockBorrowRecords.filter(record => record.studentId === studentId);
}

