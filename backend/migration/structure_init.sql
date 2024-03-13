CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(64),
  "password" varchar(64),
  "display_name" varchar(64)
);

CREATE TABLE "Meme" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar(64),
  "author" int,
  "url" text,
  "published_at" date
);

ALTER TABLE "Meme" ADD FOREIGN KEY ("author") REFERENCES "User" ("id");
