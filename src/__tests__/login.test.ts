import request from "supertest";
import express from "express";
const app = express();
app.use(express.json());

import { login } from "../controllers/user.controller";

// Mock your login function here
app.post("/login", login);

describe("POST /login", () => {
      // Successful login
      it("should handle successful login", async () => {
            const mockUser = {
                  phoneNumber: "1234567890",
                  password: "password123",
            };

            const response = await request(app).post("/login").send(mockUser);

            expect(response.status).toBe(200);
            expect(response.body.token).toBeDefined();
      });

      // Non-existing user
      it("should handle non-existing user", async () => {
            const mockUser = {
                  phoneNumber: "123xyz", // Assume this number does not exist
                  password: "password123",
            };

            const response = await request(app).post("/login").send(mockUser);

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("User not found");
      });

      // Invalid password
      // it("should validate password", async () => {
      //       const mockUser = {
      //             phoneNumber: "1234567890",
      //             password: "paa", // Assume this password is incorrect
      //       };

      //       const response = await request(app).post("/login").send(mockUser);

      //       expect(response.status).toBe(401);
      //       expect(response.body.message).toBe("Invalid password");
      // });
});
