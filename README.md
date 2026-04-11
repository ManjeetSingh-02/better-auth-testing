# better-auth-testing
Testing of Better-Auth

1. Add `.env`
```env
ORIGIN_URL=http://localhost:5173
PORT=3000
DATABASE_URL=postgresql://username:password@localhost:5432/db_name
NODE_ENV=development
COOKIE_SECRET=minimum_of_32_char_cookie_secret
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=minimum_of_32_char_better_auth_secret
BETTER_AUTH_API_KEY=api_key_from_better_auth_dashboard
GOOGLE_CLIENT_ID=google_oauth_client_id
GOOGLE_CLIENT_SECRET=google_oauth_client_secret
```

2. Install dependencies
```bash
pnpm install
```

3. Generate Prisma client
```
pnpm prisma generate
```

4. Create `src/core/database/prisma.ts` and add the following code
```typescript
// internal-imports
import { env } from '../config/env.js';

// external-imports
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client.js';

// prisma client instance
export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: env.DATABASE_URL }),
});
```

5. Run the server
```bash
pnpm dev
```