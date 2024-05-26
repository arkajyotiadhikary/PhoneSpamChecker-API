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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDB = void 0;
// This is a script to populate our database with fake data
const client_1 = require("@prisma/client");
const faker_1 = require("@faker-js/faker");
const bcrypt_1 = __importDefault(require("bcrypt"));
const logger_1 = require("./logger");
const prisma = new client_1.PrismaClient();
const users = [];
const populateDB = () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info("Starting to populate the database");
    const startTime = Date.now();
    try {
        yield generateUsers();
        yield generateContacts();
        yield generateSpams();
    }
    catch (error) {
        logger_1.logger.error("Error during data population:", error);
    }
    finally {
        const endTime = Date.now();
        logger_1.logger.info(`Data population completed in ${(endTime - startTime) / 1000} seconds`);
        yield prisma.$disconnect();
    }
    logger_1.logger.info("Finished populating the database");
});
exports.populateDB = populateDB;
const generateUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < 10; i++) {
        const name = faker_1.faker.person.fullName();
        const phoneNumber = faker_1.faker.phone.number();
        const email = faker_1.faker.internet.email();
        const password = faker_1.faker.internet.password();
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield prisma.user.create({
            data: {
                name,
                phoneNumber,
                email,
                password: hashedPassword,
            },
        });
        users.push(user);
    }
    logger_1.logger.info(`Created ${users.length} users`);
});
const generateContacts = () => __awaiter(void 0, void 0, void 0, function* () {
    let contactsCreated = 0;
    for (let i = 0; i < 10; i++) {
        const name = faker_1.faker.person.fullName();
        const phoneNumber = faker_1.faker.phone.number();
        // Contact can be registered or not registered .
        // So if it is greater then 0.5 then we are assuming the contact is not registered
        // And if it is lesser them we are taking random value from users array
        const registered = Math.random() > 0.5;
        const userID = registered ? users[Math.floor(Math.random() * users.length)].id : null;
        yield prisma.contact.create({
            data: {
                name,
                phoneNumber,
                userID,
            },
        });
        contactsCreated++;
    }
    logger_1.logger.info(`Created ${contactsCreated} contacts`);
});
const generateSpams = () => __awaiter(void 0, void 0, void 0, function* () {
    let spamEntriesCreated = 0;
    for (let i = 0; i < 10; i++) {
        const phoneNumber = faker_1.faker.phone.number();
        const spamCount = faker_1.faker.number.int({ min: 1, max: 10 });
        yield prisma.spam.create({
            data: {
                phoneNumber,
                spamCount,
            },
        });
    }
    logger_1.logger.info(`Created ${spamEntriesCreated} spam entries`);
});
//# sourceMappingURL=populateDB.js.map