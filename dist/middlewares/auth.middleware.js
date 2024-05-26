"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || "secret";
const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, secret);
    if (!decoded) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
};
exports.auth = auth;
//# sourceMappingURL=auth.middleware.js.map