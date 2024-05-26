"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const phoneNumber_controller_1 = require("../controllers/phoneNumber.controller");
const router = require("express").Router();
router.post("/markAsSpam/:phoneNumber", phoneNumber_controller_1.markAsSpam);
exports.default = router;
//# sourceMappingURL=phoneNumber.routes.js.map