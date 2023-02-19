/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { useEffect, useState } from "react";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCopyToClipboard } from "react-use";
import {
  HiOutlineClipboardDocumentList,
  HiOutlineClipboardDocumentCheck,
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

import { api } from "../utils/api";
import { NewItemSchema } from "../utils/schemas";

import { prisma } from "../server/db";
import Balancer from "react-wrap-balancer";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { useUser } from "../hooks/useUser";
import { publicGroupSelect } from "../utils/selectors";
TimeAgo.addDefaultLocale(en);

const UpVoteButton = dynamic(() => import("../components/UpVoteButton"), {
  ssr: false,
});

const DeleteButton = dynamic(() => import("../components/DeleteButton"), {
  ssr: false,
});

const GroupPage: NextPage<ServerSideProps> = ({ serverSideGroup }) => {
  const utils = api.useContext();
  const userId = useUser();

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const createItemMutation = api.item.create.useMutation({
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getById.invalidate({
        groupId: serverSideGroup.groupId,
        userId,
      });
    },
  });

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
      utils.group.getById.invalidate({
        groupId: serverSideGroup.groupId,
        userId,
      });
    },
  });

  const deleteItemMutation = api.item.deleteById.useMutation({
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getById.invalidate({
        groupId: serverSideGroup.groupId,
        userId,
      });
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
      group: serverSideGroup.groupId,
      admin: userId,
    },
  });

  const group = api.group.getById.useQuery(
    { groupId: serverSideGroup.groupId, userId },
    {
      initialData: serverSideGroup,
      refetchInterval: 5000,
    }
  );

  const onSubmit = handleSubmit((data) => {
    createItemMutation.mutate(data);
    reset();
  });

  const handleUpvote = (id: string) => {
    upvoteItemMutation.mutate({ itemId: id, user: userId });
  };

  const handleDelete = (id: string) => {
    deleteItemMutation.mutate({ itemId: id, admin: userId });
  };

  const copyUrlToClipboard = () => {
    copyToClipboard(window.location.href);
  };

  const timeAgo = new TimeAgo("en-US");

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

        <meta
          property="og:image"
          content={`${
            process.env.NEXT_PUBLIC_VERCEL_URL
              ? "https://" + process.env.NEXT_PUBLIC_VERCEL_URL
              : ""
          }/api/og?title=${group.data.name}`}
        />
      </Head>

      <main className="min-h-screen items-start">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">VoteUp</Link>
            </li>

            <li>
              <span className="mr-2">{group.data.name}</span>
              <span
                className={`tooltip tooltip-bottom sm:tooltip-right ${
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
                  className={`text-xl ${
                    tooltipVisible ? "text-success" : "text-primary"
                  }`}
                  onClick={copyUrlToClipboard}
                  aria-label="Copy link to clipboard"
                >
                  {tooltipVisible ? (
                    <HiOutlineClipboardDocumentCheck />
                  ) : (
                    <HiOutlineClipboardDocumentList />
                  )}
                </button>
              </span>
            </li>
          </ul>
        </div>

        <div className="hero">
          <div className="hero-content w-full pt-12 text-center">
            <div className="w-full max-w-md">
              <h1 className="mb-0 text-5xl font-bold">
                <Balancer>{group.data.name}</Balancer>
              </h1>
              <p>{group.data.description}</p>
            </div>
          </div>
        </div>

        <div className="grid place-items-center px-6">
          <AnimatePresence initial={false}>
            {group.data.items.map((item) => (
              <motion.div
                initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
                exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                className="group indicator card mx-6 w-full max-w-xl bg-base-100 shadow-xl"
                key={item.id}
                layout
              >
                <div className="indicator-item">
                  <div className="btn-accent btn-active no-animation btn-sm btn cursor-default text-white">
                    {item.voteCount}
                  </div>
                </div>

                <div className="card-body">
                  <div className="flex items-center gap-2">
                    <h3 className="m-0">{item.text}</h3>
                    <DeleteButton
                      onClick={() => handleDelete(item.id)}
                      visible={group.data.isAdmin || item.isCreator}
                    />
                  </div>

                  <div className="card-actions min-h-12 items-end justify-between align-bottom">
                    <div className="m-0 text-sm text-base-300">
                      <span
                        className={"tooltip tooltip-top"}
                        data-tip={item.createdAt.toLocaleString("en-US")}
                      >
                        Created {timeAgo.format(item.createdAt)} by{" "}
                        {item.creator}
                      </span>
                    </div>

                    <UpVoteButton
                      onClick={() => handleUpvote(item.id)}
                      visible={!item.votes.includes(userId)}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div
          layout="position"
          className="grid place-items-center px-6 pb-24"
        >
          <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-xl">
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="input-bordered input"
                  disabled={createItemMutation.isLoading}
                  {...register("creator")}
                />

                {errors.creator ? (
                  <span className="label-text-alt label text-red-700">
                    {errors.creator.message}
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
        </motion.div>
      </main>
    </>
  );
};

export default GroupPage;

const GroupPropsSchema = z.object({
  groupId: z.string(),
});

type ServerSideProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { groupId } = GroupPropsSchema.parse(context.query);

    const serverSideGroup = await prisma.group.findFirstOrThrow({
      where: {
        groupId,
      },
      select: publicGroupSelect,
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
