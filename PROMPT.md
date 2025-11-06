# Prompt: Projeto Full-Stack Trello-like com Next.js, Node.js e AWS Free Tier

Quero que você me ajude a desenvolver um projeto completo de portfólio: 
um sistema de gestão de tarefas estilo Trello (boards, listas e cards), 
usando a stack moderna e com foco em boas práticas de arquitetura full-stack.

### 🎯 Objetivo:
Criar um projeto sólido para portfólio, que demonstre capacidade de um desenvolvedor pleno em React, Next.js e Node.js, com deploy completo na AWS Free Tier.

### 🧱 Stack:
- Frontend: Next.js 14 (App Router, TypeScript, Tailwind, Zustand)
- Backend: Node.js + Express (REST API com JWT Auth)
- Banco: PostgreSQL (AWS RDS Free Tier)
- Infra: 
  - API no AWS EC2 ou AWS Lambda + API Gateway
  - Frontend no S3 + CloudFront
  - Banco no RDS
- CI/CD com GitHub Actions (build + deploy automático)
- Testes: Jest (backend) e Playwright (frontend)
- Docker para desenvolvimento local

### 💡 Funcionalidades principais:
1. Autenticação de usuários (registro, login, JWT)
2. CRUD de Boards
3. CRUD de Lists dentro dos Boards
4. CRUD de Cards dentro das Lists
5. Drag & Drop de Cards (React Beautiful DnD)
6. Atualização em tempo real com Socket.IO
7. Painel do usuário com overview dos boards
8. Tema dark/light persistente
9. Deploy completo na AWS Free Tier

### 🚀 Requisitos extras:
- Código modular e limpo (MVC ou Clean Architecture)
- Scripts de seed para dados de exemplo
- Testes unitários e de integração
- Dockerfile + docker-compose para dev
- Configuração de CI/CD automatizada
- Documentação em README (setup, comandos, deploy)
- Uso do ESLint + Prettier
- Setup de monitoramento básico (CloudWatch)

Quero que você:
1. Gere o esqueleto inicial do projeto (frontend + backend)
2. Sugira a estrutura de diretórios e dependências
3. Crie um roadmap de desenvolvimento baseado em boas práticas
4. Gere snippets e exemplos de configuração conforme eu pedir nas próximas etapas

