# 🎮 SADA — Sistema de Acompanhamento de Alunos

> **Gamificação inteligente para gestão de turmas do ensino médio de Biologia**

[![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=flat&logo=firebase)](https://firebase.google.com)
[![PWA](https://img.shields.io/badge/PWA-Offline--First-5A0FC8?style=flat&logo=pwa)](https://web.dev/pwa)
[![License](https://img.shields.io/badge/License-Private-red)](#)

---

## 📋 Índice

- [O que é o SADA?](#-o-que-é-o-sada)
- [Funcionalidades](#-funcionalidades)
- [Guia de Instalação](#-guia-de-instalação)
- [Como Usar](#-como-usar)
- [Sistema de XP e Habilidades](#-sistema-de-xp-e-habilidades)
- [Arquitetura](#-arquitetura)
- [Tecnologias](#-tecnologias)
- [Referências Científicas](#-referências-científicas)

---

## 🎯 O que é o SADA?

O **SADA** é uma ferramenta web gamificada que transforma a gestão de classe em uma experiência de RPG. O professor gerencia turmas como um "Game Master", e os alunos são "jogadores" que ganham XP, sobem de nível e desbloqueiam habilidades.

**Principais características:**
- 📱 **Offline-first** — funciona sem internet após a primeira instalação
- 🎮 **Gamificação completa** — XP, níveis, classes, guildas, habilidades
- 🔄 **Sincronização automática** — dados sincronizam com a nuvem quando há internet
- 🌐 **Acesso pelo celular** — PWA instalável no Android/iOS

---

## 🛠️ Funcionalidades

### 📊 Painel
- Ranking dos alunos por XP
- Cards com nível, classe, guilda e barra de progresso
- Alertas de ações disponíveis baseados nas habilidades

### 🎯 Boss (Avaliações)
- Criação de provas, trabalhos e seminários
- Lançamento de notas com cálculo automático de XP
- Boss Auto-Kill para alunos nível 17+

### 📅 Presença
- Chamada com marcação de faltas
- Sistema de "Perdoar" faltas (Prazo Estendido)
- Fechar mês com bônus automáticos

### ➕ Cadastro
- Cadastro de alunos com classe e guilda
- Edição direta de XP e guilda
- Filtros por série

### 📖 Habilidades
- Página de referência com todas as habilidades por classe e nível
- Abas por classe (Tank, Suporte, DPS)

### 📜 Log de XP
- Histórico completo de toda movimentação
- Filtro por série
- Possibilidade de reverter XP

---

## 🚀 Guia de Instalação

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18+)
- [PM2](https://pm2.keymetrics.io/) (para rodar o servidor em background)
- Uma conta no [Firebase](https://firebase.google.com)

### Passo 1 — Clonar o repositório

```bash
git clone https://github.com/ReidATenda/sada-app.git
cd sada-app
```

### Passo 2 — Configurar Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com)
2. Crie um novo projeto (ex: `sada-2027`)
3. Ative **Firestore Database** (modo de produção)
4. Ative **Authentication** → método: **Email/Senha**
5. Vá em **Project Settings** → **General** → copie o objeto `firebaseConfig`
6. Cole o objeto em `login.html` e `sada-app-v10.html` (procure por `const firebaseConfig`)

### Passo 3 — Instalar dependências

```bash
npm install -g pm2
```

### Passo 4 — Iniciar o servidor

```bash
pm2 start sada-server.js --name sada
pm2 save
```

### Passo 5 — Auto-start no boot (Windows)

```bash
pm2 startup
# Siga as instruções exibidas no terminal
```

### Passo 6 — Acessar pelo celular

1. Conecte o celular na **mesma rede WiFi** do PC
2. Abra o Chrome e acesse: `http://[IP-DO-PC]:3000`
3. Faça login
4. Clique nos 3 pontinhos → **"Adicionar à tela inicial"**
5. Pronto! O app está instalado

> **Dica:** Para descobrir o IP do PC, execute `ipconfig` no PowerShell e procure o endereço IPv4.

---

## 📱 Como Usar

### Rotina Diária

| Passo | Ação | Onde |
|---|---|---|
| 1 | Abrir o SADA pelo ícone no celular | Tela inicial |
| 2 | Ver alertas de ações disponíveis | Painel |
| 3 | Registrar chamada do dia | Presença |
| 4 | Dar XP para presentes | Presença |
| 5 | Lançar notas de Boss (se houver) | Boss |

### Rotina Mensal

| Passo | Ação | Onde |
|---|---|---|
| 1 | Fechar mês | Presença → Fechar mês |
| 2 | Ver ranking atualizado | Painel |

---

## ⚔️ Sistema de XP e Habilidades

### Níveis

| Nível | XP Necessário | XP Total |
|---|---|---|
| 1 | 1.000 | 1.000 |
| 5 | 1.000 | 5.000 |
| 10 | 1.000 | 10.000 |
| 15 | 1.000 | 15.000 |
| 20 (MAX) | 1.000 | 20.000 |

### Fontes de XP

| Fonte | XP | Frequência |
|---|---|---|
| Missão diária | +100 | Por missão |
| Boss (nota × 100) | +0 a +1.000 | Por avaliação |
| Assiduidade | +400 | Mensal |
| Guilda Unida | +100 × guildmates | Mensal |
| Auditor (Tank) | +50 | Mensal |

### Classes

| Classe | Foco | Cor |
|---|---|---|
| 🛡️ **Tank** | Liderança, organização, resistência | Verde |
| 💚 **Suporte** | Auxílio, flexibilidade, poder divino | Azul |
| ⚔️ **DPS** | Dano, prazo estendido, ofensiva | Laranja |

### Habilidades Automatizadas

| Habilidade | Classe | Nível | Efeito |
|---|---|---|---|
| Faltei Sim | DPS | 8 | Até 3 faltas não cancelam assiduidade |
| Auditor | Tank | 4 | +50 XP se fiscalizações em dia |
| Guilda Unida | Todas | 3 | +100 XP por guilda mate no mesmo nível |
| Boss Auto-Kill | Todas | 17 | Nota 10 automática |
| Incapacitar | Tank | 14 | Anula 1 questão (notas ×0.8) |
| Prazo Estendido I | DPS | 1 | Anula 1 falta por dia |
| Prazo Estendido II | DPS | 6 | Anula todas faltas DPS no dia |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────┐
│                  CELULAR (PWA)                  │
│  ┌─────────────┐  ┌──────────────────────────┐  │
│  │   Offline    │  │    Service Worker        │  │
│  │   Cache      │  │    (Cache de arquivos)   │  │
│  └─────────────┘  └──────────────────────────┘  │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│              FIREBASE FIRESTORE                 │
│  ┌──────────┐ ┌──────────┐ ┌──────────────────┐ │
│  │ players  │ │  bosses  │ │     faltas       │ │
│  │ horarios │ │  notas   │ │  chamadas_feitas │ │
│  │ xpLog    │ │ assiduid │ │   guilda_unida   │ │
│  └──────────┘ └──────────┘ └──────────────────┘ │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│                PC DO PROFESSOR                  │
│  ┌──────────────────────────────────────────┐   │
│  │  sada-server.js (Node.js + PM2)         │   │
│  │  Porta 3000                             │   │
│  └──────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Collections Firestore

| Collection | Descrição |
|---|---|
| `players` | Dados dos alunos |
| `bosses` | Avaliações criadas |
| `bosses/{id}/notas` | Notas por avaliação |
| `faltas` | Registro de faltas |
| `chamadas_feitas` | Datas com chamada |
| `assiduidade` | Bônus de assiduidade |
| `guilda_unida` | Bônus de guilda |
| `auditor_bonus` | Bônus de auditor |
| `horarios` | Horários de aula |
| `diario` | Anotações diárias |
| `xpLog` | Log de movimentação |

---

## 🧰 Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização (variáveis CSS, flexbox, grid) |
| JavaScript | Lógica da aplicação (vanilla, sem frameworks) |
| Firebase Auth | Autenticação (email/senha) |
| Firebase Firestore | Banco de dados NoSQL |
| Service Worker | Cache offline (PWA) |
| Node.js | Servidor HTTP customizado |
| PM2 | Process manager (auto-restart, auto-start) |

---

## 📚 Referências Científicas

A gamificação do SADA é fundamentada em:

1. **Teoria do Autodeterminação** (Deci & Ryan, 1985) — Autonomia, competência e relacionamento
2. **Teoria do Fluxo** (Csikszentmihalyi, 1990) — Imersão e equilíbrio desafio/habilidade
3. **Revisão Sistemática** (Ruiz et al., 2024) — 90 artigos sobre gamificação em escolas
4. **Feedback Imediato** (Hattie & Timperley, 2007) — Importância do feedback na aprendizagem
5. **Construtivismo** (Piaget, 1970; Vygotsky, 1978) — Aprendizagem ativa e colaborativa

---

## 📄 Licença

Este projeto é de uso pessoal. Não é permitida a redistribuição sem autorização.

---

## 🤝 Contribuindo

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

## 📞 Contato

- **GitHub:** [ReidATenda](https://github.com/ReidATenda)
- **Repositório:** [sada-app](https://github.com/ReidATenda/sada-app)

---

*Feito com 💚 para educação gamificada*
