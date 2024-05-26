"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.timestamp(), winston_1.format.printf(({ timestamp, level, message, service }) => {
        return `${timestamp} [${service}] ${level}: ${message}`;
    })),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "error.log", level: "error" }),
        new winston_1.transports.File({ filename: "app.log", level: "info" }),
    ],
});
//# sourceMappingURL=logger.js.map