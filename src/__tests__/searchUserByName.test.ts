import request from "supertest";
import express from "express";

import { searchUserbyName } from "../controllers/user.controller";

const app = express();
app.use(express.json());

// Mock your searchUserbyName function here
app.get("/search/name/:name", searchUserbyName);

describe("GET /search/name/:name", () => {
      it("should handle successful search", async () => {
            const name = "Arka Test";

            const response = await request(app).get(`/search/name/${name}`);

            expect(response.status).toBe(200);
            expect(response.body.users).toBeDefined();
      });

      it("should handle non-existing user", async () => {
            const name = "NonExistingUser"; // Assume this user does not exist

            const response = await request(app).get(`/search/name/${name}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User not found");
      });

      it("should return users with spam likelihood", async () => {
            const name = "Arka Test";

            const response = await request(app).get(`/search/name/${name}`);

            expect(response.status).toBe(200);
            expect(response.body.users).toBeDefined();
            response.body.users.forEach((user: { spamLikelihood: number }) => {
                  expect(user.spamLikelihood).toBeDefined();
            });
      });
});
