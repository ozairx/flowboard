# GEMINI.md: Flowboard Project

## Project Overview

This is a full-stack Trello-like task management platform named **Flowboard**. The project is structured as a monorepo with a `frontend` and a `backend` directory.

-   **Frontend**: A Next.js 14 application using the App Router, TypeScript, Tailwind CSS, and Zustand for state management. Drag and drop functionality is handled by `@dnd-kit`.
-   **Backend**: A Node.js/Express API written in TypeScript, providing a REST API for data management and using Socket.IO for real-time communication. It uses Prisma with a PostgreSQL database and JWT for authentication.
-   **Architecture**: The goal is a clean, modular architecture deployed on the AWS Free Tier, with CI/CD via GitHub Actions.

## Building and Running

The primary method for running the project locally is via Docker Compose.

1.  **Start all services (Backend, Frontend, Database):**
    ```bash
    docker-compose up --build
    ```

2.  **Access services:**
    -   Frontend: [http://localhost:3000](http://localhost:3000)
    -   Backend: [http://localhost:4000](http://localhost:4000)

### Running Services Manually

**Backend:**
```bash
cd backend
npm install

# Run in development mode (with hot-reload)
npm run dev

# Build for production
npm run build

# Run in production mode
npm run start
```

**Frontend:**
```bash
cd frontend
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run in production mode
npm run start
```

## Testing

**Backend (Jest):**
```bash
cd backend
npm test
```

**Frontend (Playwright):**
```bash
cd frontend

# Install browser dependencies (one-time setup)
npx playwright install

# Run tests
npx playwright test
```

## Development Conventions

-   **Code Style**: The project uses ESLint and Prettier for code linting and formatting. Configurations are present in the respective `package.json` files.
-   **Typing**: The entire codebase (frontend and backend) is written in TypeScript.
-   **Backend Architecture**: The backend aims for a clean, modular structure, separating concerns into `controllers`, `services`, `routes`, etc.
-   **Commits**: While not explicitly defined, a conventional commit style is recommended.
-   **Environment Variables**: The backend uses a `.env` file for environment variables (see `README.md` for details). The frontend uses `NEXT_PUBLIC_` prefixes for public variables.
