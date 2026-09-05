import { NextResponse } from "next/server";
import { search } from "@/lib/search";
import { isSubjectSlug } from "@/lib/subjects";

/**
 * GET /api/search?q=federalism&limit=8&subject=ap-gov
 *
 * The header combobox calls this. It exists so the browser does not have to
 * download the whole content index (roughly 400 KB of note text) just to type
 * into a search box.
 *
 * Everything it searches is static, so the response is immutable for a given
 * query for the life of a deployment — hence the long s-maxage. `force-static`
 * would be wrong here because the query string varies.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_QUERY_LENGTH = 80;
const MAX_LIMIT = 20;

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") ?? "").slice(0, MAX_QUERY_LENGTH).trim();
  const subjectParam = url.searchParams.get("subject");
  const limitParam = Number.parseInt(url.searchParams.get("limit") ?? "", 10);

  if (query.length < 2) {
    return NextResponse.json(
      { query, results: [], reason: "Query must be at least two characters." },
      { status: 200 },
    );
  }

  const limit = Number.isFinite(limitParam)
    ? Math.min(Math.max(limitParam, 1), MAX_LIMIT)
    : 8;

  const results = search(query, {
    limit,
    subject: subjectParam && isSubjectSlug(subjectParam) ? subjectParam : undefined,
  }).map(({ id, kind, title, context, href, subjectLabel }) => ({
    id,
    kind,
    title,
    context,
    href,
    subjectLabel,
  }));

  return NextResponse.json(
    { query, results },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
