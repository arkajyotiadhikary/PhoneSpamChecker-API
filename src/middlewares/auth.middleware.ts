import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "secret";

export const auth = (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, secret);
      if (!decoded) {
            return res.status(401).json({ message: "Unauthorized" });
      }
      next();
};
