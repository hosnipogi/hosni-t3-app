import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  "For Sale",
  "Looking For",
  "Community",
  "Jobs",
  "Random",
  "Help Wanted",
];

const seed = categories.map((cat) =>
  prisma.category.create({
    data: {
      name: cat,
    },
  })
);

Promise.all(seed)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
