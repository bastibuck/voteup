import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function ogCreator(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const hasTitle = searchParams.has("title");
  const title = hasTitle
    ? searchParams.get("title")
    : "Create groups and vote for items";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}
      >
        <div tw="bg-gray-200 flex h-full">
          <div tw="flex flex-col w-full py-12 px-4 justify-between p-8">
            <h2 tw="flex flex-col text-6xl tracking-tight text-gray-900 text-left">
              <span tw="text-indigo-600 text-8xl">{title}</span>
              <span>VoteUp</span>
            </h2>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
