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
exports.addContact = exports.getUserContacts = void 0;
const client_1 = require("@prisma/client");
const validators_1 = require("../validators");
const prisma = new client_1.PrismaClient();
// Get user contacts by name
const getUserContacts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.params;
    try {
        // Search for the user name starts with the search query
        const user = yield prisma.user.findMany({
            where: {
                name: {
                    startsWith: name,
                },
            },
            select: {
                id: true,
            },
        });
        const contacts = yield Promise.all(user.map((user) => prisma.contact.findMany({
            where: {
                userID: user.id,
            },
        })));
        res.status(200).json({ contacts });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserContacts = getUserContacts;
// Add contact to user
const addContact = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userID, phoneNumber, name, countryCode } = req.body;
    const { error } = validators_1.contactSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    // Validate phone number
    if (!(0, validators_1.isValidPhoneNumber)(phoneNumber, countryCode)) {
        return res.status(400).json({ message: "Invalid phone number" });
    }
    // check the phone number exist in the current user contacts or not
    const existContact = yield prisma.contact.findFirst({
        where: {
            AND: [{ phoneNumber: phoneNumber }, { userID: userID }],
        },
    });
    if (existContact) {
        return res.status(400).json({ message: "Contact already exists" });
    }
    try {
        const contact = yield prisma.contact.create({
            data: {
                name,
                phoneNumber,
                userID,
            },
        });
        res.status(200).json({ contact });
    }
    catch (error) {
        next(error);
    }
});
exports.addContact = addContact;
//# sourceMappingURL=contacts.controller.js.map