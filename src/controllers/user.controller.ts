import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// User Search by Name
/**
 * A user can search for a person by name in the global database. Search results display the name,
 * phone number and spam likelihood for each result matching that name completely or partially.
 * Results should first show people whose names start with the search query, and then people
 * whose names contain but don’t start with the search query.
 *
 * @param {Request} req The request object containing the name parameter.
 * @param {Response} res The response object containing the search results.
 * @param {NextFunction} next The next function to handle any errors.
 */
export const searchUserbyName = async (req: AuthRequest, res: Response, next: NextFunction) => {
      const { name } = req.params;
      const { userId } = req;

      try {
            const firstUsers = await prisma.user.findMany({
                  where: {
                        name: {
                              startsWith: name,
                        },
                  },
                  select: {
                        id: true,
                        name: true,
                        phoneNumber: true,
                  },
            });

            const containUsers = await prisma.user.findMany({
                  where: {
                        AND: [
                              { name: { contains: name } },
                              { name: { not: { startsWith: name } } },
                        ],
                  },
                  select: {
                        id: true,
                        name: true,
                        phoneNumber: true,
                  },
            });

            const users = [...firstUsers, ...containUsers];
            if (!users.length) {
                  return res.status(404).json({ message: "User not found" });
            }

            const userWithSpam = await Promise.all(
                  users.map(async (user) => {
                        const spam = await prisma.spam.findUnique({
                              where: {
                                    phoneNumber: user.phoneNumber,
                              },
                        });
                        // If spamCount is lesser then 5 then spamLikelihood will be low
                        // If spamCount is between 5 - 10 then spamLikelihood will be mid
                        // If spamCount is greater then 10 then spamLikelihood will be high
                        if (spam?.spamCount) {
                              if (spam?.spamCount < 5) {
                                    return { ...user, spamLikelihood: "Low" };
                              } else if (spam?.spamCount >= 5 && spam?.spamCount <= 10) {
                                    return { ...user, spamLikelihood: "Medium" };
                              } else {
                                    return { ...user, spamLikelihood: "High" };
                              }
                        }

                        return { ...user, spamLikelihood: "Low" };
                  })
            );
            res.status(200).json({ users: userWithSpam });
      } catch (error) {
            next(error);
      }
};

// User Search by Phone Number
/**
 * A user can search for a person by phone number in the global database. If there is a registered
 * user with that phone number, show only that result. Otherwise, show all results matching that
 * phone number completely - note that there can be multiple names for a particular phone number
 * in the global database, since contact books of multiple registered users may have different names
 * for the same phone number.
 *
 * @param {Request} req The request object containing the phone number parameter.
 * @param {Response} res The response object containing the search results.
 * @param {NextFunction} next The next function to handle any errors.
 */
export const searchUserbyPhoneNumber = async (req: Request, res: Response, next: NextFunction) => {
      const { phoneNumber } = req.params;
      try {
            // Check if the user is registered
            const registeredUser = await prisma.user.findUnique({
                  where: {
                        phoneNumber,
                  },
                  select: {
                        id: true,
                        name: true,
                        phoneNumber: true,
                        email: true,
                  },
            });
            if (registeredUser) {
                  return res.status(200).json({ users: [registeredUser] });
            }
            // If the user is not registered check for it in contacts
            const contacts = await prisma.contact.findMany({
                  where: {
                        phoneNumber,
                  },
                  select: {
                        name: true,
                        phoneNumber: true,
                        user: {
                              select: {
                                    id: true,
                                    name: true,
                                    email: true,
                              },
                        },
                  },
            });

            if (!contacts.length) {
                  return res.status(404).json({ message: "User not found" });
            }

            // Data formatting details for each contact
            const users = contacts.map((contact) => ({
                  name: contact.name,
                  phoneNumber: contact.phoneNumber,
                  associatedUser: contact.user,
            }));
            res.status(200).json({ users });
      } catch (error) {
            next(error);
      }
};

// Get user details by ID
/**
 * Clicking a search result displays all the details for that person along with
 * the spam likelihood. But the person's email is only displayed if the person
 * is a registered user and the user who is searching is in the person's contact
 * list.
 *
 * @param {Request} req The request object containing the phone number parameter.
 * @param {Response} res The response object containing the search results.
 * @param {NextFunction} next The next function to handle any errors.
 */
export const getUserDetails = async (req: AuthRequest, res: Response, next: NextFunction) => {
      const userId = Number(req.userId);
      const id = Number(req.params.id);

      try {
            // Find the user by ID
            const user = await prisma.user.findUnique({
                  where: { id },
                  select: {
                        id: true,
                        name: true,
                        phoneNumber: true,
                        email: true,
                  },
            });

            if (!user) {
                  return res.status(404).json({ message: "User not found" });
            }

            // Check spam likelihood
            const spam = await prisma.spam.findUnique({
                  where: {
                        phoneNumber: user.phoneNumber,
                  },
            });

            let responseUser: {
                  id: number;
                  name: string;
                  email?: string;
                  phoneNumber: string;
                  spamLikelihood: number;
            } = {
                  id: user.id,
                  name: user.name,
                  phoneNumber: user.phoneNumber,
                  spamLikelihood: spam?.spamCount || 0,
            };

            // Check if the searching user is in the user's contact list to display email
            const contact = await prisma.contact.findFirst({
                  where: {
                        phoneNumber: user.phoneNumber,
                        userID: userId,
                  },
            });

            if (contact) {
                  responseUser.email = user.email!;
            }

            res.status(200).json(responseUser);
      } catch (error) {
            next(error);
      }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
      try {
            const users = await prisma.user.findMany();
            res.status(200).json({ users });
      } catch (error) {
            next(error);
      }
};
