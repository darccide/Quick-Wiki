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

Free user login:
```
Email: user@email.com Password: password
```
