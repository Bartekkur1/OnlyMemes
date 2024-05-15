# OnlyMemes
Basically OF but with better content.

## How it works?
Lets say you think your humor is unique and you can easily find a following that have some spare money that they can use to support you, you come to the right place.
OnlyMemes allows you to share your originally created memes, its important that they are originally created by your because sharing someones work and getting paid for that would be a dishonour to your family name.
Best part about sharing these funny images is that they (optionally) are behind a paywall that followers have to pay for if they want access, so stonks for you.
As a creator I'll buy you a beer and host a party for you in my 25k USD mansion (you have to pay for transport yourself)

## Important note
This project is made completely for fun.
You shouldn't make any opinion about my tech skills based on this project.
Many technical decisions are made because sane person wouldn't do it, Im curious and I'll go there.
I want to learn make bad decisions and learn from them.
Im a better paratrooper then a frontend dev (I've never jumped from a plane)

## S#@t to do
1. ~~Figure out a reasonable architecture~~
	2. Provider high availability and performance, no one wants to wait for memes they pay for - research performance
2. ~~Figure out where to store memes (best case scenario without breaking the law) edit: probably S3 or try to store them on a free discord server~~ Yeah, free discord storage FTW (dont ban me pls). I see that sometimes discord likes to change messages content URL which can be a problem of future me, but not now hehe
3. ~~Figure out how to filter sensible content (I don't want it to be a Pope memes hosting)~~
4. ~~Steal~~ Create a design
5. ~~Figure out where to store users considering our lovely RODO~~ edit: I'll go with external providers for now, login with google, discord or facebook
6. Figure out how much of subscription money I can steal for memes creator before they rebel against me
7. Plan to use all of 100 commit days for this garbonzo so I don't have to force features

## Architecture
Its just a draft
<img width="916" alt="image" src="https://github.com/Bartekkur1/OnlyMemes/assets/15158339/f860f23f-7c12-4833-9ff8-da695e71fb79">


## Content Filtering

So AI filtering is expensive which is bad because Im poor and Im not going to spend a single dime on this project, best I can do is my priceless time.

## User identity

Im not going to store any users personal data because of RODO
Users will log in using their email and password, I'll store only hash values of those for verification (Im not sure thats legal)
This creates a problem of what to display as a user name under a comment or a meme publisher - this will be resolved as a "display name" which user will set manually when registering (Im not sure if thats sensitive data)
Additionally I will forbid of using emails as a display name because thats a personal information.

## Features

- [ ] User identity
	- [ ] ~~Itegrate login with google/facebook (Im not going to bother storing user credentials, maybe in future when I'll have more time to waste)~~ edit: Yeah, turns out I will
	- [x] Login
	- [x] Register
	- [ ] Password recovery
 - [ ] Memes
 	- [x] Figure out where and how to store memes efficiently
	- [x] Upload
	- [x] Fetching memes and feed? like home page that shows you trending/fresh/top
		- [ ] Likes
			- [x] Backend
			- [ ] Frontend
		- [ ] Comments
		- [ ] User feed algorithm
			- [ ] Trending
			- [ ] Fresh
			- [ ] Top week/month/yeah
			- [ ] Following
- [ ] Follow system
- [ ] Paywall - enable possibility to upload paid content
- [ ] Payments - I have no idea what Im doing

## Improvements

- [ ] Move async actions into queue
	- [ ] Likes
	- [ ] Uploads

## TODO

Add tests 🥶
Add frontend network error handling 💀

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