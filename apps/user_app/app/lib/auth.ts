import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@repo/db/client";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "1231231231",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: any) {
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        if (existingUser) {
          const passwordValidated = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (passwordValidated) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }

        try {
          const user = await prisma.$transaction(async (prisma) => {
            const newUser = await prisma.user.create({
              data: {
                number: credentials.phone,
                password: hashedPassword,
              },
            });

            await prisma.balance.create({
              data: {
                userId: Number(newUser.id),
              },
            });

            return newUser;
          });

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.number,
          };
        } catch (error: any) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",

  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
};
