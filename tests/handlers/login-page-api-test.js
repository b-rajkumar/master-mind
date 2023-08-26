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
