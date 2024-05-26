"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandling = void 0;
const utils_1 = require("../utils");
const errorHandling = (err, req, res, next) => {
    utils_1.logger.error(err);
    res.status(err.status || 500).json({ message: err.message || "Internal server error" });
};
exports.errorHandling = errorHandling;
//# sourceMappingURL=errorHandling.middleware.js.map