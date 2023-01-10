/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "../utils/api";
import { NewItemSchema } from "../utils/schemas";

import { prisma } from "../server/db";

const GroupPropsSchema = z.object({
  groupId: z.string(),
});

type GroupProps = z.infer<typeof GroupPropsSchema>;

const Group: NextPage<GroupProps> = ({ groupId }) => {
  const utils = api.useContext();

  const createItemMutation = api.item.create.useMutation({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getById.invalidate(groupId);
    },
  });

  const upvoteItemMutation = api.item.voteUpById.useMutation({
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getById.invalidate(groupId);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewItemSchema>>({
    resolver: zodResolver(NewItemSchema),
    defaultValues: {
      group: groupId,
    },
  });

  const group = api.group.getById.useQuery(groupId);

  const onSubmit = handleSubmit((data) => {
    createItemMutation.mutate(data);
  });

  const handleUpvote = (id: string) => upvoteItemMutation.mutate(id);

  if (group.isLoading || !group.data) {
    return <>Loading</>;
  }

  return (
    <>
      <Head>
        <title>{group.data.name} | Voteup</title>
        <meta name="description" content="Gather and vote items in a group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {group.data?.name}
          </h1>

          <div>{group.data?.description}</div>

          <div className="grid gap-3">
            {group.data.items.map((item) => (
              <div className="w-full rounded bg-purple-400 p-4" key={item.id}>
                {item.text} - Upvotes: {item.votes}{" "}
                <button
                  className="ml-4 rounded-full border border-black p-3"
                  onClick={() => handleUpvote(item.id)}
                >
                  +1
                </button>
              </div>
            ))}
          </div>

          <div className="w-96 max-w-full">
            <form onSubmit={onSubmit} className="grid gap-3">
              <label className="text-white" htmlFor="name">
                Name
                <input
                  id="name"
                  className="w-full rounded-sm border p-3 text-black"
                  {...register("text")}
                />
                {errors.text && (
                  <p className="font-bold text-red-400 ">
                    {errors.text.message}
                  </p>
                )}
              </label>

              <button
                type="submit"
                className="mt-2 rounded-sm bg-[hsl(280,100%,70%)] p-3 text-xl  text-white"
              >
                Create
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Group;

export const getServerSideProps: GetServerSideProps<GroupProps> = async (
  context
) => {
  const { groupId } = GroupPropsSchema.parse(context.query);

  try {
    await prisma.group.findFirstOrThrow({
      where: {
        id: groupId,
      },
    });
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      groupId,
    },
  };
};
