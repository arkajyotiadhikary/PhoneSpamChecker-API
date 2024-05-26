// This is a script to populate our database with fake data
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

import { IUser } from "../types/types";
import { logger } from "./logger";

const prisma = new PrismaClient();
const users: IUser[] = [];

export const populateDB = async () => {
      logger.info("Starting to populate the database");
      const startTime = Date.now();
      try {
            await generateUsers();
            await generateContacts();
            await generateSpams();
      } catch (error) {
            logger.error("Error during data population:", error);
      } finally {
            const endTime = Date.now();
            logger.info(`Data population completed in ${(endTime - startTime) / 1000} seconds`);
            await prisma.$disconnect();
      }

      logger.info("Finished populating the database");
};

const generateUsers = async () => {
      for (let i = 0; i < 10; i++) {
            const name = faker.person.fullName();
            const phoneNumber = faker.phone.number();
            const email = faker.internet.email();
            const password = faker.internet.password();
            const hashedPassword = await bcrypt.hash(password, 10);
            const user: IUser = await prisma.user.create({
                  data: {
                        name,
                        phoneNumber,
                        email,
                        password: hashedPassword,
                  },
            });
            users.push(user);
      }
      logger.info(`Created ${users.length} users`);
};
const generateContacts = async () => {
      let contactsCreated = 0;
      for (let i = 0; i < 10; i++) {
            const name = faker.person.fullName();
            const phoneNumber = faker.phone.number();
            // Contact can be registered or not registered .
            // So if it is greater then 0.5 then we are assuming the contact is not registered
            // And if it is lesser them we are taking random value from users array
            const registered = Math.random() > 0.5;
            const userID = registered ? users[Math.floor(Math.random() * users.length)].id : null;
            await prisma.contact.create({
                  data: {
                        name,
                        phoneNumber,
                        userID,
                  },
            });
            contactsCreated++;
      }
      logger.info(`Created ${contactsCreated} contacts`);
};
const generateSpams = async () => {
      let spamEntriesCreated = 0;
      for (let i = 0; i < 10; i++) {
            const phoneNumber = faker.phone.number();
            const spamCount = faker.number.int({ min: 1, max: 10 });
            await prisma.spam.create({
                  data: {
                        phoneNumber,
                        spamCount,
                  },
            });
      }
      logger.info(`Created ${spamEntriesCreated} spam entries`);
};
