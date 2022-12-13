import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "@/server/common/auth/providers/CredentialsProvider";

export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  // adapter: PrismaAdapter(prisma),
  secret: "secret",
  session: { strategy: "jwt" },
  providers: [CredentialsProvider],
};

export default NextAuth(authOptions);
