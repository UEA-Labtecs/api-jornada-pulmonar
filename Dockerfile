# syntax=docker/dockerfile:1
FROM node:18.13.0
WORKDIR /code
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install
ARG PORT
EXPOSE ${PORT}
COPY . .
CMD ["yarn", "prod"]
