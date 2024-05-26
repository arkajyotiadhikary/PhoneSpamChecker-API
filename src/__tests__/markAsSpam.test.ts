import request from "supertest";
import express from "express";
import { markAsSpam } from "../controllers/phoneNumber.controller";
const app = express();
app.use(express.json());

// Mock your markAsSpam function here
app.post("/markAsSpam/:phoneNumber", markAsSpam);

describe("POST /markAsSpam/:phoneNumber", () => {
      it("should handle marking as spam", async () => {
            const phoneNumber = "1234567890";

            const response = await request(app).post(`/markAsSpam/${phoneNumber}`);

            expect(response.status).toBe(201);
            expect(response.body.spamLikelihood).toBeDefined();
      });

      // Increment spam count
      it("should increment spam count", async () => {
            const phoneNumber = "1234567890";

            // storing the first count to check the updated count
            const firstResponse = await request(app).post(`/markAsSpam/${phoneNumber}`);
            const firstCount = firstResponse.body.spamLikelihood;
            const secondResponse = await request(app).post(`/markAsSpam/${phoneNumber}`);
            const secondCount = secondResponse.body.spamLikelihood;
            expect(secondCount).toBe(firstCount + 1);
      });

      // Invalid phone number
      it("should handle invalid phone number", async () => {
            const phoneNumber = "00000000";
            const response = await request(app).post(`/markAsSpam/${phoneNumber}`);
            console.log("response body", response.body);
            console.log("response status", response.status);
            expect(response.status).toBe(404);
      });
});
