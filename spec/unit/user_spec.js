const sequelize = require("../../src/db/models/index").sequelize;
const User = require("../../src/db/models").User;

describe("User", () => {

  beforeEach(done => {
    sequelize.sync({ force: true })
    .then(() => {
      done();
    })
    .catch(err => {
      console.log(err);
      done();
    });
  });

  describe("#create()", () => {

    it("should create a User with a valid username, email, and password", done => {
      User.create({
        username: "Bob",
        email: "user@example.com",
        password: "1234567890"
      })
      .then(user => {
        expect(user.email).toBe("user@example.com");
        expect(user.id).toBe(1);
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });

    it("should not create a user with an invalid username, email, or password", done => {
      User.create({
        username: "Bob",
        email: "I am Bond, James Bond.",
        password: "1234567890"
      })
      .then(user => {
        done();
      })
      .catch(err => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });

    it("should not create a user with an email already taken", done => {
      User.create({
        username: "Bob",
        email: "user@example.com",
        password: "1234567890"
      })
      .then(user => {
        User.create({
          username: "Alice",
          email: "user@example.com",
          password: "Humbug"
        })
        .then(user => {
          done();
        })
        .catch(err => {
          expect(err.message).toContain("Validation error");
          done();
        });
        done();
      })
      .catch(err => {
        console.log(err);
        done();
      });
    });

  });
  
});
