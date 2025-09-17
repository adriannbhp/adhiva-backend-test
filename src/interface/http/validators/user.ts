import { z } from 'zod';

export const createUserSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6),
    nim: z.string().optional().nullable(),
    isActive: z.boolean().optional(),
});

export const updateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    nim: z.string().nullable().optional(),
    isActive: z.boolean().optional(),
});

export const listUserSchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().positive().optional(),
    limit: z.coerce.number().int().positive().max(100).optional(),
});

export type CreateUserBody = z.infer<typeof createUserSchema>;
export type UpdateUserBody = z.infer<typeof updateUserSchema>;
export type ListUserQuery = z.infer<typeof listUserSchema>;
