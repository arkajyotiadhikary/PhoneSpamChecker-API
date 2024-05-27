"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.get("/search/users/name/:name", auth_middleware_1.auth, user_controller_1.searchUserbyName);
router.get("/search/users/phone-number/:phoneNumber", auth_middleware_1.auth, user_controller_1.searchUserbyPhoneNumber);
router.get("/search/users/all", auth_middleware_1.auth, user_controller_1.getAllUsers);
router.get("/search/users/:id", auth_middleware_1.auth, user_controller_1.getUserDetails);
exports.default = router;
//# sourceMappingURL=user.routes.js.map