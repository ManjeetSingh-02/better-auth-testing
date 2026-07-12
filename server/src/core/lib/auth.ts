// internal-imports
import { env } from '../config/env.js';
import { prisma } from '../database/prisma/client.js';

// external-imports
import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [
    ...env.ORIGINS,
    'betterauthclientmobile://',

    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(process.env.NODE_ENV === 'development'
      ? [
          'exp://', // Trust all Expo URLs (prefix matching)
          'exp://**', // Trust all Expo URLs (wildcard matching)
          'exp://192.168.*.*:*/**', // Trust 192.168.x.x IP range with any port and path
        ]
      : []),
  ],

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
});
