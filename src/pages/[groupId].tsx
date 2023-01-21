/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCopyToClipboard, useLocalStorage } from "react-use";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../utils/api";
import { NewItemSchema } from "../utils/schemas";

import { prisma } from "../server/db";
import type { Group } from "@prisma/client";

const UpVoteButton = dynamic(() => import("../components/UpVoteButton"), {
  ssr: false,
});

type GroupProps = {
  serverSideGroup: Group;
};

const GroupPage: NextPage<GroupProps> = ({ serverSideGroup }) => {
  const utils = api.useContext();

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const createItemMutation = api.item.create.useMutation({
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getById.invalidate(serverSideGroup.id);
    },
  });

  const [votes, setVotes] = useLocalStorage<Array<string>>(
    serverSideGroup.id,
    []
  );

  const [copyResult, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (copyResult.value !== undefined && copyResult.error === undefined) {
      setTooltipVisible(true);

      timeoutId = setTimeout(() => {
        setTooltipVisible(false);
      }, 4000);
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [copyResult]);

  const upvoteItemMutation = api.item.voteUpById.useMutation({
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getById.invalidate(serverSideGroup.id);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof NewItemSchema>>({
    resolver: zodResolver(NewItemSchema),
    defaultValues: {
      group: serverSideGroup.id,
    },
  });

  const group = api.group.getById.useQuery(serverSideGroup.id, {
    initialData: serverSideGroup,
    refetchInterval: 5000,
  });

  const onSubmit = handleSubmit((data) => {
    createItemMutation.mutate(data);
    reset();
  });

  const persistVote = (id: string) => {
    setVotes([...(votes ?? []), id]);
  };

  const handleUpvote = (id: string) => {
    upvoteItemMutation.mutate(id);
    persistVote(id);
  };

  const hasBeenVotedFor = (id: string): boolean => {
    return votes?.includes(id) ?? false;
  };

  const copyUrlToClipboard = () => {
    copyToClipboard(window.location.href);
  };

  if (group.isLoading || !group.data) {
    return (
      <main className="hero min-h-screen items-start bg-base-200">
        <div className="hero-content pt-12 text-center">
          <div className="max-w-md animate-pulse ">
            <h1 className="text-5xl font-bold blur">Group name</h1>
            <p className="blur">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Inventore, nemo!
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{`${group.data.name} | VoteUp`}</title>
        <meta name="description" content="Gather and vote items in a group" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          property="og:image"
          content={`${
            process.env.NEXT_PUBLIC_VERCEL_URL
              ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
              : ""
          }/api/og?title=${group.data.name}`}
        />
      </Head>

      <main className="items-start bg-base-200">
        <div className="hero">
          <div className="hero-content pt-12 text-center">
            <div className="max-w-md">
              <div className="flex items-baseline gap-4">
                <h1 className="text-5xl font-bold">{group.data.name} </h1>
                <div
                  className={`tooltip tooltip-right ${
                    tooltipVisible ? "tooltip-open tooltip-success" : ""
                  }`}
                  data-tip={
                    tooltipVisible
                      ? "Link copied to clipboard"
                      : "Copy link to clipboard"
                  }
                >
                  <button
                    disabled={tooltipVisible}
                    className={`text-2xl ${
                      tooltipVisible ? "text-success" : "text-primary"
                    }`}
                    onClick={copyUrlToClipboard}
                  >
                    {tooltipVisible ? (
                      <HiOutlineClipboardDocumentCheck />
                    ) : (
                      <HiOutlineClipboardDocumentList />
                    )}
                  </button>
                </div>
              </div>
              <p>{group.data.description}</p>
            </div>
          </div>
        </div>

        <div className="grid place-items-center px-6">
          <AnimatePresence initial={false}>
            {group.data.items.map((item) => (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="indicator card mx-6 mb-6 w-full max-w-xl bg-base-100 shadow-xl"
                key={item.id}
                layout
              >
                <div className="indicator-item">
                  <UpVoteButton
                    onClick={() => handleUpvote(item.id)}
                    hasBeenVotedFor={hasBeenVotedFor(item.id)}
                  />
                </div>

                <div className="card-body flex flex-row items-baseline justify-between">
                  <div className="m-0">{item.text}</div>

                  <div className="badge-outline badge badge-lg shrink-0">
                    {item.votes} votes
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="grid place-items-center px-6 pb-6">
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
            <form onSubmit={onSubmit} className="card-body">
              <h2 className="card-title m-0">Create item</h2>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Text <span className="text-red-800">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Item text"
                  className="input-bordered input"
                  disabled={createItemMutation.isLoading}
                  {...register("text")}
                />

                {errors.text ? (
                  <span className="label-text-alt label text-red-700">
                    {errors.text.message}
                  </span>
                ) : null}
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  disabled={createItemMutation.isLoading}
                  className={`btn-primary btn ${
                    createItemMutation.isLoading ? "loading" : ""
                  }`}
                >
                  {createItemMutation.isLoading
                    ? "Creating item..."
                    : "Create item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default GroupPage;

const GroupPropsSchema = z.object({
  groupId: z.string(),
});

export const getServerSideProps: GetServerSideProps<GroupProps> = async (
  context
) => {
  try {
    const { groupId } = GroupPropsSchema.parse(context.query);

    const serverSideGroup = await prisma.group.findFirstOrThrow({
      where: {
        id: groupId,
      },
      include: {
        items: {
          orderBy: {
            votes: "desc",
          },
        },
      },
    });

    return {
      props: {
        serverSideGroup,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
