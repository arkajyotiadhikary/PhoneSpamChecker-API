"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middlewares = void 0;
const logger_middleware_1 = require("./logger.middleware");
const limiter_middleware_1 = require("./limiter.middleware");
const errorHandling_middleware_1 = require("./errorHandling.middleware");
exports.middlewares = [logger_middleware_1.logger, limiter_middleware_1.limiter, errorHandling_middleware_1.errorHandling];
exports.default = exports.middlewares;
//# sourceMappingURL=index.js.map