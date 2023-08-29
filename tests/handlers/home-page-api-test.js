const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("GET /", () => {
  it("should serve the homepage", (_, done) => {
    const masterMindDB = new MasterMindDB(
      [{ name: "raj", password: "kumar", token: "1" }],
      {},
      () => {}
    );
    const app = createApp(masterMindDB);

    request(app)
      .get("/")
      .set("Cookie", ["name=raj; token=1"])
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end(done);
  });
});
