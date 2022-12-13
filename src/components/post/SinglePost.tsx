import timeAgo from "@/utils/timeSince";
import type { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface SinglePostProps extends Omit<Post, "id" | "authorId"> {
  author: string;
  categories: string[];
}
const SinglePost: React.FC<SinglePostProps> = (props) => {
  const { author, categories, created_at, description, title } = props;
  const date = new Date(created_at).getTime();
  return (
    <div className="w-full rounded-lg border-2 border-gray-200 bg-gray-100 p-4">
      <h3 className="text-lg font-bold">
        <span className="">{title}</span>
      </h3>
      <p className="mb-2 text-sm text-gray-800">
        <span className="font-semibold">{author} </span>
        <span className="">({timeAgo(date)})</span>
      </p>
      <div className="flex flex-row flex-wrap space-x-1 text-sm">
        {categories.map((i) => (
          <Link
            key={i}
            className="cursor-pointer rounded-lg bg-gray-400 px-2 text-sm text-white hover:bg-blue-400"
            href={`/category/${i}`}
          >
            {i}
          </Link>
        ))}
      </div>
      <hr className="my-4 border-gray-700" />
      <p>{description}</p>
    </div>
  );
};

export default SinglePost;
