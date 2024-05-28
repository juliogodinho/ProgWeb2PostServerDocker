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
const MessageDataBaseService_1 = __importDefault(require("../services/MessageDataBaseService"));
class MessageController {
    constructor() { }
    listMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const messages = yield MessageDataBaseService_1.default.listDBMessages();
                res.json({
                    status: "ok",
                    messages: messages,
                });
            }
            catch (error) {
                console.log(error);
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            console.log(body);
            if (!body.title || !body.content) {
                res.json({
                    status: "error",
                    message: "Falta parâmetros",
                });
            }
            try {
                const newmessage = yield MessageDataBaseService_1.default.insertDBMessage({
                    title: body.title,
                    content: body.content,
                    author: { connect: { id: body.authorId } },
                    post: { connect: { id: body.postId } },
                    published: body.published,
                });
                res.json({
                    status: "ok",
                    newmessage: newmessage,
                });
            }
            catch (error) {
                console.log("passei aqui1");
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    updateMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.json({
                    status: "error",
                    message: "Faltou o ID",
                });
            }
            const { title, content } = req.body;
            if (!title || !content) {
                res.json({
                    status: "error",
                    message: "Falta parâmetros",
                });
            }
            try {
                const updatedMessage = yield MessageDataBaseService_1.default.updateDBMessage({
                    title: title,
                    content: content,
                }, parseInt(id));
                res.json({
                    status: "ok",
                    newmessage: updatedMessage,
                });
            }
            catch (error) {
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    deleteMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.json({
                    status: "error",
                    message: "Faltou o ID",
                });
            }
            try {
                const response = yield MessageDataBaseService_1.default.deleteDBMessage(parseInt(id));
                if (response) {
                    res.json({
                        status: "ok",
                        message: "messagem deletada com sucesso",
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
}
exports.default = new MessageController();
