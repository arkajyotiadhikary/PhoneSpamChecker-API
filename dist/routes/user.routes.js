"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.post("/register", user_controller_1.register);
router.post("/login", user_controller_1.login);
// auth routes
router.get("/search/users/name/:name", auth_middleware_1.auth, user_controller_1.searchUserbyName);
router.get("/search/users/phone-number/:phoneNumber", auth_middleware_1.auth, user_controller_1.searchUserbyPhoneNumber);
router.get("/search/users/all", auth_middleware_1.auth, user_controller_1.getAllUsers);
router.get("/search/users/contacts/:name", auth_middleware_1.auth, user_controller_1.getUserContacts);
router.post("/users/contact", auth_middleware_1.auth, user_controller_1.addContact);
exports.default = router;
//# sourceMappingURL=user.routes.js.map