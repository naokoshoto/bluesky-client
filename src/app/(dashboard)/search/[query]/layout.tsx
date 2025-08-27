import { TemplateWithSidebar } from "@/components/template-with-sidebar";
import { PillNavbar } from "@/components/pill-navbar";
import * as routes from "@/lib/routes";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { query: string };
}) {
  const query = decodeURIComponent(params.query);
  const links = [
    {
      href: routes.searchPosts(query),
      label: "Posts",
    },
    {
      href: routes.searchUsers(query),
      label: "Users",
    },
    {
      href: routes.searchHashtags(query),
      label: "Hashtags",
    },
  ];

  return (
    <TemplateWithSidebar>
      <div>
        <PillNavbar links={links} />
        {children}
      </div>
    </TemplateWithSidebar>
  );
}
