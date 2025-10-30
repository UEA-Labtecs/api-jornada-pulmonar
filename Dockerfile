# ============================================
# Stage 1: Build
# ============================================
FROM node:21.7.2-alpine AS builder

WORKDIR /app

# Copie arquivos de dependências
COPY package.json yarn.lock ./

# Instale dependências
RUN yarn install --frozen-lockfile

# Copie o código fonte
COPY . .

# Gere o Prisma Client
RUN npx prisma generate

# Build da aplicação
RUN yarn build

# ============================================
# Stage 2: Production
# ============================================
FROM node:21.7.2-alpine AS production

WORKDIR /app

# Copie apenas as dependências de produção
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Copie o build e os arquivos necessários
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma

# Crie usuário não-root para segurança
RUN addgroup -g 1001 -S nodejs && \
  adduser -S nestjs -u 1001 && \
  chown -R nestjs:nodejs /app

USER nestjs

# Exponha a porta
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Comando de inicialização
CMD ["node", "dist/apps/core/main.js"]
