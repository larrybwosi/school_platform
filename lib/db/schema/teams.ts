import { 
  pgTable, 
  text, 
  timestamp, 
  uuid,
  index
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const teams = pgTable('teams', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
  return {
    nameIdx: index('team_name_idx').on(table.name),
  };
});

export const insertTeamSchema = createInsertSchema(teams, {
  name: z.string().min(2).max(50),
  description: z.string().min(10).max(500),
});

export const selectTeamSchema = createSelectSchema(teams);

export type Team = z.infer<typeof selectTeamSchema>;
export type NewTeam = z.infer<typeof insertTeamSchema>;