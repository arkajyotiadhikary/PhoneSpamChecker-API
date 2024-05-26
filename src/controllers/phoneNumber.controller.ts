import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPhoneNumber = (req: Request, res: Response) => {};

export const markAsSpam = async (req: Request, res: Response, next: NextFunction) => {
      const { phoneNumber } = req.params;
      console.log("markAsSpam", phoneNumber);
      try {
            // check if phone number exists
            const existNumber = await prisma.spam.findUnique({
                  where: {
                        phoneNumber,
                  },
                  select: {
                        phoneNumber: true,
                  },
            });
            if (existNumber) {
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
            } else {
                  res.status(404).json({ message: "Phone number not found" });
            }
      } catch (error) {
            console.log(error);
            next(error);
      }
};

// Get spam counts
