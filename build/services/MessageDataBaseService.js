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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class MessageDataBaseService {
    constructor() { }
    listDBMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield prisma.message.findMany();
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    insertDBMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newmessage = yield prisma.message.create({
                    data: message,
                });
                return newmessage;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    updateDBMessage(message, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMessage = yield prisma.message.update({
                    data: message,
                    where: {
                        id: id,
                    },
                });
                return updatedMessage;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    deleteDBMessage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield prisma.message.delete({
                    where: {
                        id: id,
                    },
                });
                return true;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = new MessageDataBaseService();
