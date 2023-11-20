import Link from "next/link";
import {
  HomeModernIcon,
  CalendarDaysIcon,
  BookOpenIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

const NavigationLinks = () => {
  const links = [
    {
      href: "/dashboard",
      label: "Home",
      Icon: HomeModernIcon,
    },
    {
      href: "/dashboard/eventos",
      label: "Eventos",
      Icon: CalendarDaysIcon,
    },

    {
      href: "/dashboard/personas",
      label: "Personas",
      Icon: UserGroupIcon,
    },
    {
      href: "/repository/search",
      label: "Search",
      Icon: BookOpenIcon,
    },
  ];

  return (
    <>
      {links.map((link) => {
        const { href, label, Icon } = link;

        return (
          <Link
            className="flex py-3 px-2 rounded-lg  gap-2  hover:bg-neutral-200 lg:px-4 lg:py-2 lg:hover:text-accent-focus"
            key={`link-${href}`}
            href={href}
            target={`${href === "/repository/search" ? "_blank" : "_self"}`}
          >
            <Icon className="w-5 h-5" />
            <p>{label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default NavigationLinks;
