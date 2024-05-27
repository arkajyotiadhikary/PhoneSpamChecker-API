import Router from "express";
import { addContact, getUserContacts } from "../controllers/contacts.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/search/users/contacts/:name", auth, getUserContacts);
router.post("/users/contact", auth, addContact);

export default router;
