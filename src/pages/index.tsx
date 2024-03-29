/* eslint-disable @typescript-eslint/no-misused-promises */

import { type NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import type { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { api } from "../utils/api";
import { NewGroupSchema } from "../utils/schemas";
import { useUser } from "../hooks/useUser";
import { Button } from "../lib/ui/Button";

const Home: NextPage = () => {
  const router = useRouter();
  const userId = useUser();

  const createGroupMutation = api.group.create.useMutation({
    async onSuccess(data) {
      await router.push(`/${data.groupId}`);
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
    defaultValues: {
      admin: userId,
    },
  });

  const onSubmit = handleSubmit((data) => {
    createGroupMutation.mutate(data);
  });

  return (
    <>
      <Head>
        <title>VoteUp</title>
        <meta
          name="description"
          content="Gather and vote for items in a group"
        />
      </Head>

      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content max-w-3xl flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="mb-0 font-bold">VoteUp</h1>
            <p className="mt-0 py-6">
              Need to vote for some idea? Want to collect questions during a
              talk and have other participants vote for the top questions?
            </p>
            <p>Create a group and share the invite link to start voting 🚀.</p>
          </div>

          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-xl">
            <form onSubmit={onSubmit} className="card-body">
              <div className="form-control">
                <label className="label" htmlFor="name">
                  <span className="label-text">
                    Name <span className="text-red-800">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Group name"
                  className="input-bordered input"
                  disabled={createGroupMutation.isLoading}
                  id="name"
                  {...register("name")}
                />

                {errors.name ? (
                  <span className="label-text-alt label text-red-700">
                    {errors.name.message}
                  </span>
                ) : null}
              </div>

              <div className="form-control">
                <label className="label" htmlFor="description">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Add a useful description"
                  className="textarea-bordered textarea"
                  disabled={createGroupMutation.isLoading}
                  id="description"
                  {...register("description")}
                />
              </div>

              <div className="form-control mt-6">
                <Button type="submit" loading={createGroupMutation.isLoading}>
                  {createGroupMutation.isLoading
                    ? "Loading group..."
                    : "Create group"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
