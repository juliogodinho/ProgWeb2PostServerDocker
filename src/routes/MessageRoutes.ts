import { Router } from "express";
import MessageController from "../controllers/MessageController";

const MessageRouter = Router();

MessageRouter.get("/api/messages", MessageController.listMessage);
MessageRouter.post("/api/message", MessageController.createMessage);
MessageRouter.patch("/api/message/:id", MessageController.updateMessage);
MessageRouter.delete("/api/message/:id", MessageController.deleteMessage);

export default MessageRouter;