const request = require("supertest");
const { describe, it } = require("node:test");
const assert = require("assert");
const { isUserPresent } = require("../../src/middlewares/authenticate");
const { createApp } = require("../../src/app");

describe("isUserPresent", () => {
  // eslint-disable-next-line max-len
  it("should redirect to the login page, when the user details are not provided", (_, done) => {
    const app = createApp();

    request(app).get("/").expect(302).expect("location", "/login").end(done);
  });

  it("should call the next if the user is present", context => {
    const req = { cookies: { name: "raj" }, app: { users: ["raj"] } };
    const res = {};
    const next = context.mock.fn();
    isUserPresent(req, res, next);

    assert.deepStrictEqual(next.mock.callCount(), 1);
  });
});
