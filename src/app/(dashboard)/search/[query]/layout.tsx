import { TemplateWithSidebar } from "@/components/template-with-sidebar";
import { PillNavbar } from "@/components/pill-navbar";
import * as routes from "@/lib/routes";
import { Article, Person, Tag } from "@/components/icons";

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
      icon: Article,
    },
    {
      href: routes.searchUsers(query),
      label: "Users",
      icon: Person,
    },
    {
      href: routes.searchHashtags(query),
      label: "Hashtags",
      icon: Tag,
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
