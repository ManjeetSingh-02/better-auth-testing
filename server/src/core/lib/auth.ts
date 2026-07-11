// internal-imports
import { env } from '../config/env.js';
import { prisma } from '../database/prisma/client.js';

// external-imports
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  basePath: '/api/v1/auth',
  trustedOrigins: env.ORIGINS,
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
});
