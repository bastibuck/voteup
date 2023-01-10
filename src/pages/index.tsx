/* eslint-disable @typescript-eslint/no-misused-promises */

import { type NextPage } from "next";
import Head from "next/head";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "../utils/api";
import { NewGroupSchema } from "../utils/schemas";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();

  const createGroupMutation = api.group.create.useMutation({
    async onSuccess(data) {
      console.log(data);
      await router.push(`/${data.id}`);
    },
    onError(error) {
      console.error(error);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof NewGroupSchema>>({
    resolver: zodResolver(NewGroupSchema),
  });

  const onSubmit = handleSubmit((data) => {
    createGroupMutation.mutate(data);
  });

  return (
    <>
      <Head>
        <title>Voteup | Vote for items in a group</title>
        <meta name="description" content="Gather and vote items in a group" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Vote<span className="text-[hsl(280,100%,70%)]">Up</span>
          </h1>

          <div className="w-96 max-w-full">
            <form onSubmit={onSubmit} className="grid gap-3">
              <label className="text-white" htmlFor="name">
                Name
                <input
                  id="name"
                  className="w-full rounded-sm border p-3 text-black"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="font-bold text-red-400 ">
                    {errors.name.message}
                  </p>
                )}
              </label>

              <label className="text-white" htmlFor="description">
                Description
                <textarea
                  id="description"
                  className="w-full rounded-sm border p-3 text-black"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="font-bold text-red-400 ">
                    {errors.description.message}
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

export default Home;
