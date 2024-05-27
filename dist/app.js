"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const middlewares_1 = require("./middlewares");
// routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const phoneNumber_routes_1 = __importDefault(require("./routes/phoneNumber.routes"));
const app = (0, express_1.default)();
// Populate Database with fake data
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
// (async () => {
//       console.log("Populating database...");
//       await populateDB()
//             .catch((error) => {
//                   logger.error(error);
//                   process.exit(1);
//             })
//             .finally(async () => {
//                   await prisma.$disconnect();
//             });
// })();
// Middlewares
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// custom middlewares - auth , logger and limiter
app.use(middlewares_1.middlewares);
// error handling middleware
// use routes
app.use("/api", user_routes_1.default);
app.use("/api", phoneNumber_routes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map