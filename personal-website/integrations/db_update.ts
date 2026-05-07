import { db } from "../src/utils/db";
import { likesTable } from "../src/db/schema";
import type { AstroIntegration } from "astro";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

async function updateDB() {
  // Update DB with new notes & music
  const notesDir = join(process.cwd(), "src/content/notes");
  // const musicDir = join(process.cwd(), "src/content/music");

  const notes = await readdir(notesDir);
  // const music = await readdir(musicDir);

  const rows = [
    ...notes.map((file) => ({ media: "notes", media_id: file.replace(/\.md$/, ""), likes: 0 })),
    // ...music.map((file) => ({ media: "music", media_id: file.replace(/\.md$/, ""), likes: 0 })),
  ];

  await db.insert(likesTable).values(rows).onConflictDoNothing();

}

export const setupIntegration: AstroIntegration = {
  name: "setup",
  hooks: {
    "astro:server:setup": async ({ server }) => {
      await updateDB();
      const handler = async (file: string) => {
        if (!file.includes("/src/content/")) return;
        await updateDB();
      };
      server.watcher.on("add", handler);
      server.watcher.on("change", handler);
      server.watcher.on("unlink", handler);
    },
    "astro:build:start": updateDB,
  },
};
