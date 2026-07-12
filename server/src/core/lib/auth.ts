// internal-imports
import { env } from '../config/env.js';
import { prisma } from '../database/prisma/client.js';

// external-imports
import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: env.MOBILE_SCHEMES,

  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [expo()],
  advanced: {
    defaultCookieAttributes: {
      sameSite: env.NODE_ENV !== 'development' ? 'none' : 'lax',
      secure: env.NODE_ENV !== 'development',
      httpOnly: true,
    },
  },
});
