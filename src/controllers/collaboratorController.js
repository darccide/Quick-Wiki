const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis");
const collaboratorQueries = require("../db/queries.collaborators");
const Wiki = require("../db/models").Wiki;
const Authorizer = require("../policies/application");

module.exports = {
  show(req, res, next) {
    const authorized = new Authorizer(req.user)._isPremium();
    if (authorized) {
      this.wiki;
      wikiQueries.getWiki(req.params.wikiId, (err, wiki) => {
        this.wiki = wiki;
        userQueries.getAllUsers((err, users) => {
          if (err) {
            res.redirect("/");
          } else {
            res.render("collaborators/add_collaborators", { wiki, users });
          }
        });
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect(req.headers.referer);
    }
  },

  create(req, res, next) {
    const authorized = new Authorizer(req.user)._isPremium();
    if (authorized) {
      let newCollaborator = {
        userId: req.body.userId,
        wikiId: req.params.wikiId
      };
      collaboratorQueries.checkCollaboration(
        newCollaborator.wikiId,
        newCollaborator.userId,
        (err, collaboration) => {
          if (collaboration.length === 0) {
            collaboratorQueries.createCollaborator(newCollaborator, (err, collaborator) => {
              if (err) {
                req.flash("error", err);
                res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
              } else {
                req.flash("notice", "A new collaborator has been added to this Wiki.");
                res.redirect(`/wikis/${req.params.wikiId}`);
              }
            });
          } else {
            req.flash("notice", "This user is already a collaborator.");
            res.redirect(`/wikis/${req.params.wikiId}/collaborators`);
          }
        }
      );
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect(req.headers.referer);
    }
  },


  edit(req, res, next) {
    const authorized = new Authorizer(req.user)._isPremium();
    if (authorized) {
      wikiQueries.getWiki(req.params.wikiId, (err, result) => {
        wiki = result["wiki"];
        collaborators = result["collaborators"];
        if (err) {
          req.flash("notice", "Something went wrong.");
          res.redirect(`/wikis/${req.params.wikiId}`);
        } else {
          res.render("collaborators/remove_collaborators", { wiki, collaborators });
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that");
      res.redirect(req.headers.referer);
    }
  },

  remove(req, res, next) {
    const authorized = new Authorizer(req.user)._isPremium();
    if (authorized) {
      collaboratorQueries.deleteCollaborator(req.body.id, (err, collaborator) => {
        if (err) {
          req.flash("notice", "Something went wrong.");
          res.redirect(500, `/wikis/${req.params.wikiId}/edit`);
        } else {
          res.redirect(`/wikis/${req.params.wikiId}`);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect(req.headers.referer);
    }
  }
};
