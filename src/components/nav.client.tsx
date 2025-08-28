"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as routes from "@/lib/routes";
import { logout } from "@/lib/bsky/server-actions";
import { feedGeneratorSchema } from "@/lib/schemas";
import z from "zod";
import Image from "next/image";
import { ModeToggle } from "@/components/theme-mode-toggle";
import { Menu } from "@/components/icons";
import { useState, type ReactNode } from "react";

import {
  HomeOutline,
  HomeFill,
  ArrowUpRightCircleFill,
  ArrowUpRightCircleOutline,
  Feed,
  FeedFill,
  LogOut,
} from "@/components/icons";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const SIDEBAR_LINKS_SECTION_1 = [
  {
    href: routes.home,
    text: "Home",
    icon: HomeOutline,
    iconActive: HomeFill,
  },
  {
    href: "/popular",
    text: "Popular",
    icon: ArrowUpRightCircleOutline,
    iconActive: ArrowUpRightCircleFill,
  },
  {
    href: routes.feeds,
    text: "Explore",
    icon: Feed,
    iconActive: FeedFill,
  },
];

const matchPaths = (target: string, current: string) => {
  if (target === routes.home) {
    return current === target;
  }

  return current.indexOf(target) === 0;
};

function Sidebar({
  userId,
  feedGenerators,
  pinnedFeedGenerators,
  collapsed = false,
  onToggleCollapsed,
}: {
  userId?: string;
  feedGenerators: z.infer<typeof feedGeneratorSchema>[];
  pinnedFeedGenerators?: z.infer<typeof feedGeneratorSchema>[];
  collapsed?: boolean;
  onToggleCollapsed?: () => void;
}) {
  const pathname = usePathname();

  const feeds = feedGenerators.filter((feed) => feed.avatar);

  return (
    <div className="flex flex-col justify-between min-h-full divide-y">
      <div className={`flex flex-col space-y-1 pb-4 ${collapsed ? "items-center" : ""}`}>
        {onToggleCollapsed && (
          <Button
            onClick={onToggleCollapsed}
            variant="ghost"
            size="sm"
            className={
              collapsed
                ? "flex flex-col items-center gap-1 w-full rounded-full px-3 py-2"
                : "justify-start px-2.5 -mx-2.5"
            }
          >
            <Menu className={collapsed ? "h-6 w-6" : "mr-1.5 text-lg"} />
            {collapsed ? <span className="text-xs">Menu</span> : "Menu"}
          </Button>
        )}
        {SIDEBAR_LINKS_SECTION_1.map(
          ({ href, text, icon: Icon, iconActive: IconActive }) => {
            const active = matchPaths(href, pathname);
            const IconComp = active ? IconActive : Icon;
            return (
              <Button
                key={href}
                asChild
                size="sm"
                variant={active ? "secondary" : "ghost"}
                className={
                  collapsed
                    ? "flex flex-col items-center gap-1 w-full rounded-full px-3 py-2"
                    : "justify-start px-2.5 -mx-2.5"
                }
              >
                <Link
                  href={href}
                  className={collapsed ? "flex flex-col items-center" : "flex items-center"}
                >
                  <IconComp className={collapsed ? "h-6 w-6" : "mr-1.5 text-lg"} />
                  {collapsed ? <span className="text-xs">{text}</span> : text}
                </Link>
              </Button>
            );
          },
        )}
      </div>

      {pinnedFeedGenerators && (
        <div className={`${collapsed ? "hidden" : "flex"} flex-col space-y-1 py-4`}>
          <div className="uppercase text-muted-foreground text-sm">
            Pinned Feeds
          </div>
          {pinnedFeedGenerators.map((feed) => (
            <Button
              key={feed.uri}
              asChild
              size="sm"
              variant="ghost"
              className="mr-2 justify-start px-2.5 -mx-2.5"
            >
              <Link
                className="flex flex-row space-x-1.5"
                href={`/?feed=${feed.uri}`}
              >
                {feed.avatar && (
                  <div className="relative w-6 h-6">
                    <Image
                      unoptimized
                      src={feed.avatar}
                      alt={feed.displayName}
                      className="rounded-full"
                      fill
                    />
                  </div>
                )}
                <span>{feed.displayName}</span>
              </Link>
            </Button>
          ))}
        </div>
      )}

      <div className={`${collapsed ? "hidden" : "flex"} flex-col space-y-1 py-4`}>
        <div className="uppercase text-muted-foreground text-sm">
          Popular Feeds
        </div>
        {feeds.map((feed) => (
          <Button
            key={feed.uri}
            asChild
            size="sm"
            variant="ghost"
            className="mr-2 justify-start px-2.5 -mx-2.5"
          >
            <Link
              className="flex flex-row space-x-1.5"
              href={`/?feed=${feed.uri}`}
            >
              {feed.avatar && (
                <div className="relative w-6 h-6">
                  <Image
                    unoptimized
                    src={feed.avatar}
                    alt={feed.displayName}
                    className="rounded-full"
                    fill
                  />
                </div>
              )}
              <span>{feed.displayName}</span>
            </Link>
          </Button>
        ))}
      </div>

      <div className={`${collapsed ? "hidden" : "flex"} flex-col space-y-1 py-4`}>
        <div className="uppercase text-muted-foreground text-sm">Settings</div>
        <ModeToggle />
        {userId && (
          <form action={logout} className="contents">
            <Button
              variant="ghost"
              className="justify-start px-2.5 -mx-2.5"
              size="sm"
            >
              <LogOut className="mr-1.5 text-lg" />
              Logout
            </Button>
          </form>
        )}
      </div>

      <div className={`${collapsed ? "hidden" : "flex"} pt-4 flex-col`}>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="justify-start px-2.5 -mx-2.5"
        >
          <Link href={routes.about}>About</Link>
        </Button>
      </div>
    </div>
  );
}

