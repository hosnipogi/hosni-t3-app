import { useModalContext } from "@/providers/ModalProvider";
import { Login, loginSchema } from "@/server/common/validation/auth";
import simpleErrorMessageHandler from "@/utils/simpleErrorMessageHandler";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "./InputComponent";
import Signup from "./SignUp";

const Login = () => {
  const { resetModal, setModal } = useModalContext();
  const { control, handleSubmit, setError } = useForm<Login>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleSignUp = () => {
    setModal("Sign up", <Signup />);
  };

  const handleLogin = async (data: Login) => {
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.error) {
      const error = simpleErrorMessageHandler(res.error);
      setError("email", {
        message: error,
      });
    } else {
      resetModal();
    }
  };

  return (
    <div>
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        placeholder="test@mail.com"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        placeholder="Enter your password"
      />
      <Button className="w-full" onClick={handleSubmit(handleLogin)}>
        Login
      </Button>

      <hr className="my-4" />
      <div className="flex flex-row justify-end space-x-2">
        <p>Don&apos;t have an account? </p>
        <button
          className=" text-blue-500 hover:underline"
          onClick={handleSignUp}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
