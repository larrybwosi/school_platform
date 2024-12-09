'use server'

import { auth } from "@clerk/nextjs";
import { db } from "@/lib/db";
import { projects, projectMembers } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(1000),
  type: z.enum(['research', 'development', 'creative']),
  visibility: z.enum(['public', 'private', 'team-only']),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
  startDate: z.string(),
  endDate: z.string(),
  budget: z.number().min(0),
  objectives: z.array(z.string()),
});

export async function createProject(formData: z.infer<typeof projectSchema>) {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const validatedFields = projectSchema.safeParse(formData);

  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { data } = validatedFields;

  try {
    const [project] = await db.insert(projects).values({
      title: data.title,
      description: data.description,
      type: data.type,
      visibility: data.visibility,
      priority: data.priority,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
      budget: data.budget,
      objectives: data.objectives,
      createdBy: userId,
    }).returning();

    // Add creator as project owner
    await db.insert(projectMembers).values({
      projectId: project.id,
      userId: userId,
      role: 'owner',
      responsibilities: ['Project Management'],
      skills: [],
    });

    revalidatePath('/projects');
    return { success: true, project };
  } catch (error) {
    return { success: false, error: 'Failed to create project' };
  }
}

export async function getProjects() {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const userProjects = await db.query.projects.findMany({
      where: eq(projectMembers.userId, userId),
      with: {
        members: true,
        milestones: true,
        resources: true,
      },
    });

    return { success: true, projects: userProjects };
  } catch (error) {
    return { success: false, error: 'Failed to fetch projects' };
  }
}