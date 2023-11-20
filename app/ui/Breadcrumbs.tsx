"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

export type CrumbItem = {
  label: string;
  href?: string;
};
export type CrumbsItems = {
  items: CrumbItem[];
};

const Breadcrumbs: FC<CrumbsItems> = ({ items }) => {
  const pathname = usePathname();
  return (
    <div className="text-sm breadcrumbs">
      <ul>
        {items.map(({ label, href }) => {
          const key = `${pathname}-bredcrumb-${
            href ?? "last"
          }-${label.toLowerCase()}`;

          return (
            <>
              {href && (
                <li
                  key={key}
                  className="mx-1 text-gray-800 font-medium bg-gray-100 px-3 py-1 rounded-3xl"
                >
                  <Link href={href}>{label}</Link>
                </li>
              )}
              {!href && (
                <li className="border rounded-3xl px-3 py-1 border-gray-100 btn-disabled">
                  {label}
                </li>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
