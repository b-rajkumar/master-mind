const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");

describe("GET /login", () => {
  it("should serve the login page", (_, done) => {
    const app = createApp();

    request(app)
      .get("/login")
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end(done);
  });
});

describe("POST /login", () => {
  // eslint-disable-next-line max-len
  it("should redirect to the home page, if the user details are provided", (_, done) => {
    const app = createApp();

    request(app)
      .post("/login")
      .send("name=raj")
      .expect(302)
      .expect("Location", "/")
      .end(done);
  });

  // eslint-disable-next-line max-len
  it("should respond with Bad Request, if the user details are not provided", (_, done) => {
    const app = createApp();

    request(app)
      .post("/login")
      .expect(400)
      .expect("Expected 'name=username' in urlencoded way as Request body")
      .end(done);
  });
});
