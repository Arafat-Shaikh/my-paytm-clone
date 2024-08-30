import Link from "next/link";
import React from "react";
import { HomeIcon } from "./Icons";

interface SidebarProps {
  hrefLink: string;
  label: string;
  icon: React.ReactElement;
}

const SidebarButton: React.FC<SidebarProps> = ({ hrefLink, label, icon }) => {
  return (
    <Link
      href={hrefLink}
      className="inline-flex items-center gap-x-2 w-full px-2 py-2.5 rounded-md transition hover:bg-neutral-100 cursor-pointer text-gray-700 hover:text-gray-500"
    >
      {icon}
      {label}
    </Link>
  );
};

export default SidebarButton;
