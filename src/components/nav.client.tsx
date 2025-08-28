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

export function Sidebar({
  userId,
  feedGenerators,
  pinnedFeedGenerators,
}: {
  userId?: string;
  feedGenerators: z.infer<typeof feedGeneratorSchema>[];
  pinnedFeedGenerators?: z.infer<typeof feedGeneratorSchema>[];
}) {
  const pathname = usePathname();

  const feeds = feedGenerators.filter((feed) => feed.avatar);

  return (
    <div className="flex flex-col justify-between min-h-full divide-y">
      <div className="flex flex-col space-y-1 pb-4">
        {SIDEBAR_LINKS_SECTION_1.map(
          ({ href, text, icon: Icon, iconActive: IconActive }) => (
            <Button
              key={href}
              href={href}
              variant={matchPaths(href, pathname) ? "filled" : "text"}
              className="justify-start px-2.5 -mx-2.5"
            >
              {matchPaths(href, pathname) ? (
                <IconActive className="mr-1.5 text-lg" />
              ) : (
                <Icon className="mr-1.5 text-lg" />
              )}
              {text}
            </Button>
          ),
        )}
      </div>

      {pinnedFeedGenerators && (
        <div className="flex flex-col space-y-1 py-4">
          <div className="uppercase text-muted-foreground text-sm">
            Pinned Feeds
          </div>
          {pinnedFeedGenerators.map((feed) => (
            <Button
              key={feed.uri}
              href={`/?feed=${feed.uri}`}
              variant="text"
              className="mr-2 justify-start px-2.5 -mx-2.5"
            >
              <div className="flex flex-row space-x-1.5">
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
              </div>
            </Button>
          ))}
        </div>
      )}

      <div className="flex flex-col space-y-1 py-4">
        <div className="uppercase text-muted-foreground text-sm">
          Popular Feeds
        </div>
        {feeds.map((feed) => (
          <Button
            key={feed.uri}
            href={`/?feed=${feed.uri}`}
            variant="text"
            className="mr-2 justify-start px-2.5 -mx-2.5"
          >
            <div className="flex flex-row space-x-1.5">
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
            </div>
          </Button>
        ))}
      </div>

      <div className="flex flex-col space-y-1 py-4">
        <div className="uppercase text-muted-foreground text-sm">Settings</div>
        <ModeToggle />
        {userId && (
          <form action={logout} className="contents">
            <Button
              variant="text"
              className="justify-start px-2.5 -mx-2.5"
            >
              <LogOut className="mr-1.5 text-lg" />
              Logout
            </Button>
          </form>
        )}
      </div>

      <div className="pt-4 flex flex-col">
        <Button
          href={routes.about}
          variant="text"
          className="justify-start px-2.5 -mx-2.5"
        >
          About
        </Button>
      </div>
    </div>
  );
}

export function BottomTabNavigator() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background/80 z-20 backdrop-blur md:hidden pb-safe-or-2">
      <div className="flex flex-row justify-between pt-2 px-8">
        {SIDEBAR_LINKS_SECTION_1.map(
          ({ href, text, icon: Icon, iconActive: IconActive }) => (
            <Link href={href} className="flex flex-col items-center" key={href}>
              {matchPaths(href, pathname) ? (
                <IconActive className="mr-1.5 text-2xl" />
              ) : (
                <Icon className="mr-1.5 text-xl" />
              )}
              <span className="text-sm">{text}</span>
            </Link>
          ),
        )}
      </div>
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
      <SheetTrigger className="md:hidden">
        <Menu className="mr-3" />
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
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
