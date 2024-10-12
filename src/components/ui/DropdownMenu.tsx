"use client";

import { cn } from "@/lib/utils/tailwindcss";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UrlObject } from "url";

type DropdownMenuContextType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DropdownMenuContext = createContext<DropdownMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
});

export function DropdownMenu({ children }: { children?: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropDownMenuRef.current &&
      !dropDownMenuRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative" ref={dropDownMenuRef}>
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

type TriggerProps = {
  children?: React.ReactNode;
  className?: string;
};

function Trigger({ children, className }: TriggerProps) {
  const { setIsOpen } = useContext(DropdownMenuContext);

  return (
    <button
      className={className}
      type="button"
      onClick={() => setIsOpen((prev) => !prev)}
    >
      {children}
    </button>
  );
}

type MenuProps = {
  children?: React.ReactNode;
};

function Menu({ children }: MenuProps) {
  const { isOpen } = useContext(DropdownMenuContext);

  const styles = cn(
    "absolute bottom-[calc(100%+8px)] left-0 z-50 grid w-full gap-1 rounded-md border border-slate-300 bg-slate-100 p-1"
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.ul
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.1 }}
          className={styles}
        >
          {children}
        </motion.ul>
      )}
    </AnimatePresence>
  );
}

type ItemProps = {
  label: string;
  icon?: React.ReactNode;
} & (ItemLinkProps | ItemButtonProps);

type ItemLinkProps = {
  type: "link";
  href: __next_route_internal_types__.RouteImpl<UrlObject>;
};

type ItemButtonProps = {
  type: "button";
  onClick: () => void;
};

function Item(props: ItemProps) {
  const { setIsOpen } = useContext(DropdownMenuContext);

  const styles = cn(
    "grid grid-cols-[auto_1fr] items-center gap-2 rounded p-2 text-left text-sm font-medium text-slate-700 transition-colors",
    "hover:bg-slate-200 hover:text-slate-950",
    "[&>svg]:size-5"
  );

  if (props.type === "link") {
    return (
      <Link
        href={props.href}
        className={styles}
        onClick={() => setIsOpen(false)}
      >
        {props.icon}
        {props.label}
      </Link>
    );
  }

  if (props.type === "button") {
    return (
      <button
        onClick={() => {
          setIsOpen(false);
          props.onClick();
        }}
        className={styles}
      >
        {props.icon}
        {props.label}
      </button>
    );
  }
}

DropdownMenu.Trigger = Trigger;
Menu.Item = Item;
DropdownMenu.Menu = Menu;
