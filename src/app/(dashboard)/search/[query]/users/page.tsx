import { publicAgent } from "@/lib/bsky/agent";
import { Actor } from "@/components/actor";

// The number of items that will be rendered initially
// and live outside of the virtualized list. This allows
// the first n items to be rendered immediately, without JS.
// const SPLIT = 10;

export default async function Page({ params }: { params: { query: string } }) {
  const query = decodeURIComponent(params.query);
  const actors = await publicAgent.searchActors({
    q: query,
    limit: 10,
  });

  return (
    <>
      {actors.data.actors?.map((actor) => (
        <Actor key={actor.handle} actor={actor} />
      ))}
    </>
  );
}
