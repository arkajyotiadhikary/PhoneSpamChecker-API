import { logger } from "./logger.middleware";
import { limiter } from "./limiter.middleware";
import { errorHandling } from "./errorHandling.middleware";

export const middlewares = [logger, limiter, errorHandling];

export default middlewares;
