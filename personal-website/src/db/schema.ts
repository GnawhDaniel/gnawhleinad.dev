import { int, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";


// media: ["music", "notes"]
// media_id: music md5 hash, notes date+number
export const likesTable = sqliteTable("likes_table", {
  media: text().notNull(),
  media_id: text().notNull(),
  likes: int().notNull(),
}, (table) =>[
    primaryKey({columns: [table.media, table.media_id]})
]);
