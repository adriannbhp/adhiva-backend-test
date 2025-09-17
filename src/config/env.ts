import 'dotenv/config';
import { z } from 'zod';

const Env = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.coerce.number().int().positive().default(3000),

    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),

    // Auth
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be >=32 chars'),
    JWT_EXPIRES_IN: z.string().default('2h'),

    // Security
    BCRYPT_ROUNDS: z.coerce.number().int().min(4).max(15).default(12),

    // CORS
    CORS_ALLOW_ALL: z.coerce.boolean().default(true),
    CORS_ORIGINS: z
        .string()
        .optional()
        .transform((v) =>
            v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [],
        ),

    EXTERNAL_API_URL: z.string().url().min(1, 'EXTERNAL_API_URL is required'),
});

const parsed = Env.safeParse(process.env);
if (!parsed.success) {
    console.error(parsed.error.format());
    throw parsed.error;
}

export const env = parsed.data;

export const corsAllowAll = env.CORS_ALLOW_ALL;
export const corsOrigins = new Set((env.CORS_ORIGINS || []) as string[]);
