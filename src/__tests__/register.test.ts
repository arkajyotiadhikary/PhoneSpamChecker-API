import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import request from "supertest";
import express from "express";
const app = express();
app.use(express.json());

import { register } from "../controllers/user.controller";
import { faker } from "@faker-js/faker";

// Mock your register function here
app.post("/register", register);

describe("POST /register", () => {
      // User registration tests
      it("should handle successful registration", async () => {
            const mockUser = {
                  name: faker.person.fullName(),
                  phoneNumber: faker.phone.number(),
                  email: faker.internet.email(),
                  password: faker.internet.password(),
            };

            const response = await request(app).post("/register").send(mockUser);

            expect(response.status).toBe(201);
            expect(response.body.token).toBeDefined();
      });

      // Existing phone number
      it("should handle existing phone number", async () => {
            const mockUser = {
                  name: "Test User",
                  phoneNumber: "0192393030458940", // Assume this number already exists
                  email: "testuser@gmail.com",
                  password: "password123",
            };

            const response = await request(app).post("/register").send(mockUser);

            expect(response.status).toBe(409);
            expect(response.body.message).toBe("Phone number already exists");
      });

      // Server error
});
