export const prerender = false; // POST requests are not available in static endpoints; this marks page as server-rendered

import type { APIRoute } from "astro";
import { incrementLike, getLikes, getAllLikes } from "../../utils/db";

export const POST: APIRoute = async ({ request }) => {
  const { media, media_id } = await request.json();
  const likes = await incrementLike(media, media_id);
    return new Response(JSON.stringify({ likes: likes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });};

export const GET: APIRoute = async ({ url }) => {
  const media = url.searchParams.get("media") || "";
  const media_id = url.searchParams.get("media_id") || "";
  if (media_id === "") {
    const likes = await getAllLikes(media);
    return new Response(JSON.stringify({ likes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const likes = await getLikes(media, media_id);
    return new Response(JSON.stringify({ likes: likes }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};
