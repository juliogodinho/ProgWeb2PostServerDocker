import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash } from "../utils/BcryptUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


class AuthController {
    constructor() { }

    async signUp(req: Request, res: Response) {
        const body = req.body;
        console.log(body);

        if (!body.email || !body.name || !body.password) {
            res.json({
                status: "error",
                message: "Falta parâmetros",
            });
            return;
        }

        const hashPassword = await generateHash(body.password);

        if (!hashPassword) {
            res.json({
                status: "error",
                message: "Erro ao criptografar senha ...",
            });
        }

        try {
            const newuser = await AuthService.signUp({
                name: body.name,
                email: body.email,
                password: hashPassword as string
            });
            res.json({
                status: "ok",
                newuser: newuser,
            });
        } catch (error) {
            res.json({
                status: "error",
                message: error,
            });
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, password } = req.body;
    
        if (!email || !password) {
          return res.status(400).json({
            status: "error",
            message: "Falta parâmetros",
          });
        }
    
        try {
          const user = await AuthService.findUserByEmail(email);
    
          if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({
              status: "error",
              message: "Credenciais inválidas",
            });
          }
    
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "", {
            expiresIn: "1h",
          });
    
          res.json({
            status: "ok",
            token,
          });
        } catch (error: any) {
          res.status(500).json({
            status: "error",
            message: error.message,
          });
        }
      }

    async signOut() {

    }
}

export default new AuthController();