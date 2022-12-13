import { Post } from "@/server/common/validation/post";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import React from "react";
import { prisma } from "@/server/db/client";
import Link from "next/link";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import TitleWithBack from "@/components/TitleWithBack";

const Post: React.FC<InferGetServerSidePropsType<typeof getServerSideProps>> = (
  props
) => {
  const { description, title, categories } = props;
  return (
    <div className="p-4">
      <TitleWithBack name={<h2 className="font-bold">{title}</h2>} />
      <div className="flex flex-row flex-wrap space-x-1">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/category/${cat.name}`}
            className="rounded-lg bg-gray-400 px-2 text-sm text-white hover:bg-blue-500"
          >
            {cat.name}
          </Link>
        ))}
      </div>
      <hr className="my-4 border-gray-300" />
      <p>{description}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Post> = async (ctx) => {
  const session = await getServerAuthSession(ctx);
  const { id } = ctx.params as { id: string };
  const res = await prisma.post.findFirstOrThrow({
    where: {
      id,
    },
    include: {
      categories: true,
    },
  });

  if (typeof res === "undefined") throw new Error("NOT FOUND");

  return {
    props: { ...JSON.parse(JSON.stringify(res)), session },
  };
};

export default Post;
