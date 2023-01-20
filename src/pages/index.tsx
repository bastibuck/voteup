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

      <main className="hero min-h-screen bg-base-200">
        <div className="hero-content max-w-3xl flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="mb-0 font-bold">VoteUp</h1>
            <p className="mt-0 py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>

          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <form onSubmit={onSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Name <span className="text-red-800">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Group name"
                  className="input-bordered input"
                  disabled={createGroupMutation.isLoading}
                  {...register("name")}
                />

                {errors.name ? (
                  <span className="label-text-alt label text-red-700">
                    {errors.name.message}
                  </span>
                ) : null}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  placeholder="Add a useful description"
                  className="textarea-bordered textarea"
                  disabled={createGroupMutation.isLoading}
                  {...register("description")}
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={createGroupMutation.isLoading}
                  className={`btn-primary btn ${
                    createGroupMutation.isLoading ? "loading" : ""
                  }`}
                >
                  {createGroupMutation.isLoading
                    ? "Loading group..."
                    : "Create group"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
