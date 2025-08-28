"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as routes from "@/lib/routes";
import { cn } from "@/lib/utils";

import {
  HomeOutline,
  HomeFill,
  ArrowUpRightCircleOutline,
  ArrowUpRightCircleFill,
  Feed,
  FeedFill,
} from "@/components/icons";

const NAV_ITEMS = [
  {
    href: routes.home,
    label: "Home",
    icon: HomeOutline,
    activeIcon: HomeFill,
  },
  {
    href: "/popular",
    label: "Popular",
    icon: ArrowUpRightCircleOutline,
    activeIcon: ArrowUpRightCircleFill,
  },
  {
    href: routes.feeds,
    label: "Explore",
    icon: Feed,
    activeIcon: FeedFill,
  },
];

const matchPaths = (target: string, current: string) => {
  if (target === routes.home) {
    return current === target;
  }

  return current.startsWith(target);
};

export function NavigationRail() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 bottom-0 top-14 border-r bg-[hsl(var(--surface-container))] shadow-md max-md:hidden w-20 flex flex-col items-center">
      <nav className="mt-4 flex flex-col items-center gap-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon, activeIcon: ActiveIcon }) => {
          const active = matchPaths(href, pathname);
          const IconComp = active ? ActiveIcon : Icon;
          return (
            <Button
              key={href}
              asChild
              variant="ghost"
              className="h-14 w-14 flex flex-col items-center justify-center gap-1 hover:bg-transparent"
            >
              <Link href={href} className="group flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    active
                      ? "bg-[hsl(var(--secondary-container))] text-[hsl(var(--on-secondary-container))]"
                      : "group-hover:bg-[hsl(var(--secondary-container))]/40"
                  )}
                >
                  <IconComp className="h-6 w-6" />
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
      </nav>
    </aside>
  );
}

export function BottomTabNavigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-[hsl(var(--surface))]/90 z-20 backdrop-blur shadow-md md:hidden pb-safe-or-2">
      <nav className="flex flex-row justify-between pt-2 px-6">
        {NAV_ITEMS.map(({ href, label, icon: Icon, activeIcon: ActiveIcon }) => {
          const active = matchPaths(href, pathname);
          const IconComp = active ? ActiveIcon : Icon;
          return (
            <Button
              key={href}
              asChild
              variant="ghost"
              className="flex flex-col items-center gap-1 px-3 py-2 hover:bg-transparent"
            >
              <Link href={href} className="group flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                    active
                      ? "bg-[hsl(var(--secondary-container))] text-[hsl(var(--on-secondary-container))]"
                      : "group-hover:bg-[hsl(var(--secondary-container))]/40"
                  )}
                >
                  <IconComp className="h-6 w-6" />
                </span>
                <span
                  className={cn("text-sm", {
                    "text-[hsl(var(--on-secondary-container))]": active,
                  })}
                >
                  {label}
                </span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
