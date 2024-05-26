"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const registerSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    phoneNumber: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().optional(),
});
exports.default = registerSchema;
//# sourceMappingURL=registerSchema.js.map