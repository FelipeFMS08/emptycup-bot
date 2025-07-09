# 🧠 EmptyCupBot

> Bot exclusivo para administração e automação do servidor **EmptyCup Network**, desenvolvido com foco em performance, segurança e escalabilidade. Criado em **TypeScript**, seguindo as melhores práticas modernas de desenvolvimento com Discord.js.

---

## ✨ Visão Geral

O **EmptyCupBot** é um bot personalizado construído especialmente para a estrutura interna da EmptyCup Network — uma network brasileira de Minecraft. Ele foi projetado para auxiliar na moderação, comunicação, automação de rotinas e gestão de membros.

---

## 🚀 Tecnologias Utilizadas

- **TypeScript** — tipagem estática, robustez e produtividade
- **Discord.js v14+** — SDK moderno para bots do Discord
- **Node.js** — ambiente de execução leve e escalável
- **Render** — para manter o bot online 24/7 com deploy automático via GitHub

---

## 🔐 Funcionalidades

### 📚 Comandos Administrativos
- `/regras` — Envia as regras do servidor em um embed fixado
- `/anunciar` — Abre um modal para criação de anúncios com título e descrição

### 🛡️ Comandos de Moderação
Todos os comandos abaixo são restritos a cargos definidos no `.env`:

- `/ban` — Banir permanentemente um usuário
- `/kick` — Expulsar do servidor
- `/mute` e `/unmute` — Gerenciar silenciamentos com cargo \"Mutado\"
- `/warn` — Advertir um membro com registro no log
- `/clear` — Limpar mensagens do chat
- `/slowmode` — Ativar/desativar modo lento
- `/lock` e `/unlock` — Bloquear e desbloquear canais para @everyone

### 📓 Logs
Todas as ações de moderação são registradas automaticamente em um canal de logs.

---

## 🧱 Estrutura

```bash
src/
├─ commands/                # Comandos principais e moderação
│  ├─ anunciar.ts
│  ├─ regras.ts
│  └─ moderation/
├─ events/                  # Listeners de eventos (interaction, memberAdd etc.)
├─ handlers/                # Carregamento e deploy automático de comandos
├─ types/                   # Tipagens customizadas
├─ index.ts                 # Entry point do bot
