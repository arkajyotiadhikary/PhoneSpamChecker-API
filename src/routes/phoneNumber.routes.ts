import { markAsSpam, getSpamCounts, getSpamNumbers } from "../controllers/phoneNumber.controller";
import Router from "express";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/markAsSpam/:phoneNumber", auth, markAsSpam);
router.get("/search/phone-number/getSpamCounts", auth, getSpamCounts); // -> get the phoneNumbers from highest spamCount to lowest
router.get("/search/phone-number/getSpamNumbers", auth, getSpamNumbers); // -> get the phoneNumbers where spamCount > 5

export default router;
