// internal-imports
import { APP_CONFIG } from './constants.js';

// external-imports
import 'dotenv/config';
import z from 'zod';

// zod schema for environment variables
const envSchema = z.object({
  ORIGINS: z
    .string({ error: 'ORIGINS must be a valid string' })
    .transform(v => v.split(',').map(o => o.trim()))
    .pipe(z.array(z.url({ error: 'Every ORIGIN must be a valid URL' }))),
  PORT: z.coerce.number().int().positive(),
  DATABASE_URL: z.url({ error: 'DATABASE_URL must be a valid URL' }),
  NODE_ENV: z.enum(Object.values(APP_CONFIG.NODE_ENVS)),
});

// function to validate environment variables
function validateEnv() {
  try {
    // parse environment variables
    return envSchema.parse(process.env);
  } catch (error: unknown) {
    // if zod error, format and throw a new error with all issues
    if (error instanceof z.ZodError) throw new Error(z.prettifyError(error), { cause: error });

    // if it's not a zod error, rethrow it
    throw error;
  }
}

// export the validated environment variables
export const env = validateEnv();
