"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactSchema = exports.registerSchema = exports.isValidPhoneNumber = void 0;
const phoneNumberValidator_1 = require("./phoneNumberValidator");
Object.defineProperty(exports, "isValidPhoneNumber", { enumerable: true, get: function () { return phoneNumberValidator_1.isValidPhoneNumber; } });
const registerSchema_1 = require("./registerSchema");
Object.defineProperty(exports, "registerSchema", { enumerable: true, get: function () { return registerSchema_1.registerSchema; } });
Object.defineProperty(exports, "contactSchema", { enumerable: true, get: function () { return registerSchema_1.contactSchema; } });
//# sourceMappingURL=index.js.map