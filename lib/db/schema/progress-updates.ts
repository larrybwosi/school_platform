import { 
  pgTable, 
  text, 
  timestamp, 
  uuid,
  integer,
  index
} from 'drizzle-orm/pg-core';
import { tasks } from './tasks';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const progressUpdates = pgTable('progress_updates', {
  id: uuid('id').defaultRandom().primaryKey(),
  taskId: uuid('task_id').references(() => tasks.id, { onDelete: 'cascade' }),
  updateText: text('update_text').notNull(),
  percentageComplete: integer('percentage_complete').notNull(),
  updatedBy: text('updated_by').notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    taskIdIdx: index('progress_task_id_idx').on(table.taskId),
    updatedByIdx: index('progress_updated_by_idx').on(table.updatedBy),
  };
});

export const insertProgressUpdateSchema = createInsertSchema(progressUpdates, {
  updateText: z.string().min(1).max(500),
  percentageComplete: z.number().min(0).max(100),
});

export const selectProgressUpdateSchema = createSelectSchema(progressUpdates);

export type ProgressUpdate = z.infer<typeof selectProgressUpdateSchema>;
export type NewProgressUpdate = z.infer<typeof insertProgressUpdateSchema>;