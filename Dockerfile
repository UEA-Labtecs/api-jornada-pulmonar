# Use a imagem oficial do Node.js como base
FROM node:lts

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do aplicativo
RUN npm install --force

RUN npx prisma migrate dev --schema=./prisma/schema.prisma

# Copie o restante do código-fonte para o diretório de trabalho
COPY . .

# Exponha a porta para acessar o aplicativo
EXPOSE ${PORT}

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
