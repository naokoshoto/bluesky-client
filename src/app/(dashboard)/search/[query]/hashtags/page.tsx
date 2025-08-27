import { searchHashtags } from "@/lib/bsky/agent";
import Link from "next/link";
import * as routes from "@/lib/routes";

export default async function Page({ params }: { params: { query: string } }) {
  const { hashtags } = await searchHashtags({ query: params.query, limit: 20 });

  return (
    <ul className="flex flex-col">
      {hashtags.map((tag) => (
        <li key={tag}>
          <Link href={routes.searchPosts(tag)} className="text-highlight">
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
