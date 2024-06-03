"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contacts_controller_1 = require("../controllers/contacts.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.get("/search/users/contacts/:name", auth_middleware_1.auth, contacts_controller_1.getUserContacts);
router.post("/users/contact", auth_middleware_1.auth, contacts_controller_1.addContact);
exports.default = router;
//# sourceMappingURL=contacts.routes.js.map