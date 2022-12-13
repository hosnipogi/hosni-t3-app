import { loginSchema, type Login } from "@/server/common/validation/auth";
import { prisma } from "@/server/db/client";
import { verify } from "argon2";
import CredentialsProvider from "next-auth/providers/credentials";

export default CredentialsProvider({
  type: "credentials",
  credentials: {},
  async authorize(credentials) {
    const c = credentials as Login;
    const creds = await loginSchema.parseAsync(c);

    const user = await prisma.user.findFirst({
      where: {
        email: creds.email,
      },
    });

    if (!user) return null;

    const isValidPassword = await verify(user.password, creds.password);

    if (!isValidPassword) return null;
    return user;
  },
});
