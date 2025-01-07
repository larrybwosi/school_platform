import { db } from "./db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  oneTap,
  admin,
  passkey,
  organization,
  multiSession,
} from "better-auth/plugins";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  session: {
    fields: {
      expiresAt: "expires",
      token: "sessionToken",
      ipAddress: "ipAddress",
    },
  },
  appName: "Cheap City",
  user: {
    fields: {
      email: "email",
      name: "name",
      createdAt: "createdAt",
      emailVerified: "emailVerified",
      image: "image",
      updatedAt: "updatedAt",
      role: "role",
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  plugins: [admin(), oneTap(), passkey(), organization(), multiSession({maximumSessions: 5})],
});