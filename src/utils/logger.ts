import { createLogger, format, transports } from "winston";

export const logger = createLogger({
      level: "info",
      format: format.combine(
            format.colorize(),
            format.timestamp(),
            format.printf(({ timestamp, level, message, service }) => {
                  return `${timestamp} [${service}] ${level}: ${message}`;
            })
      ),
      defaultMeta: { service: "user-service" },
      transports: [
            new transports.Console(),
            new transports.File({ filename: "error.log", level: "error" }),
            new transports.File({ filename: "app.log", level: "info" }),
      ],
});
