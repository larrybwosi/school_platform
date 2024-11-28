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
  ],
} satisfies NextAuthConfig;