const request = require("supertest");

jest.mock("../config/db", () => jest.fn());
jest.mock("../middleware/authMiddleware", () => ({
  protect: (req, res, next) => {
    req.user = { id: "test-user" };
    next();
  }
}));
jest.mock("../models/Expense", () => {
  return jest.fn().mockImplementation((doc) => ({
    ...doc,
    save: jest.fn().mockResolvedValue(doc),
  }));
});

const app = require("../app");

const validPayload = {
  source: "Groceries",
  amount: 42.5,
  date: "2026-02-08",
  icon: "cart",
};

describe("POST /api/expenses", () => {
  test("returns 201 for valid input", async () => {
    const res = await request(app).post("/api/expenses").send(validPayload);
    expect(res.status).toBe(201);
  });

  test("returns 400 for invalid input (missing or negative amount)", async () => {
    const cases = [
      { ...validPayload, amount: undefined },
      { ...validPayload, amount: -1 },
    ];

    for (const payload of cases) {
      const res = await request(app).post("/api/expenses").send(payload);
      expect(res.status).toBe(400);
    }
  });
});

describe("Rate limiting", () => {
  test("returns 429 after too many rapid requests", async () => {
    const first = await request(app).post("/api/expenses").send(validPayload);
    const limitHeader = first.headers["ratelimit-limit"] || first.headers["x-ratelimit-limit"];
    const remainingHeader = first.headers["ratelimit-remaining"] || first.headers["x-ratelimit-remaining"];

    const limit = Number(limitHeader || 100);
    const remaining = Number(remainingHeader || Math.max(limit - 1, 0));
    const extraRequests = remaining + 1;

    let lastResponse = null;
    for (let i = 0; i < extraRequests; i += 1) {
      lastResponse = await request(app).post("/api/expenses").send(validPayload);
    }

    expect(lastResponse.status).toBe(429);
  });
});
