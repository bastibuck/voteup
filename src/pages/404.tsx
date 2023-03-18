import React from "react";
import { Button } from "../lib/ui/Button";

const NotFound = () => {
  return (
    <main className="hero min-h-screen bg-base-200">
      <div className="hero-content max-w-3xl flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="mb-0 font-bold">Group not found</h1>
          <p className="mt-0 py-6">
            The group you are looking for does not exist (anymore). We remove
            old groups after 60 days of inactivity.
          </p>
          <p>Feel free to create a new group 🚀.</p>
        </div>

        <div className="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
          <div className="card-body">
            <h2 className="blur-sm">Unknown group</h2>
            <p className="blur-sm">
              Create a new group to start creating and voting for items by going
              back to the home screen.
            </p>
            <div className="card-actions justify-end">
              <Button as="link" href={"/"}>
                Create new group
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
