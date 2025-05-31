"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";

const NavLinks = ({ isMobileNav = false }) => {
  const pathName = usePathname();
  const userId = 1;
  return (
    <>
      {sidebarLinks.map((link) => {
        const isActiveLink =
          pathName.includes(link.route) && pathName === link.route;
        if (link.route === "/profile") {
          if (userId) link.route = `/profile/${userId}`;
          else return null;
        }

        const linkComponent = (
          <Link
            key={link.route}
            href={link.route}
            className={cn(
              isActiveLink ?
                "primary-gradient rounded-lg text-light-900"
              : "text-dark300_light900",
              "flex items-center justify-start gap-4 bg-transparent p-4"
            )}>
            <Image
              src={link.imgURL}
              alt={link.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActiveLink })}
            />
            <span
              className={cn(
                isActiveLink ? "base-bold" : "base-medium",
                !isMobileNav && "max-lg:hidden"
              )}>
              {link.label}
            </span>
          </Link>
        );
        return isMobileNav ?
            <SheetClose asChild key={link.route}>
              {linkComponent}
            </SheetClose>
          : <Fragment key={link.route}>{linkComponent}</Fragment>;
      })}
    </>
  );
};
export default NavLinks;
