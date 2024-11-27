import NextAuth from 'next-auth';
import { authConfig } from '@/lib/auth/auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { getUserByEmail, verifyPassword } from '@/lib/auth/auth.utils';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUserByEmail(email);
          if (!user) return null;
          
          const isValid = await verifyPassword(password, user.passwordHash);
          if (!isValid) return null;

          return {
            id: user.id.toString(),
            email: user.email,
            name: `${user.firstName} ${user.lastName}`.trim(),
            role: user.roleId,
          };
        }

        return null;
      },
    }),
  ],
});