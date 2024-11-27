import { hash, compare } from 'bcryptjs';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await compare(password, hashedPassword);
}

export async function getUserByEmail(email: string) {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);
  return user;
}

export async function createUser({
  email,
  password,
  firstName,
  lastName,
  roleId,
}: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  roleId?: number;
}) {
  const hashedPassword = await hashPassword(password);
  const [user] = await db
    .insert(users)
    .values({
      email,
      passwordHash: hashedPassword,
      firstName,
      lastName,
      roleId,
      isActive: true,
    })
    .returning();
  return user;
}