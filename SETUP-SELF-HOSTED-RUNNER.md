# 🏃 Configurar GitHub Self-Hosted Runner

Como seu servidor está em rede local (Proxmox), use um **Self-Hosted Runner** para fazer deploy direto do servidor.

## 🎯 Vantagens

- ✅ Deploy local (sem expor servidor na internet)
- ✅ Mais rápido (não precisa SSH)
- ✅ Mais seguro
- ✅ Usa recursos do próprio servidor

## 📋 Pré-requisitos no Servidor

- Docker instalado
- Linux (Ubuntu/Debian)
- Acesso root ou sudo

## 🔧 Passo a Passo

### 1. No GitHub (obter token)

1. Vá no seu repositório
2. Acesse: **Settings → Actions → Runners**
3. Clique em: **New self-hosted runner**
4. Selecione: **Linux**
5. **COPIE OS COMANDOS** que aparecem na tela

### 2. No Servidor (instalar runner)

Execute os comandos que o GitHub mostrou:

```bash
# Criar diretório
mkdir actions-runner && cd actions-runner

# Baixar runner (versão pode mudar, use a do GitHub)
curl -o actions-runner-linux-x64-2.311.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.311.0/actions-runner-linux-x64-2.311.0.tar.gz

# Extrair
tar xzf ./actions-runner-linux-x64-2.311.0.tar.gz

# Configurar (use o comando que o GitHub mostrou)
./config.sh --url https://github.com/SEU_USER/api-jornada-pulmonar --token SEU_TOKEN

# Durante a configuração:
# - Runner group: Default
# - Runner name: [deixe o padrão ou escolha um nome]
# - Work folder: [deixe o padrão: _work]
# - Labels: [deixe o padrão]
```

### 3. Iniciar Runner como Serviço

```bash
# Instalar como serviço (roda automaticamente)
sudo ./svc.sh install

# Iniciar serviço
sudo ./svc.sh start

# Verificar status
sudo ./svc.sh status
```

### 4. Verificar no GitHub

Volte em **Settings → Actions → Runners** e você deve ver:

```
✅ self-hosted    Idle    (ou Running)
```

## 🎯 Workflow Atualizado

O workflow já foi atualizado para usar `runs-on: self-hosted`:

```yaml
deploy:
  name: Deploy to Server
  runs-on: self-hosted  # ← Roda no seu servidor!
```

## 🚀 Como Funciona Agora

```
1. Push para main
   ↓
2. GitHub Actions (na nuvem): Roda testes
   ↓
3. GitHub Actions (na nuvem): Build da imagem
   ↓
4. GitHub Actions (na nuvem): Push para GHCR
   ↓
5. Self-Hosted Runner (SEU SERVIDOR): Puxa imagem
   ↓
6. Self-Hosted Runner (SEU SERVIDOR): Deploy local
   ↓
7. ✅ Container rodando!
```

## 📝 Secrets Necessários

Agora você **NÃO precisa mais** dos secrets SSH:
- ~~`SSH_HOST`~~ ← Não precisa mais!
- ~~`SSH_USER`~~ ← Não precisa mais!
- ~~`SSH_PRIVATE_KEY`~~ ← Não precisa mais!

**Apenas configure:**
- ✅ `DATABASE_URL` → URL do PostgreSQL
- ✅ `JWT_SECRET` → Secret do JWT

**No repositório:** `Settings → Secrets and variables → Actions`

## 🔍 Comandos Úteis

### Ver status do runner
```bash
cd ~/actions-runner
sudo ./svc.sh status
```

### Ver logs do runner
```bash
cd ~/actions-runner
tail -f _diag/Runner_*.log
```

### Parar runner
```bash
sudo ./svc.sh stop
```

### Reiniciar runner
```bash
sudo ./svc.sh stop
sudo ./svc.sh start
```

### Desinstalar runner
```bash
sudo ./svc.sh stop
sudo ./svc.sh uninstall
```

## 🐛 Troubleshooting

### Runner offline no GitHub?
```bash
# Verificar se o serviço está rodando
sudo ./svc.sh status

# Ver logs
tail -f _diag/Runner_*.log

# Reiniciar
sudo ./svc.sh stop
sudo ./svc.sh start
```

### Erro de permissão com Docker?
```bash
# Adicionar usuário do runner ao grupo docker
sudo usermod -aG docker $USER

# Reiniciar runner
sudo ./svc.sh stop
sudo ./svc.sh start
```

### Runner não encontra Docker?
```bash
# Verificar se Docker está instalado
docker --version

# Instalar se necessário
sudo apt update
sudo apt install -y docker.io
sudo systemctl enable docker
sudo systemctl start docker
```

## 🔐 Segurança

- ✅ Runner roda no seu servidor (não expõe na internet)
- ✅ Usa as credenciais locais
- ✅ Acesso apenas ao repositório que você configurou
- ✅ Pode restringir quais workflows podem usar o runner

### Restringir uso do runner (opcional):

Em cada workflow que deve usar o runner, você pode especificar:

```yaml
runs-on: [self-hosted, linux, x64]  # Mais específico
```

## ✅ Checklist Final

Antes de fazer o deploy:

- [ ] Runner instalado e rodando no servidor
- [ ] Runner aparece como "Idle" ou "Running" no GitHub
- [ ] Docker instalado no servidor
- [ ] Secrets `DATABASE_URL` e `JWT_SECRET` configurados no GitHub
- [ ] Workflow atualizado com `runs-on: self-hosted`

## 🎉 Pronto!

Agora é só fazer push:

```bash
git add .
git commit -m "chore: configurar self-hosted runner"
git push origin main
```

O deploy será **automático e local**! 🚀

---

## 📞 Comandos de Manutenção

```bash
# Status do container
docker ps

# Logs da aplicação
docker logs -f api-jornada-pulmonar

# Reiniciar aplicação
docker restart api-jornada-pulmonar

# Limpar imagens antigas
docker image prune -a
```

