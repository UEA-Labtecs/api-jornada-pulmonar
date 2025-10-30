# 🔌 Configuração de Portas

## 📋 Como Funciona

### Mapeamento Docker

```
HOST:CONTAINER
 ↓       ↓
5001 → 3000
```

- **Porta HOST (5001)**: Porta externa acessível no servidor
- **Porta CONTAINER (3000)**: Porta interna onde o app NestJS escuta

## ⚙️ Configuração

### GitHub Variables

Configure em: `Settings → Secrets and variables → Actions → Variables`

```
PORT_API_PULMAO=5001
```

Essa é a porta **EXTERNA** (do host).

### Dockerfile

```dockerfile
EXPOSE 3000
```

Essa é a porta **INTERNA** (do container).

### Docker Run

```bash
docker run -p 5001:3000 \
  -e PORT=3000 \
  ...
```

- `-p 5001:3000`: Mapeia porta 5001 do host para 3000 do container
- `-e PORT=3000`: Diz ao app NestJS para escutar na porta 3000

## ✅ Verificação

Após o deploy, você verá:

```
PORTS
3000/tcp, 0.0.0.0:5001->3000/tcp
```

Isso significa:
- ✅ App escutando na **porta 3000** dentro do container
- ✅ Acessível externamente na **porta 5001** do host

## 🌐 Acesso

### Local (no servidor)

```bash
curl http://localhost:5001/health
curl http://localhost:3000/health  # ❌ NÃO funciona (porta interna)
```

### Remoto (via Nginx Proxy Manager)

Configure o proxy para:

```
Forward Hostname / IP: localhost
Forward Port: 5001
```

## 🔄 Mudando a Porta Externa

Para usar outra porta externa (ex: 3001):

1. Atualize a variável no GitHub:
   ```
   PORT_API_PULMAO=3001
   ```

2. Faça novo deploy:
   ```bash
   git push origin main
   ```

3. O mapeamento será: `3001 → 3000`

## ❌ Erros Comuns

### ❌ Porta já em uso

```
docker: Error response from daemon: driver failed programming external connectivity
```

**Solução**: Outra aplicação está usando a porta 5001.

```bash
# Ver o que está usando a porta
sudo lsof -i :5001

# Ou trocar para outra porta
PORT_API_PULMAO=5002
```

### ❌ Container sobe mas não responde

Se o container sobe mas você não consegue acessar:

```bash
# Verificar se o app está escutando na porta certa
docker exec api-jornada-pulmonar netstat -tuln | grep 3000

# Ver logs
docker logs api-jornada-pulmonar
```

### ❌ Mapeamento errado

**Antes (ERRADO)**:
```bash
-p 5001:5001  # App escuta em 3000, não 5001!
```

**Depois (CORRETO)**:
```bash
-p 5001:3000  # Host 5001 → Container 3000
```

## 📊 Múltiplos Projetos

Para vários projetos no mesmo servidor:

| Projeto | Variável GitHub | Porta Host | Porta Container |
|---------|----------------|-----------|----------------|
| api-jornada-pulmonar | PORT_API_PULMAO=5001 | 5001 | 3000 |
| api-outro-projeto | PORT_API_OUTRO=5002 | 5002 | 3000 |
| api-terceiro | PORT_API_TERCEIRO=5003 | 5003 | 3000 |

Todos os apps escutam na porta 3000 **dentro** do container, mas são acessíveis em portas diferentes no host.

## 🔍 Debug

```bash
# Ver todas as portas mapeadas
docker ps --format "table {{.Names}}\t{{.Ports}}"

# Ver se a porta está aberta no host
sudo ss -tulpn | grep :5001

# Testar acesso
curl -v http://localhost:5001/health
```

---

**Resumo**: Use `PORT_API_PULMAO` para a porta externa, o app sempre roda em 3000 dentro do container. 🚀

