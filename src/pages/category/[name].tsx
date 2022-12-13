import TitleWithBack from "@/components/TitleWithBack";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { prisma } from "@/server/db/client";
import type { Category, Post } from "@prisma/client";
import type { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

interface CategoriesPageProps extends Category {
  posts: Pick<Post, "title" | "id">[];
}

const CategoriesPage: React.FC<CategoriesPageProps> = (props) => {
  const { name, posts } = props;

  return (
    <div className="p-4">
      <TitleWithBack
        name={
          <h2 className="text-lg">
            Recent Posts from the{" "}
            <span className="ml-1 rounded-lg bg-gradient-to-tr from-blue-500 to-green-500 p-2 font-bold text-white">
              {name}
            </span>{" "}
            category
          </h2>
        }
      />

      <hr className="my-4" />
      <div className="flex flex-col">
        <ul className="px-4">
          {posts.map((i) => (
            <li key={i.title} className="list-disc">
              <Link
                href={`/post/${i.id}`}
                className="text-blue-600 hover:text-blue-400"
              >
                {i.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<
  CategoriesPageProps
> = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const { name } = ctx.params as { name: string };
  const res = await prisma.category.findFirstOrThrow({
    where: {
      name,
    },
    include: {
      posts: {
        select: {
          title: true,
          id: true,
        },
      },
    },
  });

  if (typeof res === "undefined") throw new Error("NOT FOUND");

  return {
    props: { ...res, session },
  };
};

export default CategoriesPage;
