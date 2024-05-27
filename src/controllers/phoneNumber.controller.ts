import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { isValidPhoneNumber } from "../validators";

const prisma = new PrismaClient();

export const markAsSpam = async (req: Request, res: Response, next: NextFunction) => {
      const { phoneNumber, countryCode } = req.body;
      try {
            // check if the phone number exist in users or in contacts table
            console.log("phoneNumber", phoneNumber);

            const user = await prisma.user.findUnique({
                  where: {
                        phoneNumber: phoneNumber,
                  },
            });
            if (!user) {
                  const contact = await prisma.contact.findMany({
                        where: {
                              phoneNumber: phoneNumber,
                        },
                  });
                  if (contact.length === 0) {
                        // create contact without name and user id
                        // validate phone number first
                        if (!isValidPhoneNumber(phoneNumber, countryCode)) {
                              return res.status(400).json({ message: "Invalid phone number" });
                        }
                        await prisma.contact.create({
                              data: {
                                    phoneNumber,
                              },
                        });
                  }
            }

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
