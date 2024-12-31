export interface Book {
  _id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  coverImage: string;
  borrowedCount: number;
  currentlyBorrowed: number;
  availableCopies: number;
  borrowedBy: string[];
}

export interface BorrowRecord {
  id: string;
  bookId: string;
  studentId: string;
  borrowDate: Date;
  returnDate: Date | null;
}

export interface StudentRecord {
  id: string;
  studentId: string;
  bookId: string;
  borrowDate: Date;
  returnDate: Date | null;
}