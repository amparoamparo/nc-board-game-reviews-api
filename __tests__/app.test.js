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

describe("🔎 Method: GET", () => {
  describe("GET /api", () => {
    describe("🎉 SUCCESS", () => {
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

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if there\'s a typo in the request URL', () => {
        return request(app)
          .get("/aip")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Nothing here. Check your spelling and try again."
            );
          });
      });
    });
  });

  describe("GET /api/categories", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 200", () => {
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

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if there\'s a typo in the request URL', () => {
        return request(app)
          .get("/api/categoirse")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Nothing here. Check your spelling and try again."
            );
          });
      });
    });
  });

  describe("GET /api/reviews", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 200", () => {
        return request(app).get("/api/reviews").expect(200);
      });

      it("should respond with an array containing all of the reviews", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then(({ body }) => {
            const { reviews } = body;
            expect(reviews).toBeInstanceOf(Array);
            expect(reviews).toHaveLength(13);
          });
      });

      it('should respond with an array of objects where each object has certain properties, including "comment_count"', () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then(({ body }) => {
            const { reviews } = body;
            expect(reviews).toBeInstanceOf(Array);
            expect(reviews).toHaveLength(13);
            reviews.forEach((review) => {
              expect(review).toMatchObject({
                owner: expect.any(String),
                title: expect.any(String),
                review_id: expect.any(Number),
                category: expect.any(String),
                review_img_url: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                designer: expect.any(String),
                comment_count: expect.any(String),
              });
            });
          });
      });

      it("should respond with an array of all the review objects sorted by date, in descending order", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .then(({ body }) => {
            const { reviews } = body;
            expect(reviews).toBeSortedBy("created_at", { descending: true });
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if there\'s a typo in the request URL', () => {
        return request(app)
          .get("/api/resivew")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Nothing here. Check your spelling and try again."
            );
          });
      });
    });
  });

  describe("GET /api/reviews/:review_id", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 200", () => {
        return request(app).get("/api/reviews/1").expect(200);
      });

      it("should respond with the requested review object, containing all corresponding properties and values", () => {
        return request(app)
          .get("/api/reviews/1")
          .expect(200)
          .then(({ body }) => {
            const { review } = body;

            expect(review).toMatchObject({
              review_id: 1,
              title: "Agricola",
              category: "euro game",
              designer: "Uwe Rosenberg",
              owner: "mallionaire",
              review_body: "Farmyard fun!",
              review_img_url:
                "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
              created_at: "2021-01-18T10:00:20.514Z",
              votes: 1,
            });

            expect(review).toHaveProperty("review_id", 1);
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if the requested review_id is valid but doesn\'t currently exist in the database', () => {
        return request(app)
          .get("/api/reviews/999")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "404: Not Found" error if the given review ID is out of range for its type (i.e. the number is too big)', () => {
        return request(app)
          .get("/api/reviews/6666666666666666666666666")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if the requested review_id is not valid (e.g. not a number)', () => {
        return request(app)
          .get("/api/reviews/nine")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Something's not quite right with your request. Check your spelling and try again."
            );
          });
      });
    });
  });

  describe("GET /api/reviews/:review_id/comments", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 200", () => {
        return request(app).get("/api/reviews/3/comments").expect(200);
      });

      it('should respond with an array of all the comment objects for the given "review_id", containing certain properties', () => {
        return request(app)
          .get("/api/reviews/3/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;

            expect(comments).toBeInstanceOf(Array);
            expect(comments).toHaveLength(3);

            comments.forEach((comment) => {
              expect(comment).toMatchObject({
                comment_id: expect.any(Number),
                body: expect.any(String),
                review_id: expect.any(Number),
                author: expect.any(String),
                votes: expect.any(Number),
                created_at: expect.any(String),
              });
            });
          });
      });

      it("should respond with an array of all the corresponding comments sorted by date, in descending order", () => {
        return request(app)
          .get("/api/reviews/3/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;

            expect(comments).toBeSortedBy("created_at", { descending: true });
          });
      });

      it("should respond with an empty array if the review ID is valid, but the review has no comments", () => {
        return request(app)
          .get("/api/reviews/1/comments")
          .expect(200)
          .then(({ body }) => {
            const { comments } = body;

            expect(comments).toEqual([]);
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if the given review ID doesn\'t exist', () => {
        return request(app)
          .get("/api/reviews/6666666666666666666666666/comments")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "404: Not Found" error if the given review ID is out of range for its type (i.e. the number is too big)', () => {
        return request(app)
          .get("/api/reviews/6666666666666666666666666/comments")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if the given review ID is not valid (e.g. not a number)', () => {
        return request(app)
          .get("/api/reviews/nine/comments")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Something's not quite right with your request. Check your spelling and try again."
            );
          });
      });
    });
  });

  describe("GET /api/users", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 200 and an array containing all of the users objects", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            const { users } = body;
            expect(users).toBeInstanceOf(Array);
            expect(users).toHaveLength(4);
          });
      });

      it('should respond with an array of objects where each object has "username", "name" and "avatar_url" properties', () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            const { users } = body;
            expect(users).toHaveLength(4);
            users.forEach((user) => {
              expect(user).toMatchObject({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              });
            });
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if there\'s a typo in the request URL', () => {
        return request(app)
          .get("/api/usesr")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Nothing here. Check your spelling and try again."
            );
          });
      });
    });
  });
});

