import type { ErrorRequestHandler } from 'express';
import { AppError, ValidationError } from '../../../core/errors';

const isProd = process.env.NODE_ENV === 'production';

export const errorHandler: ErrorRequestHandler = (err: any, req, res, _next) => {
    if (!(err instanceof AppError) && typeof err?.code === 'string') {
        if (err.code === 'P2002') err = new AppError('UNIQUE_VIOLATION', 409, 'Unique constraint violation');
        if (err.code === 'P2025') err = new AppError('RECORD_NOT_FOUND', 404, 'Record not found');
    }

    const status = (err as any).status ?? (err as any).statusCode ?? 500;
    const code   = (err as any).code ?? 'INTERNAL';
    const body: any = {
        code,
        message: err?.message ?? 'Internal error',
        path: req.originalUrl,
    };
    if (err instanceof ValidationError) body.errors = err.errors;
    if (!isProd && err?.stack) body.stack = err.stack;

    if (!isProd) console.error('[ERROR]', code, err?.message, err?.stack);

    res.status(status).json(body);
};
