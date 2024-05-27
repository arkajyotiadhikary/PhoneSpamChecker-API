import Router from "express";
import {
      register,
      login,
      searchUserbyName,
      searchUserbyPhoneNumber,
      getAllUsers,
      getUserContacts,
      addContact,
} from "../controllers/user.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", register);
router.post("/login", login);
// auth routes
router.get("/search/users/name/:name", auth, searchUserbyName);
router.get("/search/users/phone-number/:phoneNumber", auth, searchUserbyPhoneNumber);
router.get("/search/users/all", auth, getAllUsers);
router.get("/search/users/contacts/:name", auth, getUserContacts);
router.post("/users/contact", auth, addContact);

export default router;