describe("✏️  Method: POST", () => {
  describe("POST /api/reviews/:review_id/comments", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 201", () => {
        const testComment = {
          username: "mallionaire",
          body: "*** NEW TEST COMMENT ***",
        };

        return request(app)
          .post("/api/reviews/1/comments")
          .send(testComment)
          .expect(201);
      });

      it('should take a comment as an object with "username" and "body" properties and respond with the posted comment (i.e. the given object)', () => {
        const testComment = {
          username: "mallionaire",
          body: "*** NEW TEST COMMENT ***",
        };

        const postedTestComment = {
          author: "mallionaire",
          body: "*** NEW TEST COMMENT ***",
          comment_id: 7,
          review_id: 1,
          votes: 0,
          created_at: expect.any(String),
        };

        return request(app)
          .post("/api/reviews/1/comments")
          .send(testComment)
          .expect(201)
          .then(({ body }) => {
            const { postedComment } = body;

            expect(postedComment).toEqual(postedTestComment);
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "400: Bad Request" error if there\'s no username in the request body', () => {
        const testComment = {
          body: "*** NEW TEST COMMENT ***",
        };

        return request(app)
          .post("/api/reviews/1/comments")
          .send(testComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "There seems to be some data missing. Check your request and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if there\'s no body property in the request', () => {
        const testComment = {
          username: "mallionaire",
        };

        return request(app)
          .post("/api/reviews/1/comments")
          .send(testComment)
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "There seems to be some data missing. Check your request and try again."
            );
          });
      });

      it('should respond with a "404: Not Found" error if the review ID doesn\'t exist', () => {
        const testComment = {
          username: "mallionaire",
          body: "Completely disagree with this review!!!",
        };

        return request(app)
          .post("/api/reviews/165465466666666666/comments")
          .send(testComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "404: Not Found" error if the user doesn\'t exist', () => {
        const testComment = {
          username: "janesmith67",
          body: "Great review! Love, Jane.",
        };

        return request(app)
          .post("/api/reviews/1/comments")
          .send(testComment)
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any users with that username. Check your request and try again."
            );
          });
      });
    });
  });
});

describe("🩹 Method: PATCH", () => {
  describe("PATCH /api/reviews/:review_id (votes)", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 200 and the corresponding review object with its votes property increased", () => {
        return request(app)
          .patch("/api/reviews/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => {
            const { updatedReview } = body;
            const updatedTestReview = {
              review_id: 1,
              title: "Agricola",
              category: "euro game",
              designer: "Uwe Rosenberg",
              owner: "mallionaire",
              review_body: "Farmyard fun!",
              review_img_url:
                "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
              created_at: "2021-01-18T10:00:20.514Z",
              votes: 2,
            };

            expect(updatedReview).toEqual(updatedTestReview);
          });
      });

      it("should respond with status code 200 and the corresponding review object with its votes property decreased", () => {
        return request(app)
          .patch("/api/reviews/1")
          .send({ inc_votes: -100 })
          .expect(200)
          .then(({ body }) => {
            const { updatedReview } = body;
            const updatedTestReview = {
              review_id: 1,
              title: "Agricola",
              category: "euro game",
              designer: "Uwe Rosenberg",
              owner: "mallionaire",
              review_body: "Farmyard fun!",
              review_img_url:
                "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700",
              created_at: "2021-01-18T10:00:20.514Z",
              votes: -99,
            };

            expect(updatedReview).toEqual(updatedTestReview);
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if the given review_id doesn\'t exist', () => {
        return request(app)
          .patch("/api/reviews/666")
          .send({ inc_votes: 1 })
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "404: Not Found" error if the given review_id is out of range', () => {
        return request(app)
          .patch("/api/reviews/666666666666666666666666666")
          .send({ inc_votes: 1 })
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any reviews with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if the given review_id is not valid (e.g. not a number)', () => {
        return request(app)
          .patch("/api/reviews/sixsixsix")
          .send({ inc_votes: 1 })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Something's not quite right with your request. Check your spelling and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if the given value of "inc_votes" is not valid (e.g. not a number)', () => {
        return request(app)
          .patch("/api/reviews/1")
          .send({ inc_votes: "six" })
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Something's not quite right with your request. Check your spelling and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if no "inc_votes" given', () => {
        return request(app)
          .patch("/api/reviews/1")
          .send()
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "There seems to be some data missing. Check your request and try again."
            );
          });
      });
    });
  });
});

describe("🗑️  Method: DELETE", () => {
  describe("DELETE /api/comments/:comment_id", () => {
    describe("🎉 SUCCESS", () => {
      it("should respond with status code 204 and no content", () => {
        return request(app)
          .delete("/api/comments/1")
          .expect(204)
          .then((response) => {
            expect(response.noContent).toBe(true);
          });
      });
    });

    describe("❌ ERROR", () => {
      it('should respond with a "404: Not Found" error if the comment ID doesn\'t exist', () => {
        return request(app)
          .delete("/api/comments/666")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any comments with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "404: Not Found" error if the comment ID is out of range', () => {
        return request(app)
          .delete("/api/comments/66666666666666666666666666666")
          .expect(404)
          .then((response) => {
            expect(response.body.msg).toBe(
              "We couldn't find any comments with that ID. Check your request and try again."
            );
          });
      });

      it('should respond with a "400: Bad Request" error if the comment ID is not valid', () => {
        return request(app)
          .delete("/api/comments/mycomment_id")
          .expect(400)
          .then((response) => {
            expect(response.body.msg).toBe(
              "Something's not quite right with your request. Check your spelling and try again."
            );
          });
      });
    });
  });
});