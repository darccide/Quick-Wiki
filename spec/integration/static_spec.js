const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : static", () => {

  describe("GET /", () => {

    it("should return status code 200 and have 'Welcome to Blocipedia' in the body of the response", done => {

      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        expect(body).toContain("Welcome to Blocipedia");
        done();
      });

    });

  });

  describe("GET /wikis", () => {

    it("shold render the wikis page", done => {

      request.get(`${base}/wikis`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain("Public Wikis");
        done();
      });

    });

  });

});
