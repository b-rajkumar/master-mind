const { describe, it } = require("node:test");
const assert = require("assert");
const { parseCookies } = require("../../src/middlewares/cookie-parser");

describe("parseCookies", () => {
  it("should be empty, when no cookies are there", context => {
    const req = { headers: {} };
    const res = {};
    const next = context.mock.fn();
    parseCookies(req, res, next);

    assert.deepStrictEqual(req, { headers: {}, cookies: {} });
    assert.deepStrictEqual(next.mock.callCount(), 1);
  });

  it("should parse cookies when cookies are present in the req", context => {
    const req = { headers: { cookie: "name=raj" } };
    const res = {};
    const next = context.mock.fn();
    parseCookies(req, res, next);

    assert.deepStrictEqual(req, {
      headers: {
        cookie: "name=raj",
      },
      cookies: { name: "raj" },
    });
    assert.deepStrictEqual(next.mock.callCount(), 1);
  });
});
