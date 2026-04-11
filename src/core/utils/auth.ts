// internal-imports
import { env } from '../config/env.js';
import { prisma } from '../database/prisma.js';

// external-imports
import { dash } from '@better-auth/infra';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  basePath: '/api/v1/auth',
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: env.BETTER_AUTH_SECRET,
  plugins: [
    dash({
      apiKey: env.BETTER_AUTH_API_KEY,
    }),
  ],
});
