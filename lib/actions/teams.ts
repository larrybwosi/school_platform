"use server";

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { teams, teamMembers, NewTeam, NewTeamMember } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq, and } from "drizzle-orm";

export async function createTeam(data: NewTeam) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const [team] = await db.insert(teams).values(data).returning();

    // Add creator as team owner
    await db.insert(teamMembers).values({
      teamId: team.id,
      userId,
      role: 'owner',
      status: 'active',
    });

    revalidatePath('/teams');
    return { success: true, team };
  } catch (error) {
    return { success: false, error: 'Failed to create team' };
  }
}

export async function addTeamMember(teamId: string, data: NewTeamMember) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user is team admin/owner
    const member = await db.query.teamMembers.findFirst({
      where: and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.userId, userId),
        eq(teamMembers.role, 'owner')
      ),
    });

    if (!member) {
      throw new Error("Unauthorized - Must be team owner");
    }

    const [newMember] = await db.insert(teamMembers)
      .values({ ...data, teamId })
      .returning();

    revalidatePath('/teams');
    return { success: true, member: newMember };
  } catch (error) {
    return { success: false, error: 'Failed to add team member' };
  }
}

export async function updateTeamMemberRole(
  teamId: string, 
  memberId: string, 
  role: 'admin' | 'member'
) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user is team owner
    const isOwner = await db.query.teamMembers.findFirst({
      where: and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.userId, userId),
        eq(teamMembers.role, 'owner')
      ),
    });

    if (!isOwner) {
      throw new Error("Unauthorized - Must be team owner");
    }

    const [updatedMember] = await db.update(teamMembers)
      .set({ role })
      .where(eq(teamMembers.id, memberId))
      .returning();

    revalidatePath('/teams');
    return { success: true, member: updatedMember };
  } catch (error) {
    return { success: false, error: 'Failed to update member role' };
  }
}

export async function removeTeamMember(teamId: string, memberId: string) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // Verify user is team owner
    const isOwner = await db.query.teamMembers.findFirst({
      where: and(
        eq(teamMembers.teamId, teamId),
        eq(teamMembers.userId, userId),
        eq(teamMembers.role, 'owner')
      ),
    });

    if (!isOwner) {
      throw new Error("Unauthorized - Must be team owner");
    }

    await db.delete(teamMembers)
      .where(eq(teamMembers.id, memberId));

    revalidatePath('/teams');
    return { success: true };
  } catch (error) {
    return { success: false, error: 'Failed to remove team member' };
  }
}