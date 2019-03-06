# Quicki-Wiki
Quicki-Wiki is a fully-functioning site to allow public and private user-created wiki content. It was built as back-end project to utilize full RESTful API architecture primarily by using Node.js and Express. It is built with usability in mind and a minimal design to showcase bootstrap (which was used for styling).

## About
Quicki-Wiki was a project that was part of my Bloc Mentorship Program curriculum. We were tasked with building a functioning wiki site using the Agile process and with only user stories given to us.

## Features
* API is modular to allow for easy scaling and feature addition. Separation of concerns was carefully thought out in the build process.
* Databases for wikis and users use PostgreSQL with Sequelize as the ORM.
* Two user classifications are built in for standard (free) and premium users who can access extra features.
* Premium users can add private wikis that are only available to other premium users. They also can add and edit the collaborators of private wikis. 
* Passport implemented for user sign-up and authentication.
* Stripe payment api was utilized to upgrade users.
* Integration and unit testing was done using Jasmine.

## Live Demo

[Quicki-Wiki live site link](https://quicki-wiki.herokuapp.com/)

Free user login: testuser@email.com

Email: user@email.com Password: testuser

## Setup
### Running Locally
Make sure you have Node.js, PostgreSQL, and the Heroku CLI installed.

Download and install dependencies. If you are unsure just check the package.json.
```
git clone git@github.com:darccide/Quicki-Wiki # or clone your own fork
cd wiki-what
npm install
```

Check that `src/db/config/config.json` is setup like below (You may need to change your "username" and "password" depending upon your local setup) and make sure that Postgres is running:
```
{
	"development": {
		"username": "postgres",
		"password": null,
		"database": "blocipedia-dev",
		"host": "127.0.0.1",
		"dialect": "postgres",
		"logging": false,
		"operatorsAliases": false
	},
	"test": {
		...
	},
	"production": {
		...
	}
}
```
### Init and seed database :
```
sequelize db:migrate

sequelize db:seed:all
```
### Run the project :
```
npm start
```
Your app should now be running on localhost:3000.

### Deploying to Heroku
heroku create
git push heroku master
heroku open
Built With
Node
Express 4
PostgreSQL
Passport
Stripe
EJS
Jasmine
Heroku

## Author
Steven Thomson is a Fullstack Developer who currently resides in South Korea, but is transistioning back to the U.S. If you would like to contact him:

 * steven.thomson88@gmail.com
 * [Steven Thomson's LinkedIn](https://www.linkedin.com/in/steventhomson1988/)
