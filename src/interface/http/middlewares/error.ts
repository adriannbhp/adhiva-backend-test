import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import {AppError} from "../../../core/errors";

export function notFound(_req: Request, _res: Response, next: NextFunction) {
    next(new AppError("NOT_FOUND", 404, "Route not found"));
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    const isDev = process.env.NODE_ENV !== "production";
    const anyErr = err as any;

    // 0) Invalid JSON body (body-parser)
    if (anyErr?.type === "entity.parse.failed" || (err instanceof SyntaxError && "body" in (err as any))) {
        return res.status(400).json({
            code: "INVALID_JSON",
            message: "Malformed JSON body",
        });
    }

    // 1) Zod validation error
    if (err instanceof ZodError) {
        const { fieldErrors, formErrors } = err.flatten();
        return res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid request",
            meta: { fieldErrors, formErrors },
        });
    }

    // 2) Custom AppError (dari core/errors)
    if (err instanceof AppError) {
        return res.status(err.status).json({
            code: err.code,
            message: err.message,
            ...(err.meta ? { meta: err.meta } : {}),
        });
    }

    // 3) Prisma known errors (kalau belum kamu bungkus di usecase)
    if (typeof anyErr?.code === "string" && anyErr.code.startsWith("P")) {
        let status = 400;
        let code = anyErr.code;
        let message = anyErr.message;

        switch (anyErr.code) {
            case "P2002": // Unique constraint failed
                status = 409;
                message = "Duplicate value for unique field";
                break;
            case "P2003": // Foreign key constraint
                status = 409;
                message = "Related record prevents this operation";
                break;
            case "P2025": // Record not found
                status = 404;
                message = "Record not found";
                break;
            default:
                status = 400;
                message = anyErr.message || "Database error";
                break;
        }

        return res.status(status).json({
            code,
            message,
            ...(isDev && anyErr?.meta ? { meta: anyErr.meta } : {}),
        });
    }

    // 4) Fallback
    if (isDev) {
        console.error("UNHANDLED ERROR:", anyErr);
    }
    return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
    });
}