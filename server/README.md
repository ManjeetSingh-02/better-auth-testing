# node-ts
NodeJS with TypeScript Template

## .env
```env
ORIGINS=http://localhost:5173
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
NODE_ENV=development
BETTER_AUTH_SECRET=minimum_of_32_char_cookie_secret
BETTER_AUTH_URL=base_url_of_app
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Install dependencies
```bash
pnpm add cors dotenv express winston winston-daily-rotate-file zod
```

## Install dev dependencies
```bash
pnpm add -D @eslint/js @types/cors @types/express @types/node eslint eslint-config-prettier globals jiti prettier tsx typescript@6 typescript-eslint tsc-alias
```
