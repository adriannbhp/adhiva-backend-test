import { z } from "zod";

/* ---------------------------- AUTH / LOGIN ---------------------------- */

export const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof LoginSchema>;

export type LoginOutput = {
    accessToken: string;
};

export const parseLogin = (body: unknown) => LoginSchema.parse(body);
