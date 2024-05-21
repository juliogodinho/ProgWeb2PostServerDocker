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
const PostDataBaseService_1 = __importDefault(require("../services/PostDataBaseService"));
class PostController {
    constructor() { }
    listPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield PostDataBaseService_1.default.listDBPosts();
                res.json({
                    status: "ok",
                    posts: posts,
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
    createPost(req, res) {
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
                const newpost = yield PostDataBaseService_1.default.insertDBPost({
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
            }
            catch (error) {
                res.json({
                    status: "error",
                    message: error,
                });
            }
        });
    }
    updatePost(req, res) {
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
                const updatedPost = yield PostDataBaseService_1.default.updateDBPost({
                    title: title,
                    content: content,
                }, parseInt(id));
                res.json({
                    status: "ok",
                    newpost: updatedPost,
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
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            if (!id) {
                res.json({
                    status: "error",
                    message: "Faltou o ID",
                });
            }
            try {
                const response = yield PostDataBaseService_1.default.deleteDBPost(parseInt(id));
                if (response) {
                    res.json({
                        status: "ok",
                        message: "post deletado com sucesso",
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
exports.default = new PostController();