export function BottomTabNavigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-[hsl(var(--surface))]/90 z-20 backdrop-blur shadow-md md:hidden pb-safe-or-2">
      <nav className="flex flex-row justify-between pt-2 px-6">
        {SIDEBAR_LINKS_SECTION_1.map(
          ({ href, text, icon: Icon, iconActive: IconActive }) => {
            const active = matchPaths(href, pathname);
            const IconComp = active ? IconActive : Icon;
            return (
              <Button
                key={href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className="flex flex-col items-center gap-1 px-3 py-2"
              >
                <Link href={href}>
                  <IconComp className="h-6 w-6" />
                  <span className="text-sm">{text}</span>
                </Link>
              </Button>
            );
          },
        )}
      </nav>
    </div>
  );
}

export function Drawer({
  userId,
  feedGenerators,
  pinnedFeedGenerators,
}: {
  userId?: string;
  feedGenerators: z.infer<typeof feedGeneratorSchema>[];
  pinnedFeedGenerators?: z.infer<typeof feedGeneratorSchema>[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="md:hidden fixed bottom-20 right-4 h-14 w-14 rounded-full shadow-lg z-40"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-full sm:max-w-full rounded-none bg-[hsl(var(--surface))]">
        <div className="overflow-y-auto h-full p-6">
          <Sidebar
            userId={userId}
            feedGenerators={feedGenerators}
            pinnedFeedGenerators={pinnedFeedGenerators}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function DesktopNav({
  userId,
  feedGenerators,
  pinnedFeedGenerators,
  children,
}: {
  userId?: string;
  feedGenerators: z.infer<typeof feedGeneratorSchema>[];
  pinnedFeedGenerators?: z.infer<typeof feedGeneratorSchema>[];
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <aside
        className={`fixed left-0 bottom-0 top-14 border-r bg-[hsl(var(--surface-container))] overflow-y-auto transition-all shadow-md max-md:hidden ${
          expanded ? "w-64 p-6" : "w-20 p-2"
        }`}
      >
        <Sidebar
          userId={userId}
          feedGenerators={feedGenerators}
          pinnedFeedGenerators={pinnedFeedGenerators}
          collapsed={!expanded}
          onToggleCollapsed={() => setExpanded((prev) => !prev)}
        />
      </aside>
      <main
        className={`w-full mx-auto transition-all ${
          expanded ? "md:pl-64" : "md:pl-20"
        }`}
      >
        {children}
      </main>
    </>
  );
}
