# 🗂️ TODO: Projeto Trello-like (Full Stack Next.js + Node.js + AWS Free Tier)

## 📦 Estrutura Inicial
- [x] Criar repositório Git (monorepo ou pasta separada /frontend e /backend)
- [x] Configurar `.editorconfig`, `.gitignore`, `README.md`, `LICENSE`
- [x] Adicionar ESLint, Prettier, Husky (pré-commit lint)

---

## 🧩 Backend (Node.js + Express + PostgreSQL)
- [x] Iniciar projeto Node (`npm init`)
- [x] Instalar dependências: express, cors, jsonwebtoken, bcrypt, prisma, socket.io
- [x] Configurar Prisma + conexão com PostgreSQL (RDS)
- [x] Criar entidades e schemas:
  - [x] User
  - [x] Board
  - [x] List
  - [x] Card
- [x] Implementar autenticação (JWT + middleware)
- [ ] Rotas REST:
  - [x] POST /auth/register
  - [x] POST /auth/login
  - [x] GET /boards
  - [x] POST /boards
  - [x] PATCH /boards/:id
  - [x] CRUD completo para lists e cards
- [ ] Configurar Socket.IO para atualização em tempo real (drag & drop)
- [ ] Adicionar testes Jest (unit + integração)
- [ ] Criar Dockerfile e docker-compose (backend + db local)
- [ ] Criar script de seed (usuário e board de exemplo)

---

## 🎨 Frontend (Next.js 14 + App Router + Tailwind)
- [ ] Criar app com `npx create-next-app@latest`
- [ ] Configurar TypeScript, Tailwind, Zustand
- [ ] Estruturar pastas: `app/`, `components/`, `hooks/`, `store/`, `lib/`
- [ ] Implementar autenticação com JWT (AuthContext ou Zustand)
- [ ] Páginas:
  - [ ] `/login`
  - [ ] `/register`
  - [ ] `/dashboard`
  - [ ] `/board/[id]`
- [ ] Componentes:
  - [ ] BoardCard, List, Card, Navbar, Sidebar, Modal
- [ ] Implementar drag & drop com `@hello-pangea/dnd`
- [ ] Conectar com backend via Axios
- [ ] Adicionar tema dark/light persistente (localStorage)
- [ ] Testes com Playwright (fluxos principais)

---

## 🔧 Infraestrutura AWS (Free Tier)
- [ ] Criar conta AWS e configurar IAM user com permissões mínimas
- [ ] Criar banco PostgreSQL no **AWS RDS Free Tier**
- [ ] Deploy backend:
  - [ ] Criar Docker image
  - [ ] Deploy em **AWS EC2** (ou **Lambda + API Gateway**)
  - [ ] Configurar variável de ambiente no EC2/Lambda
  - [ ] Adicionar monitoramento no CloudWatch
- [ ] Deploy frontend:
  - [ ] Build estático (`next build && next export`)
  - [ ] Subir arquivos no **AWS S3**
  - [ ] Configurar **CloudFront** para CDN
- [ ] Criar domínio gratuito (ex: via AWS Route 53 + Freenom)
- [ ] Configurar HTTPS com AWS Certificate Manager

---

## ⚙️ CI/CD (GitHub Actions)
- [ ] Pipeline para backend:
  - [ ] Rodar lint, testes e build
  - [ ] Deploy automático no EC2 (via SSH) ou Lambda (via AWS CLI)
- [ ] Pipeline para frontend:
  - [ ] Build estático + upload automático para S3
- [ ] Notificações de sucesso/erro no GitHub Actions

---

## 🧪 Qualidade e Documentação
- [ ] Configurar ESLint + Prettier + Husky
- [ ] Adicionar logs estruturados (pino ou Winston)
- [ ] Criar README com:
  - [ ] Descrição do projeto
  - [ ] Setup local e deploy AWS
  - [ ] Stack e decisões técnicas
  - [ ] Prints ou GIFs do sistema
- [ ] Criar script `npm run seed` e `npm run test`
- [ ] Criar post no LinkedIn com vídeo demo + link do projeto

---

## 🧭 Extras (para destacar no portfólio)
- [ ] Adicionar função de compartilhamento de board (invite)
- [ ] Adicionar comentários nos cards
- [ ] Adicionar suporte a anexos (upload → S3)
- [ ] Adicionar modo offline (IndexedDB)
- [ ] Adicionar paginação e busca global
- [ ] Criar landing page pública (Next.js SSR + SEO)

