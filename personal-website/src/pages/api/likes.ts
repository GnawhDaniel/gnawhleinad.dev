export const prerender = false; // POST requests are not available in static endpoints; this marks page as server-rendered

import type { APIRoute } from "astro";
import { incrementLike, getLikes } from "../../utils/db";

export const POST: APIRoute = async ({ request }) => {
  const { media, media_id } = await request.json();
  await incrementLike(media, media_id);
  return new Response(null, { status: 200 });
};

export const GET: APIRoute = async ({ url }) => {
  const media = url.searchParams.get("media") || "";
  const media_id = url.searchParams.get("media_id") || "";
  const likeCount = await getLikes(media, media_id);
  return new Response(JSON.stringify({ likes: likeCount }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
