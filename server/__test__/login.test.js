const request = require("supertest");
const app = require("../app");
const { User } = require("../models");
const { queryInterface } = require("sequelize");

beforeAll(async () => {
  await User.create({
    email: "test@mail.com",
    password: "abcdef",
    phoneNumber: "67458903547",
    address: "Area 51",
  });
});

afterAll(async () => {
  await User.destroy({
    where: {},
    // truncate: true,
    restartIdentity: true,
  });
});

describe("POST /login", () => {
  it("User should be able to login", async () => {
    const loginUser = {
      email: "test@mail.com",
      password: "abcdef",
    };
    const res = await request(app).post("/login").send(loginUser);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token");
  });

  it("Login with wrong password", async () => {
    const loginUser = {
      email: "test@mail.com",
      password: "jkjkjkjkjk",
    };
    const res = await request(app).post("/login").send(loginUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });

  it("Login with non-existent email", async () => {
    const loginUser = {
      email: "notatest@mail.com",
      password: "abcdef",
    };
    const res = await request(app).post("/login").send(loginUser);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid email or password");
  });
});
