# Etapa 1: Utilizar uma imagem base com Node.js
FROM node:20.14.0

# Etapa 2: Definir o diretório de trabalho no contêiner
WORKDIR /app

# Etapa 3: Copiar os arquivos package.json e package-lock.json para o contêiner
COPY package*.json ./

# Etapa 4: Instalar as dependências da aplicação
RUN npm install

# Etapa 5: Copiar o restante dos arquivos da aplicação para o contêiner
COPY . .

# Etapa 6: Executar o comando prisma generate para gerar os arquivos necessários para o cliente Prisma
RUN npx prisma generate

# Etapa 7: Expor a porta em que a aplicação será executada (ajuste conforme necessário)
EXPOSE 3000

# Etapa 8: Definir o comando para iniciar a aplicação
CMD ["npm", "start"]