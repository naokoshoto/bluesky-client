import { agent, getSession } from "@/lib/bsky/agent";
import { NavigationRail, BottomTabNavigator } from "@/components/nav.client";
import Link from "next/link";
import { SearchBar } from "./search-bar.client";
import * as routes from "@/lib/routes";
import { Logo, BellOutline } from "@/components/icons";
import { ActorAvatar } from "@/components/actor";
import { Button } from "@/components/ui/button";
import { VercelToolbar } from "@vercel/toolbar/next";
import { env } from "@/env";

export const dynamic = "force-dynamic";

function NotificationBell({ count }: { count: number }) {
  return (
    <Link className="relative" href={routes.notifications}>
      <BellOutline className="text-2xl mr-3" />
      {count > 0 && (
        <div className="absolute -top-1 right-1/4 w-3 h-3 bg-red-500 rounded-full" />
      )}
    </Link>
  );
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  const user = session ? await agent.getProfile({ actor: session.handle }) : null;
  const notifications = session
    ? await agent.countUnreadNotifications()
    : undefined;

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="h-14 border-b flex flex-row items-center justify-between px-4 fixed top-0 inset-x-0 bg-background/70 z-20 backdrop-blur">
          <Link
            href={routes.home}
            className="md:flex-1 flex flex-row items-center space-x-0.5 mr-3"
          >
            <span className="font-black text-xl">BLUE</span>
            <Logo className="text-2xl" />
          </Link>

          <SearchBar />

          <div className="md:flex-1 flex items-center justify-end ml-3">
            {user?.data ? (
              <>
                {notifications?.data && (
                  <NotificationBell count={notifications.data.count} />
                )}
                <Link href={routes.user(user.data.handle)}>
                  <ActorAvatar actor={user.data} className="h-8 w-8" />
                </Link>
              </>
            ) : (
              <Button asChild>
                <Link href={routes.auth}>Login</Link>
              </Button>
            )}
          </div>
        </div>

        <div className="h-14" />

        <NavigationRail />
        <main className="w-full md:pl-20">{children}</main>

        <BottomTabNavigator />
      </div>
      {(session?.handle === env.ADMIN_HANDLE ||
        env.NODE_ENV === "development") && <VercelToolbar />}
    </>
  );
}
