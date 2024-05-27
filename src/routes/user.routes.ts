import Router from "express";
import {
      searchUserbyName,
      searchUserbyPhoneNumber,
      getAllUsers,
      getUserDetails,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/search/users/name/:name", auth, searchUserbyName);
router.get("/search/users/phone-number/:phoneNumber", auth, searchUserbyPhoneNumber);
router.get("/search/users/all", auth, getAllUsers);
router.get("/search/users/:id", auth, getUserDetails);
export default router;
