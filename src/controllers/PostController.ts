import { Request, Response } from "express";
import PostDataBaseService from "../services/PostDataBaseService";

class PostController {
    constructor() {}

async listPost(req: Request, res: Response) {
    try {
      const posts = await PostDataBaseService.listDBPosts();
      res.json({
        status: "ok",
        posts: posts,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async createPost(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.title || !body.content) {
      res.json({
        status: "error",
        message: "Falta parâmetros",
      });
    }

    try {
      const newpost = await PostDataBaseService.insertDBPost({
        title: body.title,
        content: body.content,
        author: { connect: { id: body.authorId } },
        //author: body.authorId,
        published: body.published,
        

      });
      res.json({
        status: "ok",
        newpost: newpost,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async updatePost(req: Request, res: Response) {
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
      const updatedPost = await PostDataBaseService.updateDBPost(
        {
          title: title,
          content: content,
        },
        parseInt(id)
      );
      res.json({
        status: "ok",
        newpost: updatedPost,
      });
    } catch (error) {
      res.json({
        status: "error",
        message: error,
      });
    }
  }

  async deletePost(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: "error",
        message: "Faltou o ID",
      });
    }

    try {
      const response = await PostDataBaseService.deleteDBPost(parseInt(id));
      if (response) {
        res.json({
          status: "ok",
          message: "post deletado com sucesso",
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

export default new PostController();