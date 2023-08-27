const request = require("supertest");
const { describe, it } = require("node:test");
const assert = require("assert");
const { isUserPresent } = require("../../src/middlewares/authenticate");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("isUserPresent", () => {
  // eslint-disable-next-line max-len
  it("should redirect to the login page, when the user details are not provided", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const app = createApp(masterMindDB);

    request(app).get("/").expect(302).expect("location", "/login").end(done);
  });

  it("should call the next if the user is present", context => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const req = { cookies: { name: "raj" }, app: { masterMindDB } };
    const res = {};
    const next = context.mock.fn();
    isUserPresent(req, res, next);

    assert.deepStrictEqual(next.mock.callCount(), 1);
  });
});
