"use client";

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
    <aside className="fixed left-0 bottom-0 top-14 max-md:hidden w-20 bg-background p-2 flex flex-col items-center gap-1 z-20">
      {NAV_ITEMS.map(({ href, label, icon, activeIcon }) => {
        const active = matchPaths(href, pathname);
        const Icon = (active ? activeIcon : icon) as any;
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 rounded-full p-2"
          >
            <md-icon-button selected={active}>
              <Icon slot="icon" className="h-6 w-6" />
            </md-icon-button>
            <span className={`text-xs ${active ? "text-primary" : ""}`}>{label}</span>
          </Link>
        );
      })}
    </aside>
  );
}

export function BottomTabNavigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20 md:hidden">
      <md-navigation-bar>
        {NAV_ITEMS.map(({ href, label, icon, activeIcon }) => {
          const active = matchPaths(href, pathname);
          const Inactive = icon as any;
          const Active = activeIcon as any;
          return (
            <Link key={href} href={href}>
              <md-navigation-tab active={active} label={label} hide-inactive-label>
                <Inactive slot="inactive-icon" className="h-6 w-6" />
                <Active slot="active-icon" className="h-6 w-6" />
              </md-navigation-tab>
            </Link>
          );
        })}
      </md-navigation-bar>
    </div>
  );
}
