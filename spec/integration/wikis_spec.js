const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/wikis/";

const sequelize = require("../../src/db/models/index").sequelize;
const Wiki = require("../../src/db/models").Wiki;
const User = require("../../src/db/models").User;

describe("routes : Wikis", () => {

  beforeEach(done => {
    this.wiki;
    sequelize.sync({ force: true }).then(res => {
      Wiki.create({
        title: "JS Frameworks",
        body: "There is a lot of them",
        private: false
      })
      .then(wiki => {
        this.wiki = wiki;
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });
  });

  describe("admin user performing CRUD actions for Wikis", () => {

    beforeEach(done => {
      User.create({
        username: "Charlie"
        email: "admin@example.com",
        password: "098765",
      })
      .then(user => {
        request.get({
          url: "http://localhost:3000/auth/fake",
          form: {
            username: user.username,
            userId: user.id,
            email: user.email
          }
        },
          (err, res, body) => {
            done();
          }
        );
      });
    });

    describe("GET /wikis", () => {

      it("should return a status code 200 and all wikis", done => {
        request.get(base, (err, res, body) => {
          expect(res.statusCode).toBe(200);
          expect(err).toBeNull();
          expect(body).toContain("Wikis");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("GET /wikis/new", () => {

      it("should render a new wiki form", done => {
        request.get(`${base}new`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("New Wiki");
          done();
        });
      });

    });

    describe("POST /wikis/create", () => {
      const options = {
        url: `${base}create`,
        form: {
          title: "Danny Brown Songs",
          body: "Dip, Radio Song, Monopoly, 25 bucks",
          private: false
        }
      };

      it("should create a new wiki and redirect", done => {
        request.post(options, (err, res, body) => {
          Wiki.findOne({ where: { title: "Danny Brown Songs" } })
          .then(wiki => {
            expect(res.statusCode).toBe(303);
            expect(wiki.title).toBe("Danny Brown Songs");
            expect(wiki.body).toBe("Dip, Radio Song, Monopoly, 25 bucks");
            expect(wiki.private).toBe(false);
            done();
          })
          .catch(err => {
            console.log(err);
            done();
          });
        });
      });

    });

    describe("GET /wikis/:id", () => {

      it("should render a view with the selected wiki", done => {
        request.get(`${base}${this.wiki.id}`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /wikis/:id/destroy", () => {

      it("should delete the topic with the associated ID", done => {
        Wiki.all()
        .then(wikis => {
          const wikiCountBeforeDelete = wikis.length;
          expect(wikiCountBeforeDelete).toBe(1);
          request.post(`${base}${this.wiki.id}/destroy`, (err, res, body) => {
            Wiki.all()
            .then(wikis => {
              expect(err).toBeNull();
              expect(wikis.length).toBe(wikiCountBeforeDelete - 1);
              done();
            });
          });
        });
      });

    });

    describe("GET /wikis/:id/edit", () => {

      it("should render a view with an edit wiki form", done => {
        request.get(`${base}${this.wiki.id}/edit`, (err, res, body) => {
          expect(err).toBeNull();
          expect(body).toContain("Edit Wiki");
          expect(body).toContain("JS Frameworks");
          done();
        });
      });

    });

    describe("POST /wikis/:id/update", () => {

      it("should update the wiki with the given values", done => {
        const options = {
          url: `${base}${this.wiki.id}/update`,
          form: {
            title: "JavaScript Frameworks",
            body: "There are a lot of them"
          }
        };
        request.post(options, (err, res, body) => {
          expect(err).toBeNull();
          Wiki.findOne({
            where: { id: this.wiki.id }
          })
          .then(wiki => {
            expect(wiki.title).toBe("JavaScript Frameworks");
            done();
          });
        });
      });

    });

  });

});
