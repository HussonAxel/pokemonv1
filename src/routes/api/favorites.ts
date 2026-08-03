import { createFileRoute } from "@tanstack/react-router";
import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "#/db";
import { pokemonFavorite } from "#/db/schema";
import { auth } from "#/lib/auth";

const FavoriteChangeSchema = z.object({
  pokemonId: z.number().int().positive(),
  isFavorite: z.boolean(),
});

async function getUserId(request: Request) {
  const session = await auth.api.getSession({ headers: request.headers });
  return session?.user.id ?? null;
}

export const Route = createFileRoute("/api/favorites")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const userId = await getUserId(request);
        if (!userId) return Response.json({ error: "Authentication required" }, { status: 401 });

        const favorites = await db
          .select({ pokemonId: pokemonFavorite.pokemonId })
          .from(pokemonFavorite)
          .where(eq(pokemonFavorite.userId, userId))
          .orderBy(desc(pokemonFavorite.createdAt));

        return Response.json({ pokemonIds: favorites.map(({ pokemonId }) => pokemonId) });
      },
      PUT: async ({ request }) => {
        const userId = await getUserId(request);
        if (!userId) return Response.json({ error: "Authentication required" }, { status: 401 });

        const parsed = FavoriteChangeSchema.safeParse(await request.json());
        if (!parsed.success)
          return Response.json({ error: parsed.error.flatten() }, { status: 400 });

        const { pokemonId, isFavorite } = parsed.data;
        if (isFavorite) {
          await db.insert(pokemonFavorite).values({ userId, pokemonId }).onConflictDoNothing();
        } else {
          await db
            .delete(pokemonFavorite)
            .where(
              and(eq(pokemonFavorite.userId, userId), eq(pokemonFavorite.pokemonId, pokemonId)),
            );
        }

        return Response.json({ pokemonId, isFavorite });
      },
    },
  },
});
