# 🧩 FlowBoard — Task Management Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat&logo=nextdotjs)
![Node.js](https://img.shields.io/badge/Node.js-20-green?style=flat&logo=nodedotjs)
![AWS](https://img.shields.io/badge/AWS-Free%20Tier-orange?style=flat&logo=amazonaws)
![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-in%20development-yellow)

> **FlowBoard** é uma plataforma de gerenciamento de tarefas estilo **Trello** — construída com **Next.js (App Router)** no frontend e **Node.js + Express** no backend.  
> Projeto pensado para portfólio: arquitetura full-stack, testes, CI/CD e deploy na **AWS Free Tier**.

---

## 🚀 Stack (resumo)

**Frontend**
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, Zustand (state), @hello-pangea/dnd (drag & drop)
- Playwright (E2E)

**Backend**
- Node.js + Express + Prisma (Postgres)
- PostgreSQL (AWS RDS Free Tier)
- JWT Auth, Socket.IO (tempo real)
- Jest (unit/integration)

**Infra / Deploy**
- Frontend: S3 (hosting estático) + CloudFront
- Backend: EC2 (Docker) ou Lambda + API Gateway
- DB: RDS (Postgres)
- CI/CD: GitHub Actions
- Observability: CloudWatch

---

## 🔧 Funcionalidades Principais

- Registro / Login (JWT)
- CRUD: Boards → Lists → Cards
- Drag & Drop entre listas
- Atualização em tempo real (Socket.IO)
- Tema claro/escuro persistente
- Uploads de anexos → S3 (opcional)
- Deploy automatizado (GitHub Actions → AWS)

---

## 🗂️ Estrutura do Repositório
```

flowboard/  
│  
├── backend/  
│ ├── src/  
│ │ ├── controllers/  
│ │ ├── routes/  
│ │ ├── middlewares/  
│ │ ├── sockets/  
│ │ └── server.ts  
│ ├── prisma/  
│ ├── Dockerfile  
│ └── package.json  
│  
├── frontend/  
│ ├── app/  
│ ├── components/  
│ ├── hooks/  
│ ├── store/  
│ ├── public/  
│ ├── next.config.js  
│ └── package.json  
│  
├── docker-compose.yml  
├── .github/workflows/  
├── README.md  
└── LICENSE

```
---

## 🧭 Setup Local (rápido)

Repositório deve conter `docker-compose.yml` para dev:

```bash
# clonar
git clone https://github.com/zaicouto/flowboard.git
cd flowboard

# rodar containers: backend + db + frontend (opcional)
docker-compose up --build
```

Acessos locais:

- Frontend: [http://localhost:3000](http://localhost:3000/)

- Backend: [http://localhost:4000](http://localhost:4000/)

---

## ☁️ Deploy — Resumo prático (AWS Free Tier)

**Frontend (S3 + CloudFront)**

1. `npm run build` dentro de `frontend`

2. `npm run export` (gera pasta `out/`) ou usar `next start` se SSR necessário

3. Upload dos arquivos estáticos para bucket S3 configurado para website

4. Distribuição via CloudFront para CDN + HTTPS via ACM

**Backend (EC2 Docker)**

1. Criar EC2 t2.micro (Free Tier) com Docker instalado

2. Build da imagem Docker (ou usar ECR)

3. Rodar container e expor porta (usar Security Group restrito)

4. Configurar `ENV` (DB URL, JWT secret)

5. Opcional: usar Lambda + API Gateway se preferir serverless (ver limites)

**Banco**

- Criar instância RDS PostgreSQL Free Tier

- Configurar grupo de segurança para aceitar conexões do backend

**CI/CD**

- GitHub Actions:
  
  - Workflow frontend: build → upload S3
  
  - Workflow backend: build Docker → push to EC2 (SSH) ou ECR + ECS/Lambda deploy

---

## 🔐 Variáveis de Ambiente (principais)

```
# Backend
DATABASE_URL=postgresql://USER:PASS@host:port/dbname
JWT_SECRET=uma_chave_secreta
PORT=4000
NODE_ENV=production
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
S3_BUCKET_NAME=flowboard-uploads

# Frontend (exemplo)
NEXT_PUBLIC_API_URL=https://api.flowboard.app
NEXT_PUBLIC_S3_BUCKET=flowboard-uploads
```

---

## 🧪 Testes

**Backend**

```bash
cd backend
npm install
npm test
```

**Frontend**

```bash
cd frontend
npm install
npx playwright install
npx playwright test
```

---

## 🧭 Roadmap (prioridade)

- Autenticação JWT completa

- CRUD Boards / Lists / Cards

- Drag & Drop (DnD)

- Socket.IO: eventos de board / card

- Uploads para S3 (pré-assinados)

- Dockerize e docker-compose para dev

- Deploy AWS (S3/CloudFront + EC2/RDS)

- CI/CD (GitHub Actions)

- Testes automatizados (Jest + Playwright)

- Monitoramento (CloudWatch) e logs estruturados

- Landing page pública + README com screenshots/GIF

---

## 🧩 Arquitetura Técnica

### Diagrama (fluxo simplificado)

```
[User Browser]
     |
     | HTTPS (CloudFront)
     v
[CloudFront CDN] ──> [S3 static hosting] (frontend)
     |
     | API calls (HTTPS)
     v
[API Gateway] (opcional) -> [EC2 Docker (Node.js API) or Lambda]
                                      |
                                      | WebSocket / Socket.IO
                                      v
                                 [EC2 / Socket Server]
                                      |
                                      v
                                 [RDS PostgreSQL]
                                      |
                                      v
                                 [S3 (uploads)]
```

### Explicação

1. **Frontend**: Build estático hospedado em S3 + distribuído por CloudFront para baixa latência e HTTPS. Pode usar SSR via EC2 se precisar de server-side rendering.

2. **API**: Node.js/Express rodando em EC2 (containerizado) ou Lambda. Expondo endpoints REST (autenticação, boards, lists, cards) e WebSocket/Socket.IO para eventos em tempo real.

3. **Banco**: PostgreSQL no RDS (Free Tier) para persistência de dados relacionais.

4. **Armazenamento**: S3 para arquivos anexos (pré-signed URLs para upload direto do client).

5. **CI/CD**: GitHub Actions faz build/test e publica front para S3 e back para EC2 (via SSH/ECR) ou Lambda.

6. **Observability**: Logs e métricas enviados para CloudWatch; usar alertas básicos (opcional).

---

## ✅ Boas práticas que implementei/pretendo implementar

- Código tipado (TypeScript)

- Estrutura modular (controllers/services/repositories)

- Secrets em GitHub Secrets / AWS Parameter Store

- Lint/prettier e hooks (Husky)

- Testes automatizados e pipeline que falha em lint/test

- Docker para reproducibilidade local

---

## 📜 Licença

MIT License © 2025 — Desenvolvido por Zai Couto  
([zaicouto (Ozair Marlon Menêses Couto) · GitHub](https://github.com/zaicouto))

---

## 📌 Contato / Demo

- Repo: `https://github.com/zaicouto/flowboard`

- Demo/URL pública: será adicionada após deploy

