# OnlyMemes
Basically OF but with better content.

## How it works?
Lets say you think your humor is unique and you can easily find a following that have some spare money that they can use to support you, you come to the right place.
OnlyMemes allows you to share your originally created memes, its important that they are originally created by your because sharing someones work and getting paid for that would be a dishonour to your family name.
Best part about sharing these funny images is that they (optionally) are behind a paywall that followers have to pay for if they want access, so stonks for you.
As a creator I'll buy you a beer and host a party for you in my 25k USD mansion (you have to pay for transport yourself)

## S#@t to do
1. ~~Figure out a reasonable architecture~~
	2. Provider high availability and performance, no one wants to wait for memes they pay for - research performance
2. Figure out where to store memes (best case scenario without breaking the law) edit: probably S3 or try to store them on a free discord server
3. Figure out how to filter sensible content (I don't want it to be a Pope memes hosting)
4. ~~Steal~~ Create a design
5. ~~Figure out where to store users considering our lovely RODO~~ edit: I'll go with external providers for now, login with google, discord or facebook
6. Figure out how much of subscription money I can steal for memes creator before they rebel against me
7. Plan to use all of 100 commit days for this garbonzo so I don't have to force features

## Architecture
Its just a draft
<img width="916" alt="image" src="https://github.com/Bartekkur1/OnlyMemes/assets/15158339/f860f23f-7c12-4833-9ff8-da695e71fb79">


## Content Filtering
TODO

## Features

- [ ] User identity
	- [ ] Itegrate login with google/facebook (Im not going to bother storing user credentials, maybe in future when I'll have more time to waste)
 - [ ] Memes
 	- [ ] Figure out where and how to store memes efficiently
	- [ ] Upload
	- [ ] Fetching memes and feed? like home page that shows you trending/fresh/top
  	- [ ] Scoring system, likes etc.
- [ ] Comments system?
- [ ] Paywall - enable possibility to upload paid content
- [ ] Payments - I have no idea what Im doing

TBC...

### PS
If I forget a single commit this project yeets straight to **trash**
