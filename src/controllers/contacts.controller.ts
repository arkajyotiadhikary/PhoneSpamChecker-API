import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { contactSchema, isValidPhoneNumber } from "../validators";

const prisma = new PrismaClient();

// Get user contacts by name
export const getUserContacts = async (req: Request, res: Response, next: NextFunction) => {
      const { name } = req.params;
      try {
            // Search for the user name starts with the search query
            const user = await prisma.user.findMany({
                  where: {
                        name: {
                              startsWith: name,
                        },
                  },
                  select: {
                        id: true,
                  },
            });
            const contacts = await Promise.all(
                  user.map((user) =>
                        prisma.contact.findMany({
                              where: {
                                    userID: user.id,
                              },
                        })
                  )
            );
            res.status(200).json({ contacts });
      } catch (error) {
            next(error);
      }
};

// Add contact to user
export const addContact = async (req: Request, res: Response, next: NextFunction) => {
      const { userID, phoneNumber, name, countryCode } = req.body;
      const { error } = contactSchema.validate(req.body);
      if (error) {
            return res.status(400).json({ message: error.details[0].message });
      }
      // Validate phone number
      if (!isValidPhoneNumber(phoneNumber, countryCode)) {
            return res.status(400).json({ message: "Invalid phone number" });
      }

      // check the phone number exist in the current user contacts or not
      const existContact = await prisma.contact.findFirst({
            where: {
                  AND: [{ phoneNumber: phoneNumber }, { userID: userID }],
            },
      });

      if (existContact) {
            return res.status(400).json({ message: "Contact already exists" });
      }

      try {
            const contact = await prisma.contact.create({
                  data: {
                        name,
                        phoneNumber,
                        userID,
                  },
            });
            res.status(200).json({ contact });
      } catch (error) {
            next(error);
      }
};
