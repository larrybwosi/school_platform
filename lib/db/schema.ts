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

export const StaffType = {
  TEACHING: 'teaching',
  ADMINISTRATIVE: 'administrative',
  SUPPORT: 'support'
} as const;


// Users & Authentication
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  roleId: integer('role_id'),
  isActive: boolean('is_active').default(true),
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Roles & Permissions
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const rolePermissions = pgTable('role_permissions', {
  roleId: integer('role_id').references(() => roles.id),
  permissionId: integer('permission_id').references(() => permissions.id),
}, (table) => ({
  pk: primaryKey(table.roleId, table.permissionId),
}));

// Staff Management
export const staff = pgTable('staff', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  staffId: varchar('staff_id', { length: 50 }).notNull().unique(),
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  email: varchar('email', { length: 255 }).unique(),
  department: varchar('department', { length: 100 }),
  position: varchar('position', { length: 100 }),
  staffType: varchar('staff_type', { length: 20 })
    .notNull()
    .$type<typeof StaffType[keyof typeof StaffType]>(),
  hireDate: date('hire_date'),
  supervisorId: integer('supervisor_id'),
  qualifications: jsonb('qualifications'),
  specializations: jsonb('specializations'),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  subjects: jsonb('subjects'),
});

// Students
export const students = pgTable('students', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  studentId: varchar('student_id', { length: 50 }).notNull().unique(),
  dateOfBirth: date('date_of_birth'),
  grade: varchar('grade', { length: 20 }),
  section: varchar('section', { length: 20 }),
  guardianName: varchar('guardian_name', { length: 100 }),
  guardianPhone: varchar('guardian_phone', { length: 20 }),
  guardianEmail: varchar('guardian_email', { length: 255 }),
  address: text('address'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Subjects & Academic
export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  code: varchar('code', { length: 20 }).notNull().unique(),
  description: text('description'),
  credits: integer('credits'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const teacherSubjects = pgTable('teacher_subjects', {
  teacherId: integer('teacher_id').references(() => staff.id),
  subjectId: integer('subject_id').references(() => subjects.id),
  academicYear: varchar('academic_year', { length: 20 }),
  semester: varchar('semester', { length: 20 }),
}, (table) => ({
  pk: primaryKey(table.teacherId, table.subjectId, table.academicYear),
}));

export const timetableSlots = pgTable('timetable_slots', {
  id: uuid('id').defaultRandom().primaryKey(),
  teacherId: integer('teacher_id')
    .references(() => staff.id, { onDelete: 'cascade' }),
  gradeId: uuid('class_id')
    .references(() => grades.id, { onDelete: 'cascade' }),
  subjectId: integer('subject_id')
    .references(() => subjects.id, { onDelete: 'cascade' }),
  dayOfWeek: integer('day_of_week').notNull(), // 1-7 for Monday-Sunday
  startTime: text('start_time').notNull(), // Format: "HH:mm"
  endTime: text('end_time').notNull(), // Format: "HH:mm"
  academicYear: varchar('academic_year', { length: 20 }),
  semester: varchar('semester', { length: 20 }),
  roomNumber: varchar('room_number', { length: 50 }),
  status: varchar('status', { length: 20 }).default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Grades & Assessment
export const grades = pgTable('grades', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => students.id),
  subjectId: integer('subject_id').references(() => subjects.id),
  teacherId: integer('teacher_id').references(() => staff.id),
  gradeTeacherId: integer('grade_teacher_id').references(() => staff.id),
  score: decimal('score', { precision: 5, scale: 2 }),
  gradeType: varchar('grade_type', { length: 50 }),
  academicTerm: varchar('academic_term', { length: 20 }),
  academicYear: varchar('academic_year', { length: 20 }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  updatedBy: integer('updated_by').references(() => users.id),
  previousScore: decimal('previous_score', { precision: 5, scale: 2 }),
  changeReason: text('change_reason'),
});

// Attendance
export const attendance = pgTable('attendance', {
  id: serial('id').primaryKey(),
  studentId: integer('student_id').references(() => students.id),
  date: date('date').notNull(),
  status: varchar('status', { length: 20 }),
  reason: text('reason'),
  markedBy: integer('marked_by').references(() => staff.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Audit Logs
export const auditLogs = pgTable('audit_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  action: varchar('action', { length: 50 }),
  tableName: varchar('table_name', { length: 50 }),
  recordId: integer('record_id'),
  oldValues: jsonb('old_values'),
  newValues: jsonb('new_values'),
  ipAddress: varchar('ip_address', { length: 45 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations configuration
export const userRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.roleId],
    references: [roles.id],
  }),
  staff: one(staff, {
    fields: [users.id],
    references: [staff.userId],
  }),
  student: one(students, {
    fields: [users.id],
    references: [students.userId],
  }),
}));

export const staffRelations = relations(staff, ({ one, many }) => ({
  user: one(users, {
    fields: [staff.userId],
    references: [users.id],
  }),
  supervisor: one(staff, {
    fields: [staff.supervisorId],
    references: [staff.id],
  }),
  subjects: many(teacherSubjects),
  timetableSlots: many(timetableSlots),
  teachingSubjects: many(teacherSubjects),
  classesTeaching: many(grades),
}));

export const gradesRelations = relations(grades, ({ one, many }) => ({
  student: one(students, {
    fields: [grades.studentId],
    references: [students.id],
  }),
  subject: one(subjects, {
    fields: [grades.subjectId],
    references: [subjects.id],
  }),
  teacher: one(staff, {
    fields: [grades.teacherId],
    references: [staff.id],
  }),
  gradeTeacher: one(staff, {
    fields: [grades.gradeTeacherId],
    references: [staff.id],
  }),
  timetableSlots: many(timetableSlots),
}));


export const teacherSubjectsRelations = relations(teacherSubjects, ({ one }) => ({
  teacher: one(users, {
    fields: [teacherSubjects.teacherId],
    references: [users.id],
  }),
  subject: one(subjects, {
    fields: [teacherSubjects.subjectId],
    references: [subjects.id],
  }),
}));

export const timetableSlotRelations = relations(timetableSlots, ({ one }) => ({
  teacher: one(staff, {
    fields: [timetableSlots.teacherId],
    references: [staff.id],
  }),
  grade: one(grades, {
    fields: [timetableSlots.gradeId],
    references: [grades.id],
  }),
  subject: one(subjects, {
    fields: [timetableSlots.subjectId],
    references: [subjects.id],
  }),
}));

// Zod Schemas for validation

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
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'End time must be in 24-hour format HH:mm')
    .refine((endTime) => {
      const start = ctx.parent.startTime.split(':').map(Number);
      const end = endTime.split(':').map(Number);
      const startMinutes = start[0] * 60 + start[1];
      const endMinutes = end[0] * 60 + end[1];
      return endMinutes > startMinutes;
    }, 'End time must be after start time'),
  roomNumber: z.string()
    .max(50, 'Room number must be less than 50 characters')
    .optional(),
  status: z.enum(['active', 'inactive', 'cancelled'])
    .default('active')
});