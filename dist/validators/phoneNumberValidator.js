"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidPhoneNumber = void 0;
const libphonenumber_js_1 = require("libphonenumber-js");
const isValidPhoneNumber = (phoneNumber, countryCode) => {
    const phoneNumberObj = (0, libphonenumber_js_1.parsePhoneNumberFromString)(phoneNumber, countryCode ? countryCode : "IN");
    return phoneNumberObj ? phoneNumberObj.isValid() : false;
};
exports.isValidPhoneNumber = isValidPhoneNumber;
//# sourceMappingURL=phoneNumberValidator.js.map