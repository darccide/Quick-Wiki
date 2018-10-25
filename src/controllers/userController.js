const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");
const User = require("../db/models").User;
const publicKey = "pk_test_idoWZDzGdwgMnipUREkgHhja";
const secretKey = process.env.SECRET_STRIPE_API_KEY;
var stripe = require("stripe")(secretKey);

module.exports = {
    signUp(req, res, next){
        res.render("users/sign_up");
    },
    create(req, res, next) {
        let newUser = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            passwordConfirmation: req.body.passwordConfirmation,
            role: req.body.role
        };

        userQueries.createUser(newUser, (err, user) => {
            if(err) {
                res.redirect("/users/sign_up");
            } else {
                passport.authenticate("local")(req, res, () => {
                    req.flash("notice", "You've successfully signed up for Blocipedia!");
                    res.redirect("/");
                })
            }
        });
    },

    signInForm(req, res, next) {
        res.render("users/sign_in");
    },

    signIn(req, res, next) {
;        passport.authenticate("local")(req, res, function() {
            if(!req.user){
                req.flash("notice", "Sign in failed. Please try again.")
                res.redirect("/users/sign_in");
            } else {
                req.flash("notice", "You've successfully signed in!");
                res.redirect("/");
            }
        })
    },

    signOut(req, res, next) {
        req.logout();
        req.flash("notice", "You've successfully signed out!");
        res.redirect("/");
    },

    show(req, res, next){
        userQueries.getUser(req.params.id, (err, result) => {
            if(err || result.user === undefined){
                req.flash("notice", "No user found with that ID.");
                res.redirect("/");
            } else {
                res.render("users/show", {...result});
            }
        });
    },

    upgradeForm(req, res, next) {
		    res.render("users/upgrade", { publicKey });
    },

    upgrade(req, res, next) {
        const email = req.body.stripeEmail;
        const token = req.body.stripeToken;
        stripe.customers.create({
            email: email,
            source: token
        })
        .then((customer) => {
            let customerCharge = stripe.charges.create({
                amount: 1500,
                description:  "Premium Membership Fee",
                currency: "usd",
                customer: customer.id
            });
            return customerCharge;
        })
        .then((charge) => {
            console.log("charge");
            console.log(charge);
            if (charge) {
                let action = "upgrade";
                userQueries.updateUserRole(req.user, action);
                req.flash("notice", "Upgrade successful!");
                res.redirect("/");
              } else {
                console.log("error");
                req.flash("notice", "Error upgrading, please try again");
                res.redirect(`users/${req.user.id}`);
              }
        });
    },

    downgradeForm(req, res, next) {
		    res.render("users/downgrade", { publicKey });
    },

    downgrade(req, res, next) {

        let action = "downgrade";
        userQueries.updateUserRole(req.user, action);
        wikiQueries.publicizeWikis(req.user.id);
        req.flash("notice", "Downgrade successful!");
        res.redirect(req.get('referer'));
    }
}
