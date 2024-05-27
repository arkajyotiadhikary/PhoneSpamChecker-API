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
exports.getSpamNumbers = exports.getSpamCounts = exports.markAsSpam = void 0;
const client_1 = require("@prisma/client");
const validators_1 = require("../validators");
const prisma = new client_1.PrismaClient();
const markAsSpam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, countryCode } = req.body;
    try {
        // check if the phone number exist in users or in contacts table
        console.log("phoneNumber", phoneNumber);
        const user = yield prisma.user.findUnique({
            where: {
                phoneNumber: phoneNumber,
            },
        });
        if (!user) {
            const contact = yield prisma.contact.findMany({
                where: {
                    phoneNumber: phoneNumber,
                },
            });
            if (contact.length === 0) {
                // create contact without name and user id
                // validate phone number first
                if (!(0, validators_1.isValidPhoneNumber)(phoneNumber, countryCode)) {
                    return res.status(400).json({ message: "Invalid phone number" });
                }
                yield prisma.contact.create({
                    data: {
                        phoneNumber,
                    },
                });
            }
        }
        const spam = yield prisma.spam.upsert({
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
    }
    catch (error) {
        next(error);
    }
});
exports.markAsSpam = markAsSpam;
// Get spam counts
const getSpamCounts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spamCounts = yield prisma.spam.groupBy({
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
    }
    catch (error) {
        next(error);
    }
});
exports.getSpamCounts = getSpamCounts;
// Get spam numbers where spamCount > 5
const getSpamNumbers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spamNumbers = yield prisma.spam.findMany({
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
    }
    catch (error) {
        next(error);
    }
});
exports.getSpamNumbers = getSpamNumbers;
//# sourceMappingURL=phoneNumber.controller.js.map