import React from "react";
import Link from "next/link";
import { CiUser } from "react-icons/ci";

const UserMenu = () => {
  return (
    <div className="not-prose group dropdown-end dropdown absolute top-4 right-4">
      <label
        tabIndex={0}
        className="btn-ghost btn rounded-none group-focus-within:bg-base-100 group-focus-within:shadow"
        aria-label="User menu"
      >
        <CiUser className="text-2xl" />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content menu w-56 bg-base-100 shadow"
      >
        <li>
          <Link href="/my-groups">My groups</Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
