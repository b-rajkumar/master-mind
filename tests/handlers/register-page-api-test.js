const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("GET /register", () => {
  it("should serve the register page", (_, done) => {
    const masterMindDB = new MasterMindDB([], {}, () => {});
    const app = createApp(masterMindDB);

    request(app)
      .get("/register")
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end(done);
  });

  // eslint-disable-next-line max-len
  it("should redirect to home page if the user details are present", (_, done) => {
    const masterMindDB = new MasterMindDB(
      [{ name: "raj", password: "kumar", token: "1" }],
      {},
      () => {}
    );
    const app = createApp(masterMindDB);

    request(app)
      .get("/register")
      .set("Cookie", ["name=raj; token=1"])
      .expect(302)
      .expect("Location", "/")
      .end(done);
  });
});

describe("POST /register", () => {
  it("should redirect to login, after registering the user", (_, done) => {
    const masterMindDB = new MasterMindDB([], {}, () => {});
    const app = createApp(masterMindDB);

    request(app)
      .post("/register")
      .set("content-type", "application/json")
      .send({ name: "bittu", password: "thakur" })
      .expect(302)
      .expect("Location", "/")
      .end(done);
  });

  it("should give error, if the user is already registered", (_, done) => {
    const masterMindDB = new MasterMindDB(
      [{ name: "bittu", password: "thakur" }],
      {},
      () => {}
    );
    const app = createApp(masterMindDB);

    request(app)
      .post("/register")
      .set("content-type", "application/json")
      .send({ name: "bittu", password: "thakur" })
      .expect(400)
      .end(done);
  });
});
