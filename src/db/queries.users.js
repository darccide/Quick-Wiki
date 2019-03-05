const User = require('./models').User;
const bcrypt = require('bcryptjs');
const Collaborator = require('./models').Collaborator;

module.exports = {
  createUser(newUser, callback) {
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
      .then(user => {
        callback(null, user);
      })
      .catch(err => {
        callback(err);
      });
  },
  getUser(id, callback) {
    let result = {};
    User.findById(id).then(user => {
      if (!user) {
        callback(404);
      } else {
        result['user'] = user;
        Collaborator.scope({ method: ['userCollaborationsFor', id] })
          .all()
          .then(collaborations => {
            result['collaborations'] = collaborations;
            callback(null, result);
          })
          .catch(err => {
            callback(err);
          });
      }
    });
  },

  getAllUsers(callback) {
    return User.all()
      .then(users => {
        callback(null, users);
      })
      .catch(err => {
        callback(err);
      });
  },

  toggleRole(user, action) {
    let newRole;
    User.findOne({
      where: { email: user.email }
    }).then(user => {
      if (action === 'upgrade') {
        newRole = 'premium';
      } else if (action === 'downgrade') {
        newRole = 'standard';
      }
      user.update({
        role: newRole
      });
    });
  }
};
