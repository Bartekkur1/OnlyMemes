CREATE TABLE "User" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(64),
  "password" varchar(64),
  "display_name" varchar(64),
  "inviteToken" varchar(64)
);

CREATE TABLE "Meme" (
  "id" SERIAL PRIMARY KEY,
  "external_id" text,
  "title" varchar(64),
  "author" int,
  "url" text,
  "published_at" date
);

CREATE TABLE "Vote" (
  "id" SERIAL PRIMARY KEY,
  "meme" int,
  "user" int,
  "up" boolean
);

CREATE TABLE "Comment" (
  "id" SERIAL PRIMARY KEY,
  "meme" int,
  "user" int,
  "content" text,
  "published_at" date
);

CREATE TABLE "InviteToken" (
  "id" SERIAL PRIMARY KEY,
  "token" varchar(64),
  "owner" int NULL,
  "invites" int
);

ALTER TABLE "Meme" ADD FOREIGN KEY ("author") REFERENCES "User" ("id");

ALTER TABLE "Vote" ADD FOREIGN KEY ("user") REFERENCES "User" ("id");
ALTER TABLE "Vote" ADD FOREIGN KEY ("meme") REFERENCES "Meme" ("id");

ALTER TABLE "Comment" ADD FOREIGN KEY ("user") REFERENCES "User" ("id");
ALTER TABLE "Comment" ADD FOREIGN KEY ("meme") REFERENCES "Meme" ("id");

ALTER TABLE "InviteToken" ADD FOREIGN KEY ("owner") REFERENCES "User" ("id");