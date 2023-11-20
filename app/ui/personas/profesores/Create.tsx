import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React from "react";

const Create = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link
      href={href}
      className="flex h-10 items-center rounded-lg bg-green-700 px-4 text-sm font-medium text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{text}</span>
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
};

export default Create;
