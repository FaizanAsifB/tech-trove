"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNav from "../../../components/ui/mobile-nav";
import { navLinks } from "./nav";

const AdminMobileNav = () => {
  const pathname = usePathname();

  return (
    <MobileNav>
      <div>logo</div>
      <Separator />
      <nav>
        {navLinks.map((link) => {
          return (
            <Link
              key={link.title}
              href={link.href}
              className={`mx-[-0.65rem] flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : " text-muted-foreground hover:bg-muted  hover:text-primary"
              }`}
            >
              {link.icon}
              {link.title}
            </Link>
          );
        })}
      </nav>
    </MobileNav>
  );
};

export default AdminMobileNav;
