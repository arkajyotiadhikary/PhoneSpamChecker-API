import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
      userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
      }

      try {
            const decoded = jwt.verify(token, secret) as { id: string };
            req.userId = decoded.id;
            next();
      } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
      }
};
