import type { Request, Response, NextFunction } from "express";
import { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { container } from "../../../di/container";
import { AppError } from "./error";
import type { Role } from "../../../core/auth/permissions";

export type AuthUser = { id: number; email: string; name: string; role?: Role };

function bearer(h?: string) { const m = h?.match(/^Bearer\s+(.+)$/i); return m ? m[1] : null; }

export function authGuard(req: Request, _res: Response, next: NextFunction) {
    try {
        const token = bearer(req.header("authorization"));
        if (!token) throw new AppError("UNAUTHORIZED", 401, "Missing bearer token");
        const p = container.services.token.verify<Partial<AuthUser>>(token);
        const user: AuthUser = { id: Number(p.id), email: String(p.email ?? ""), name: String(p.name ?? ""), role: p.role };
        if (!user.id || !user.email) throw new AppError("UNAUTHORIZED", 401, "Invalid token payload");
        req.user = user;
        next();
    } catch (e) {
        if (e instanceof TokenExpiredError) return next(new AppError("UNAUTHORIZED", 401, "Token expired"));
        if (e instanceof JsonWebTokenError) return next(new AppError("UNAUTHORIZED", 401, "Invalid token"));
        return next(new AppError("UNAUTHORIZED", 401, "Invalid or expired token"));
    }
}
