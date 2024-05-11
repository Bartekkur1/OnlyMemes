truncate table "Vote" cascade;
truncate table "Comment" cascade;
truncate table "Meme" cascade;
truncate table "InviteToken" cascade;
truncate table "Follow" cascade;
truncate table "User" cascade;

ALTER TABLE "Meme" DROP CONSTRAINT meme_author_id;
ALTER TABLE "Vote" DROP CONSTRAINT vote_author_id;
ALTER TABLE "Vote" DROP CONSTRAINT vote_meme_id;
ALTER TABLE "Comment" DROP CONSTRAINT comment_user_id;
ALTER TABLE "Comment" DROP CONSTRAINT comment_meme_id;
ALTER TABLE "InviteToken" DROP CONSTRAINT token_owner_id;
ALTER TABLE "Follow" DROP CONSTRAINT follow_follower_id;
ALTER TABLE "Follow" DROP CONSTRAINT follow_followed_id;

DROP TABLE "Vote";
DROP TABLE "Comment";
DROP TABLE "Meme";
DROP TABLE "InviteToken";
DROP TABLE "Follow";
DROP TABLE "User";
