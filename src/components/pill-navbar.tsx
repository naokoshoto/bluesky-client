"use client";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

type Link = {
  href: string;
  label: string;
};

export function PillNavbar({ links }: { links: Link[] }) {
  const pathname = usePathname();

  return (
    <>
      <div className="mb-3 flex flex-row space-x-2">
        {links.map((link) => {
          return (
            <Button
              key={link.href}
              href={link.href}
              variant={link.href === pathname ? "filled" : "outlined"}
            >
              {link.label}
            </Button>
          );
        })}
      </div>
    </>
  );
}
