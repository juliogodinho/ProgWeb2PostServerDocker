"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRouter = (0, express_1.Router)();
UserRouter.get("/api/users", UserController_1.default.listUsers);
UserRouter.post("/api/user", UserController_1.default.createUser);
UserRouter.patch("/api/user/:id", UserController_1.default.updateUser);
UserRouter.delete("/api/user/:id", UserController_1.default.deleteUser);
exports.default = UserRouter;
/*import { Router } from "express";

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const UserRouter = Router();

UserRouter.get("/users", async function(req, res){
    try{
        const users = await prisma.user.findMany();
        console.log(users);
        res.json({
            status: 200,
            users: users
        })

    }catch(error){
        console.log(error);
        res.json({
            status: 500,
            message: "Não foi possível lisar os usuários"
        })
    }
});

UserRouter.post("/user", async function(req, res){
    const { email, name } = req.body;

    if(!email){
        res.json({
            status: 500,
            message: "Email não encontrado no corpo da requisição"
        });
    }

    try {
        const newuser = await prisma.user.create({
            data: {
                email: email,
                name: name
            }
        });
        
        if(newuser){
            res.json({
                status: 200,
                user: newuser
            });
        }

    }catch(error){
        console.log(error);
        res.json({
            status: 500,
            message: "Erro ao salvar o usuário"
        });
    };
});

UserRouter.patch("/user/:id", async function(req, res){
    const id = req.params.id;

    if(!id){
        res.json({
            status: 500,
            message: "Id do usuário não encontrado"
        });
    }

    const { email, name } = req.body;
    
    if(!email || !name){
        res.json({
            status: 500,
            message: "Corpo não encontrado"
        });
    }

    try {
        const updatedUser = await prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: {
                email: email,
                name: name
            }
        });
        res.json({
            status: 200,
            updatedUser: updatedUser
        });
    }catch(error){
        console.log(error);
        res.json({
            status: 500,
            message: "Erro ao salvar o usuário"
        });
    }
});

UserRouter.delete("/user/:id", async function(req, res){
    const id = req.params.id;

    if(!id){
        res.json({
            status: 500,
            message: "Id do usuário não encontrado"
        });
    }

    try{
        await prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });

        res.json({
            status: 200,
            message: "Usuário deletado com sucesso"
        });
    }catch(error){
        console.log(error);
        res.json({
            status: 500,
            message: "Não foi possível excluir o usuário"
        });
    }
});

export default UserRouter;*/ 
