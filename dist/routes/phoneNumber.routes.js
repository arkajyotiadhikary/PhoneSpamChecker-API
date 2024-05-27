"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const phoneNumber_controller_1 = require("../controllers/phoneNumber.controller");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.default)();
router.post("/markAsSpam", auth_middleware_1.auth, phoneNumber_controller_1.markAsSpam);
router.get("/search/phone-number/getSpamCounts", auth_middleware_1.auth, phoneNumber_controller_1.getSpamCounts); // -> get the phoneNumbers from highest spamCount to lowest
router.get("/search/phone-number/getSpamNumbers", auth_middleware_1.auth, phoneNumber_controller_1.getSpamNumbers); // -> get the phoneNumbers where spamCount > 5
exports.default = router;
//# sourceMappingURL=phoneNumber.routes.js.map