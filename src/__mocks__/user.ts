// import request from "supertest";
// import express, { Application } from "express";
// import { Request, Response } from "express";
// import {
//       register,
//       login,
//       searchUserbyName,
//       searchUserbyPhoneNumber,
// } from "../src/controllers/user.controller";
// import bcrypt from "../__mocks__/bcrypt";
// import { user, spam, contact } from "../__mocks__/prisma";
// import createToken from "../__mocks__/createToken";
// import { faker } from "@faker-js/faker";

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// // Mock dependencies
// jest.mock("../__mocks__/bcrypt");
// jest.mock("../__mocks__/prisma");
// jest.mock("../__mocks__/createToken");

// const app: Application = express();
// app.use(express.json());
// app.post("/register", register);
// app.post("/login", login);
// app.get("/search/name/:name", searchUserbyName);
// app.get("/search/phone/:phoneNumber", searchUserbyPhoneNumber);

// describe("User Controller", () => {
//       describe("register", () => {
//             let req: Request;
//             let res: Response;
//             let next: jest.Mock;

//             beforeEach(() => {
//                   req = {
//                         body: {
//                               name: "John Doe",
//                               phoneNumber: faker.phone.number(),
//                               email: "john@example.com",
//                               password: "password123",
//                         },
//                   } as any;
//                   res = {
//                         status: jest.fn().mockReturnThis(),
//                         json: jest.fn(),
//                   } as any;
//                   next = jest.fn();
//             });

//             it("should register a new user", async () => {
//                   await register(req, res, next);

//                   expect(res.status).toHaveBeenCalledWith(201);
//                   expect(res.json).toHaveBeenCalledWith({ token: expect.any(String) });
//             });

//             it("should return a 400 error if the request body is invalid", async () => {
//                   req.body.name = "";

//                   await register(req, res, next);

//                   expect(res.status).toHaveBeenCalledWith(400);
//                   expect(res.json).toHaveBeenCalledWith({ message: expect.any(String) });
//             });

//             it("should return a 409 error if the phone number already exists", async () => {
//                   jest.spyOn(prisma.user, "create").mockRejectedValueOnce({ code: "P2002" });
//                   req.body.phoneNumber = "1234567890";
//                   await register(req, res, next);

//                   expect(res.status).toHaveBeenCalledWith(409);
//                   expect(res.json).toHaveBeenCalledWith({ message: "Phone number already exists" });
//             });

//             it("should pass any other errors to the next middleware", async () => {
//                   jest.spyOn(prisma.user, "create").mockRejectedValueOnce(
//                         new Error("Database error")
//                   );

//                   await register(req, res, next);

//                   expect(next).toHaveBeenCalledWith(expect.any(Error));
//             });
//       });
//       describe("login", () => {
//             it("should return 404 if user is not found", async () => {
//                   user.findUnique.mockResolvedValue(null);

//                   const response = await request(app).post("/login").send({
//                         phoneNumber: "1234567890",
//                         password: "password",
//                   });

//                   expect(response.status).toBe(404);
//                   expect(response.body.message).toBe("User not found");
//             });

//             it("should return 401 if password is invalid", async () => {
//                   user.findUnique.mockResolvedValue({ password: "hashedPassword" });
//                   bcrypt.compareSync.mockReturnValue(false);

//                   const response = await request(app).post("/login").send({
//                         phoneNumber: "1234567890",
//                         password: "password",
//                   });

//                   expect(response.status).toBe(401);
//                   expect(response.body.message).toBe("Invalid password");
//             });

//             it("should return 200 and a token if login is successful", async () => {
//                   user.findUnique.mockResolvedValue({ id: 1, password: "hashedPassword" });

//                   const response = await request(app).post("/login").send({
//                         phoneNumber: "1234567890",
//                         password: "password",
//                   });

//                   expect(response.status).toBe(200);
//                   expect(response.body.token).toBe("token");
//                   expect(createToken).toHaveBeenCalledWith(1);
//             });
//       });

//       describe("searchUserbyName", () => {
//             it("should return 404 if no users are found", async () => {
//                   user.findMany.mockResolvedValue([]);

//                   const response = await request(app).get("/search/name/NonExistingName");

//                   expect(response.status).toBe(404);
//                   expect(response.body.message).toBe("User not found");
//             });

//             it("should return users matching the search query", async () => {
//                   user.findMany
//                         .mockResolvedValueOnce([
//                               {
//                                     name: "John Doe",
//                                     phoneNumber: "1234567890",
//                                     email: "john.doe@example.com",
//                               },
//                         ])
//                         .mockResolvedValueOnce([
//                               {
//                                     name: "Jane Doe",
//                                     phoneNumber: "0987654321",
//                                     email: "jane.doe@example.com",
//                               },
//                         ]);

//                   spam.findUnique
//                         .mockResolvedValueOnce({ spamCount: 1 })
//                         .mockResolvedValueOnce({ spamCount: 0 });

//                   const response = await request(app).get("/search/name/John");

//                   expect(response.status).toBe(200);
//                   expect(response.body.users).toHaveLength(2);
//                   expect(response.body.users[0]).toEqual({
//                         name: "John Doe",
//                         phoneNumber: "1234567890",
//                         email: "john.doe@example.com",
//                         spamLikelihood: 1,
//                   });
//                   expect(response.body.users[1]).toEqual({
//                         name: "Jane Doe",
//                         phoneNumber: "0987654321",
//                         email: "jane.doe@example.com",
//                         spamLikelihood: 0,
//                   });
//             });
//       });

//       describe("searchUserbyPhoneNumber", () => {
//             it("should return 404 if no users are found", async () => {
//                   user.findUnique.mockResolvedValue(null);
//                   contact.findMany.mockResolvedValue([]);

//                   const response = await request(app).get("/search/phone/1234567890");

//                   expect(response.status).toBe(404);
//                   expect(response.body.message).toBe("User not found");
//             });

//             it("should return registered user if found", async () => {
//                   user.findUnique.mockResolvedValue({
//                         id: 1,
//                         name: "John Doe",
//                         phoneNumber: "1234567890",
//                         email: "john.doe@example.com",
//                   });

//                   const response = await request(app).get("/search/phone/1234567890");

//                   expect(response.status).toBe(200);
//                   expect(response.body.users).toHaveLength(1);
//                   expect(response.body.users[0]).toEqual({
//                         id: 1,
//                         name: "John Doe",
//                         phoneNumber: "1234567890",
//                         email: "john.doe@example.com",
//                   });
//             });

//             it("should return contacts if no registered user is found", async () => {
//                   user.findUnique.mockResolvedValue(null);
//                   contact.findMany.mockResolvedValue([
//                         {
//                               name: "Jane Doe",
//                               phoneNumber: "1234567890",
//                               user: { id: 1, name: "John Doe", email: "john.doe@example.com" },
//                         },
//                   ]);

//                   const response = await request(app).get("/search/phone/1234567890");

//                   expect(response.status).toBe(200);
//                   expect(response.body.users).toHaveLength(1);
//                   expect(response.body.users[0]).toEqual({
//                         name: "Jane Doe",
//                         phoneNumber: "1234567890",
//                         associatedUser: { id: 1, name: "John Doe", email: "john.doe@example.com" },
//                   });
//             });
//       });
// });
