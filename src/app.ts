import express from "express";
import helmet from "helmet";
import cors from "cors";

import { logger, populateDB } from "./utils";
import { middlewares } from "./middlewares";

// routes
import userRouter from "./routes/user.routes";
import phoneNumberRouter from "./routes/phoneNumber.routes";

const app = express();

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
app.use(helmet());
app.use(cors());
app.use(express.json());
// custom middlewares - auth , logger and limiter
app.use(middlewares);
// error handling middleware

// use routes
app.use("/api", userRouter);
app.use("/api", phoneNumberRouter);
export default app;
