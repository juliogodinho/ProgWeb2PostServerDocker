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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const BcryptUtils_1 = require("../utils/BcryptUtils");
class AuthController {
    constructor() { }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            console.log(body);
            if (!body.email || !body.name || !body.password) {
                res.json({
                    status: "error",
                    message: "Falta parâmetros",
                });
                return;
            }
            const hashPassword = yield (0, BcryptUtils_1.generateHash)(body.password);
            if (!hashPassword) {
                res.json({
                    status: "error",
                    message: "Erro ao criptografar senha ...",
                });
            }
            try {
                const newuser = yield AuthService_1.default.signUp({
                    name: body.name,
                    email: body.email,
                    password: hashPassword
                });
                res.json({
                    status: "ok",
                    newuser: newuser,
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
    signIn() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    signOut() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new AuthController();
