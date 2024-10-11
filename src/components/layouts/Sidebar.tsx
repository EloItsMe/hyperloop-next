"use client";

import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar({ currentUser }: { currentUser: User }) {
  return (
    <aside className="sticky top-0 z-50 grid h-dvh w-full max-w-64 grid-rows-[1fr_auto] gap-9 rounded-e-lg border-y border-r border-slate-200 bg-slate-100 p-4">
      <nav></nav>
      <Link
        href={"/profile"}
        className="grid grid-cols-[1fr_auto] gap-4 rounded-md p-3 transition-colors hover:bg-slate-200"
      >
        <div className="flex items-center gap-4">
          <UserAvatar avatarUrl={currentUser?.image} />
          <p className="truncate text-sm">{currentUser?.name}</p>
        </div>

        <button className="z-[51]" onClick={() => signOut()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
            />
          </svg>
        </button>
      </Link>
    </aside>
  );
}

const UserAvatar = ({ avatarUrl }: { avatarUrl?: string | null }) => {
  if (avatarUrl) {
    return (
      <Image
        alt="Avatar"
        src={avatarUrl}
        width={36}
        height={36}
        className="size-9 rounded-full bg-slate-300"
      />
    );
  } else {
    return <div className="size-9 rounded-full bg-slate-300" />;
  }
};
