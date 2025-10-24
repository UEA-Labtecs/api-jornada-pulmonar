# Configuração de Variáveis de Ambiente - Backend

## Passo a Passo

1. **Copie o arquivo de exemplo:**
   ```bash
   cp .env.example .env
   ```

2. **Configure as variáveis no arquivo `.env`:**

### Database Configuration

```env
DATABASE_URL="postgresql://user:password@localhost:5432/jornada_pulmonar?schema=public"
```

- Substitua `user`, `password`, `localhost` e `5432` com suas credenciais do PostgreSQL
- O nome do banco de dados é `jornada_pulmonar`

### Server Configuration

```env
PORT=3000
NODE_ENV=development
```

- `PORT`: Porta onde o servidor irá rodar (padrão: 3000)
- `NODE_ENV`: Ambiente de execução (`development`, `production`, `test`)

### JWT Configuration

```env
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION_TIME=1d
```

- `JWT_SECRET`: **IMPORTANTE** - Gere uma chave secreta forte. Use um gerador online ou execute:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- `JWT_EXPIRATION_TIME`: Tempo de expiração do token (ex: `1d`, `7d`, `24h`)

### Supabase Configuration (Opcional)

```env
SUPABASE_URL=your-supabase-url
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_BUCKET=your-bucket-name
```

Se você estiver usando Supabase para armazenamento de arquivos:
- `SUPABASE_URL`: URL do seu projeto Supabase
- `SUPABASE_KEY`: Chave anônima (anon/public key) do Supabase
- `SUPABASE_BUCKET`: Nome do bucket para upload de arquivos

## Configuração do Banco de Dados

Após configurar o `.env`, execute as migrações:

```bash
# Instalar dependências
yarn install

# Executar migrações do Prisma
npx prisma migrate dev

# Gerar o Prisma Client
npx prisma generate
```

## Iniciando o Servidor

```bash
# Desenvolvimento
yarn start:dev

# Produção
yarn build
yarn start:prod
```

## Usando Docker

Se você estiver usando Docker Compose:

```bash
docker-compose up -d
```

O Docker Compose já está configurado para ler o arquivo `.env`.

## Segurança

⚠️ **NUNCA** commite o arquivo `.env` no Git!

O arquivo `.gitignore` já está configurado para ignorar arquivos `.env`.

