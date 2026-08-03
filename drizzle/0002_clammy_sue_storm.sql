CREATE TABLE "pokemon_favorite" (
	"user_id" text NOT NULL,
	"pokemon_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "pokemon_favorite_user_id_pokemon_id_pk" PRIMARY KEY("user_id","pokemon_id")
);
--> statement-breakpoint
ALTER TABLE "pokemon_favorite" ADD CONSTRAINT "pokemon_favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "pokemon_favorite_user_id_idx" ON "pokemon_favorite" USING btree ("user_id");