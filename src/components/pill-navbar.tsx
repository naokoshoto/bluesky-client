"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

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
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-transparent"
            >
              <Link href={href} className="group flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    active
                      ? "bg-[hsl(var(--secondary-container))] text-[hsl(var(--on-secondary-container))]"
                      : "group-hover:bg-[hsl(var(--secondary-container))]/40"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span
                  className={cn("text-xs", {
                    "text-[hsl(var(--on-secondary-container))]": active,
                  })}
                >
                  {label}
                </span>
              </Link>
            </Button>
          );
        })}
      </div>
    </>
  );
}
