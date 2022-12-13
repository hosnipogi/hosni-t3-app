import SinglePost from "@/components/post/SinglePost";
import { getServerAuthSession } from "@/server/common/get-server-auth-session";
import { prisma } from "@/server/db/client";
import type { Post } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import type { Session } from "next-auth";

type PostType = Post & {
  author: {
    name: string;
  };
  categories: {
    name: string;
  }[];
};

interface HomeProps {
  posts: PostType[] | undefined;
  session: Session | null;
}

const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className="container flex flex-col items-center justify-center gap-6 p-4 ">
      {!!props.posts?.length ? (
        props.posts?.map((post) => (
          <SinglePost
            key={post.id}
            author={post.author.name}
            description={post.description}
            title={post.title}
            created_at={post.created_at}
            categories={post.categories.map((i) => i.name)}
          />
        ))
      ) : (
        <p className="mt-12">Create an account to add a post!</p>
      )}
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps<HomeProps> = async (
  ctx
) => {
  const post = await prisma.post.findMany({
    include: {
      author: {
        select: {
          name: true,
        },
      },
      categories: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  const session = await getServerAuthSession(ctx);
  return {
    props: {
      posts: JSON.parse(JSON.stringify(post)),
      session,
    },
  };
};
