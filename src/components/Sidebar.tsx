import { trpc } from "@/utils/trpc";
import Link from "next/link";
import React from "react";
import Disclosure from "./Disclosure";
import Spinner from "./Spinner";

type SidebarProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

// Client Side Render

const Sidebar: React.FC<SidebarProps> = (props) => {
  const getCategories = trpc.post.getCategories.useQuery();
  const className = `border-2 border-gray-500 rounded-xl flex flex-col p-4 ${
    props.className ?? ""
  }`.trim();

  return (
    <div
      {...{
        ...props,
        className,
      }}
    >
      <h3 className="text-lg font-bold">Recent Posts by Category</h3>
      <hr className="my-4 border-gray-400" />
      {getCategories.isLoading ? (
        <Spinner size="sm" />
      ) : (
        <div>
          {getCategories.data?.result.map((cat) => (
            <div className="mb-4" key={cat.id}>
              <Disclosure
                title={cat.name}
                contents={
                  !!cat.posts.length ? (
                    <ul className="px-6">
                      {cat.posts.map((p) => (
                        <li key={p.id} className="list-disc">
                          <Link
                            href={`/post/${p.id}`}
                            className="text-gray-700 hover:text-blue-500"
                          >
                            {p.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null
                }
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
