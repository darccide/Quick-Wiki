const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
    createUser(newUser, callback) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(newUser.password, salt);

        return User.create({
            username: newUser.username,
            email: newUser.email,
            password: hashedPassword
        })
        .then((user) => {

            const msg = {
                to: newUser.email,
                from: "admin@blocipedia.com",
                subject: 'Welcome to Blocipedia',
                html: '<strong>Welcome to Blocipedia</strong>',
              };

            sgMail.send(msg);

            callback(null, user);
        })
        .catch((err) => {
            callback(err);
        })
    },

    getUser(id, callback) {
        let result = {};
        User.findById(id)
        .then((user) => {
            if(!user) {
                console.log("error 404");
                callback(404);
            } else {
                console.log(".then else statement fired");
                result["user"] = user;
                callback(null, result);
            }
        })
        .catch((err) => {
            callback(err);
        })
    },

    updateUserRole(user, action) {
        console.log(user);
        let newRole;

        User.findOne({
          where: { email: user.email }
        })
        .then((user) => {
          if (action === "upgrade") {
            newRole = "Premium";
          } else if(action === "downgrade") {
            newRole = "Standard";
          }

          user.update({
            role: newRole
          })
        })
      }
};
