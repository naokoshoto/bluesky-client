"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

type Link = {
  href: string;
  label: string;
  icon: IconType;
};

export function PillNavbar({ links }: { links: Link[] }) {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-3 flex flex-row space-x-2">
        {links.map(({ href, label, icon: Icon }) => {
          const active = href === pathname;
          return (
            <Button
              key={href}
              asChild
              variant={active ? "secondary" : "outline"}
              size="sm"
              className="flex flex-col items-center gap-1 px-3 py-2"
            >
              <Link href={href} className="flex flex-col items-center">
                <Icon className="h-5 w-5" />
                <span className="text-xs">{label}</span>
              </Link>
            </Button>
          );
        })}
      </div>
    </>
  );
}
