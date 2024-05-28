"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MessageController_1 = __importDefault(require("../controllers/MessageController"));
const MessageRouter = (0, express_1.Router)();
MessageRouter.get("/api/messages", MessageController_1.default.listMessage);
MessageRouter.post("/api/message", MessageController_1.default.createMessage);
MessageRouter.patch("/api/message/:id", MessageController_1.default.updateMessage);
MessageRouter.delete("/api/message/:id", MessageController_1.default.deleteMessage);
exports.default = MessageRouter;
