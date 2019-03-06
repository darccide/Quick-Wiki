# Quicki-Wiki
Quicki-Wiki is a fully-functioning site to allow public and private user-created wiki content. It was built as back-end project to utilize full RESTful API architecture primarily by using Node.js and Express. It is built with usability in mind and a minimal design to showcase bootstrap (which was used for styling).

![Quicki-Wiki Home Screenshot](https://i.imgur.com/mQKwlij.jpg)
![Quicki-Wiki Home After Login Screenshot](https://i.imgur.com/mGtMBoQ.jpg)

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

**Free user login:**

Email: **testuser@email.com** Password: **testuser**



## Setup
### Running Locally
Make sure you have [Node.js](https://nodejs.org/en/), [PostgreSQL](https://www.postgresql.org/), and the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.

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
		"database": "quicki-wiki-dev",
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

### .env File and sendgrid.env File
You will need to create a `.env` file in order for the application to run smoothly on your computer. Make sure this file is included in your `.gitignore` file. If you want the full functionality of the site you will need to set up your own [stripe](https://stripe.com/) and [sendgrid](https://sendgrid.com/) accounts and set up the `.env` file with your own `STRIPE_API_KEY` and `SENDGRID_API_KEY`. Also you will need to set your own `cookieSecret` for express sessions. 

**Note:** If you follow the instructions from Sendgrid they will have you create a sendgrid.env file which is where your api key for sendgrid will go.

### Init and seed database :
```
sequelize db:migrate

sequelize db:seed:all
```
### Run the project :
```
npm start
```
Your app should now be running on [localhost:3000].

### Deploying to Heroku
For Heroku, head over to Heroku and log in (or open an account if you don’t have one).

Create a new app and give it a name

![Click New App](https://i.imgur.com/rMf24FI.jpg)

Click the **Deploy** tab and there you will find instructions how to deploy the app

Check that `src/db/config/config.json` is setup like below (make sure the "dialect" is set to postgres)

```
{
  "development": {
   	...
  },
  "test": {
	...
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "logging": false,
    "operatorsAliases": false,
    "use_env_variable": "DATABASE_URL"
  }
}
```
#### Set up Postres on Heroku
Click the **Resources** tab and you will see a search field for "add-ons". Click inside of the field and type "Heroku Postgres". Once it appears you can click it.

![After clicking Resources Tab](https://i.imgur.com/Ex5hJii.jpg)

After clicking **Heroku Postgres** you will have a modal appear on your screen telling you about the add-on provision you selected. Click the provision button and now **Heroku Postgres** has been added to you application.

![After selecting Heroku Postgres](https://i.imgur.com/mIFzr8S.jpg)

Now you will need to migrate and seed all your data to Heroku

```
heroku run sequelize db:migrate

heroku run sequelize db:seed:all
```

#### Set up Environment Variables
Click the **Settings** tab and you will see a button that says "real config vars". You will need to click that and add the following values.

![Your Real Config Vars](https://i.imgur.com/Omie2Jn.jpg)

**Note:** The only value that should match what you see on the screen is the `NODE_ENV` value of `production`. This lets Heroku know to execute code related to production so that way your deployment will work properly after being built. All other values should be your own values and the `DATABASE_URL` should be provided by Heroku after setting up **Heroku Postgres**.

Once you have done all of this your version should be deployed an work properly. If for some reason you have decided to use another database then you will need to see if Heroku supports it and also you will need to figure out what must be included for your environment variables.

 ## Built With
* [Node](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [PostgreSQL](https://www.postgresql.org/)
* [Passport](http://www.passportjs.org/)
* [Stripe](https://stripe.com/)
* [Sendgrid](https://sendgrid.com/)
* [Bootstrap](https://getbootstrap.com/)
* [EJS](https://ejs.co/)
* [Jasmine](https://jasmine.github.io/)
* [Heroku](https://www.heroku.com/)

## Author
Steven Thomson is a Fullstack Developer who currently resides in South Korea, but is transistioning back to the U.S. If you would like to contact him:

 * steven.thomson88@gmail.com
 * [Steven Thomson's LinkedIn](https://www.linkedin.com/in/steventhomson1988/)
