import { logger } from "../utils";
import { Request, Response, NextFunction } from "express";

export const errorHandling = (err: any, req: Request, res: Response, next: NextFunction) => {
      logger.error(err);
      res.status(err.status || 500).json({ message: err.message || "Internal server error" });
};
