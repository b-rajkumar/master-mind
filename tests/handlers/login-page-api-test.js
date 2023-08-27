const { describe, it } = require("node:test");
const request = require("supertest");
const { createApp } = require("../../src/app");
const MasterMindDB = require("../../src/models/master-mind-db");

describe("GET /login", () => {
  it("should serve the login page", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const app = createApp(masterMindDB);

    request(app)
      .get("/login")
      .expect(200)
      .expect("content-type", "text/html; charset=UTF-8")
      .end(done);
  });
});

describe("POST /login", () => {
  describe("Redirect to Home", () => {
    it("should redirect if the user already exists", (_, done) => {
      const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
      const app = createApp(masterMindDB);

      request(app)
        .post("/login")
        .send("name=raj")
        .expect(302)
        .expect("Location", "/")
        .end(done);
    });

    // eslint-disable-next-line max-len
    it("should redirect after registering the user, when the user didn't exists before", (_, done) => {
      const masterMindDB = new MasterMindDB([], {}, () => {});
      const app = createApp(masterMindDB);

      request(app)
        .post("/login")
        .send("name=raj")
        .expect(302)
        .expect("Location", "/")
        .end(done);
    });
  });

  // eslint-disable-next-line max-len
  it("should respond with Bad Request, if the user details are not provided", (_, done) => {
    const masterMindDB = new MasterMindDB(["raj"], {}, () => {});
    const app = createApp(masterMindDB);

    request(app)
      .post("/login")
      .expect(400)
      .expect("Expected 'name=username' in urlencoded format as Request body")
      .end(done);
  });
});
