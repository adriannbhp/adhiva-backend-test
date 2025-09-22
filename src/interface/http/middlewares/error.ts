import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
    constructor(
        public code: string,
        public statusCode = 400,
        message?: string,
        public meta?: unknown
    ) {
        super(message ?? code);
    }
}

export function notFound(_req: Request, _res: Response, next: NextFunction) {
    next(new AppError("NOT_FOUND", 404, "Route not found"));
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
    const isDev = process.env.NODE_ENV !== "production";
    const anyErr = err as any;

    // 1) Zod validation error
    if (err instanceof ZodError) {
        const { fieldErrors, formErrors } = err.flatten();
        return res.status(400).json({
            code: "VALIDATION_ERROR",
            message: "Invalid request",
            fieldErrors,
            formErrors,
        });
    }

    // 2) Custom AppError
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message,
            ...(err.meta ? { meta: err.meta } : {}),
        });
    }

    // 3) Prisma errors
    if (typeof anyErr?.code === "string" && anyErr.code.startsWith("P")) {
        let status = 400;
        let code = anyErr.code;
        let message = anyErr.message;

        switch (anyErr.code) {
            case "P2002": // Unique constraint failed
                status = 409;
                message = "Duplicate value for unique field";
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
            ...(isDev ? { meta: anyErr.meta } : {}),
        });
    }

    // 4) Fallback (unexpected errors)
    if (isDev) {
        console.error("UNHANDLED ERROR:", anyErr);
        return res.status(500).json({
            code: "INTERNAL_ERROR",
            message: anyErr?.message || "Something went wrong",
            stack: anyErr?.stack,
        });
    }

    return res.status(500).json({
        code: "INTERNAL_ERROR",
        message: "Something went wrong",
    });
}
