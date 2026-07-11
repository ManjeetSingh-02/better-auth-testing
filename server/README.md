# node-ts
NodeJS with TypeScript Template

## .env
```env
ORIGINS=http://localhost:5173
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
NODE_ENV=development
```

## Install dependencies
```bash
pnpm add cors dotenv express winston winston-daily-rotate-file zod
```

## Install dev dependencies
```bash
pnpm add -D @eslint/js @types/cors @types/express @types/node eslint eslint-config-prettier globals jiti prettier tsx typescript@6 typescript-eslint tsc-alias
```
