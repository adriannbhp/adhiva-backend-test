import type { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
    const status = err.status ?? 500;
    const code = err.code ?? 'INTERNAL';
    const body: any = { code, message: err.message ?? 'Internal Server Error' };
    if (code === 'VALIDATION_ERROR' && err.meta?.errors) {
        body.errors = err.meta.errors;
    }
    res.status(status).json(body);
}
export default errorHandler;
