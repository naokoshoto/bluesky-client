import { type NextRequest, NextResponse } from "next/server";

const matchSearchUrl = /\/search\/(.*)\/(hashtags|users)$/;

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("q") ?? "";
  const encodedQuery = encodeURIComponent(query);

  let redirect = `/search/${encodedQuery}`;

  const referrer = request.headers.get("referer");
  const referrerIsSearchPage = referrer?.match(matchSearchUrl);

  if (referrerIsSearchPage && referrerIsSearchPage[2]) {
    redirect += `/${referrerIsSearchPage[2]}`;
  }

  return NextResponse.redirect(new URL(redirect, request.nextUrl));
}
