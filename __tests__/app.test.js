const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const data = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(data);
});

afterAll(() => {
  return db.end();
});

describe("GET /api", () => {
  describe("SUCCESS", () => {
    it("should respond with a status code of 200 and a welcome message", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
          expect(response.body.msg).toBe(
            "Welcome to the Board Game Reviews API"
          );
        });
    });
  });

  describe("ERROR", () => {
    it('should respond with a "404: not found" error if there\'s a typo in the request URL', () => {
      return request(app)
        .get("/aip")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe(
            "Nothing to see here. Check your spelling and try again."
          );
        });
    });
  });
});

describe("GET /api/categories", () => {
  describe("SUCCESS", () => {
    it("should respond with a 200 status code", () => {
      return request(app).get("/api/categories").expect(200);
    });

    it("should respond with an array containing all of the category objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          const { categories } = body;
          expect(categories).toBeInstanceOf(Array);
          expect(categories).toHaveLength(4);
        });
    });

    it('should respond with an array of objects where each object has "slug" and "description" properties', () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          const { categories } = body;
          expect(categories).toHaveLength(4);
          categories.forEach((category) => {
            expect(category).toHaveProperty("slug");
            expect(category).toHaveProperty("description");
          });
        });
    });
  });

  describe("ERROR", () => {
    it('should respond with a "404: not found" error if there\'s a typo in the request URL', () => {
      return request(app)
        .get("/api/categoirse")
        .expect(404)
        .then((response) => {
          expect(response.body.msg).toBe(
            "Nothing to see here. Check your spelling and try again."
          );
        });
    });
  });
});
