import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CUSTOMER" | "ADMIN" | "EXPORT_BUYER";
      country?: string | null;
      company?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "CUSTOMER" | "ADMIN" | "EXPORT_BUYER";
    country?: string | null;
    company?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    userId: string;
    role: "CUSTOMER" | "ADMIN" | "EXPORT_BUYER";
    country?: string | null;
    company?: string | null;
  }
}
