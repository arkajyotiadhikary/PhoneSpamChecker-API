import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const secret = process.env.JWT_SECRET || "secret";

export interface AuthRequest extends Request {
      userId?: string;
}

export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
      }

      const token = authHeader.split(" ")[1];
      try {
            const decoded = jwt.verify(token, secret) as { id: string };
            req.userId = decoded.id;
            next();
      } catch (err) {
            return res.status(401).json({ message: "Unauthorized" });
      }
};
