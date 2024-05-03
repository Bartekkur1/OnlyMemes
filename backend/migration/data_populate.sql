INSERT INTO public."User" (id, email, password, display_name, role) values
(1, '30f347593b126a9e3ba10eabf7ec39817e37d225f002efdf274a92b81a646003', 'a15f8ae07675bfb96e084bfb4f52fb2c22091061aae86e0eb76a55f4e52dd74e', 'User1', 'ADMIN'),
(2, '6474d7cd12c174fd5aeaa7ef148c19ee033c2286daa8cddfd383bc122cde8a6a', 'a15f8ae07675bfb96e084bfb4f52fb2c22091061aae86e0eb76a55f4e52dd74e', 'User2', 'USER');

INSERT INTO public."Meme" (id, title, author, url, published_at) VALUES
(1, 'Perky Pig', 1, 'https://placehold.co/1024x800/33FF66/000000', '2024-04-23'),
(2, 'Curious Cat', 2, 'https://placehold.co/1024x800/33FF33/000000', '2024-04-24');

INSERT INTO public."InviteToken" (token, owner, invites) VALUES
('invite-token-1', 1, 10),
('invite-token-2', 2, 10);

INSERT INTO public."Vote" (meme, "user") VALUES
(1, 2),
(2, 1);