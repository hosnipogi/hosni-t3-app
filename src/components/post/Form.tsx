import { useModalContext } from "@/providers/ModalProvider";
import { type Post, postSchema } from "@/server/common/validation/post";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import InputComponent from "../auth/InputComponent";
import Button from "../Button";
import Chip from "../Chips";

const Form = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { resetModal } = useModalContext();
  const getCategories = trpc.post.getCategories.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const addPost = trpc.post.addPost.useMutation({
    async onSuccess() {
      await queryClient.refetchQueries([
        ["post", "getCategories"],
        { type: "query" },
      ]);
    },
  });
  const { control, handleSubmit, watch } = useForm<Post>({
    defaultValues: {
      description: "",
      title: "",
      categories: [],
    },
    resolver: zodResolver(postSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const description = watch("description");

  const handleAddTag = (name: string, categoryId: number) => () => {
    const idx = fields.findIndex((i) => i.name === name);
    if (idx > -1) {
      remove(idx);
    } else {
      append({ name, categoryId });
    }
  };

  const handleAddPost = async (data: Post) => {
    const res = await addPost.mutateAsync(data);
    if (res.status === 201) {
      resetModal();
      router.replace(router.asPath); // trigger SSR refetch
    }
  };

  return (
    <>
      <InputComponent control={control} name="title" label="Title" />
      <Controller
        control={control}
        name="description"
        render={({ field, fieldState }) => {
          const className = `m-0 block w-full rounded-md border border-solid bg-white bg-clip-padding px-4 py-2 text-xl font-normal text-gray-700 transition ease-in-out focus:bg-white focus:text-gray-700 focus:border-blue-500 focus:outline-none min-h-20 ${
            fieldState.error ? "border-red-500" : "border-gray-300"
          }`;
          return (
            <>
              <div className="mt-4 flex flex-row items-center justify-between">
                <p className="text-lg text-gray-600">Description</p>
                <p className="text-xs text-gray-400">
                  {description.length} / 200
                </p>
              </div>
              <textarea className={className} maxLength={200} {...field} />
              <p className="mt-2 h-6 text-red-500">
                {fieldState.error?.message}
              </p>
            </>
          );
        }}
      />

      <div className="mb-8">
        <p className="mb-2">Tags</p>
        <div className="space-2 flex flex-row flex-wrap gap-2">
          {getCategories.data?.result.map((i) => (
            <Chip
              key={i.id}
              text={i.name}
              onClick={handleAddTag(i.name, i.id)}
            />
          ))}
        </div>
      </div>

      <Button
        className="w-full"
        onClick={handleSubmit(handleAddPost)}
        disabled={fields.length === 0 || addPost.isLoading}
        title="Add new post"
        isLoading={addPost.isLoading}
      />
    </>
  );
};

export default Form;
