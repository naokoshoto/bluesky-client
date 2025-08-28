"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { IconType } from "react-icons";

type LinkDef = {
  href: string;
  label: string;
  icon: IconType;
};

export function PillNavbar({ links }: { links: LinkDef[] }) {
  const pathname = usePathname();

  return (
    <md-navigation-bar>
      {links.map(({ href, label, icon }) => {
        const active = href === pathname;
        const IconComp = icon as any;
        return (
          <Link key={href} href={href}>
            <md-navigation-tab active={active} label={label} hide-inactive-label>
              <IconComp slot="inactive-icon" className="h-5 w-5" />
              <IconComp slot="active-icon" className="h-5 w-5" />
            </md-navigation-tab>
          </Link>
        );
      })}
    </md-navigation-bar>
  );
}
