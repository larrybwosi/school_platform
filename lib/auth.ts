import { db } from "./db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  emailAndPassword: {  
    enabled: true
  },
  socialProviders: { 
     github: { 
      clientId: process.env.GITHUB_CLIENT_ID!, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET!, 
     } 
  },
  // Other configs
  session: {
    fields: {
      expiresAt: "expires", // e.g., "expires_at" or your existing field name
      token: "sessionToken", // e.g., "session_token" or your existing field name
    }
  },
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  secret: process.env.BETTER_AUTH_SECRET,
});