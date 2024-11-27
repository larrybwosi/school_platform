import * as z from "zod"
import { mockData } from "./mockData"

export const baseSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  emergencyContact: z.string().min(5, "Emergency contact must be at least 5 characters"),
  role: z.enum(mockData.roles as [string, ...string[]]),
})

export const studentSchema = baseSchema.extend({
  grade: z.enum(mockData.grades as [string, ...string[]]),
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  parentGuardianName: z.string().min(2, "Parent/Guardian name must be at least 2 characters"),
  parentGuardianContact: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
})

export const teacherSchema = baseSchema.extend({
  subjects: z.array(z.string()).min(1, "Select at least one subject"),
  qualifications: z.string().min(5, "Qualifications must be at least 5 characters"),
  yearsOfExperience: z.number().min(0, "Years of experience must be a positive number"),
})

export const staffSchema = baseSchema.extend({
  department: z.enum(mockData.departments as [string, ...string[]]),
  position: z.string().min(2, "Position must be at least 2 characters"),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
})

