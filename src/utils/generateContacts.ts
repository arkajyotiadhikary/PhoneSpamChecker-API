import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateContacts = async (userID: number) => {
      const contacts = [];
      console.log("Populating database...");
      console.log("userID", userID);

      for (let i = 0; i < 10; i++) {
            // Generate 10 contacts
            contacts.push({
                  userID: userID,
                  name: faker.person.fullName(),
                  phoneNumber: faker.phone.number(),
            });
      }

      console.log(contacts);

      await prisma.contact.createMany({
            data: contacts,
      });
};
