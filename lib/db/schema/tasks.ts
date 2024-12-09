import { 
  pgTable, 
  text, 
  timestamp, 
  uuid,
  index
} from 'drizzle-orm/pg-core';
import { milestones } from './milestones';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  milestoneId: uuid('milestone_id').references(() => milestones.id, { onDelete: 'cascade' }),
  assigneeId: text('assignee_id').notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  status: text('status', { 
    enum: ['todo', 'in_progress', 'review', 'completed'] 
  }).notNull(),
  startDate: timestamp('start_date').notNull(),
  endDate: timestamp('end_date').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    milestoneIdIdx: index('task_milestone_id_idx').on(table.milestoneId),
    assigneeIdIdx: index('task_assignee_id_idx').on(table.assigneeId),
    dateRangeIdx: index('task_date_range_idx').on(table.startDate, table.endDate),
  };
});

export const insertTaskSchema = createInsertSchema(tasks, {
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  status: z.enum(['todo', 'in_progress', 'review', 'completed']),
});

export const selectTaskSchema = createSelectSchema(tasks);

export type Task = z.infer<typeof selectTaskSchema>;
export type NewTask = z.infer<typeof insertTaskSchema>;