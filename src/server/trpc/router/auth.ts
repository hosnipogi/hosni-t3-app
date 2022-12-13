import { signUpSchema } from "@/server/common/validation/auth";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure } from "../trpc";
import { hash } from "argon2";

export const authRouter = router({
  signUp: publicProcedure.input(signUpSchema).mutation(async (req) => {
    const { name, password, email } = req.input;

    const exists = await req.ctx.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (exists) {
      throw new TRPCError({
        code: "CONFLICT",
        message: "User already exists.",
      });
    }

    const hashedPassword = await hash(password);
    const res = await req.ctx.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: false,
      },
    });

    return {
      status: 201,
      message: "Registration successful",
      result: res,
    };
  }),
});
