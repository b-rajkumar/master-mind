const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");

describe("GET /", () => {
  it("should serve the homepage", (_, done) => {
    const users = ["raj"];
    const app = createApp(users);

    request(app)
      .get("/")
      .set("Cookie", ["name=raj"])
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end(done);
  });
});
