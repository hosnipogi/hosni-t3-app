import { useModalContext } from "@/providers/ModalProvider";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Login from "./auth/Login";
import Button from "./Button";
import Form from "./post/Form";

const Nav = () => {
  const { setModal } = useModalContext();
  const session = useSession();

  const handleSignIn = () => {
    setModal("Login", <Login />, true);
  };

  const handleLogout = () => {
    signOut();
  };

  const handleAddPost = () => {
    setModal("Add New Post", <Form />);
  };

  return (
    <div className={"flex h-20 items-center justify-between"}>
      <Link href="/" className="text-2xl font-extrabold">
        Classified{" "}
        <span className="rounded-lg bg-gradient-to-r from-purple-800 to-red-400 px-2 py-1 text-white  hover:from-red-600 hover:to-purple-400">
          ADS
        </span>
      </Link>
      {session.status === "unauthenticated" || session.status === "loading" ? (
        <>
          <p className="hidden text-center font-bold md:block">
            Sign in to add a post!
          </p>
          <div className="text-right md:w-80">
            <Button onClick={handleSignIn}>&larr; Sign In</Button>
          </div>
        </>
      ) : (
        <>
          <p className="hidden bg-gradient-to-r from-purple-800 to-red-400  bg-clip-text font-extrabold text-transparent hover:from-red-600 hover:to-purple-400 md:block">
            {session.data?.user?.name}! 🎉
          </p>
          <div className="space-x-4 text-right md:w-80">
            <Button onClick={handleAddPost}>Add Post</Button>
            <Button onClick={handleLogout}>Log out</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
