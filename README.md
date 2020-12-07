# Community Soccer
This is the final project for the Lighthouse Labs web development bootcamp prepared by Bill Watters, Ozge Guner and George Tang.

## Moviation
One challenge soccer lovers face is that it is difficult to organize a proper game. For a game that requires a minimum of 22 players, having many fellow players available at the same time can be difficult. On top of that, not every players are willing to switch from their favorite positions, leading to imbalanced teams (e.g. a team with many strikers but no defeneder.)

With this app, users can propose a soccer game in their neighbourhood. They can also specify criteria including skill levels and gender restrictions. Other users can look for games that they're interested in, and while joining the game, they can also specify the position they play.

Additionally, game owners can also specify whether the game will be referreed. Locals who are interested in refereeing can participate in the game as a referee. They can contact the owner with the private chat feature to discuss the details.

## Walk-through
After login or register, the user will be directed to the events index page. It lists all the games proposed by all users. Users can use the filter on the left to show only the games that fulfill the specified criteria (gender restriction, location,  skill level, and whether the game is refereed).

!['Index Page'](./docs/event-index.png)

In the event details page, users can see the details of the game along with the map of the location. Users can join the game by specifying his desired team and position. They can also leave a comment, or leave the game if they are no longer interested.

!['Game Details'](./docs/event-details.png)

Additionally, the users can contact the game owner through private messaging. Potential referees can use this feature to chat with the owners about the details, and possibly negotiate a price.

!['Create Games'](./docs/create-event.png)
Users can also create a game by using the create event form and filling in all the required information.

!['Private Messaging'](./docs/messaging.png)
## Packages
### Front-end
* @material-ui/core
* @material-ui/lab
* axios
* bcrpyt
* bootstrap
* classnames
* cookie-session
* date-fns
* dotenv
* google-maps-react
* lodash
* material-ui
* material-ui-icons
* node-sass
* react
* react-bootstrap
* react-dom
* react-router-dom
* react-scripts
* react-spring
* web-vitals

### Backend
* axios
* bcrypt
* body-parser
* cookie-session
* cors
* date-fns
* dotenv
* express
* helmet
* lodash
* morgan
* node-sass
* nodemon
* pg
* uuid
* ws

## Setup
1. Download the project folder.

### Front End 

1. Install the packages by running `npm install`.
2. Create a Google API key that enables:
* Distance Matrix API
* Geocoding API
* Maps Javascript API  
3. Create `.env` file from `.env.example` file.
4. Set the value of `REACT_APP_geocodeKey` to the Google API.

### Back End
1. Install the packages by running `npm install`.
2. Create `.env.development` file from `.env.development.example` file.
3. Set the value of `geocodeKey` to the Google API.

### Database
1. Install Postgresql if not previously installed.
2. Create database named `community_sports`.
3. Create data tables by running the file `/backend/src/db/schema/01_schema.sql`.
4. Seed data tatbles by funning all the files in `/backend/src/db/seeds/` sequentially.

### Start up
1. Start the backend server by running `npm start` in the back-end folder.
2. Start the front end page by running `npm start` in the front-end.
3. Register for a new account.







