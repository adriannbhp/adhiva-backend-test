import {z} from "zod";

const Env = z.object({
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.union([
        z.coerce.number().int().positive(),
        z.string().regex(/^\d+[smhd]$/i, 'Use 30s|15m|2h|7d or number of seconds'),
    ]).default('2h'),
    EXTERNAL_API_URL: z.string(),
    HTTP_TIMEOUT_MS: z.coerce.number().int().positive().default(10000),
    BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(14).default(12),
    PORT: z.coerce.number().int().positive().default(3000),
});
export const env = Env.parse(process.argv);