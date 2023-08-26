const request = require("supertest");
const { describe, it } = require("node:test");
const createApp = require("../../src/app");

describe("authenticate", () => {
  // eslint-disable-next-line max-len
  it("should redirect to the login page, when the user details are not provided", (_, done) => {
    const app = createApp();

    request(app).get("/").expect(302).expect("location", "/login").end(done);
  });
});
