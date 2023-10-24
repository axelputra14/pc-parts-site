const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;
const { hash } = require("../helpers/bcrypt");

const { Product, Customer, Category, User, Wishlist } = require("../models");

let access_token = "";

beforeAll(async () => {
  const userData = require("../data/user.json").map((user) => {
    return {
      ...user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Users", userData);

  const categoryData = require("../data/category.json").map((category) => {
    return {
      ...category,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Categories", categoryData);

  const productData = require("../data/products.json").map((product) => {
    return {
      ...product,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Products", productData);

  const customerData = require("../data/customer.json").map((customer) => {
    return {
      email: customer.email,
      password: hash(customer.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Customers", customerData);

  const wishlistData = require("../data/wishlist.json").map((wish) => {
    return {
      ...wish,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });
  await queryInterface.bulkInsert("Wishlists", wishlistData);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Wishlists", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Products", null, {
    truncate: { cascade: true },
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Customers", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});

describe("GET /pub/product", () => {
  it("Successfully get product without login", async () => {
    const res = await request(app).get("/pub/product");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("data");

    expect(res.body.data.length).toBeGreaterThanOrEqual(1);
  });

  it("Successfully get product without login with a search parameter", async () => {
    const res = await request(app)
      .get("/pub/product")
      .query({ search: "Dark" });

    expect(res.status).toBe(200);
    expect(res.body.data[0].name).toContain("Dark");
  });

  it("Successfully get product with parameter", async () => {
    let id = 1;
    const res = await request(app).get("/pub/product/" + id);

    expect(res.status).toBe(200);
    expect(res.body.data).toHaveProperty("name", "Dark Power 13 1000W");
  });

  it("Should fail get product with non-existent parameter", async () => {
    let id = 1000;
    const res = await request(app).get("/pub/product/" + id);

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Product not found");
  });
});

describe("GET AND POST /pub/wishlist", () => {
  describe("Tests with login", () => {
    it("Successfully get list of user wishlist", async () => {
      // ini login dulu
      const resLogin = await request(app).post("/pub/login").send({
        email: "customer1@mail.com",
        password: "abcdef",
      });
      expect(resLogin.status).toBe(200);
      const resWish = await request(app)
        .get("/pub/wishlist")
        .set("access_token", resLogin.body.access_token);

      expect(resWish.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it("Successfully add a product to wishlist", async () => {
      // ini login dulu
      const resLogin = await request(app).post("/pub/login").send({
        email: "customer1@mail.com",
        password: "abcdef",
      });
      expect(resLogin.status).toBe(200);
      let id = 6;
      const resWish = await request(app)
        .post("/pub/wishlist/" + id)
        .set("access_token", resLogin.body.access_token);

      expect(resWish.status).toBe(201);
      expect(resWish.body.data).toHaveProperty("ProductId", 6);
      expect(resWish.body.data).toHaveProperty("CustomerId", 1);
    });

    it("Fail to add non-existent product to wishlist", async () => {
      // ini login dulu
      const resLogin = await request(app).post("/pub/login").send({
        email: "customer1@mail.com",
        password: "abcdef",
      });
      expect(resLogin.status).toBe(200);
      let id = 6000;
      const resWish = await request(app)
        .post("/pub/wishlist/" + id)
        .set("access_token", resLogin.body.access_token);

      expect(resWish.status).toBe(404);
      expect(resWish.body).toHaveProperty("message", "Product not found");
    });
  });

  describe("Tests without proper authentication", () => {
    it("Should fail to get wishlist because of not logged in", async () => {
      const resWish = await request(app).get("/pub/wishlist");
      expect(resWish.status).toBe(401);
    });

    it("Should fail to get wishlist because of invalid access token", async () => {
      const resWish = await request(app)
        .get("/pub/wishlist")
        .set(
          "access_token",
          "Llanfairpwllgwyngyllgogerychwryndrobllllantysiliogogogoch"
        );
      expect(resWish.status).toBe(401);
    });
  });
});
