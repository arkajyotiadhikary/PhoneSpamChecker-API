import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const markAsSpam = async (req: Request, res: Response, next: NextFunction) => {
      const { phoneNumber } = req.params;
      try {
            const spam = await prisma.spam.upsert({
                  where: {
                        phoneNumber,
                  },
                  update: {
                        spamCount: {
                              increment: 1,
                        },
                  },
                  create: {
                        phoneNumber,
                  },
            });

            res.status(201).json({ spamLikelihood: spam.spamCount });
      } catch (error) {
            next(error);
      }
};

// Get spam counts
export const getSpamCounts = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const spamCounts = await prisma.spam.groupBy({
                  by: ["phoneNumber"],
                  _sum: {
                        spamCount: true,
                  },
                  orderBy: {
                        _sum: {
                              spamCount: "desc",
                        },
                  },
            });
            res.status(200).json({ spamCounts });
      } catch (error) {
            next(error);
      }
};

// Get spam numbers where spamCount > 5
export const getSpamNumbers = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const spamNumbers = await prisma.spam.findMany({
                  select: {
                        phoneNumber: true,
                  },
                  where: {
                        spamCount: {
                              gte: 5,
                        },
                  },
            });
            res.status(200).json({ spamNumbers });
      } catch (error) {
            next(error);
      }
};
