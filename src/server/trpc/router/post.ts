import simulateDelay from "@/server/common/auth/simulateDelay";
import responseGenerator from "@/server/common/responseGenerator";
import { postSchema } from "@/server/common/validation/post";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const postRouter = router({
  getPosts: publicProcedure.query(async (req) => {
    const posts = await req.ctx.prisma.post.findMany();
    return responseGenerator(200, "Success", posts);
  }),
  getCategories: publicProcedure.query(async (req) => {
    const categories = await req.ctx.prisma.category.findMany({
      include: {
        posts: true,
      },
    });
    await simulateDelay(300);
    return responseGenerator(200, "Success", categories);
  }),
  addPost: protectedProcedure.input(postSchema).mutation(async (req) => {
    await postSchema.parseAsync(req.input);

    const data = {
      ...req.input,
      authorId: req.ctx.session.user.id,
    };

    const res = await req.ctx.prisma.post.create({
      data: {
        ...data,
        categories: {
          connectOrCreate: req.input.categories.map((i) => ({
            where: {
              id: i.categoryId,
            },
            create: {
              name: i.name,
            },
          })),
        },
      },
    });

    return responseGenerator(201, "Add post successful", res);
  }),
});
