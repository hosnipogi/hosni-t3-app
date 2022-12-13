import { useModalContext } from "@/providers/ModalProvider";
import { type SignUp, signUpSchema } from "@/server/common/validation/auth";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { TRPCClientError } from "@trpc/client";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import Button from "../Button";
import Input from "./InputComponent";
import Login from "./Login";

const Signup = () => {
  const { setModal, resetModal } = useModalContext();
  const { isLoading, mutateAsync, error } = trpc.auth.signUp.useMutation();
  const { control, handleSubmit } = useForm<SignUp>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const handleSignUp = async (data: SignUp) => {
    try {
      const res = await mutateAsync(data);
      if (res.status === 201) {
        await signIn("credentials", {
          ...data,
          redirect: false,
        });

        resetModal();
      }
    } catch (e) {
      if (e instanceof TRPCClientError) {
        console.log({ e });
      }
    }
  };

  const handleLogin = () => {
    setModal("Login", <Login />);
  };

  return (
    <div>
      <Input
        control={control}
        name="email"
        placeholder="test@mail.com"
        label="Email"
        type="email"
      />
      <Input
        control={control}
        name="name"
        placeholder="John Doe"
        label="Username"
      />
      <Input
        control={control}
        name="password"
        placeholder="Enter your password"
        label="Password"
        type="password"
      />
      <Button
        onClick={handleSubmit(handleSignUp)}
        color="default"
        disabled={isLoading}
        className="w-full"
        title="Submit"
        isLoading={isLoading}
      />

      {error && <p className="text-red-500">{error.message}</p>}
      <hr className="my-4" />
      <div className="flex flex-row justify-end space-x-2">
        <p>Already have an account?</p>
        <button className="text-blue-400" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Signup;
