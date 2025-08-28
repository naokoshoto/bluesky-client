"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as routes from "@/lib/routes";

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
              variant={active ? "secondary" : "ghost"}
              className="h-14 w-14 rounded-full flex flex-col items-center justify-center gap-1"
            >
              <Link href={href} className="flex flex-col items-center">
                <IconComp className="h-6 w-6" />
                <span className="text-xs">{label}</span>
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
              variant={active ? "secondary" : "ghost"}
              className="flex flex-col items-center gap-1 px-3 py-2"
            >
              <Link href={href}>
                <IconComp className="h-6 w-6" />
                <span className="text-sm">{label}</span>
              </Link>
            </Button>
          );
        })}
      </nav>
    </div>
  );
}
