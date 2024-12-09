import { 
  pgTable, 
  text, 
  timestamp, 
  uuid,
  index,
  foreignKey
} from 'drizzle-orm/pg-core';
import { teams } from './teams';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const teamMembers = pgTable('team_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  teamId: uuid('team_id').references(() => teams.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  role: text('role', { enum: ['owner', 'admin', 'member'] }).notNull(),
  joinDate: timestamp('join_date').defaultNow().notNull(),
  status: text('status', { enum: ['active', 'inactive', 'pending'] }).notNull(),
}, (table) => {
  return {
    teamIdIdx: index('team_member_team_id_idx').on(table.teamId),
    userIdIdx: index('team_member_user_id_idx').on(table.userId),
    uniqueMembership: index('unique_team_membership_idx').on(table.teamId, table.userId).unique(),
  };
});

export const insertTeamMemberSchema = createInsertSchema(teamMembers, {
  role: z.enum(['owner', 'admin', 'member']),
  status: z.enum(['active', 'inactive', 'pending']),
});

export const selectTeamMemberSchema = createSelectSchema(teamMembers);

export type TeamMember = z.infer<typeof selectTeamMemberSchema>;
export type NewTeamMember = z.infer<typeof insertTeamMemberSchema>;