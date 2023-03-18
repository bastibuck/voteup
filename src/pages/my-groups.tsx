/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useCopyToClipboard } from "react-use";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import { api } from "../utils/api";

import { useUser } from "../hooks/useUser";
import DeleteButton from "../components/buttons/DeleteButton";
import { Button } from "../lib/ui/Button";
import ToolTip from "../lib/ui/ToolTip";

TimeAgo.addDefaultLocale(en);

const MyGroupsPage: NextPage = ({}) => {
  const utils = api.useContext();
  const userId = useUser();

  const [copyResult, copyToClipboard] = useCopyToClipboard();
  const [copiedUrl, setCopiedUrl] = useState("");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    if (copyResult.value !== undefined && copyResult.error === undefined) {
      setCopiedUrl(copyResult.value);

      timeoutId = setTimeout(() => {
        setCopiedUrl("");
      }, 4000);
    }

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [copyResult]);

  const copyUrlToClipboard = (groupId: string) => {
    copyToClipboard(`${window.location.origin}/${groupId}`);
  };

  const myGroups = api.group.getAllUserGroups.useQuery(
    { admin: userId },
    { initialData: [] }
  );

  const deleteItemMutation = api.group.deleteById.useMutation({
    onError(error) {
      console.error(error);
    },
    onSettled() {
      utils.group.getAllUserGroups.invalidate({ admin: userId });
    },
  });

  const timeAgo = new TimeAgo("en-US");

  const handleDelete = (groupId: string) => {
    deleteItemMutation.mutate({ admin: userId, groupId });
  };

  return (
    <>
      <Head>
        <title>{`My groups | VoteUp`}</title>
        <meta name="description" content="Gather and vote items in a group" />
      </Head>

      <main className="min-h-screen items-start">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link href="/">VoteUp</Link>
            </li>

            <li>
              <span className="mr-2">My groups</span>
            </li>
          </ul>
        </div>

        <div className="hero">
          <div className="hero-content w-full pt-12 text-center">
            <div className="w-full max-w-md">
              <h1 className="mb-6 text-5xl font-bold">My groups</h1>
            </div>
          </div>
        </div>

        {myGroups.data.length === 0 ? (
          <div className="grid place-items-center px-6">No groups yet</div>
        ) : null}

        <div className="grid place-items-center px-6">
          {myGroups.data.map((group) => (
            <div
              className="group card mx-6 mb-6 w-full max-w-xl bg-base-100 shadow-xl"
              key={group.groupId}
            >
              <div className="card-body">
                <div className="flex items-center gap-2">
                  <h3 className="m-0">{group.name}</h3>
                  <DeleteButton
                    toolTip="Do you really want to delete this group?"
                    onClick={() => handleDelete(group.groupId)}
                    withFadeIn
                  />
                </div>

                <p className="m-0">{group.description}</p>

                <div className="card-actions min-h-12 items-end justify-between align-bottom">
                  <div className="m-0 text-sm text-base-300">
                    <span
                      className={"tooltip tooltip-top"}
                      data-tip={group.createdAt.toLocaleString("en-US")}
                    >
                      Created {timeAgo.format(group.createdAt)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <ToolTip
                      toolTip={
                        copiedUrl.includes(group.groupId)
                          ? "Link copied to clipboard"
                          : undefined
                      }
                      open={copiedUrl.includes(group.groupId)}
                      color="success"
                    >
                      <Button
                        outlined
                        size="sm"
                        casing="normal"
                        onClick={() => copyUrlToClipboard(group.groupId)}
                      >
                        Copy URL
                      </Button>
                    </ToolTip>

                    <Button as="link" href={group.groupId} size="sm">
                      Open
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default MyGroupsPage;
