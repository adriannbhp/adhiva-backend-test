import { z } from "zod";
import type { User } from '../entities/user';

/* ------------------------------- USER -------------------------------- */

export const CreateUserSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 chars"),
    isActive: z.boolean().optional(),
}).strict();
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

export const UpdateUserSchema = z.object({
    name: z.string().min(1).optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    isActive: z.boolean().optional(),
}).strict();

export type UpdateUserInput = {
    id: number;
} & z.infer<typeof UpdateUserSchema>;

export const ListUserSchema = z.object({
    q: z.string().optional(),
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().max(100).default(10),
}).strict();

export type FindUsersInput = z.infer<typeof ListUserSchema>;

export type UserOutput = User;

/* ---------------------------- STANDARD OUTPUT ------------------------ */

export type PaginatedUsersOutput = {
    data: User[];
    total: number;
    page: number;
    limit: number;
};

export const ParamIdSchema = z.object({ id: z.coerce.number().int().positive() });


export const parseCreateUser = (body: unknown) => CreateUserSchema.parse(body);
export const parseUpdateUser = (body: unknown) => UpdateUserSchema.parse(body);
export const parseListUsers = (query: unknown) => ListUserSchema.parse(query);