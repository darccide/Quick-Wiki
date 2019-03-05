const Collaborator = require('./models').Collaborator;
const sequelize = require('./models/index').sequelize;
const Wiki = require('./models').Wiki;
const User = require('./models').User;
const Authorizer = require('../policies/wiki');

module.exports = {
  createCollaborator(newCollaborator, callback) {
    Collaborator.all().then(collaborations => {
      return Collaborator.create({
        userId: newCollaborator.userId,
        wikiId: newCollaborator.wikiId
      })
        .then(collaborator => {
          callback(null, collaborator);
        })
        .catch(err => {
          callback(err);
        });
    });
  },

  deleteCollaborator(id, callback) {
    return Collaborator.destroy({ where: { id: id } })
      .then(collaborator => {
        callback(null, collaborator);
      })
      .catch(err => {
        callback(err);
      });
  },

  getCollaborators(wikiId, callback) {
    Collaborator.all({ where: { wikiId: wikiId } })
      .then(collaborators => {
        callback(null, collaborators);
      })
      .catch(err => {
        callback(err);
      });
  },

  checkCollaboration(wikiId, userId, callback) {
    return Collaborator.all({
      where: {
        wikiId: wikiId,
        userId: userId
      }
    })
      .then(collaboration => {
        callback(null, collaboration);
      })
      .catch(err => {
        callback(err);
      });
  },

  allCollaborations(callback) {
    return Collaborator.all()
      .then(collaborations => {
        callback(null, collaborations);
      })
      .catch(err => {
        callback(err);
      });
  }
};
