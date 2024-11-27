import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUserByEmail, verifyPassword } from "./auth.utils";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as number;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnStudentPortal = nextUrl.pathname.startsWith("/student");
      const isOnTeacherPortal = nextUrl.pathname.startsWith("/teacher");
      
      if (isOnDashboard || isOnStudentPortal || isOnTeacherPortal) {
        if (isLoggedIn) {
          // Add role-based access control
          const userRole = auth.user.role;
          if (isOnStudentPortal && userRole !== 1) return false; // Student role
          if (isOnTeacherPortal && userRole !== 2) return false; // Teacher role
          return true;
        }
        return false;
      }
      
      return true;
    },
  },
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
} satisfies NextAuthConfig;