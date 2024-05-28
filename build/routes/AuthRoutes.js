"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/api/auth/signin", AuthController_1.default.signIn);
AuthRouter.post("/api/auth/signup", AuthController_1.default.signUp);
exports.default = AuthRouter;
