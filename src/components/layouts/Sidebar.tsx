"use client";

import { ExitIcon } from "@/assets/icons/Exit";
import UserIcon from "@/assets/icons/User";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { DropdownMenu } from "../ui/DropdownMenu";

export default function Sidebar({ currentUser }: { currentUser: User }) {
  return (
    <aside className="sticky top-0 z-50 grid h-dvh w-full max-w-64 grid-rows-[1fr_auto] gap-9 rounded-e-lg border-y border-r border-slate-300 bg-slate-100 p-4">
      <nav></nav>
      <UserMenu currentUser={currentUser} />
    </aside>
  );
}

const UserMenu = ({ currentUser }: { currentUser: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger className="grid w-full grid-cols-[auto_1fr] gap-4 rounded-md p-3 transition-colors hover:bg-slate-200">
        <UserAvatar avatarUrl={currentUser?.image} />
        <div className="grid justify-items-start">
          <p className="truncate text-sm text-slate-950">{currentUser?.name}</p>
          <p className="truncate text-xs text-slate-500">{currentUser.email}</p>
        </div>
      </DropdownMenu.Trigger>
      <DropdownMenu.Menu>
        <DropdownMenu.Menu.Item
          type="link"
          href={"/profile"}
          icon={<UserIcon />}
          label="Profile"
        />
        <DropdownMenu.Menu.Item
          type="button"
          onClick={() => signOut()}
          icon={<ExitIcon />}
          label="Logout"
        />
      </DropdownMenu.Menu>
    </DropdownMenu>
  );
};

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
