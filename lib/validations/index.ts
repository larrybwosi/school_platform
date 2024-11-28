import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  date, 
  integer,
  decimal,
  jsonb,
  uuid,
  primaryKey,
  unique
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';
import { grades, staff, students, subjects, timetableSlots, users } from '../db/schema';

// Enhanced Zod validations with improved security and data integrity

export const StaffType = {
  TEACHING: 'teaching',
  ADMINISTRATIVE: 'administrative',
  SUPPORT: 'support'
} as const;

// User Validation Enhancements
export const insertUserSchema = createInsertSchema(users, {
  email: z.string().email('Invalid email address')
    .max(255, 'Email must be less than 255 characters')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'),
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(100, 'First name must be less than 100 characters')
    .regex(/^[A-Za-z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(100, 'Last name must be less than 100 characters')
    .regex(/^[A-Za-z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  passwordHash: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password must be less than 255 characters')
    .refine(
      (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password),
      'Password must include uppercase, lowercase, number, and special character'
    ),
  isActive: z.boolean().optional().default(true),
  roleId: z.number().int().positive('Role ID must be a positive integer').optional()
});

export const selectUserSchema = createSelectSchema(users);

// Student Validation Enhancements
export const insertStudentSchema = createInsertSchema(students, {
  studentId: z.string()
    .min(5, 'Student ID must be at least 5 characters')
    .max(50, 'Student ID must be less than 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'Student ID can only contain uppercase letters, numbers, and hyphens'),
  dateOfBirth: z.date()
    .max(new Date(), 'Date of birth cannot be in the future')
    .refine((date) => {
      const age = new Date().getFullYear() - date.getFullYear();
      return age >= 5 && age <= 25;
    }, 'Student must be between 5 and 25 years old'),
  grade: z.string()
    .min(1, 'Grade must be specified')
    .max(20, 'Grade must be less than 20 characters'),
  guardianPhone: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
  guardianEmail: z.string()
    .email('Invalid guardian email address')
    .max(255, 'Guardian email must be less than 255 characters')
    .optional(),
  address: z.string()
    .max(500, 'Address must be less than 500 characters')
    .optional()
});

export const selectStudentSchema = createSelectSchema(students);

// Staff Validation Enhancements
export const insertStaffSchema = createInsertSchema(staff, {
  staffId: z.string()
    .min(5, 'Staff ID must be at least 5 characters')
    .max(50, 'Staff ID must be less than 50 characters')
    .regex(/^[A-Z0-9-]+$/, 'Staff ID can only contain uppercase letters, numbers, and hyphens'),
  email: z.string()
    .email('Invalid email address')
    .max(255, 'Email must be less than 255 characters'),
  staffType: z.enum(Object.values(StaffType) as [string, ...string[]]),
  hireDate: z.date()
    .max(new Date(), 'Hire date cannot be in the future'),
  qualifications: z.array(z.string())
    .max(10, 'Maximum 10 qualifications allowed')
    .optional(),
  specializations: z.array(z.string())
    .max(5, 'Maximum 5 specializations allowed')
    .optional(),
  department: z.string()
    .min(2, 'Department must be at least 2 characters')
    .max(100, 'Department must be less than 100 characters'),
  position: z.string()
    .min(2, 'Position must be at least 2 characters')
    .max(100, 'Position must be less than 100 characters')
});

export const selectStaffSchema = createSelectSchema(staff);

// Grades Validation Enhancements
export const insertGradeSchema = createInsertSchema(grades, {
  score: z.number()
    .min(0, 'Score cannot be negative')
    .max(100, 'Score cannot exceed 100'),
  gradeType: z.string()
    .min(1, 'Grade type must be specified')
    .max(50, 'Grade type must be less than 50 characters'),
  academicTerm: z.string()
    .regex(/^(Fall|Spring|Summer)\s\d{4}$/, 'Academic term must be in format "Season Year"'),
  academicYear: z.string()
    .regex(/^\d{4}-\d{4}$/, 'Academic year must be in format "YYYY-YYYY"'),
  changeReason: z.string()
    .max(500, 'Reason must be less than 500 characters')
    .optional()
});

export const selectGradeSchema = createSelectSchema(grades);

// Subjects Validation Enhancements
export const insertSubjectSchema = createInsertSchema(subjects, {
  name: z.string()
    .min(2, 'Subject name must be at least 2 characters')
    .max(100, 'Subject name must be less than 100 characters'),
  code: z.string()
    .min(3, 'Subject code must be at least 3 characters')
    .max(20, 'Subject code must be less than 20 characters')
    .regex(/^[A-Z]{2,4}\d{3}$/, 'Subject code must be in format like "CS101" or "MATH200"'),
  description: z.string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  credits: z.number()
    .int('Credits must be an integer')
    .min(1, 'Minimum credits is 1')
    .max(10, 'Maximum credits is 10')
});

// Timetable Slot Validation Enhancements
export const insertTimetableSlotSchema = createInsertSchema(timetableSlots, {
  dayOfWeek: z.number()
    .int('Day of week must be an integer')
    .min(1, 'Day of week must be between 1 and 7')
    .max(7, 'Day of week must be between 1 and 7'),
  startTime: z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Start time must be in 24-hour format HH:mm'),
  endTime: z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in 24-hour format HH:mm'),
  roomNumber: z.string()
    .max(50, 'Room number must be less than 50 characters')
    .optional(),
  status: z.enum(['active', 'inactive', 'cancelled'])
    .default('active')
});
