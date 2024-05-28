import { Request, Response } from "express";
import MessageDataBaseService from "../services/MessageDataBaseService";

class MessageController {
    constructor() {}

async listMessage(req: Request, res: Response) {
    try {
      const messages = await MessageDataBaseService.listDBMessages();
      res.json({
        status: "ok",
        messages: messages,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createMessage(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.title || !body.content) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const newmessage = await MessageDataBaseService.insertDBMessage({
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
    } catch (error) {
      console.log("passei aqui1");
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updateMessage(req: Request, res: Response) {
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
      const updatedMessage = await MessageDataBaseService.updateDBMessage(
        {
          title: title,
          content: content,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        newmessage: updatedMessage,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deleteMessage(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    try {
      const response = await MessageDataBaseService.deleteDBMessage(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "messagem deletada com sucesso",
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }
}

export default new MessageController();