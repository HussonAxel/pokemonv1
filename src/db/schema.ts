import { relations } from "drizzle-orm";
import { integer, index, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

import { user } from "./auth-schema.ts";

export const todos = pgTable("todos", {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pokemonFavorite = pgTable(
  "pokemon_favorite",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    pokemonId: integer("pokemon_id").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.userId, table.pokemonId] }),
    index("pokemon_favorite_user_id_idx").on(table.userId),
  ],
);

export const pokemonFavoriteRelations = relations(pokemonFavorite, ({ one }) => ({
  user: one(user, {
    fields: [pokemonFavorite.userId],
    references: [user.id],
  }),
}));
