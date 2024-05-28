import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class MessageDataBaseService {
    constructor() {}

    async listDBMessages() {
      try {
        return await prisma.message.findMany();
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    async insertDBMessage(message: Prisma.MessageCreateInput) {
      try {
        const newmessage = await prisma.message.create({
          data: message,
        });
        return newmessage;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    async updateDBMessage(message: Prisma.MessageUpdateInput, id: number) {
      try {
        const updatedMessage = await prisma.message.update({
          data: message,
          where: {
            id: id,
          },
        });
        return updatedMessage;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
    async deleteDBMessage(id: number) {
      try {
        await prisma.message.delete({
          where: {
            id: id,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  }

  export default new MessageDataBaseService();