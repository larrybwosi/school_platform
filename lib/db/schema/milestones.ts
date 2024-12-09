import { 
  pgTable, 
  text, 
  timestamp, 
  uuid,
  index
} from 'drizzle-orm/pg-core';
import { teams } from './teams';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const milestones = pgTable('milestones', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  dueDate: timestamp('due_date').notNull(),
  status: text('status', { 
    enum: ['not_started', 'in_progress', 'completed', 'blocked'] 
  }).notNull(),
  priority: text('priority', { 
    enum: ['low', 'medium', 'high', 'critical'] 
  }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    teamIdIdx: index('milestone_team_id_idx').on(table.teamId),
    dueDateIdx: index('milestone_due_date_idx').on(table.dueDate),
  };
});

export const insertMilestoneSchema = createInsertSchema(milestones, {
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  status: z.enum(['not_started', 'in_progress', 'completed', 'blocked']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
});

export const selectMilestoneSchema = createSelectSchema(milestones);

export type Milestone = z.infer<typeof selectMilestoneSchema>;
export type NewMilestone = z.infer<typeof insertMilestoneSchema>;