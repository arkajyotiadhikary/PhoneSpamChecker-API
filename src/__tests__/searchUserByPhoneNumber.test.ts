import request from "supertest";
import express from "express";
const app = express();
app.use(express.json());

import { searchUserbyPhoneNumber } from "../controllers/user.controller";

// Mock your searchUserbyPhoneNumber function here
app.get("/search/phone-number/:phoneNumber", searchUserbyPhoneNumber);

describe("GET /search/phone-number/:phoneNumber", () => {
      // Successful search
      it("should handle successful search", async () => {
            const phoneNumber = "0192393030458940";

            const response = await request(app).get(`/search/phone-number/${phoneNumber}`);

            expect(response.status).toBe(200);
            expect(response.body.users).toBeDefined();
      });
      // Non-existing user
      it("should handle unsuccessful search", async () => {
            const phoneNumber = "123490";

            const response = await request(app).get(`/search/phone-number/${phoneNumber}`);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User not found");
      });

      // should return user if the user exist
});
