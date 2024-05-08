"use client";

import {
  ArchiveBoxIcon,
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  ListBulletIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { Package2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navLinks = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <HomeIcon className="size-6" />,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: <ArchiveBoxIcon className="size-6" />,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: <ListBulletIcon className="size-6" />,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: <QueueListIcon className="size-6" />,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: <Cog6ToothIcon className="size-6" />,
  },
  {
    title: "Logout",
    href: "/admin/logout",
    icon: <ArrowLeftEndOnRectangleIcon className="size-6" />,
  },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">MyE-commerce Admin</span>
          </Link>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  pathname === link.href
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {link.icon}
                {link.title}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
export default Nav;
