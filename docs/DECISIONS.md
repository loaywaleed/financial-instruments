# Questions and Decisions

#### Note: all of the answers are based on my current knowledge, I definitely welcome being corrected and guided if there is any false reasoning.


## Tech Stack

### - Frontend:

#### Why use Next.js instead of just React.js + vite?
Because it has Server side rendering capabilities and is more SEO friendly without a lot of configurations or hacks.

#### Why not use other frameworks like Svelte kit or Nuxt?
I am more comfortable with Next and React.

#### Why choose Vercel to host the Frontend?
Very easy to setup and use and has a great free tier.

#### Why MantineUI library?
Great, pleasant looking components in my opinion

<br>

### - Backend

#### Why opt for Express.js if I am using a full stack framework (Next.js)?
To decouple frontend from backend (separation of concerns) which has severable benefits:
- Ability to deploy each separately, (if we wanna make changes to frontend only, we don't have to build backend and redeploy it as well)
- Ability to scale each backend component independently
- Ease of maintenance
- Higher availability

#### Why choose Express.js?
Ease of use, flexible, and node.js is generally fast and the biggest reason was the fact that it's highly optimized at dealing with JSON data.

#### Why choose Mongodb to store data and not SQL or Just plan json files
Mongodb exceels at dealing with large unstructured/semi structured data (our data as it is, **mostly** fits the bill). SQL databases can work great of course here as well. but since I don't know how the schema will evolve, I opted for a NoSQL database like mongodb


#### Why not use an ORM like Mongoose? 
Native driver is faster, and for our usecase and time constraint, I opted for a no validation approach, which is not very scalable. However, validation can be added later on, if we are confident about the data we will add from now on.

#### Why not use Redis?
I should have, but haven't gotten the opportunity/tiem to do it. so it can be a future addition.

#### Why not put the frontend in the docker-compose that starts the backend services?
Again, I am deploying backend separately for decoupling, so I didn't want to include frontend with it.

### Infrastructure

#### Why use AWS?
Free tier, scalable, and I have used it a lot.

#### Why Nginx?
It's a fast battle tested web server, that I am also comfortable using.

#### Why Github Actions and not Jenkins or any other ci/cd tool?
Reduced complexity (less moving parts), ease of use and maintenance, and good integration with github.


## What could be improved

### Frontend
- Use preload on hover to reduce network payload
- Cache data
- Improve page load times
- Use algolia search for faster search

### Backend
- Use Redis
- Add more data validation for insertions

