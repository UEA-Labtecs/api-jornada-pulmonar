# 🔐 Configuração de Secrets no GitHub

Para o deploy automático funcionar, você precisa configurar os seguintes secrets no GitHub.

## 📍 Como Adicionar Secrets

1. Vá no seu repositório no GitHub
2. Acesse: **Settings → Secrets and variables → Actions**
3. Clique em **New repository secret**
4. Adicione cada secret abaixo

---

## 🔑 Secrets Necessários

### 1. SSH do Servidor

#### `SSH_HOST`
- **Descrição:** IP ou domínio do servidor
- **Exemplo:** `192.168.1.100` ou `servidor.seu-dominio.com.br`

#### `SSH_USER`
- **Descrição:** Usuário SSH do servidor
- **Exemplo:** `root` ou `ubuntu`

#### `SSH_PRIVATE_KEY`
- **Descrição:** Chave privada SSH (conteúdo do arquivo `~/.ssh/id_rsa`)
- **Como obter:**
  ```bash
  # No seu computador local
  cat ~/.ssh/id_rsa
  ```
- **Copie TODO o conteúdo**, incluindo as linhas:
  ```
  -----BEGIN OPENSSH PRIVATE KEY-----
  ...
  -----END OPENSSH PRIVATE KEY-----
  ```

#### `SSH_PORT` (Opcional)
- **Descrição:** Porta SSH do servidor
- **Valor padrão:** `22`
- **Só adicione se usar porta diferente**

---

### 2. Variáveis de Ambiente da Aplicação

#### `DATABASE_URL`
- **Descrição:** URL de conexão do PostgreSQL
- **Exemplo:** `postgresql://user:password@postgres.example.com:5432/jornada_pulmonar?schema=public`

#### `JWT_SECRET`
- **Descrição:** Chave secreta para assinar tokens JWT
- **Exemplo:** `sua-chave-super-secreta-aqui-mude-isso`
- **Como gerar uma chave forte:**
  ```bash
  openssl rand -base64 32
  ```

#### `JWT_EXPIRES_IN` (Opcional)
- **Descrição:** Tempo de expiração do token
- **Valor padrão:** `7d`
- **Exemplos:** `1h`, `24h`, `7d`, `30d`

#### `ALLOWED_ORIGINS`
- **Descrição:** Domínios permitidos para CORS (separados por vírgula)
- **Exemplo:** `https://app.seu-dominio.com.br,https://seu-dominio.com.br`

#### `SUPABASE_URL`
- **Descrição:** URL do projeto Supabase (se usar)
- **Exemplo:** `https://seu-projeto.supabase.co`

#### `SUPABASE_KEY`
- **Descrição:** Chave anon/public do Supabase (se usar)
- **Onde encontrar:** Supabase Dashboard → Settings → API

---

## 🔧 Configuração do Servidor

### 1. Configurar SSH no Servidor

No servidor, você precisa:

#### a) Instalar Docker
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y docker.io docker-compose
sudo systemctl enable docker
sudo systemctl start docker

# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
```

#### b) Adicionar Chave Pública SSH
```bash
# No servidor
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Cole sua chave pública em authorized_keys
nano ~/.ssh/authorized_keys
# Cole o conteúdo de ~/.ssh/id_rsa.pub (do seu computador)
# Salve: Ctrl+O, Enter, Ctrl+X

chmod 600 ~/.ssh/authorized_keys
```

#### c) Testar Conexão SSH
```bash
# No seu computador
ssh usuario@ip-do-servidor
```

### 2. Configurar Firewall (Opcional mas Recomendado)
```bash
# Permitir SSH
sudo ufw allow 22/tcp

# Permitir porta da aplicação
sudo ufw allow 3000/tcp

# Habilitar firewall
sudo ufw enable
```

---

## ✅ Checklist de Configuração

Antes de fazer o primeiro deploy, confirme:

### No GitHub:
- [ ] `SSH_HOST` configurado
- [ ] `SSH_USER` configurado
- [ ] `SSH_PRIVATE_KEY` configurado (chave completa)
- [ ] `DATABASE_URL` configurado
- [ ] `JWT_SECRET` configurado
- [ ] `ALLOWED_ORIGINS` configurado
- [ ] `SUPABASE_URL` configurado (se usar)
- [ ] `SUPABASE_KEY` configurado (se usar)

### No Servidor:
- [ ] Docker instalado e rodando
- [ ] SSH configurado (chave pública adicionada)
- [ ] Porta 3000 liberada no firewall
- [ ] Usuário tem permissão para usar Docker

### GitHub Actions:
- [ ] Workflow permissions: "Read and write permissions"
  - `Settings → Actions → General → Workflow permissions`

---

## 🧪 Testar Deploy

Depois de configurar tudo:

1. Faça um commit e push:
   ```bash
   git add .
   git commit -m "test: deploy automático"
   git push origin main
   ```

2. Acompanhe no GitHub:
   - Vá em **Actions** no repositório
   - Veja o workflow rodando

3. Verifique no servidor:
   ```bash
   docker ps
   docker logs -f api-jornada-pulmonar
   ```

---

## 🐛 Troubleshooting

### Erro: "Permission denied (publickey)"
- Verifique se a chave SSH está correta no GitHub Secrets
- Confirme que a chave pública está em `~/.ssh/authorized_keys` no servidor

### Erro: "docker: command not found"
- Docker não está instalado ou não está no PATH do usuário
- Instale o Docker no servidor

### Container não inicia
- Verifique logs: `docker logs api-jornada-pulmonar`
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o `DATABASE_URL` está acessível do servidor

### "Permission denied" ao executar docker
- Adicione o usuário ao grupo docker:
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```

---

## 🔄 Fluxo Completo

```
1. Push para main
   ↓
2. GitHub Actions: Run tests
   ↓
3. GitHub Actions: Build Docker image
   ↓
4. GitHub Actions: Push to GHCR
   ↓
5. GitHub Actions: SSH no servidor
   ↓
6. Servidor: Para container antigo
   ↓
7. Servidor: Puxa nova imagem
   ↓
8. Servidor: Inicia novo container
   ↓
9. ✅ Deploy concluído!
```

---

## 📞 Comandos Úteis no Servidor

```bash
# Ver containers rodando
docker ps

# Ver logs em tempo real
docker logs -f api-jornada-pulmonar

# Parar container
docker stop api-jornada-pulmonar

# Iniciar container
docker start api-jornada-pulmonar

# Reiniciar container
docker restart api-jornada-pulmonar

# Verificar uso de recursos
docker stats api-jornada-pulmonar

# Acessar shell do container
docker exec -it api-jornada-pulmonar sh
```

---

**🎉 Pronto! Agora você tem deploy automático via GitHub Actions!**

Toda vez que fizer push para `main`, o deploy será automático! 🚀

