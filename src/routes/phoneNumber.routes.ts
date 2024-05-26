import { markAsSpam } from "../controllers/phoneNumber.controller";

const router = require("express").Router();

router.post("/markAsSpam/:phoneNumber", markAsSpam);

export default router;
