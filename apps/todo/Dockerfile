# Imagem base
FROM node:14

# Diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de definição de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia os arquivos do projeto
COPY . .

# Expõe a porta 5001
EXPOSE 5001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
