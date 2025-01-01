import { z } from "zod";
import { Teacher } from "../mockData";

// Validation schemas
export const teacherSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Name must be at least 2 characters"),
  subjects: z
    .array(z.string())
    .min(1, "Teacher must teach at least one subject"),
  maxHours: z
    .number()
    .min(1)
    .max(40, "Maximum hours cannot exceed 40 per week"),
  availability: z.record(z.array(z.string())),
});

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Subject name must be at least 2 characters"),
  hoursPerWeek: z
    .number()
    .min(1)
    .max(10, "Hours per week must be between 1 and 10"),
  requiredForGrades: z.array(z.string()),
});

export const gradeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Grade name is required"),
  streams: z.array(z.string()).min(1, "At least one stream is required"),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
});

export const timeSlotSchema = z.object({
  id: z.string(),
  startTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  endTime: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  duration: z
    .number()
    .min(30)
    .max(120, "Duration must be between 30 and 120 minutes"),
});

export const timetableEntrySchema = z.object({
  gradeId: z.string(),
  streamId: z.string(),
  teacherId: z.string(),
  subjectId: z.string(),
  day: z.enum(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]),
  timeSlotId: z.string(),
});

// Validation functions
export const validateTeacher = (teacher: unknown) => {
  return teacherSchema.safeParse(teacher);
};

export const validateTimetableEntry = (entry: unknown) => {
  return timetableEntrySchema.safeParse(entry);
};

// Custom validation rules
export const validateTeacherAvailability = (
  teacherId: string,
  day: string,
  timeSlotId: string,
  teachers: Teacher[],
  existingTimetable: any[]
) => {
  const teacher = teachers.find((t) => t.id === teacherId);
  if (!teacher) return false;

  // Check if teacher is available in this time slot
  const timeSlot = mockTimeSlots.find((ts) => ts.id === timeSlotId);
  if (!timeSlot) return false;

  // Check if teacher is already scheduled at this time
  const hasConflict = existingTimetable.some(
    (entry) =>
      entry.teacherId === teacherId &&
      entry.day === day &&
      entry.timeSlotId === timeSlotId
  );

  return !hasConflict;
};

export const validateTeacherWorkload = (
  teacherId: string,
  teachers: Teacher[],
  existingTimetable: any[]
) => {
  const teacher = teachers.find((t) => t.id === teacherId);
  if (!teacher) return false;

  const currentHours = existingTimetable.filter(
    (entry) => entry.teacherId === teacherId
  ).length;

  return currentHours < teacher.maxHours;
};
