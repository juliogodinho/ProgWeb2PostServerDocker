"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const PostRouter = (0, express_1.Router)();
PostRouter.get("/api/posts", PostController_1.default.listPost);
PostRouter.post("/api/post", PostController_1.default.createPost);
PostRouter.patch("/api/post/:id", PostController_1.default.updatePost);
PostRouter.delete("/api/post/:id", PostController_1.default.deletePost);
exports.default = PostRouter;
