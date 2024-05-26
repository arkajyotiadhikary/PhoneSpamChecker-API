import jwt from "jsonwebtoken";

export const createToken = (userID: number) => {
      return jwt.sign({ id: userID }, process.env.JWT_SECRET || "secret", {
            expiresIn: process.env.TOKEN_EXPIRES,
      });
};
