import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { likesTable } from "../db/schema";
import { eq, and, sql } from "drizzle-orm";

export const db = drizzle(process.env.DB_FILE_NAME!);

function validateFormat(media: string, media_id: string): boolean {
  // Validate media and media_id
  const mediaTypes = ["music", "notes", "blogs", "album"];
  const notesPattern = /^\d{4}-\d{2}-\d{2}-[0-9a-z]{2}$/;
  const musicPattern = /^.*$/;

  if (!mediaTypes.includes(media)) {
    return false;
  }

  if (media === "notes" && !notesPattern.test(media_id)) return false;
  if (media === "music" && !musicPattern.test(media_id)) return false;

  return true;
}

export async function getLikes(media: string, media_id: string) {
  if (!validateFormat(media, media_id)) return; // Exit function if incorrect formatting
  const [like] = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.media, media), eq(likesTable.media_id, media_id)));
  return like?.likes ?? 0;
}

export async function incrementLike(media: string, media_id: string) {
  if (!validateFormat(media, media_id)) return; // Exit function if incorrect formatting

  const [like] = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.media, media), eq(likesTable.media_id, media_id)));

  if (like) {
    // If "media like" row exists in table
    const [updated] = await db
      .update(likesTable)
      .set({ likes: sql`${likesTable.likes} + 1` })
      .where(
        and(eq(likesTable.media, media), eq(likesTable.media_id, media_id)),
      ).returning();
      
      return updated.likes;
  }

}

export async function getAllLikes(media: string) {
  const likes = await db
    .select()
    .from(likesTable)
    .where(eq(likesTable.media, media));

  return Object.fromEntries(likes.map((like) => [like.media_id, like.likes]));
}
