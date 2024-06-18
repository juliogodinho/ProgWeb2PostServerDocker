import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const SECRET_KEY = 'your-secret-key'; // Você deve armazenar isso de forma segura, como em variáveis de ambiente

class AuthService {
    constructor() {}

    async signIn(email: string, password: string) {
        try {
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                throw new Error('User not found');
            }

            const validPassword = await bcrypt.compare(password, user.password);

            if (!validPassword) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

            return { token, user };
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    
    async signUp(user: Prisma.UserCreateInput) {
        try {
            if(user.password != undefined){
                const hashPassword = await bcrypt.hash(user.password, 10);
                const newUser = await prisma.user.create({
                    data: {
                        ...user,
                        password: hashPassword,
                    },
                });
            return newUser;
            }
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async signOut() {
        // A implementação de signOut geralmente depende do front-end,
        // onde o token é simplesmente removido do armazenamento local.
    }
}

export default new AuthService();