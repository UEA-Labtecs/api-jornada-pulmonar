# Jornada Pulmonar - Backend

Backend da aplicação Jornada Pulmonar, uma plataforma educacional desenvolvida com NestJS para gerenciar módulos, questões e respostas de usuários.

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **Passport** - Estratégias de autenticação
- **Swagger** - Documentação da API
- **Supabase** - Armazenamento de arquivos (opcional)
- **Docker** - Containerização
- **GitHub Actions** - CI/CD

## 📋 Pré-requisitos

- Node.js (v21.7.2 ou superior)
- Yarn ou NPM
- PostgreSQL (v12 ou superior)
- Docker (opcional)

## ⚙️ Configuração

### 1. Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd api-jornada-pulmonar

# Instale as dependências
yarn install
```

### 2. Variáveis de Ambiente

Configure as variáveis de ambiente necessárias:

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

Edite o arquivo `.env` e configure as seguintes variáveis:

```env
# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/jornada_pulmonar?schema=public"

# JWT Configuration
JWT_SECRET="seu-segredo-jwt-aqui"
JWT_EXPIRES_IN="7d"

# Application
NODE_ENV="development"
PORT=3000

# CORS
ALLOWED_ORIGINS="http://localhost:19006,http://localhost:8081"

# Supabase (opcional)
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_KEY="your-supabase-anon-key"
```

**⚠️ Importante:** 
- O arquivo `.env` contém dados sensíveis e **não deve ser commitado** no git
- Use o `.env.example` como template
- Mantenha suas credenciais seguras

### 3. Banco de Dados

```bash
# Execute as migrações
npx prisma migrate dev

# Gere o Prisma Client
npx prisma generate

# (Opcional) Abra o Prisma Studio para visualizar os dados
npx prisma studio
```

## 🏃 Executando a Aplicação

### Desenvolvimento

```bash
# Modo watch (recarrega automaticamente)
yarn start:dev
```

### Produção

```bash
# Build
yarn build

# Execute em produção
yarn start:prod
```

### Docker

```bash
# Build da imagem
docker build -t api-jornada-pulmonar .

# Executar container
docker run -p 3000:3000 --env-file .env api-jornada-pulmonar

# Ou usar docker-compose
docker-compose up -d
```

## 📚 Documentação da API

Após iniciar o servidor, acesse a documentação Swagger:

```
http://localhost:3000/api
```

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar rotas protegidas:

1. Faça login através da rota `/api/v1/auth/login`
2. Use o token retornado no header `Authorization: Bearer <token>`

## 🗂️ Estrutura do Projeto

```
apps/core/src/
├── auth/              # Autenticação e autorização
├── common/            # Módulos e serviços compartilhados
│   ├── modules/       # Módulos do NestJS
│   └── services/      # Serviços compartilhados (Prisma, etc)
└── jornada-pulmonar/  # Domínio principal
    ├── application/   # Casos de uso
    ├── domain/        # Entidades e regras de negócio
    ├── infra/         # Repositórios e adaptadores
    └── presentation/  # Controllers e DTOs
```

## 🧪 Testes

```bash
# Testes unitários
yarn test

# Testes com cobertura
yarn test:cov

# Testes em modo watch
yarn test:watch
```

## 📝 Scripts Disponíveis

```bash
yarn start:dev      # Inicia em modo desenvolvimento
yarn start:prod     # Inicia em modo produção
yarn build          # Compila o projeto
yarn format         # Formata o código com Prettier
yarn lint           # Executa o ESLint
yarn test           # Executa os testes
```

## 🔧 Migrations do Prisma

```bash
# Criar uma nova migration
npx prisma migrate dev --name nome_da_migration

# Aplicar migrations em produção
npx prisma migrate deploy

# Resetar o banco de dados (desenvolvimento)
npx prisma migrate reset
```

## 🌐 Endpoints Principais

- `POST /api/v1/auth/login` - Login de usuário
- `GET /api/v1/users` - Listar usuários
- `POST /api/v1/modules` - Criar módulo
- `GET /api/v1/questions` - Listar questões
- `POST /api/v1/responses` - Registrar resposta

Para ver todos os endpoints, acesse a documentação Swagger.

## 🚢 CI/CD

O projeto utiliza GitHub Actions para integração e entrega contínua.

### Pipeline Automático

A cada push para `main` ou `develop`:

1. ✅ **Testes e Lint** - Valida qualidade do código
2. ✅ **Build Docker** - Cria imagem otimizada
3. ✅ **Push para GHCR** - Publica no GitHub Container Registry

### Como Usar

**1. Habilitar GitHub Container Registry:**
- Vá em: `Settings → Actions → General → Workflow permissions`
- Selecione: "Read and write permissions"

**2. Push para main ou develop:**
```bash
git add .
git commit -m "feat: nova funcionalidade"
git push origin main
```

**3. Acompanhar pipeline:**
- Acesse: `Actions` no GitHub
- Veja o progresso do build

### Puxar Imagem

```bash
# Imagem da branch main (latest)
docker pull ghcr.io/seu-usuario/api-jornada-pulmonar:latest

# Imagem da branch develop
docker pull ghcr.io/seu-usuario/api-jornada-pulmonar:develop

# Imagem de commit específico
docker pull ghcr.io/seu-usuario/api-jornada-pulmonar:main-abc1234
```

### Executar Imagem

```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="..." \
  --name api-jornada-pulmonar \
  ghcr.io/seu-usuario/api-jornada-pulmonar:latest
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'feat: adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Commit

Este projeto usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adiciona nova funcionalidade
fix: corrige um bug
docs: atualiza documentação
style: formatação de código
refactor: refatoração de código
test: adiciona ou atualiza testes
chore: tarefas de manutenção
```

## 📄 Licença

MIT

## 👥 Autores

Desenvolvido pela equipe UEA - Universidade do Estado do Amazonas

## 📞 Suporte

Para suporte, entre em contato através do repositório ou abra uma issue.
