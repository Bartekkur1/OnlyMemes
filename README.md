# OnlyMemes
Basically OF but with better content.

## How it works?
If you believe your humor is unique and you can attract followers willing to support you financially, you’ve come to the right place. OnlyMemes allows you to share your original memes. It's important that the memes you share are your own creations, as posting someone else’s work and profiting from it would be unethical.

The best part is that you can choose to place your memes behind a paywall, allowing your followers to pay for access, which can be financially rewarding for you.

If you decide to participate in this lovely community and earn me a lot of money, I would love to show my appreciation by buying you a drink and hosting a party for you at my $25,000 mansion. However, please note that you will need to cover your own transportation costs.

## Important note
This project is created purely for fun. Please do not judge my technical skills based on this project. Many of the technical decisions made here are unconventional, as I'm interested in exploring and learning from them. My goal is to learn from making unusual decisions.

For context, I'm a better paratrooper than a frontend developer (though I've never actually jumped from a plane).

## ADR TODO
1. ~~Figure out a reasonable architecture~~
	2. Provider high availability and performance, no one wants to wait for memes they pay for - research performance - Im not sure yet where to host it so for now its just a point here.
2. ~~Figure out where to store memes (best case scenario without breaking the law) edit: probably S3 or try to store them on a free discord server~~ Discord FTW
3. ~~Figure out how to filter sensible content (I don't want it to be a Pope memes hosting)~~ Achieved by memes approval by admin process
4. ~~Steal~~ Create a design - Im going with default react material ui
5. ~~Figure out where to store users considering our lovely RODO~~ Storing users in my database completely anonymously so that I dont break GDPR

## Architecture

### Solution overview architecture
<img width="663" alt="image" src="https://github.com/Bartekkur1/OnlyMemes/assets/15158339/c8f24676-a5e1-4377-9cec-5e647dbbba8b">
Yeah, nothing special

### Software architecture

#### High Level
<img width="500" alt="image" src="https://github.com/Bartekkur1/OnlyMemes/assets/15158339/2082a7f1-5663-4199-9ef0-5b5788cadf0d">

#### Low Level
<img width="856" alt="image" src="https://github.com/Bartekkur1/OnlyMemes/assets/15158339/fb169177-8a5b-43e8-bec2-34c1b5deb2be">

## Content Filtering


Certainly! Here is a more regular and polite version of that message:

AI filtering is quite expensive, which is unfortunate because I have a limited budget and cannot spend any money on this project. The best I can offer is my valuable time.

## User identity


Of course! Here is a more regular and polite version of that message:

I will not store any personal data from users in compliance with GDPR regulations. Users will log in using their email and password, and I will only store the hash values of these for verification purposes (though I'm not entirely sure if this is legally compliant).

This approach presents a challenge for displaying usernames under comments or for meme publishers. To address this, users will set a "display name" manually when registering (I'm not certain if this qualifies as sensitive data). Additionally, I will prohibit the use of emails as display names to protect personal information.

## Features

- [ ] User identity
	- [x] Login
	- [x] Register
	- [ ] Password recovery
	- [x] Invite token
 - [ ] Memes
 	- [x] Memes Storage
		- [x] Upload
	- [x] Fetching memes and feed? like home page that shows you trending/fresh/top
		- [x] Likes
			- [x] Backend
			- [x] Frontend
		- [ ] Comments
		- [ ] User feed algorithm
			- [ ] Trending
			- [ ] Fresh
			- [ ] Top week/month/yeah
			- [ ] Following
- [x] Follow system
- [ ] Paywall - enable possibility to upload paid content
- [ ] Payments - I have no idea what Im doing

## Improvements

- [ ] Move async actions into queue
	- [ ] Likes
	- [ ] Uploads

### TODO

- [ ] Add tests
- [ ] Review creating bot agents that would participate in community life, upload memes, add comments and follow each other just like a real users. Whole thing would be based on some LLM.

### How to run

@TODO: Improve this, move to docker
1. Make sure you have bun installed
2. Go to backend directory
3. Run bun run index.ts
4. Go to frontend
5. Run bun run start

### PS
If I forget a single commit this project yeets straight to **trash**

## Commits of shame

- Lazy commit #1
- I have no clue what to do next, too many issues, not sure where to start, vacation day 1
- Vacation day 2
- Vacation day 3
- Vacation day 4
- Vacation day 5
- Vacation day 6
- Vacation day 7
- Im too tired boss day 1
- Im too tired boss day 2, damn I wish I didn't have any responsibilities
- Last minute commit of shame
- Im too tired boss day 3
- Im too tired boss day 4