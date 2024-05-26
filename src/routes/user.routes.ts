import Router from "express";
import {
      register,
      login,
      searchUserbyName,
      searchUserbyPhoneNumber,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// auth routes
router.get("/search/name/:name", auth, searchUserbyName);
router.get("/search/phone-number/:phoneNumber", auth, searchUserbyPhoneNumber);

export default router;
