"use client";

import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

const MenuHamburguer = () => {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Dashboard",
    },
    {
      href: "/transactions",
      label: "Transações",
    },
    {
      href: "/subscription",
      label: "Assinatura",
    },
  ];

  return (
    <div className="flex justify-between border-b border-solid px-8 py-4 md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <SheetHeader>
            <Image src="/logo.svg" alt="Finance AI" width={173} height={39} />
          </SheetHeader>
          <div className="mt-10 flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <UserButton showName />
    </div>
  );
};

export default MenuHamburguer;
