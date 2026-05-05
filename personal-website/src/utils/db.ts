import "dotenv/config";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { likesTable } from "../db/schema";
import { eq, and, sql } from "drizzle-orm";

export const db = drizzle(process.env.DB_FILE_NAME!);

export async function getLikes(media: string, media_id: string) {
  const [like] = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.media, media), eq(likesTable.media_id, media_id)));
  return (like && like.likes) || 0;
} 

export async function incrementLike(media: string, media_id: string) {
  const [like] = await db
    .select()
    .from(likesTable)
    .where(and(eq(likesTable.media, media), eq(likesTable.media_id, media_id)));

  if (like) {
    await db
      .update(likesTable)
      .set({ likes: sql`${likesTable.likes} + 1` })
      .where(
        and(eq(likesTable.media, media), eq(likesTable.media_id, media_id)),
      );
  } else {
    await db
      .insert(likesTable)
      .values({ media: media, media_id: media_id, likes: 1 });
  }
}
