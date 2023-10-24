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
    restartIdentity: true,
  });
});

describe("POST /register", () => {
  it("User registered successfully", async () => {
    const newUser = {
      email: "test1@mail.com",
      password: "abcdef",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("email", "test1@mail.com");
  });

  it("Email not inputted", async () => {
    const newUser = {
      password: "abcdef",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("Password not inputted", async () => {
    const newUser = {
      email: "test2@mail.com",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("Email empty input", async () => {
    const newUser = {
      email: "",
      password: "abcdef",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("Password empty input", async () => {
    const newUser = {
      email: "test3@mail.com",
      password: "",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("Email already registered", async () => {
    const newUser = {
      email: "test@mail.com",
      password: "abcdef",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email has already been registered");
  });
  it("Email format wrong", async () => {
    const newUser = {
      email: "aaaaa",
      password: "abcdef",
      phoneNumber: "454515457",
      address: "Area 51",
    };
    const res = await request(app).post("/register").send(newUser);
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Field cannot be empty");
  });
});
