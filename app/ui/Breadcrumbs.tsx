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
          console.log(key);

          return (
            <>
              {href && (
                <li key={key}>
                  <Link href={href}>{label}</Link>
                </li>
              )}
              {!href && <li className="btn-disabled">{label}</li>}
            </>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
