"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateContacts = void 0;
const faker_1 = require("@faker-js/faker");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const generateContacts = (userID) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = [];
    console.log("Populating database...");
    console.log("userID", userID);
    for (let i = 0; i < 10; i++) {
        // Generate 10 contacts
        contacts.push({
            userID: userID,
            name: faker_1.faker.person.fullName(),
            phoneNumber: faker_1.faker.phone.number(),
        });
    }
    console.log(contacts);
    yield prisma.contact.createMany({
        data: contacts,
    });
});
exports.generateContacts = generateContacts;
//# sourceMappingURL=generateContacts.js.map